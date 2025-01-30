//
//  DiscordRPCBridge.swift
//  Discord
//
//  Created by vapidinfinity (esi) on 28/1/2025. 😮‍💨
//

import Foundation
import WebKit
import OSLog
import SwiftUI

/**
 A Swift class emulating arRPC stage 1 (node IPC) directly in Swift.
 It sets up a Unix Domain Socket server to listen for Discord IPC connections.
 HUGE thank you to @vapidinfinity, go checkout Mythic 🙏🏾 (self glaze)
 */
class DiscordRPCBridge: NSObject {
    private let logger = Logger(
        subsystem: Bundle.main.bundleIdentifier ?? "lol.peril.Voxa",
        category: "discordRPCBridge"
    )

    private weak var webView: WKWebView?

    private var serverSockets = Set<Int32>()
    private var serverTask: Task<Void, Never>?

    private let clientManager = ClientManager()

    class Client {
        let fileDescriptor: Int32
        var isAcknowledged: Bool = false
        var clientID: String?
        var socketID: Int?
        var processID: Int?

        init(fileDescriptor: Int32) {
            self.fileDescriptor = fileDescriptor
        }
    }
    actor ClientManager {
        private var clients = [Int32: DiscordRPCBridge.Client]()
        private var clientSockets = Set<Int32>()
        private var nextSocketID = 1

        /// Adds a new client and returns it.
        func addClient(fileDescriptor: Int32) -> DiscordRPCBridge.Client {
            let client = DiscordRPCBridge.Client(fileDescriptor: fileDescriptor)
            clients[fileDescriptor] = client
            clientSockets.insert(fileDescriptor)
            client.socketID = nextSocketID
            nextSocketID += 1
            return client
        }

        /// Retrieves a client by its file descriptor.
        func getClient(fileDescriptor: Int32) -> DiscordRPCBridge.Client? {
            return clients[fileDescriptor]
        }

        /// Removes a client and closes its socket.
        func removeClient(fileDescriptor: Int32) {
            clients.removeValue(forKey: fileDescriptor)
            clientSockets.remove(fileDescriptor)
            close(fileDescriptor)
        }

        /// Closes all client sockets, used during deinitialization.
        func closeAllClients() {
            for fd in clientSockets {
                close(fd)
            }
            clients.removeAll()
            clientSockets.removeAll()
        }

        var allClientSockets: Set<Int32> {
            return clientSockets
        }
    }

    private let activityQueue = DispatchQueue(label: "activityQueue")

    private var isServerReady = false

    static let shared = DiscordRPCBridge()

    private override init() {
        super.init()
    }

    deinit {
        stopBridge()
    }

    // MARK: - Public Methods

    /**
     Starts the IPC server and sets up the bridge for the given WKWebView.

     - Parameter webView: The WKWebView instance to bridge with.
     */
    func startBridge(for webView: WKWebView) async {
        self.webView = webView
        self.logger.info("Starting DiscordRPCBridge")
        await initialiseRPCServer()
    }

    func stopBridge() {
        serverTask?.cancel()
        Task {
            await clientManager.closeAllClients()
            await shutdownServers()
        }
    }

    // MARK: - IPC Server Setup

    /// Sets up the IPC server by creating and binding Unix Domain Sockets.
    private func initialiseRPCServer() async {
        await withTaskCancellationHandler(operation: {
            self.logger.info("Setting up IPC servers")
            guard let temporaryDirectory = ProcessInfo.processInfo.environment["TMPDIR"] else {
                self.logger.fault("TMPDIR environment variable not set! Voxa has no idea where the unix domain sockets should go 😂😂😂 no rpc")
                return
            }

            for socketIndex in 0..<10 {
                let socketPath = "\(temporaryDirectory)discord-ipc-\(socketIndex)"
                self.logger.debug("Attempting to bind to socket path: \(socketPath)")

                guard self.prepareSocket(atPath: socketPath) else { continue }

                let fileDescriptor = UnixDomainSocket.create(atPath: socketPath)
                guard fileDescriptor >= 0 else { continue }

                if UnixDomainSocket.bind(fileDescriptor: fileDescriptor, toPath: socketPath) {
                    UnixDomainSocket.listen(on: fileDescriptor)
                    self.serverSockets.insert(fileDescriptor)
                    Task.detached {
                        await self.acceptConnections(on: fileDescriptor)
                    }
                    self.logger.info("IPC server successfully bound to and listening on \(socketPath)")
                    self.isServerReady = true
                    self.logger.info("IPC server is ready to accept connections.")
                    break
                } else {
                    close(fileDescriptor)
                    self.logger.warning("Failed to bind to socket path: \(socketPath). Trying next socket.")
                }
            }

            if self.serverSockets.isEmpty {
                self.logger.error("Failed to bind to any IPC sockets from discord-ipc-0 to discord-ipc-9")
            }
        }, onCancel: {
            Task {
                await shutdownServers()
            }
        })
    }

    /**
     Checks if the socket at the given path is already in use.

     - Parameter path: The socket file path.
     - Returns: `true` if the socket is in use, otherwise `false`.
     */
    private func isSocketInUse(atPath path: String) -> Bool {
        guard FileManager.default.fileExists(atPath: path) else { return false }
        let testSocketFD = UnixDomainSocket.create(atPath: path)
        defer { close(testSocketFD) }

        if testSocketFD < 0 {
            return true
        }

        let inUse = UnixDomainSocket.connect(fileDescriptor: testSocketFD, toPath: path)
        self.logger.info("Socket \(path) is \(inUse ? "in use" : "available")")
        return inUse
    }

