//
//  DiscordRPCBridge.swift
//  Discord
//
//  Created by vapidinfinity (esi) on 28/1/2025. 😮‍💨
//
// huge thanks to @vapidinfinity for the implementation

import Foundation
import WebKit
import OSLog
import SwiftUI

/**
 A Swift class emulating arRPC stage 1 (node IPC) directly in Swift.
 It sets up a Unix Domain Socket server to listen for Discord IPC connections.
 */
class DiscordRPCBridge: NSObject {
    private let logger = Logger(
        subsystem: Bundle.main.bundleIdentifier ?? "lol.peril.Voxa",
        category: "discordRPCBridge"
    )

    private weak var webView: WKWebView?
    private var serverSockets: [Int32] = []
    private var clientHandshakes: [Int32: Bool] = [:]
    private var clientIds: [Int32: String] = [:]
    private var activitySocketCounter: Int = 0
    private var clientActivity: [Int32: (pid: Int, socketId: Int)] = [:]

    // MARK: - Initialization

    /// Initializes the DiscordRPCBridge with the base path for Unix Domain Sockets.
    override init() {
        super.init()
    }

    // MARK: - Public Methods

    /**
     Starts the IPC server and sets up the bridge for the given WKWebView.

     - Parameter webView: The WKWebView instance to bridge with.
     */
    func startBridge(for webView: WKWebView) {
        self.webView = webView
        self.logger.info("Starting DiscordRPCBridge")
        setupIPCServer()
    }

    // MARK: - IPC Server Setup

    /// Sets up the IPC server by creating and binding Unix Domain Sockets.
    private func setupIPCServer() {
        DispatchQueue.global(qos: .background).async {
            self.logger.info("Setting up IPC servers")
            guard let temporaryDirectory = ProcessInfo.processInfo.environment["TMPDIR"] else {
                self.logger.fault("TMPDIR environment variable not set! Voxa has no idea where the unix domain sockets should go😂😂😂 no rpc")
                return
            }

            for socketIndex in 0..<10 {
                let socketPath = "\(temporaryDirectory)discord-ipc-\(socketIndex)"
                self.logger.debug("Checking socket path: \(socketPath)")

                if self.isSocketInUse(at: socketPath) {
                    continue
                }

                guard self.prepareSocket(at: socketPath) else { continue }

                let fileDescriptor = UnixDomainSocket.create(at: socketPath)
                guard fileDescriptor >= 0 else { continue }

                if UnixDomainSocket.bind(fileDescriptor: fileDescriptor, to: socketPath) {
                    UnixDomainSocket.listen(on: fileDescriptor)
                    self.serverSockets.append(fileDescriptor)
                    self.acceptConnections(on: fileDescriptor)
                    self.logger.info("IPC server listening on \(socketPath)")
                } else {
                    close(fileDescriptor)
                }
            }

            if self.serverSockets.isEmpty {
                self.logger.error("Failed to bind to any IPC sockets from discord-ipc-0 to discord-ipc-9")
            }
        }
    }

    /**
     Checks if the socket at the given path is already in use.

     - Parameter path: The socket file path.
     - Returns: `true` if the socket is in use, otherwise `false`.
     */
    private func isSocketInUse(at path: String) -> Bool {
        guard FileManager.default.fileExists(atPath: path) else { return false }
        let testSocketFileDescriptor = UnixDomainSocket.create(at: path)
        defer { close(testSocketFileDescriptor) }

        if testSocketFileDescriptor < 0 {
            return true
        }

        let inUse = UnixDomainSocket.connect(fileDescriptor: testSocketFileDescriptor, to: path)
        if inUse {
            self.logger.info("Socket \(path) is already in use")
        } else {
            self.logger.info("Socket \(path) is available")
        }
        return inUse
    }

