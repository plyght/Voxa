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

/// Handles Unix Domain Socket operations.
struct UnixDomainSocket {
    static private let log = Logger(
        subsystem: Bundle.main.bundleIdentifier ?? "lol.peril.Voxa",
        category: "unixDomainSocket"
    )

    /// Creates a Unix Domain Socket.
    static func create(at path: String) -> Int32 {
        let fd = socket(AF_UNIX, SOCK_STREAM, 0)
        if fd < 0 {
            self.log.error("Failed to create socket at \(path)")
        } else {
            self.log.debug("Created socket with FD \(fd) at \(path)")
        }
        return fd
    }

    /// Connects to a Unix Domain Socket.
    static func connect(fd: Int32, to path: String) -> Bool {
        var addr = sockaddr_un()
        addr.sun_family = sa_family_t(AF_UNIX)
        strncpy(&addr.sun_path.0, path, MemoryLayout.size(ofValue: addr.sun_path) - 1)
        let addrLen = socklen_t(MemoryLayout<sockaddr_un>.size)

        if Darwin.connect(fd, withUnsafePointer(to: &addr) {
            $0.withMemoryRebound(to: sockaddr.self, capacity: 1) { $0 }
        }, addrLen) < 0 {
            self.log.error("Failed to connect to socket at \(path)")
            return false
        }
        self.log.debug("Successfully connected to socket at \(path)")
        close(fd)
        return true
    }

    /// Binds the socket to the specified path.
    static func bind(fd: Int32, to path: String) -> Bool {
        var addr = sockaddr_un()
        addr.sun_family = sa_family_t(AF_UNIX)
        strncpy(&addr.sun_path.0, path, MemoryLayout.size(ofValue: addr.sun_path) - 1)
        let addrLen = socklen_t(MemoryLayout<sockaddr_un>.size)

        if Darwin.bind(fd, withUnsafePointer(to: &addr) {
            $0.withMemoryRebound(to: sockaddr.self, capacity: 1) { $0 }
        }, addrLen) < 0 {
            self.log.error("Failed to bind socket to \(path)")
            return false
        }
        self.log.debug("Successfully bound socket to \(path)")
        return true
    }

    /// Listens for incoming connections on the socket.
    static func listen(on fd: Int32) {
        if Darwin.listen(fd, 1) < 0 {
            self.log.error("Failed to listen on FD \(fd), errno=\(errno)")
        } else {
            self.log.debug("Listening on FD \(fd)")
        }
    }

    /// Accepts a new connection on the given socket file descriptor.
    static func acceptConnection(on fd: Int32) -> Int32 {
        let clientFD = accept(fd, nil, nil)
        if clientFD < 0 {
            self.log.error("Failed to accept connection on FD \(fd), errno=\(errno)")
        } else {
            self.log.debug("Accepted new connection with FD \(clientFD) on socket FD \(fd)")
        }
        return clientFD
    }
}

/// A Swift class emulating arRPC stage 1 (node IPC) directly in Swift.
/// It sets up a Unix Domain Socket server to listen for Discord IPC connections.
class DiscordRPCBridge: NSObject {
    private let log = Logger(
        subsystem: Bundle.main.bundleIdentifier ?? "lol.peril.Voxa",
        category: "discordRPCBridge"
    )

    private weak var webView: WKWebView?
    private var serverSockets: [Int32] = []
    private let basePath: String
    private var clientHandshakes: [Int32: Bool] = [:]
    private var clientIds: [Int32: String] = [:]
    private var activitySocketCounter: Int = 0
    private var clientActivity: [Int32: (pid: Int, socketId: Int)] = [:]

    // MARK: - Initialization

    override init() {
        self.basePath = ProcessInfo.processInfo.environment["XDG_RUNTIME_DIR"]
            ?? ProcessInfo.processInfo.environment["TMPDIR"]
            ?? "/tmp/"
        super.init()
    }

    // MARK: - Public Methods

    /// Starts the IPC server and sets up the bridge for the given WKWebView.
    /// - Parameter webView: The WKWebView instance to bridge with.
    func startBridge(for webView: WKWebView) {
        self.webView = webView
        self.log.info("Starting DiscordRPCBridge")
        setupIPCServer()
    }

    // MARK: - IPC Server Setup