    private func shutdownServers() async {
        for fileDescriptor in serverSockets {
            await socketClose(fileDescriptor: fileDescriptor, code: IPC.ClosureCode.normal)
        }
        serverSockets.removeAll()
        self.logger.info("All server sockets have been shut down.")
    }

    /**
     Prepares the socket by removing the existing file if necessary.

     - Parameter path: The socket file path.
     - Returns: `true` if preparation is successful, otherwise `false`.
     */
    private func prepareSocket(atPath path: String) -> Bool {
        if isSocketInUse(atPath: path) {
            self.logger.error("Socket \(path) is already in use; skipping removal.")
            return false
        }
        do {
            if FileManager.default.fileExists(atPath: path) {
                try FileManager.default.removeItem(atPath: path)
                self.logger.info("Removed existing socket file at \(path)")
            }
            return true
        } catch {
            self.logger.error("Failed to remove socket file at \(path): \(error.localizedDescription)")
            return false
        }
    }

    /**
     Closes the socket and cleans up client state.

     - Parameters:
       - fileDescriptor: The client socket file descriptor.
       - code: The closure code.
       - message: The closure message.
     */
    private func socketClose(fileDescriptor: Int32, code: IPC.ResponseCode, message: String? = nil) async {
        self.logger.info("Closing socket on FD \(fileDescriptor) with code \(code.rawValue) and message: \(message ?? "\(code.description) closure")")

        if let client = await clientManager.getClient(fileDescriptor: fileDescriptor),
           let processID = client.processID,
           let socketID = client.socketID {
            await clearActivity(processID: processID, socketID: socketID)
        }

        let closePayload = IPC.ClosePayload(code: code.rawValue, message: message ?? "\(code.description) closure")
        await send(packet: closePayload, operationCode: .close, to: fileDescriptor)

        await clientManager.removeClient(fileDescriptor: fileDescriptor)

        self.logger.info("Socket closed on FD \(fileDescriptor)")
    }

    /**
     Accepts incoming connections on the given socket file descriptor.

     - Parameter fileDescriptor: The socket file descriptor.
     */
    private func acceptConnections(on fileDescriptor: Int32) async {
        self.logger.info("Started accepting connections on FD \(fileDescriptor)")
        while !Task.isCancelled {
            let clientFD = UnixDomainSocket.acceptConnection(on: fileDescriptor)
            guard clientFD >= 0 else { continue }

            _ = await clientManager.addClient(fileDescriptor: clientFD)
            self.logger.info("Accepted connection on FD \(clientFD)")

            Task.detached { [weak self] in
                await self?.handleClient(clientFD)
            }
        }
        self.logger.info("Stopped accepting connections on FD \(fileDescriptor)")
    }

    // MARK: - Client Handling

    /**
     Handles communication with the connected Discord client.

     - Parameter fileDescriptor: The client socket file descriptor.
     */
    private func handleClient(_ fileDescriptor: Int32) async {
        self.logger.debug("Handling client on FD \(fileDescriptor)")
        await startReadLoop(on: fileDescriptor)
    }

    /**
     Continuously reads and processes IPC messages from Discord.

     - Parameter fileDescriptor: The client socket file descriptor.
     */
    private func startReadLoop(on fileDescriptor: Int32) async {
        self.logger.debug("Starting read loop on FD \(fileDescriptor)")
        let bufferSize = 65536

        defer {
            self.logger.debug("Read loop terminated on FD \(fileDescriptor)")
            Task {
                await socketClose(fileDescriptor: fileDescriptor, code: IPC.ErrorCode.ratelimited, message: "Read loop terminated")
            }
        }

        while !Task.isCancelled {
            guard let message = await readMessage(from: fileDescriptor, bufferSize: bufferSize) else {
                await socketClose(fileDescriptor: fileDescriptor, code: IPC.ErrorCode.ratelimited, message: "Failed to read message")
                return
            }
            await handleIPCMessage(message, from: fileDescriptor)
        }
    }

    /**
     Reads a complete IPC message from the socket.

     - Parameters:
       - fileDescriptor: The socket file descriptor.
       - bufferSize: The maximum buffer size.
     - Returns: An `IPC.Message` if successfully read, otherwise `nil`.
     */
    private func readMessage(from fileDescriptor: Int32, bufferSize: Int) async -> IPC.Message? {
        return await withCheckedContinuation { continuation in
            Task {
                guard let data = self.readExactData(from: fileDescriptor, count: 8) else {
                    continuation.resume(returning: nil)
                    return
                }
                let header = data

                guard let operationCode = IPC.OperationCode(rawValue: Int32(littleEndian: header.withUnsafeBytes { $0.load(as: Int32.self) })) else {
                    self.logger.error("Invalid operation code received: \(header.map { String(format: "%02hhx", $0) }.joined())")
                    continuation.resume(returning: nil)
                    return
                }

                let length = Int32(littleEndian: header.withUnsafeBytes { $0.load(fromByteOffset: 4, as: Int32.self) })

                self.logger.debug("Received packet - op: \(operationCode.rawValue), length: \(length) on FD \(fileDescriptor)")

                guard length > 0, length <= bufferSize else {
                    self.logger.error("Invalid packet length: \(length) on FD \(fileDescriptor)")
                    continuation.resume(returning: nil)
                    return
                }

                guard let payloadData = self.readExactData(from: fileDescriptor, count: Int(length)) else {
                    continuation.resume(returning: nil)
                    return
                }

                self.logger.debug("Payload Data Length: \(payloadData.count) bytes")

                if let payloadString = String(data: payloadData, encoding: .utf8) {
                    self.logger.debug("Payload Data: \(payloadString)")
                } else {
                    self.logger.debug("Payload Data: Unable to convert to string")
                }

                let decoder = JSONDecoder()
                let payload: IPC.Message.Payload

                do {
                    payload = try decoder.decode(IPC.Message.Payload.self, from: payloadData)
                } catch {
                    self.logger.error("Failed to decode IPC message on FD \(fileDescriptor): \(error.localizedDescription)")
                    continuation.resume(returning: nil)
                    return
                }

                continuation.resume(returning: IPC.Message(operationCode: operationCode, payload: payload))
            }
        }
    }