    /**
     Prepares the socket by removing the existing file if necessary.

     - Parameter path: The socket file path.
     - Returns: `true` if preparation is successful, otherwise `false`.
     */
    private func prepareSocket(at path: String) -> Bool {
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
     Accepts incoming connections on the given socket file descriptor.

     - Parameter fileDescriptor: The socket file descriptor.
     */
    private func acceptConnections(on fileDescriptor: Int32) {
        DispatchQueue.global(qos: .background).async {
            self.logger.info("Started accepting connections on FD \(fileDescriptor)")
            while true {
                let clientFileDescriptor = UnixDomainSocket.acceptConnection(on: fileDescriptor)
                guard clientFileDescriptor >= 0 else { continue }
                self.serverSockets.append(clientFileDescriptor)
                self.logger.info("Accepted connection on FD \(clientFileDescriptor)")
                self.handleClient(clientFileDescriptor)
            }
        }
    }

    // MARK: - Client Handling

    /**
     Handles communication with the connected Discord client.

     - Parameter fileDescriptor: The client socket file descriptor.
     */
    private func handleClient(_ fileDescriptor: Int32) {
        self.logger.debug("Handling client on FD \(fileDescriptor)")
        readLoop(fileDescriptor: fileDescriptor)
    }

    /**
     Continuously reads and processes IPC messages from Discord.

     - Parameter fileDescriptor: The client socket file descriptor.
     */
    private func readLoop(fileDescriptor: Int32) {
        self.logger.debug("Starting read loop on FD \(fileDescriptor)")
        let bufferSize = 65536

        while true {
            guard let message = readMessage(from: fileDescriptor, bufferSize: bufferSize) else {
                socketClose(fileDescriptor: fileDescriptor, code: IPC.ErrorCode.ratelimited, message: "Failed to read message")
                return
            }
            handleIPCMessage(message, from: fileDescriptor)
        }
    }

    /**
     Reads a complete IPC message from the socket.

     - Parameters:
     - fileDescriptor: The socket file descriptor.
     - bufferSize: The maximum buffer size.
     - Returns: An `IPC.Message` if successfully read, otherwise `nil`.
     */
    private func readMessage(from fileDescriptor: Int32, bufferSize: Int) -> IPC.Message? {
        guard let data = readExactData(from: fileDescriptor, count: 8) else { return nil }
        let header = data

        guard let operationCode = IPC.OperationCode(rawValue: Int32(littleEndian: header.withUnsafeBytes { $0.load(as: Int32.self) })) else {
            self.logger.error("Invalid operation code received: \(header.map { String(format: "%02hhx", $0) }.joined())")
            return nil
        }

        let length = Int32(littleEndian: header.withUnsafeBytes { $0.load(fromByteOffset: 4, as: Int32.self) })

        self.logger.debug("Received packet - op: \(operationCode.rawValue), length: \(length) on FD \(fileDescriptor)")

        guard length > 0, length <= bufferSize else {
            self.logger.error("Invalid packet length: \(length) on FD \(fileDescriptor)")
            return nil
        }

        guard let payloadData = readExactData(from: fileDescriptor, count: Int(length)) else { return nil }

        self.logger.debug("Payload Data Length: \(payloadData.count) bytes")

        // Optional: Log payload as string for debugging
        if let payloadString = String(data: payloadData, encoding: .utf8) {
            self.logger.debug("Payload Data: \(payloadString)")
        } else {
            self.logger.debug("Payload Data: Unable to convert to string")
        }

        let decoder = JSONDecoder()
        let payload: IPC.MessagePayload

        do {
            payload = try decoder.decode(IPC.MessagePayload.self, from: payloadData)
        } catch let DecodingError.dataCorrupted(context) {
            self.logger.error("Decoding Error: Data corrupted - \(context.debugDescription) at \(context.codingPath)")
            return nil
        } catch let DecodingError.keyNotFound(key, context) {
            self.logger.error("Decoding Error: Key '\(key.stringValue)' not found - \(context.debugDescription) at \(context.codingPath)")
            return nil
        } catch let DecodingError.typeMismatch(type, context) {
            self.logger.error("Decoding Error: Type '\(type)' mismatch - \(context.debugDescription) at \(context.codingPath)")
            return nil
        } catch let DecodingError.valueNotFound(value, context) {
            self.logger.error("Decoding Error: Value '\(value)' not found - \(context.debugDescription) at \(context.codingPath)")
            return nil
        } catch {
            self.logger.error("Failed to decode IPC message on FD \(fileDescriptor): \(error.localizedDescription)")
            return nil
        }

        return IPC.Message(operationCode: operationCode, payload: payload)
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
    private func handleIPCMessage(_ message: IPC.Message, from fileDescriptor: Int32) {
        switch message.operationCode {
        case .handshake:
            handleHandshake(with: message.payload, from: fileDescriptor)
        case .frame:
            handleFrame(with: message.payload, from: fileDescriptor)
        case .close:
            socketClose(fileDescriptor: fileDescriptor, code: IPC.ClosureCode.normal)
        case .ping:
            handlePing(with: message.payload, from: fileDescriptor)
        case .pong:
            fallthrough
        default:
            self.logger.warning("Unhandled operation code: \(message.operationCode.rawValue) on FD \(fileDescriptor)")
        }
    }

    /**
     Handles the HANDSHAKE operation.

     - Parameters:
     - payload: The IPC message payload.
     - fileDescriptor: The client socket file descriptor.
     */
    private func handleHandshake(with payload: IPC.MessagePayload, from fileDescriptor: Int32) {
        self.logger.info("Handling HANDSHAKE on FD \(fileDescriptor)")

        guard payload.v == 1 else {
            self.logger.error("Invalid or missing version in handshake on FD \(fileDescriptor)")
            socketClose(fileDescriptor: fileDescriptor, code: IPC.ErrorCode.invalidVersion)
            return
        }

        guard let clientId = payload.client_id, !clientId.isEmpty else {
            self.logger.error("Empty or missing client_id in handshake on FD \(fileDescriptor)")
            socketClose(fileDescriptor: fileDescriptor, code: IPC.ErrorCode.invalidClientID)
            return
        }

        clientIds[fileDescriptor] = clientId
        clientHandshakes[fileDescriptor] = true
        self.logger.info("Handshake successful for client \(clientId) on FD \(fileDescriptor)")

        let acknowledgmentPayload = IPC.AckPayload(v: 1, client_id: clientId)
        send(packet: acknowledgmentPayload, op: .handshake, to: fileDescriptor)

        let readyPayload = IPC.ReadyPayload(
            cmd: "DISPATCH",
            data: IPC.ReadyPayload.ReadyData(
                v: 1,
                config: IPC.ReadyPayload.ReadyConfig(
                    cdn_host: "cdn.discordapp.com",
                    api_endpoint: "//discord.com/api",
                    environment: "production"
                ),
                user: IPC.ReadyPayload.User(
                    id: "1045800378228281345",
                    username: "arrpc",
                    discriminator: "0",
                    global_name: "arRPC",
                    avatar: "cfefa4d9839fb4bdf030f91c2a13e95c",
                    bot: false,
                    flags: 0
                )
            ),
            evt: "READY",
            nonce: nil
        )
        send(packet: readyPayload, op: .frame, to: fileDescriptor)
    }

    /**
     Handles the FRAME operation.

     - Parameters:
     - payload: The IPC message payload.
     - fileDescriptor: The client socket file descriptor.
     */
    private func handleFrame(with payload: IPC.MessagePayload, from fileDescriptor: Int32) {
        guard clientHandshakes[fileDescriptor] == true else {
            self.logger.error("Received FRAME before handshake on FD \(fileDescriptor)")
            socketClose(fileDescriptor: fileDescriptor, code: IPC.ClosureCode.abnormal, message: "Need to handshake first")
            return
        }

        guard let command = payload.cmd else {
            self.logger.error("Missing 'cmd' in FRAME on FD \(fileDescriptor)")
            return
        }

        self.logger.info("Handling FRAME command: \(command) on FD \(fileDescriptor)")

        switch command {
        case "SET_ACTIVITY":
            handleSetActivity(with: payload, from: fileDescriptor)
        case "INVITE_BROWSER", "GUILD_TEMPLATE_BROWSER":
            handleInviteBrowser(with: payload.args, cmd: command, from: fileDescriptor)
        case "DEEP_LINK":
            respondSuccess(to: fileDescriptor, with: payload)
        case "CONNECTIONS_CALLBACK":
            respondError(to: fileDescriptor, cmd: command, code: "Unhandled", nonce: payload.nonce)
        default:
            self.logger.warning("Unknown command: \(command) on FD \(fileDescriptor)")
            respondSuccess(to: fileDescriptor, with: payload)
        }
    }

    /**
     Handles the SET_ACTIVITY command.

     - Parameters:
     - payload: The IPC message payload.
     - fileDescriptor: The client socket file descriptor.
     */
    private func handleSetActivity(with payload: IPC.MessagePayload, from fileDescriptor: Int32) {
        guard let arguments = payload.args, var activity = arguments.activity else {
            self.logger.warning("Invalid SET_ACTIVITY arguments or missing pid on FD \(fileDescriptor)")
            respondError(to: fileDescriptor, cmd: "SET_ACTIVITY", code: "Invalid arguments or missing pid", nonce: payload.nonce)
            return
        }

        // 1. Copy application_id from handshake or use existing
        if activity.applicationId == nil, let clientID = clientIds[fileDescriptor] {
            activity.applicationId = clientID
        }

        // 2. Set the name based on application_id if it's still "Unknown Activity"
        // Handled by asset fetching integration

        // 3. Handle instance => flags
        let isInstance = activity.instance ?? false
        activity.flags = isInstance ? (1 << 0) : 0

        // 4. Increment local counters and inject
        activitySocketCounter += 1
        let socketId = activitySocketCounter
        clientActivity[fileDescriptor] = (arguments.pid, socketId)

        injectActivity(activity: activity, pid: arguments.pid, socketId: socketId)
        respondSuccess(to: fileDescriptor, with: payload)
    }

    /**
     Handles the INVITE_BROWSER and GUILD_TEMPLATE_BROWSER commands.

     - Parameters:
     - args: The command arguments.
     - cmd: The command string.
     - fileDescriptor: The client socket file descriptor.
     */
    private func handleInviteBrowser(with args: IPC.MessagePayload.CommandArgs?, cmd: String, from fileDescriptor: Int32) {
        guard let arguments = args, let code = arguments.code else {
            self.logger.warning("Missing code for command \(cmd) on FD \(fileDescriptor)")
            respondError(to: fileDescriptor, cmd: cmd, code: "MissingCode", nonce: UUID().uuidString /* cannot use the same nonce! */)
            return
        }
        self.logger.info("Command \(cmd) with code: \(code) on FD \(fileDescriptor)")
        respondSuccess(to: fileDescriptor, with: IPC.MessagePayload(cmd: cmd, nonce: arguments.nonce, v: nil, client_id: nil, args: arguments))
    }

    /**
     Handles the PING operation.

     - Parameters:
     - payload: The IPC message payload.
     - fileDescriptor: The client socket file descriptor.
     */
    private func handlePing(with payload: IPC.MessagePayload, from fileDescriptor: Int32) {
        self.logger.info("Handling PING on FD \(fileDescriptor)")
        let pongPayload = IPC.PongPayload(nonce: payload.nonce)
        send(packet: pongPayload, op: .pong, to: fileDescriptor)
    }

    // MARK: - Packet Handling

    /**
     Sends a Codable JSON packet to Discord over the given file descriptor.

     - Parameters:
     - packet: The payload to send.
     - operationCode: The operation code.
     - fileDescriptor: The socket file descriptor.
     */
    private func send<T: Codable>(packet: T, op operationCode: IPC.OperationCode, to fileDescriptor: Int32) {
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

        write(to: fileDescriptor, data: buffer)
    }

    /**
     Sends data through the socket.

     - Parameters:
     - fileDescriptor: The socket file descriptor.
     - data: The data to send.
     */
    private func write(to fileDescriptor: Int32, data: Data) {
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
    private func respondSuccess(to fileDescriptor: Int32, with payload: IPC.MessagePayload) {
        let response = IPC.SuccessResponse(
            evt: nil,
            data: nil,
            cmd: payload.cmd,
            nonce: payload.nonce
        )
        self.logger.info("Responding with success: \(String(describing: response))")
        send(packet: response, op: .frame, to: fileDescriptor)
    }

    /**
     Responds with an error message to the client.

     - Parameters:
     - fileDescriptor: The client socket file descriptor.
     - cmd: The command that caused the error.
     - code: The error code.
     - nonce: The nonce associated with the request.
     */
    private func respondError(to fileDescriptor: Int32, cmd: String, code: String, nonce: String?) {
        let errorMessage = IPC.ErrorResponse(
            cmd: cmd,
            evt: "ERROR",
            data: IPC.ErrorResponse.ErrorData(code: 4011, message: "Invalid invite or template id: \(code)"),
            nonce: nonce
        )
        self.logger.warning("Sending error response for cmd \(cmd) with code \(code) on FD \(fileDescriptor)")
        send(packet: errorMessage, op: .frame, to: fileDescriptor)
    }

    // MARK: - Activity Injection

    /**
     Injects the received activity data into the Discord web client via JavaScript.

     - Parameters:
     - activity: The activity data.
     - pid: The process ID.
     - socketId: The socket ID.
     */
    private func injectActivity(activity: DiscordRPCBridge.Activity, pid: Int, socketId: Int) {
        guard let activityJSON = try? JSONEncoder().encode(activity),
              let activityString = String(data: activityJSON, encoding: .utf8),
              let webView = webView else {
            self.logger.error("Failed to serialize activity data or webView is nil")
            return
        }

        self.logger.debug("Injecting activity into Webview: \(activityString)")

        let injectionScript = """
                (() => {
                    let Dispatcher, lookupApp, lookupAsset;
        
                    // Initialize Webpack and Dispatcher
                    if (!Dispatcher) {
                        let wpRequire;
                        window.webpackChunkdiscord_app.push([[Symbol()], {}, x => wpRequire = x]);
                        window.webpackChunkdiscord_app.pop();
        
                        const modules = wpRequire.c;
        
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
        
                    // Initialize lookupApp and lookupAsset
                    if (!lookupApp || !lookupAsset) {
                        const factories = wpRequire.m;
        
                        for (const id in factories) {
                            if (factories[id].toString().includes('APPLICATION_RPC(')) {
                                const mod = wpRequire(id);
        
                                // fetchApplicationsRPC
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
                            }
        
                            if (lookupApp) break;
                        }
        
                        for (const id in factories) {
                            if (factories[id].toString().includes('getAssetImage: size must === [number, number] for Twitch')) {
                                const mod = wpRequire(id);
        
                                // fetchAssetIds
                                const _lookupAsset = Object.values(mod).find(e => typeof e === 'function' && e.toString().includes('APPLICATION_ASSETS_FETCH_SUCCESS'));
                                if (_lookupAsset) {
                                    lookupAsset = async (appId, name) => {
                                        const result = await _lookupAsset(appId, [ name, undefined ]);
                                        return result[0];
                                    };
                                }
                            }
        
                            if (lookupAsset) break;
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
                            Dispatcher.dispatch({ type: 'LOCAL_ACTIVITY_UPDATE', activity: activity, pid: \(pid), socketId: "\(socketId)" });
                            console.info("Activity dispatched successfully:", activity);
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
     - pid: The process ID.
     - socketId: The socket ID.
     */
    private func clearActivity(pid: Int, socketId: Int) {
        guard let webView = webView else { return }

        let clearScript = """
        (() => {
            let dispatcher;
        
            if (!dispatcher) {
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
                                dispatcher = candidate;
                                break;
                            }
                        } catch {}
                    }
        
                    if (dispatcher) break;
                }
            }
        
            if (dispatcher) {
                try {
                    dispatcher.dispatch({ 
                        type: 'LOCAL_ACTIVITY_UPDATE',
                        activity: null,
                        pid: \(pid),
                        socketId: "\(socketId)"
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
                    self.logger.error("Error clearing activity: \(error.localizedDescription)")
                } else {
                    self.logger.debug("Activity cleared successfully")
                }
            }
        }
    }

    // MARK: - Socket Management

    /**
     Closes the socket and cleans up client state.

     - Parameters:
     - fileDescriptor: The client socket file descriptor.
     - code: The closure code.
     - message: The closure message.
     */
    private func socketClose(fileDescriptor: Int32, code: IPC.IPCError, message: String? = nil) {
        self.logger.info("Closing socket on FD \(fileDescriptor) with code \(code.rawValue) and message: \(message ?? "\(code.description) closure")")

        if let activity = clientActivity[fileDescriptor] {
            clearActivity(pid: activity.pid, socketId: activity.socketId)
            clientActivity.removeValue(forKey: fileDescriptor)
        }

        let closePayload = IPC.ClosePayload(code: code.rawValue, message: message ?? "\(code.description) closure")
        send(packet: closePayload, op: .close, to: fileDescriptor)

        clientHandshakes.removeValue(forKey: fileDescriptor)
        clientIds.removeValue(forKey: fileDescriptor)
        serverSockets.removeAll { $0 == fileDescriptor }

        close(fileDescriptor)
        self.logger.info("Socket closed on FD \(fileDescriptor)")
    }
}

// MARK: - IPC Structures

extension DiscordRPCBridge {
    /**
     Namespace for IPC related structures and enums.
     */
    struct IPC {
        /**
         Protocol defining IPC errors with raw values and descriptions.
         */
        protocol IPCError {
            var rawValue: Int { get }
            var description: String { get }
        }

        /// Represents an IPC message with operation code and payload.
        struct Message: Codable {
            let operationCode: OperationCode
            let payload: MessagePayload
        }

        /**
         Structure representing the payload of an IPC message.
         */
        struct MessagePayload: Codable {
            let cmd: String?
            let nonce: String?
            let v: Int?
            let client_id: String?
            let args: CommandArgs?

            enum CodingKeys: String, CodingKey {
                case cmd, nonce, v, client_id, args
            }

            init(cmd: String?, nonce: String?, v: Int?, client_id: String?, args: CommandArgs?) {
                self.cmd = cmd
                self.nonce = nonce
                self.v = v
                self.client_id = client_id
                self.args = args
            }

            init(from decoder: Decoder) throws {
                let container = try decoder.container(keyedBy: CodingKeys.self)
                self.cmd = try container.decodeIfPresent(String.self, forKey: .cmd)
                self.nonce = try container.decodeIfPresent(String.self, forKey: .nonce)

                // Handle different types for 'v'
                if let intValue = try? container.decode(Int.self, forKey: .v) {
                    self.v = intValue
                } else if let stringValue = try? container.decode(String.self, forKey: .v),
                          let intValue = Int(stringValue) {
                    self.v = intValue
                } else {
                    self.v = nil
                }

                self.client_id = try container.decodeIfPresent(String.self, forKey: .client_id)
                self.args = try container.decodeIfPresent(CommandArgs.self, forKey: .args)
            }

            /**
             Structure representing command arguments within the payload.
             */
            struct CommandArgs: Codable {
                let pid: Int
                let activity: Activity?
                let code: String?
                let nonce: String?
            }
        }

        /**
         Structure representing an acknowledgment payload.
         */
        struct AckPayload: Codable {
            let v: Int
            let client_id: String
        }

        /**
         Structure representing a ready payload.
         */
        struct ReadyPayload: Codable {
            let cmd: String
            let data: ReadyData
            let evt: String
            let nonce: String?

            struct ReadyData: Codable {
                let v: Int
                let config: ReadyConfig
                let user: User
            }

            struct ReadyConfig: Codable {
                let cdn_host: String
                let api_endpoint: String
                let environment: String
            }

            struct User: Codable {
                let id: String
                let username: String
                let discriminator: String
                let global_name: String
                let avatar: String
                let bot: Bool
                let flags: Int
            }
        }

        /**
         Structure representing a pong payload.
         */
        struct PongPayload: Codable {
            let nonce: String?
        }

        /**
         Structure representing a successful response.
         */
        struct SuccessResponse: Codable {
            let evt: String?
            let data: String?
            let cmd: String?
            let nonce: String?
        }

        /**
         Structure representing an error response.
         */
        struct ErrorResponse: Codable {
            let cmd: String
            let evt: String
            let data: ErrorData
            let nonce: String?

            struct ErrorData: Codable {
                let code: Int
                let message: String
            }
        }

        /**
         Structure representing a close payload.
         */
        struct ClosePayload: Codable {
            let code: Int
            let message: String
        }

        /**
         Enum representing operation codes for IPC.
         */
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

        /**
         Enum representing closure codes for IPC.
         */
        enum ClosureCode: Int, IPCError {
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

        /**
         Enum representing error codes for IPC.
         */
        enum ErrorCode: Int, IPCError {
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

    // MARK: - Activity Struct

    /**
     Structure representing an activity.
     */
    struct Activity: Codable {
        var name: String
        let type: Int
        let url: String?
        let createdAt: Int
        var timestamps: Timestamps?
        var applicationId: String?
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
            case name, type, url, createdAt = "created_at", timestamps, applicationId = "application_id", details, state, emoji, party, assets, buttons, secrets, instance, flags
        }

        /**
         Custom initializer to handle missing keys gracefully.
         */
        init(from decoder: Decoder) throws {
            let container = try decoder.container(keyedBy: CodingKeys.self)

            // Non-optionals
            self.name = try container.decodeIfPresent(String.self, forKey: .name) ?? "Unknown Activity"
            self.type = try container.decodeIfPresent(Int.self, forKey: .type) ?? 0
            self.createdAt = try container.decodeIfPresent(Int.self, forKey: .createdAt) ?? Int(Date().timeIntervalSince1970)

            // Optionals
            self.url = try container.decodeIfPresent(String.self, forKey: .url)
            self.timestamps = try container.decodeIfPresent(Timestamps.self, forKey: .timestamps)
            self.applicationId = try container.decodeIfPresent(String.self, forKey: .applicationId)
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

        /**
         Structure representing timestamps within an activity.
         */
        struct Timestamps: Codable {
            var start: Int?
            var end: Int?
        }

        /**
         Structure representing an emoji within an activity.
         */
        struct Emoji: Codable {
            let name: String?
            let id: String?
            let animated: Bool?
        }

        /**
         Structure representing a party within an activity.
         */
        struct Party: Codable {
            let id: String?
            let size: [Int]?
        }

        /**
         Structure representing assets within an activity.
         */
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

        /**
         Structure representing a button within an activity.
         */
        struct Button: Codable {
            let label: String
            let url: String
        }

        /**
         Structure representing secrets within an activity.
         */
        struct Secrets: Codable {
            let join: String?
            let spectate: String?
            let match: String?
        }
    }

    /**
     Structure handling Unix Domain Socket operations.
     */
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
        static func create(at path: String) -> Int32 {
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
        static func connect(fileDescriptor: Int32, to path: String) -> Bool {
            var address = sockaddr_un()
            address.sun_family = sa_family_t(AF_UNIX)
            strncpy(&address.sun_path.0, path, MemoryLayout.size(ofValue: address.sun_path) - 1)
            let addressLength = socklen_t(MemoryLayout<sockaddr_un>.size)

            if Darwin.connect(fileDescriptor, withUnsafePointer(to: &address) {
                $0.withMemoryRebound(to: sockaddr.self, capacity: 1) { $0 }
            }, addressLength) < 0 {
                self.logger.error("Failed to connect to socket at \(path)")
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
        static func bind(fileDescriptor: Int32, to path: String) -> Bool {
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
            if Darwin.listen(fileDescriptor, 1) < 0 {
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