    private func setupIPCServer() {
        DispatchQueue.global(qos: .background).async {
            self.log.info("Setting up IPC servers")
            for i in 0..<10 {
                let socketPath = "\(self.basePath)discord-ipc-\(i)"
                self.log.debug("Checking socket path: \(socketPath)")

                if self.isSocketInUse(at: socketPath) {
                    continue
                }

                guard self.prepareSocket(at: socketPath) else { continue }

                let fd = UnixDomainSocket.create(at: socketPath)
                guard fd >= 0 else { continue }

                if UnixDomainSocket.bind(fd: fd, to: socketPath) {
                    UnixDomainSocket.listen(on: fd)
                    self.serverSockets.append(fd)
                    self.acceptConnections(on: fd)
                    self.log.info("IPC server listening on \(socketPath)")
                    break
                } else {
                    close(fd)
                }
            }

            if self.serverSockets.isEmpty {
                self.log.error("Failed to bind to any IPC sockets from discord-ipc-0 to discord-ipc-9")
            }
        }
    }

    /// Checks if the socket at the given path is already in use.
    /// - Parameter path: The socket file path.
    /// - Returns: `true` if the socket is in use, otherwise `false`.
    private func isSocketInUse(at path: String) -> Bool {
        guard FileManager.default.fileExists(atPath: path) else { return false }
        let testSocketFD = UnixDomainSocket.create(at: path)
        defer { close(testSocketFD) }

        if testSocketFD < 0 { return true }

        let inUse = UnixDomainSocket.connect(fd: testSocketFD, to: path)
        if inUse {
            self.log.info("Socket \(path) is already in use")
        } else {
            self.log.info("Socket \(path) is available")
        }
        return inUse
    }

    /// Prepares the socket by removing existing file if necessary.
    /// - Parameter path: The socket file path.
    /// - Returns: `true` if preparation is successful, otherwise `false`.
    private func prepareSocket(at path: String) -> Bool {
        do {
            if FileManager.default.fileExists(atPath: path) {
                try FileManager.default.removeItem(atPath: path)
                self.log.info("Removed existing socket file at \(path)")
            }
            return true
        } catch {
            self.log.error("Failed to remove socket file at \(path): \(error.localizedDescription)")
            return false
        }
    }

    /// Accepts incoming connections on the given socket file descriptor.
    /// - Parameter fd: The socket file descriptor.
    private func acceptConnections(on fd: Int32) {
        DispatchQueue.global(qos: .background).async {
            self.log.info("Started accepting connections on FD \(fd)")
            while true {
                let clientFD = UnixDomainSocket.acceptConnection(on: fd)
                guard clientFD >= 0 else { continue }
                self.serverSockets.append(clientFD)
                self.log.info("Accepted connection on FD \(clientFD)")
                self.handleClient(clientFD)
            }
        }
    }

    // MARK: - Client Handling

    /// Handles communication with the connected Discord client.
    /// - Parameter fd: The client socket file descriptor.
    private func handleClient(_ fd: Int32) {
        self.log.debug("Handling client on FD \(fd)")
        readLoop(fd: fd)
    }

    /// Continuously reads and processes IPC messages from Discord.
    /// - Parameter fd: The client socket file descriptor.
    private func readLoop(fd: Int32) {
        self.log.debug("Starting read loop on FD \(fd)")
        let bufferSize = 65536
        _ = Data(capacity: bufferSize)

        while true {
            guard let message = readMessage(from: fd, bufferSize: bufferSize) else {
                socketClose(fd: fd, code: .ratelimited, message: "Failed to read message")
                return
            }
            handleIPCMessage(message, from: fd)
        }
    }

    /// Reads a complete IPC message from the socket.
    /// - Parameters:
    ///   - fd: The socket file descriptor.
    ///   - bufferSize: The maximum buffer size.
    /// - Returns: An `IPCMessage` if successfully read, otherwise `nil`.
    private func readMessage(from fd: Int32, bufferSize: Int) -> IPCMessage? {
        var header = Data(count: 8)
        guard readExact(fd: fd, into: &header, count: 8) else { return nil }

        let op = header.withUnsafeBytes { $0.load(as: Int32.self).littleEndian }
        let length = header.withUnsafeBytes { $0.load(fromByteOffset: 4, as: Int32.self).littleEndian }

        self.log.debug("Received packet - op: \(op), length: \(length) on FD \(fd)")

        guard length > 0, length <= bufferSize - 8 else {
            self.log.error("Invalid packet length: \(length) on FD \(fd)")
            return nil
        }

        var payload = Data(count: Int(length))
        guard readExact(fd: fd, into: &payload, count: Int(length)) else { return nil }

        // we're willing to deal with this force unwrap because at that point wtf is happening
        return IPCMessage(operationCode: IPCOperationCode(rawValue: op)!, payload: payload.toDictionary() ?? [:])
    }