    /**
     Reads exactly `count` bytes from the socket into `Data`.

     - Parameters:
       - fileDescriptor: The socket file descriptor.
       - count: The number of bytes to read.
     - Returns: `Data` if successfully read, otherwise `nil`.
     */
    private func readExactData(from fileDescriptor: Int32, count: Int) -> Data? {
        var totalBytesRead = 0
        var data = Data()

        while totalBytesRead < count {
            var buffer = [UInt8](repeating: 0, count: count - totalBytesRead)
            let bytesRead = read(fileDescriptor, &buffer, count - totalBytesRead)

            if bytesRead <= 0 {
                self.logger.error("Failed to read from FD \(fileDescriptor)")
                return nil
            }

            totalBytesRead += bytesRead
            data.append(buffer, count: bytesRead)
        }

        return data
    }

    /**
     Handles incoming IPC messages based on the operation code.

     - Parameters:
       - message: The IPC message received.
       - fileDescriptor: The client socket file descriptor.
     */
    private func handleIPCMessage(_ message: IPC.Message, from fileDescriptor: Int32) async {
        guard let client = await clientManager.getClient(fileDescriptor: fileDescriptor) else {
            self.logger.error("Client not found for FD \(fileDescriptor)")
            return
        }

        switch message.operationCode {
        case .handshake:
            await handleHandshake(payload: message.payload, from: fileDescriptor, client: client)
        case .frame:
            await handleFrame(payload: message.payload, from: fileDescriptor, client: client)
        case .close:
            await socketClose(fileDescriptor: fileDescriptor, code: IPC.ClosureCode.normal)
        case .ping:
            await handlePing(payload: message.payload, from: fileDescriptor)
        case .pong:
            self.logger.warning("Unhandled operation code: \(message.operationCode.rawValue) on FD \(fileDescriptor)")
        }
    }

    /**
     Handles the HANDSHAKE operation.

     - Parameters:
       - payload: The IPC message payload.
       - fileDescriptor: The client socket file descriptor.
       - client: The client instance.
     */
    private func handleHandshake(payload: IPC.Message.Payload, from fileDescriptor: Int32, client: Client) async {
        self.logger.info("Handling handshake on FD \(fileDescriptor)")

        guard payload.version == 1 else {
            self.logger.error("Invalid or missing version in handshake on FD \(fileDescriptor)")
            await socketClose(fileDescriptor: fileDescriptor, code: IPC.ErrorCode.invalidVersion)
            return
        }

        guard let clientID = payload.clientID, !clientID.isEmpty else {
            self.logger.error("Empty or missing client_id in handshake on FD \(fileDescriptor)")
            await socketClose(fileDescriptor: fileDescriptor, code: IPC.ErrorCode.invalidClientID)
            return
        }

        client.clientID = clientID
        client.isAcknowledged = true
        self.logger.info("Handshake successful for client \(clientID) on FD \(fileDescriptor) 👍🏾")

        let acknowledgmentPayload = IPC.AcknowledgementPayload(version: 1, clientID: clientID)
        await send(packet: acknowledgmentPayload, operationCode: .handshake, to: fileDescriptor)

        let readyPayload = IPC.ReadyPayload(
            command: "DISPATCH",
            event: "READY",
            data: IPC.ReadyPayload.ReadyData(
                version: 1,
                configuration: IPC.ReadyPayload.ReadyConfig(
                    cdnHost: "cdn.discordapp.com",
                    apiEndpoint: "//discord.com/api",
                    environment: "production"
                ),
                user: User(
                    id: "1045800378228281345",
                    username: "arrpc",
                    discriminator: "0",
                    globalName: "arRPC",
                    avatar: "cfefa4d9839fb4bdf030f91c2a13e95c",
                    bot: false,
                    flags: 0
                )
            ),
            nonce: nil
        )
        await send(packet: readyPayload, operationCode: .frame, to: fileDescriptor)
    }

    /**
     Handles the FRAME operation.

     - Parameters:
       - payload: The IPC message payload.
       - fileDescriptor: The client socket file descriptor.
       - client: The client instance.
     */
    private func handleFrame(payload: IPC.Message.Payload, from fileDescriptor: Int32, client: Client) async {
        guard client.isAcknowledged else {
            self.logger.error("Received FRAME before handshake on FD \(fileDescriptor)")
            await socketClose(fileDescriptor: fileDescriptor, code: IPC.ClosureCode.abnormal, message: "Need to handshake first")
            return
        }

        guard let command = payload.command else {
            self.logger.error("Missing 'cmd' in FRAME on FD \(fileDescriptor)")
            return
        }

        self.logger.info("Handling FRAME command: \(command) on FD \(fileDescriptor)")

        switch command {
        case "SET_ACTIVITY":
            await handleSetActivity(payload: payload, from: fileDescriptor, client: client)
        case "INVITE_BROWSER", "GUILD_TEMPLATE_BROWSER":
            await handleInviteBrowser(arguments: payload.arguments, command: command, from: fileDescriptor)
        case "DEEP_LINK":
            await respondSuccess(to: fileDescriptor, with: payload)
        case "CONNECTIONS_CALLBACK":
            await respondError(to: fileDescriptor, command: command, code: "Unhandled", nonce: payload.nonce)
        default:
            self.logger.warning("Unknown command: \(command) on FD \(fileDescriptor)")
            await respondSuccess(to: fileDescriptor, with: payload)
        }
    }