    /// Reads exactly `count` bytes from the socket into `data`.
    /// - Parameters:
    ///   - fd: The socket file descriptor.
    ///   - data: The data buffer to fill.
    ///   - count: The number of bytes to read.
    /// - Returns: `true` if successfully read, otherwise `false`.
    private func readExact(fd: Int32, into data: inout Data, count: Int) -> Bool {
        var totalBytesRead = 0
        data = Data()

        while totalBytesRead < count {
            var tempBuffer = [UInt8](repeating: 0, count: count - totalBytesRead)
            let bytesRead = read(fd, &tempBuffer, count - totalBytesRead)

            if bytesRead <= 0 {
                self.log.error("Failed to read from FD \(fd)")
                return false
            }

            totalBytesRead += bytesRead
            data.append(contentsOf: tempBuffer.prefix(bytesRead))
        }

        return true
    }

    /// Handles incoming IPC messages based on the operation code.
    /// - Parameters:
    ///   - message: The IPC message received.
    ///   - fd: The client socket file descriptor.
    private func handleIPCMessage(_ message: IPCMessage, from fd: Int32) {
        switch message.operationCode {
        case .handshake:
            handleHandshake(with: message.payload, from: fd)
        case .frame:
            handleFrame(with: message.payload, from: fd)
        case .close:
            socketClose(fd: fd, code: .normal)
        case .ping:
            handlePing(with: message.payload, from: fd)
        case .pong:
            fallthrough
        default:
            self.log.warning("Unhandled operation code: \(message.operationCode.rawValue) on FD \(fd)")
        }
    }

    /// Handles the HANDSHAKE operation.
    /// - Parameters:
    ///   - json: The JSON payload.
    ///   - fd: The client socket file descriptor.
    private func handleHandshake(with json: [String: Any], from fd: Int32) {
        self.log.info("Handling HANDSHAKE on FD \(fd)")

        guard let version = json["v"] as? Int, version == 1 else {
            self.log.error("Invalid or missing version in handshake on FD \(fd)")
            socketClose(fd: fd, code: .invalidVersion)
            return
        }

        guard let clientId = json["client_id"] as? String, !clientId.isEmpty else {
            self.log.error("Empty or missing client_id in handshake on FD \(fd)")
            socketClose(fd: fd, code: .invalidClientID)
            return
        }

        clientIds[fd] = clientId
        clientHandshakes[fd] = true
        self.log.info("Handshake successful for client \(clientId) on FD \(fd)")

        let ackPayload: [String: Any] = [
            "v": 1,
            "client_id": clientId
        ]
        send(packet: ackPayload, op: 0, to: fd)

        let readyPayload: [String: Any] = [
            "cmd": "DISPATCH",
            "data": [
                "v": 1,
                "config": [
                    "cdn_host": "cdn.discordapp.com",
                    "api_endpoint": "//discord.com/api",
                    "environment": "production"
                ],
                "user": [
                    "id": "1045800378228281345",
                    "username": "arrpc",
                    "discriminator": "0",
                    "global_name": "arRPC",
                    "avatar": "cfefa4d9839fb4bdf030f91c2a13e95c",
                    "bot": false,
                    "flags": 0
                ]
            ],
            "evt": "READY",
            "nonce": NSNull()
        ]
        send(packet: readyPayload, op: 1, to: fd)
    }

    /// Handles the FRAME operation.
    /// - Parameters:
    ///   - json: The JSON payload.
    ///   - fd: The client socket file descriptor.
    private func handleFrame(with json: [String: Any], from fd: Int32) {
        guard clientHandshakes[fd] == true else {
            self.log.error("Received FRAME before handshake on FD \(fd)")
            socketClose(fd: fd, code: .invalidClientID, message: "Need to handshake first")
            return
        }

        guard let cmd = json["cmd"] as? String else {
            self.log.error("Missing 'cmd' in FRAME on FD \(fd)")
            return
        }

        self.log.info("Handling FRAME command: \(cmd) on FD \(fd)")

        switch cmd {
        case "SET_ACTIVITY":
            handleSetActivity(with: json, from: fd)
        case "INVITE_BROWSER", "GUILD_TEMPLATE_BROWSER":
            handleInviteBrowser(with: json, cmd: cmd, from: fd)
        case "DEEP_LINK":
            respondSuccess(to: fd, with: json)
        case "CONNECTIONS_CALLBACK":
            respondError(to: fd, cmd: cmd, code: "Unhandled", nonce: json["nonce"])
        default:
            self.log.warning("Unknown command: \(cmd) on FD \(fd)")
            respondSuccess(to: fd, with: json)
        }
    }

    /// Handles the SET_ACTIVITY command.
    /// - Parameters:
    ///   - json: The JSON payload.
    ///   - fd: The client socket file descriptor.
    private func handleSetActivity(with json: [String: Any], from fd: Int32) {
        guard let args = json["args"] as? [String: Any],
              let activity = args["activity"] as? [String: Any] else {
            self.log.warning("Invalid SET_ACTIVITY arguments on FD \(fd)")
            respondError(to: fd, cmd: "SET_ACTIVITY", code: "Invalid arguments", nonce: json["nonce"])
            return
        }

        let pid = args["pid"] as? Int ?? 0

        activitySocketCounter += 1
        let socketId = activitySocketCounter

        clientActivity[fd] = (pid, socketId)

        injectActivity(activity: activity, pid: pid, socketId: socketId)
        respondSuccess(to: fd, with: json)
    }

    /// Handles the INVITE_BROWSER and GUILD_TEMPLATE_BROWSER commands.
    /// - Parameters:
    ///   - json: The JSON payload.
    ///   - cmd: The command string.
    ///   - fd: The client socket file descriptor.
    private func handleInviteBrowser(with json: [String: Any], cmd: String, from fd: Int32) {
        guard let args = json["args"] as? [String: Any],
              let code = args["code"] as? String else {
            self.log.warning("Missing code for command \(cmd) on FD \(fd)")
            respondSuccess(to: fd, with: json)
            return
        }
        self.log.info("Command \(cmd) with code: \(code) on FD \(fd)")
        respondSuccess(to: fd, with: json)
    }

    /// Handles the PING operation.
    /// - Parameters:
    ///   - json: The JSON payload.
    ///   - fd: The client socket file descriptor.
    private func handlePing(with json: [String: Any], from fd: Int32) {
        self.log.info("Handling PING on FD \(fd)")
        let payload: [String: Any] = ["nonce": json["nonce"] ?? NSNull()]
        send(packet: payload, op: 4, to: fd)
        let nonce = json["nonce"] != nil ? "with nonce: \(json["nonce"]!)" : "without nonce"
        self.log.debug("Sent PONG \(nonce) on FD \(fd)")
    }

    // MARK: - Packet Handling

    /// Sends a JSON packet to Discord over the given file descriptor.
    /// - Parameters:
    ///   - packet: The payload to send.
    ///   - op: The operation code.
    ///   - fd: The socket file descriptor.
    private func send(packet: [String: Any], op: Int32, to fd: Int32) {
        guard let jsonData = try? JSONSerialization.data(withJSONObject: packet, options: []) else {
            self.log.error("Failed to serialize payload to JSON")
            return
        }
        var op = op
        var buffer = Data()
        buffer.append(Data(bytes: &op, count: 4).littleEndianData)
        var dataSize = Int32(jsonData.count)
        buffer.append(Data(bytes: &dataSize, count: 4).littleEndianData)
        buffer.append(jsonData)

        write(fd: fd, data: buffer)
    }

    /// Sends data through the socket.
    /// - Parameters:
    ///   - fd: The socket file descriptor.
    ///   - data: The data to send.
    private func write(fd: Int32, data: Data) {
        data.withUnsafeBytes { ptr in
            let bytesWritten = unistd.write(fd, ptr.baseAddress, data.count)
            if bytesWritten < 0 {
                self.log.error("Failed to write to FD \(fd), errno=\(errno)")
            } else {
                self.log.debug("Wrote \(bytesWritten) bytes to FD \(fd)")
            }
        }
    }

    /// Responds with a success message to the client.
    /// - Parameters:
    ///   - fd: The client socket file descriptor.
    ///   - json: The original request JSON.
    private func respondSuccess(to fd: Int32, with json: [String: Any]) {
        var response: [String: Any] = [
            "evt": NSNull(),
            "data": NSNull(),
            "cmd": json["cmd"] ?? NSNull()
        ]
        if let nonce = json["nonce"] {
            response["nonce"] = nonce
        }
        self.log.info("Responding with success: \(response)")
        send(packet: response, op: 1, to: fd)
    }

    /// Responds with an error message to the client.
    /// - Parameters:
    ///   - fd: The client socket file descriptor.
    ///   - cmd: The command that caused the error.
    ///   - code: The error code.
    ///   - nonce: The nonce associated with the request.
    private func respondError(to fd: Int32, cmd: String, code: String, nonce: Any?) {
        let errorMsg: [String: Any] = [
            "cmd": cmd,
            "evt": "ERROR",
            "data": [
                "code": 4011,
                "message": "Invalid invite or template id: \(code)"
            ],
            "nonce": nonce ?? NSNull()
        ]
        self.log.warning("Sending error response for cmd \(cmd) with code \(code) on FD \(fd)")
        send(packet: errorMsg, op: 1, to: fd)
    }