    /**
     Handles the SET_ACTIVITY command.

     - Parameters:
       - payload: The IPC message payload.
       - fileDescriptor: The client socket file descriptor.
       - client: The client instance.
     */
    private func handleSetActivity(payload: IPC.Message.Payload, from fileDescriptor: Int32, client: Client) async {
        guard let arguments = payload.arguments, let activity = arguments.activity else {
            self.logger.warning("Missing arguments for SET_ACTIVITY on FD \(fileDescriptor)")
            await respondError(to: fileDescriptor, command: "SET_ACTIVITY", code: "Missing arguments", nonce: payload.nonce)
            return
        }

            var updatedActivity = activity
            if updatedActivity.applicationID == nil, let clientID = client.clientID {
                updatedActivity.applicationID = clientID
            }

            updatedActivity.flags = updatedActivity.instance == true ? 1 << 0 : 0

            guard let socketID = client.socketID else {
                self.logger.error("No socketID found for FD \(fileDescriptor)")
                await self.respondError(to: fileDescriptor, command: "SET_ACTIVITY", code: "Invalid socketID", nonce: payload.nonce)
                return
            }

            client.processID = arguments.processID
            client.socketID = socketID

            await self.injectActivity(activity: updatedActivity, processID: arguments.processID, socketID: socketID)
            await self.respondSuccess(to: fileDescriptor, with: payload)
    }

    /**
     Handles the INVITE_BROWSER and GUILD_TEMPLATE_BROWSER commands.

     - Parameters:
       - arguments: The command arguments.
       - command: The command string.
       - fileDescriptor: The client socket file descriptor.
     */
    private func handleInviteBrowser(arguments: IPC.Message.Payload.CommandArguments?, command: String, from fileDescriptor: Int32) async {
        guard let arguments = arguments, let code = arguments.code else {
            self.logger.warning("Missing code for command \(command) on FD \(fileDescriptor)")
            await respondError(to: fileDescriptor, command: command, code: "MissingCode", nonce: UUID().uuidString)
            return
        }
        self.logger.info("Command \(command) with code: \(code) on FD \(fileDescriptor)")
        await respondSuccess(to: fileDescriptor, with: IPC.Message.Payload(command: command, nonce: arguments.nonce, version: nil, clientID: nil, arguments: arguments))
    }

    /**
     Handles the PING operation.

     - Parameters:
       - payload: The IPC message payload.
       - fileDescriptor: The client socket file descriptor.
     */
    private func handlePing(payload: IPC.Message.Payload, from fileDescriptor: Int32) async {
        self.logger.info("Handling PING on FD \(fileDescriptor)")
        let pongPayload = IPC.PongPayload(nonce: payload.nonce)
        await send(packet: pongPayload, operationCode: .pong, to: fileDescriptor)
    }

    // MARK: - Packet Handling

    /**
     Sends a Codable JSON packet to Discord over the given file descriptor.

     - Parameters:
       - packet: The payload to send.
       - operationCode: The operation code.
       - fileDescriptor: The socket file descriptor.
     */
    private func send<T: Codable>(packet: T, operationCode: IPC.OperationCode, to fileDescriptor: Int32) async {
        let encoder = JSONEncoder()
        guard let jsonData = try? encoder.encode(packet) else {
            self.logger.error("Failed to serialize payload to JSON")
            return
        }

        var operationCodeLittleEndian = operationCode.rawValue.littleEndian
        var dataSizeLittleEndian = Int32(jsonData.count).littleEndian
        var buffer = Data()
        buffer.append(Data(bytes: &operationCodeLittleEndian, count: 4))
        buffer.append(Data(bytes: &dataSizeLittleEndian, count: 4))
        buffer.append(jsonData)

        await write(to: fileDescriptor, data: buffer)
    }

    /**
     Sends data through the socket.

     - Parameters:
       - fileDescriptor: The socket file descriptor.
       - data: The data to send.
     */
    private func write(to fileDescriptor: Int32, data: Data) async {
        data.withUnsafeBytes { pointer in
            guard let baseAddress = pointer.baseAddress else {
                self.logger.error("Failed to get base address of data")
                return
            }
            let bytesWritten = Darwin.send(fileDescriptor, baseAddress, data.count, 0)
            if bytesWritten < 0 {
                self.logger.error("Failed to write to FD \(fileDescriptor), errno=\(errno)")
            } else {
                self.logger.debug("Wrote \(bytesWritten) bytes to FD \(fileDescriptor)")
            }
        }
    }

    /**
     Responds with a success message to the client.

     - Parameters:
       - fileDescriptor: The client socket file descriptor.
       - payload: The original IPC message payload.
     */
    private func respondSuccess(to fileDescriptor: Int32, with payload: IPC.Message.Payload) async {
        if payload.command == nil {
            self.logger.warning("Command unknown; response body will be empty")
        }

        let response = IPC.SuccessResponse(
            command: payload.command ?? "",
            event: nil,
            data: nil,
            nonce: payload.nonce
        )
        self.logger.info("Responding with success: \(String(describing: response))")
        await send(packet: response, operationCode: .frame, to: fileDescriptor)
    }

    /**
     Responds with an error message to the client.

     - Parameters:
       - fileDescriptor: The client socket file descriptor.
       - command: The command that caused the error.
       - code: The error code.
       - nonce: The nonce associated with the request.
     */
    private func respondError(to fileDescriptor: Int32, command: String, code: String, nonce: String?) async {
        let errorMessage = IPC.ErrorResponse(
            command: command,
            event: "ERROR",
            data: IPC.ErrorResponse.ErrorData(code: 4011, message: "Invalid invite or template id: \(code)"),
            nonce: nonce
        )
        self.logger.warning("Sending error response for cmd \(command) with code \(code) on FD \(fileDescriptor)")
        await send(packet: errorMessage, operationCode: .frame, to: fileDescriptor)
    }

    // MARK: - Activity Injection

    /**
     Injects the received activity data into the Discord web client via JavaScript.

     - Parameters:
       - activity: The activity data.
       - processID: The process ID.
       - socketID: The socket ID.
     */
    private func injectActivity(activity: DiscordRPCBridge.Activity, processID: Int, socketID: Int) async {
        guard let activityJSON = try? JSONEncoder().encode(activity),
              let activityString = String(data: activityJSON, encoding: .utf8),
              let webView = webView else {
            self.logger.error("Failed to serialize activity data or webView is nil")
            return
        }

        let injectionScript = """
        (() => {
            let Dispatcher, lookupApp, lookupAsset, wpRequire;

            // Initialize Webpack and Dispatcher
            if (!Dispatcher) {
                let wpRequire;
                window.webpackChunkdiscord_app.push([[Symbol()], {}, x => wpRequire = x]);
                window.webpackChunkdiscord_app.pop();

                const modules = wpRequire.c;
                // Updated matching to align with current Discord code
                for (const id in modules) {
                    const mod = modules[id].exports;
                    for (const prop in mod) {
                        const candidate = mod[prop];
                        try {
                            if (candidate && candidate.register && candidate.wait) {
                                Dispatcher = candidate;
                                break;
                            }
                        } catch {}
                    }
                    if (Dispatcher) break;
                }
            }

            if (!lookupApp || !lookupAsset) {
                const factories = wpRequire.m;
                for (const id in factories) {
                    const codeStr = factories[id].toString();
                    if (codeStr.includes('APPLICATION_RPC(') || codeStr.includes('APPLICATION_ASSETS_FETCH_SUCCESS')) {
                        const mod = wpRequire(id);
                        
                        // Detect and assign lookupApp
                        const _lookupApp = Object.values(mod).find(e => {
                            if (typeof e !== 'function') return;
                            const str = e.toString();
                            return str.includes(',coverImage:') && str.includes('INVALID_ORIGIN');
                        });
                        if (_lookupApp) {
                            lookupApp = async appId => {
                                let socket = {};
                                await _lookupApp(socket, appId);
                                return socket.application;
                            };
                        }

                        // Detect and assign lookupAsset
                        const _lookupAsset = Object.values(mod).find(e => typeof e === 'function' && e.toString().includes('APPLICATION_ASSETS_FETCH_SUCCESS'));
                        if (_lookupAsset) {
                            lookupAsset = async (appId, name) => {
                                const result = await _lookupAsset(appId, [ name, undefined ]);
                                return result[0];
                            };
                        }
                    }
                    if (lookupApp && lookupAsset) break;
                }
            }

            // Function to fetch application name
            const fetchAppName = async appId => {
                if (!lookupApp) {
                    console.error("lookupApp function not found");
                    return "Unknown Application";
                }
                try {
                    const app = await lookupApp(appId);
                    return app?.name || "Unknown Application";
                } catch (error) {
                    console.error("Error fetching application name:", error);
                    return "Unknown Application";
                }
            };

            // Function to fetch asset image URL
            const fetchAssetImage = async (appId, imageName) => {
                if (!lookupAsset) {
                    console.error("lookupAsset function not found");
                    return imageName;
                }
                try {
                    const assetUrl = await lookupAsset(appId, imageName);
                    return assetUrl || imageName;
                } catch (error) {
                    console.error("Error fetching asset image:", error);
                    return imageName;
                }
            };

            // Main function to process and dispatch activity
            const processAndDispatchActivity = async () => {
                if (!Dispatcher) {
                    console.error("Dispatcher not found");
                    return;
                }

                const activity = \(activityString);

                // Fetch application name
                if (activity.application_id) {
                    activity.name = await fetchAppName(activity.application_id);
                }

                // Fetch asset images
                if (activity.assets?.large_image) {
                    activity.assets.large_image = await fetchAssetImage(activity.application_id, activity.assets.large_image);
                }
                if (activity.assets?.small_image) {
                    activity.assets.small_image = await fetchAssetImage(activity.application_id, activity.assets.small_image);
                }
        
                // Dispatch the updated activity
                try {
                    Dispatcher.dispatch({
                        type: 'LOCAL_ACTIVITY_UPDATE',
                        activity: activity,
                        pid: \(processID),
                        socketId: "\(socketID)"
                    });
                    console.debug("Activity dispatched successfully:", activity);
                } catch (e) {
                    console.error("Dispatch error:", e);
                }
            };

            // Execute the main function
            processAndDispatchActivity();
        })();
        """

        DispatchQueue.main.async {
            webView.evaluateJavaScript(injectionScript) { _, error in
                if let error = error {
                    // deal with it, i can't fix these warnings because of a swift bug
                    self.logger.error("Error injecting activity: \(error.localizedDescription)")
                } else {
                    self.logger.debug("Activity injected successfully.")
                }
            }
        }
    }