    private func respondError(to fd: Int32, cmd: String, code: IPCErrorCode, nonce: Any?) {
        self.respondError(to: fd, cmd: cmd, code: "\(code.rawValue)", nonce: nonce)
    }

    // MARK: - Activity Injection

    /// Injects the received activity data into the Discord web client via JavaScript.
    /// - Parameters:
    ///   - activity: The activity data.
    ///   - pid: The process ID.
    ///   - socketId: The socket ID.
    private func injectActivity(activity: [String: Any], pid: Int, socketId: Int) {
        guard let activityJSON = try? JSONSerialization.data(withJSONObject: activity, options: []),
              let activityString = String(data: activityJSON, encoding: .utf8),
              let webView = webView else {
            self.log.error("Failed to serialize activity data or webView is nil")
            return
        }

        let injectionScript = """
        (() => {
            let Dispatcher;

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

            console.info("Dispatcher found:", Dispatcher);

            if (Dispatcher) {
                try {
                    Dispatcher.dispatch({ 
                        type: 'LOCAL_ACTIVITY_UPDATE',
                        activity: \(activityString),
                        pid: \(pid),
                        socketId: "\(socketId)"
                    });
                    console.info("Activity dispatched successfully");
                } catch (e) {
                    console.error("Dispatch error:", e);
                }
            }
        })();
        """

        webView.evaluateJavaScript(injectionScript) { _, error in
            if let error = error {
                self.log.error("Error injecting activity: \(error.localizedDescription)")
            } else {
                self.log.debug("Activity injected successfully")
            }
        }
    }

    /// Injects JavaScript to clear the activity in the Discord web client.
    /// - Parameters:
    ///   - pid: The process ID.
    ///   - socketId: The socket ID.
    private func clearActivity(pid: Int, socketId: Int) {
        guard let webView = webView else { return }

        let clearScript = """
        (() => {
            let Dispatcher;

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

            console.info("Dispatcher found:", Dispatcher);

            if (Dispatcher) {
                try {
                    Dispatcher.dispatch({ 
                        type: 'LOCAL_ACTIVITY_UPDATE',
                        activity: null,
                        pid: \(pid),
                        socketId: "\(socketId)"
                    });
                    console.info("Activity cleared successfully");
                } catch (e) {
                    console.error("Error clearing activity:", e);
                }
            }
        })();
        """

        webView.evaluateJavaScript(clearScript) { _, error in
            if let error = error {
                self.log.error("Error clearing activity: \(error.localizedDescription)")
            } else {
                self.log.debug("Activity cleared successfully")
            }
        }
    }

    // MARK: - Socket Management

    /// Closes the socket and cleans up client state.
    /// - Parameters:
    ///   - fd: The client socket file descriptor.
    ///   - code: The closure code.
    ///   - message: The closure message.
    private func socketClose(fd: Int32, code: Int = 1000, message: String = "") {
        self.log.info("Closing socket on FD \(fd) with code \(code) and message: \(message)")

        if let activity = clientActivity[fd] {
            clearActivity(pid: activity.pid, socketId: activity.socketId)
            clientActivity.removeValue(forKey: fd)
        }

        let closePayload: [String: Any] = [
            "code": code,
            "message": message
        ]
        send(packet: closePayload, op: 2, to: fd)

        clientHandshakes.removeValue(forKey: fd)
        clientIds.removeValue(forKey: fd)
        serverSockets.removeAll { $0 == fd }

        close(fd)
        self.log.info("Socket closed on FD \(fd)")
    }

    private func socketClose(fd: Int32, code: IPCCloseCode, message: String? = nil) {
        socketClose(fd: fd, code: code.rawValue, message: message ?? "\(code.description) closure")
    }

    private func socketClose(fd: Int32, code: IPCErrorCode, message: String? = nil) {
        socketClose(fd: fd, code: code.rawValue, message: message ?? "\(code.description)")
    }
}

extension DiscordRPCBridge {
    /// Represents an IPC message with operation code and payload.
    struct IPCMessage {
        let operationCode: IPCOperationCode
        let payload: [String: Any]
    }

    enum IPCOperationCode: Int32 {
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

    enum IPCCloseCode: Int {
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

    enum IPCErrorCode: Int {
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

// MARK: - Data Extension

extension Data {
    /// Converts Data to a Dictionary.
    func toDictionary() -> [String: Any]? {
        try? JSONSerialization.jsonObject(with: self, options: []) as? [String: Any]
    }

    /// Returns little endian data.
    var littleEndianData: Data {
        var le = self
        return Data(bytes: &le, count: self.count)
    }
}