    /**
     Injects JavaScript to clear the activity in the Discord web client.

     - Parameters:
       - processID: The process ID.
       - socketID: The socket ID.
     */
    private func clearActivity(processID: Int, socketID: Int) async {
        guard let webView = webView else { return }

        let clearScript = """
        (() => {
            let Dispatcher;

            if (!Dispatcher) {
                let webpackRequire;
                window.webpackChunkdiscord_app.push([[Symbol()], {}, x => webpackRequire = x]);
                window.webpackChunkdiscord_app.pop();

                const modules = webpackRequire.c;

                for (const moduleId in modules) {
                    const module = modules[moduleId].exports;

                    for (const property in module) {
                        const candidate = module[property];
                        try {
                            if (candidate && candidate.register && candidate.wait) {
                                Dispatcher = candidate;
                                break;
                            }
                        } catch {}
                    }

                    if (Dispatcher) break;
                }
            }

            if (Dispatcher) {
                try {
                    Dispatcher.dispatch({ 
                        type: 'LOCAL_ACTIVITY_UPDATE',
                        activity: null,
                        pid: \(processID),
                        socketId: "\(socketID)"
                    });
                    console.info("Activity cleared successfully");
                } catch (error) {
                    console.error("Error clearing activity:", error);
                }
            } else {
                console.error("Dispatcher not found");
            }
        })();
        """

        DispatchQueue.main.async {
            webView.evaluateJavaScript(clearScript) { _, error in
                if let error = error {
                    // deal with it, i can't fix these warnings because of a swift bug
                    self.logger.error("Error clearing activity: \(error.localizedDescription)")
                } else {
                    self.logger.debug("Activity cleared successfully")
                }
            }
        }
    }
}

// MARK: - Structures

extension DiscordRPCBridge {
    /// Namespace for IPC related structures and enums.
    struct IPC {
        /// Protocol defining IPC errors with raw values and descriptions.
        protocol ResponseCode {
            var rawValue: Int { get }
            var description: String { get }
        }

        /// Represents an IPC message with operation code and payload.
        struct Message: Codable {
            let operationCode: OperationCode
            let payload: Payload

            /// Structure representing the payload of an IPC message.
            /// https://discord.com/developers/docs/topics/rpc#payloads-payload-structure
            struct Payload: Codable {
                let command: String?
                let nonce: String?
                let version: Int?
                let clientID: String?
                let arguments: CommandArguments?

                enum CodingKeys: String, CodingKey {
                    case command = "cmd"
                    case nonce
                    case version = "v"
                    case clientID = "client_id"
                    case arguments = "args"
                }

                init(command: String?, nonce: String?, version: Int?, clientID: String?, arguments: CommandArguments?) {
                    self.command = command
                    self.nonce = nonce
                    self.version = version
                    self.clientID = clientID
                    self.arguments = arguments
                }

                init(from decoder: Decoder) throws {
                    let container = try decoder.container(keyedBy: CodingKeys.self)
                    self.command = try container.decodeIfPresent(String.self, forKey: .command)
                    self.nonce = try container.decodeIfPresent(String.self, forKey: .nonce)

                    if let intValue = try? container.decode(Int.self, forKey: .version) {
                        self.version = intValue
                    } else if let stringValue = try? container.decode(String.self, forKey: .version),
                              let intValue = Int(stringValue) {
                        self.version = intValue
                    } else {
                        self.version = nil
                    }

                    self.clientID = try container.decodeIfPresent(String.self, forKey: .clientID)
                    self.arguments = try container.decodeIfPresent(CommandArguments.self, forKey: .arguments)
                }

                /// Structure representing command arguments within the payload.
                /// https://discord.com/developers/docs/topics/rpc#setactivity-set-activity-argument-structure
                struct CommandArguments: Codable {
                    let processID: Int
                    let activity: Activity?

                    // + because too lazy to make new struct or sideload
                    let code: String?
                    let nonce: String?

                    enum CodingKeys: String, CodingKey {
                        case processID = "pid"
                        case activity
                        case code
                        case nonce
                    }
                }
            }
        }

        /// Structure representing an acknowledgment payload.
        struct AcknowledgementPayload: Codable {
            let version: Int
            let clientID: String

            enum CodingKeys: String, CodingKey {
                case version = "v"
                case clientID = "client_id"
            }
        }

        /// Structure representing a ready payload.
        struct ReadyPayload: Codable {
            let command: String
            let event: String
            let data: ReadyData
            let nonce: String?

            enum CodingKeys: String, CodingKey {
                case command = "cmd"
                case event = "evt"
                case data
                case nonce
            }

            struct ReadyData: Codable {
                let version: Int
                let configuration: ReadyConfig
                let user: User

                enum CodingKeys: String, CodingKey {
                    case version = "v"
                    case configuration = "config"
                    case user
                }
            }

            struct ReadyConfig: Codable {
                let cdnHost: String
                let apiEndpoint: String
                let environment: String

                enum CodingKeys: String, CodingKey {
                    case cdnHost = "cdn_host"
                    case apiEndpoint = "api_endpoint"
                    case environment
                }
            }
        }

        /// Structure representing a pong payload.
        struct PongPayload: Codable {
            let nonce: String?
        }

        protocol Response: Codable {
            var command: String { get }
        }

        /// Structure representing a successful response.
        struct SuccessResponse: Codable, Response {
            let command: String
            let event: String?
            let data: String?
            let nonce: String?

            enum CodingKeys: String, CodingKey {
                case command = "cmd"
                case event = "evt"
                case data
                case nonce
            }
        }

        /// Structure representing an error response.
        struct ErrorResponse: Codable, Response {
            let command: String
            let event: String
            let data: ErrorData
            let nonce: String?

            enum CodingKeys: String, CodingKey {
                case command = "cmd"
                case event = "evt"
                case data
                case nonce
            }

            struct ErrorData: Codable {
                let code: Int
                let message: String
            }
        }

        /// Structure representing a close payload.
        struct ClosePayload: Codable {
            let code: Int
            let message: String
        }

        /// Enum representing operation codes for IPC.
        /// https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes ?? arRPC had it tho
        enum OperationCode: Int32, Codable {
            case handshake = 0
            case frame = 1
            case close = 2
            case ping = 3
            case pong = 4

            var description: String {
                switch self {
                case .handshake:
                    return "Handshake"
                case .frame:
                    return "Frame"
                case .close:
                    return "Close"
                case .ping:
                    return "Ping"
                case .pong:
                    return "Pong"
                }
            }
        }

        /// Enum representing closure codes for IPC.
        enum ClosureCode: Int, ResponseCode {
            case normal = 1000
            case unsupported = 1003
            case abnormal = 1006

            var description: String {
                switch self {
                case .normal:
                    return "Normal"
                case .unsupported:
                    return "Unsupported"
                case .abnormal:
                    return "Abnormal"
                }
            }
        }

        /// Enum representing error codes for IPC.
        /// https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-close-event-codes
        enum ErrorCode: Int, ResponseCode {
            case invalidClientID = 4000
            case invalidOrigin = 4001
            case ratelimited = 4002
            case tokenRevoked = 4003
            case invalidVersion = 4004
            case invalidEncoding = 4005

            var description: String {
                switch self {
                case .invalidClientID:
                    return "Invalid Client ID"
                case .invalidOrigin:
                    return "Invalid Origin"
                case .ratelimited:
                    return "Rate Limited"
                case .tokenRevoked:
                    return "Token Revoked"
                case .invalidVersion:
                    return "Invalid Version"
                case .invalidEncoding:
                    return "Invalid Encoding"
                }
            }
        }
    }

    /// Structure representing a user.
    /// https://discord.com/developers/docs/resources/user#user-object
    struct User: Codable, Identifiable {
        let id: String
        let username: String
        let discriminator: String
        let globalName: String
        let avatar: String
        let bot: Bool
        let flags: Int

        enum CodingKeys: String, CodingKey {
            case id
            case username
            case discriminator
            case globalName = "global_name"
            case avatar
            case bot
            case flags
        }
    }

    /// Structure representing an activity.
    /// https://discord.com/developers/docs/events/gateway-events#activity-object
    struct Activity: Codable {
        var name: String
        let type: Int
        let url: String?
        var createdAt: Int
        var timestamps: Timestamps?
        var applicationID: String?
        var details: String?
        var state: String?
        var emoji: Emoji?
        var party: Party?
        var assets: Assets?
        var buttons: [Button]?
        var secrets: Secrets?
        var instance: Bool?
        var flags: Int?

        enum CodingKeys: String, CodingKey {
            case name
            case type
            case url
            case createdAt = "created_at"
            case timestamps
            case applicationID = "application_id"
            case details
            case state
            case emoji
            case party
            case assets
            case buttons
            case secrets
            case instance
            case flags
        }

        /// Custom initializer to handle missing keys gracefully.
        init(from decoder: Decoder) throws {
            let container = try decoder.container(keyedBy: CodingKeys.self)

            // Non-optionals
            self.name = try container.decodeIfPresent(String.self, forKey: .name) ?? "Unknown Activity"
            self.type = try container.decodeIfPresent(Int.self, forKey: .type) ?? 0
            self.createdAt = try container.decodeIfPresent(Int.self, forKey: .createdAt) ?? Int((Date().timeIntervalSince1970 * 1000).rounded())

            // Optionals
            self.url = try container.decodeIfPresent(String.self, forKey: .url)
            self.timestamps = try container.decodeIfPresent(Timestamps.self, forKey: .timestamps)
            self.applicationID = try container.decodeIfPresent(String.self, forKey: .applicationID)
            self.details = try container.decodeIfPresent(String.self, forKey: .details)
            self.state = try container.decodeIfPresent(String.self, forKey: .state)
            self.emoji = try container.decodeIfPresent(Emoji.self, forKey: .emoji)
            self.party = try container.decodeIfPresent(Party.self, forKey: .party)
            self.assets = try container.decodeIfPresent(Assets.self, forKey: .assets)
            self.buttons = try container.decodeIfPresent([Button].self, forKey: .buttons)
            self.secrets = try container.decodeIfPresent(Secrets.self, forKey: .secrets)
            self.instance = try container.decodeIfPresent(Bool.self, forKey: .instance)
            self.flags = try container.decodeIfPresent(Int.self, forKey: .flags)
        }

        // Nested Structures

        /// Structure representing timestamps within an activity.
        struct Timestamps: Codable {
            var start: Int?
            var end: Int?

            enum CodingKeys: String, CodingKey {
                case start
                case end
            }

            init(from decoder: Decoder) throws {
                let container = try decoder.container(keyedBy: CodingKeys.self)

                func convertToMillisecondsIfNecessary(_ value: Int?) -> Int? {
                    guard let value else { return nil }
                    let unixTimeInMilliseconds = Int(Date().timeIntervalSince1970 * 1000)

                    // assume seconds if it's more than 100x smaller
                    return value * 100 < unixTimeInMilliseconds ? value * 1000 : value
                }

                self.start = convertToMillisecondsIfNecessary(try container.decodeIfPresent(Int.self, forKey: .start))
                self.end = convertToMillisecondsIfNecessary(try container.decodeIfPresent(Int.self, forKey: .end))
            }
        }

        /// Structure representing an emoji within an activity.
        struct Emoji: Codable {
            let name: String?
            let id: String?
            let animated: Bool?
        }

        /// Structure representing a party within an activity.
        struct Party: Codable {
            let id: String?
            let size: [Int]?
        }

        /// Structure representing assets within an activity.
        struct Assets: Codable {
            let largeImage: String?
            let largeText: String?
            let smallImage: String?
            let smallText: String?

            enum CodingKeys: String, CodingKey {
                case largeImage = "large_image"
                case largeText = "large_text"
                case smallImage = "small_image"
                case smallText = "small_text"
            }
        }

        /// Structure representing a button within an activity.
        struct Button: Codable {
            let label: String
            let url: String
        }

        /// Structure representing secrets within an activity.
        struct Secrets: Codable {
            let join: String?
            let spectate: String?
            let match: String?
        }
    }

    /// Structure handling Unix Domain Socket operations.
    struct UnixDomainSocket {
        private static let logger = Logger(
            subsystem: Bundle.main.bundleIdentifier ?? "lol.peril.Voxa",
            category: "unixDomainSocket"
        )

        /**
         Creates a Unix Domain Socket at the specified path.

         - Parameter path: The socket file path.
         - Returns: The file descriptor of the created socket, or a negative value on failure.
         */
        static func create(atPath path: String) -> Int32 {
            let fileDescriptor = socket(AF_UNIX, SOCK_STREAM, 0)
            if fileDescriptor < 0 {
                self.logger.error("Failed to create socket at \(path)")
            } else {
                self.logger.debug("Created socket with FD \(fileDescriptor) at \(path)")
                // Prevent SIGPIPE from terminating the process
                var set: Int32 = 1
                if setsockopt(fileDescriptor, SOL_SOCKET, SO_NOSIGPIPE, &set, socklen_t(MemoryLayout<Int32>.size)) == -1 {
                    self.logger.error("Failed to set SO_NOSIGPIPE on socket \(fileDescriptor)")
                } else {
                    self.logger.debug("SO_NOSIGPIPE set on socket \(fileDescriptor)")
                }
            }
            return fileDescriptor
        }

        /**
         Connects to a Unix Domain Socket at the specified path.

         - Parameters:
           - fileDescriptor: The socket file descriptor.
           - path: The socket file path.
         - Returns: `true` if the connection is successful, otherwise `false`.
         */
        static func connect(fileDescriptor: Int32, toPath path: String) -> Bool {
            var address = sockaddr_un()
            address.sun_family = sa_family_t(AF_UNIX)
            strncpy(&address.sun_path.0, path, MemoryLayout.size(ofValue: address.sun_path) - 1)
            let addressLength = socklen_t(MemoryLayout<sockaddr_un>.size)

            if Darwin.connect(fileDescriptor, withUnsafePointer(to: &address) {
                $0.withMemoryRebound(to: sockaddr.self, capacity: 1) { $0 }
            }, addressLength) < 0 {
                self.logger.warning("Socket at \(path) is unavailable; socket must be held or unused.")
                return false
            }

            self.logger.debug("Successfully connected to socket at \(path)")
            close(fileDescriptor)
            return true
        }

        /**
         Binds the socket to the specified path.

         - Parameters:
           - fileDescriptor: The socket file descriptor.
           - path: The socket file path.
         - Returns: `true` if binding is successful, otherwise `false`.
         */
        static func bind(fileDescriptor: Int32, toPath path: String) -> Bool {
            var address = sockaddr_un()
            address.sun_family = sa_family_t(AF_UNIX)
            strncpy(&address.sun_path.0, path, MemoryLayout.size(ofValue: address.sun_path) - 1)
            let addressLength = socklen_t(MemoryLayout<sockaddr_un>.size)

            if Darwin.bind(fileDescriptor, withUnsafePointer(to: &address) {
                $0.withMemoryRebound(to: sockaddr.self, capacity: 1) { $0 }
            }, addressLength) < 0 {
                self.logger.error("Failed to bind socket to \(path)")
                return false
            }
            self.logger.debug("Successfully bound socket to \(path)")
            return true
        }

        /**
         Listens for incoming connections on the socket.

         - Parameter fileDescriptor: The socket file descriptor.
         */
        static func listen(on fileDescriptor: Int32) {
            if Darwin.listen(fileDescriptor, 128) < 0 {
                self.logger.error("Failed to listen on FD \(fileDescriptor), errno=\(errno)")
            } else {
                self.logger.debug("Listening on FD \(fileDescriptor)")
            }
        }

        /**
         Accepts a new connection on the given socket file descriptor.

         - Parameter fileDescriptor: The socket file descriptor.
         - Returns: The file descriptor of the accepted connection, or a negative value on failure.
         */
        static func acceptConnection(on fileDescriptor: Int32) -> Int32 {
            let clientFileDescriptor = accept(fileDescriptor, nil, nil)
            if clientFileDescriptor < 0 {
                self.logger.error("Failed to accept connection on FD \(fileDescriptor), errno=\(errno)")
            } else {
                self.logger.debug("Accepted new connection with FD \(clientFileDescriptor) on socket FD \(fileDescriptor)")
            }
            return clientFileDescriptor
        }
    }
}
