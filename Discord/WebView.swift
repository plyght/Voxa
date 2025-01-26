import SwiftUI
import Foundation
import UserNotifications
import OSLog
@preconcurrency import WebKit

// MARK: - Constants

/// CSS for accent color customization
var dividerAccentColor: String {
    @AppStorage("sidebarDividerAccentColor") var sidebarDividerAccentColor: Bool = true

    if sidebarDividerAccentColor {
        if let accentColor = NSColor.controlAccentColor.usingColorSpace(.sRGB) {
            let red = Int(accentColor.redComponent * 255)
            let green = Int(accentColor.greenComponent * 255)
            let blue = Int(accentColor.blueComponent * 255)
            return String(format: "#%02X%02X%02X", red, green, blue)
        }
    }

    return """
    /* --background-modifier-accent */
    color-mix(
        in oklab,
        hsl(var(--primary-500-hsl) / 0.48) 100%,
        hsl(var(--theme-base-color-hsl, 0 0% 0%) / 0.48) var(--theme-base-color-amount, 0%)
    )
    """
}

/// Default CSS applied to the WebView
let defaultCSS = """
    :root {
        --background-accent: rgb(0, 0, 0, 0.5) !important;
        --background-floating: transparent !important;
        --background-message-highlight: transparent !important;
        --background-message-highlight-hover: transparent !important;
        --background-message-hover: transparent !important;
        --background-mobile-primary: transparent !important;
        --background-mobile-secondary: transparent !important;
        --background-modifier-accent: transparent !important;
        --background-modifier-active: transparent !important;
        --background-modifier-hover: transparent !important;
        --background-modifier-selected: transparent !important;
        --background-nested-floating: transparent !important;
        --background-primary: transparent !important;
        --background-secondary: transparent !important;
        --background-secondary-alt: transparent !important;
        --background-tertiary: transparent !important;
        --bg-overlay-3: transparent !important;
        --channeltextarea-background: transparent !important;
    }
    
    .sidebar_a4d4d9 {
        background-color: rgb(0, 0, 0, 0.15) !important;
        border-right: solid 1px rgb(0, 0, 0, 0.3) !important;
    }
    
    .guilds_a4d4d9 {
        background-color: rgb(0, 0, 0, 0.3) !important;
        border-right: solid 1px rgb(0, 0, 0, 0.3) !important;
        padding-top: 36px;
    }
    
    .guildSeparator_d0c57e {
        background-color: \(dividerAccentColor) !important;
    }
    
    
    .theme-dark .themed_fc4f04 {
        background-color: transparent !important;
    }
    
    .channelTextArea_a7d72e {
        background-color: rgb(0, 0, 0, 0.15) !important;
    }
    
    .button_df39bd {
        background-color: rgb(0, 0, 0, 0.15) !important;
    }
    
    .chatContent_a7d72e {
        background-color: transparent !important;
        background: transparent !important;
    }
    
    .chat_a7d72e {
        background: transparent !important;
    }
       
    .quickswitcher_f4e139 {
        background-color: transparent !important;
        -webkit-backdrop-filter: blur(5px) !important;
    }
    
    .content_a7d72e {
        background: none !important;
    }
    
    .container_eedf95 {
        position: relative;
        background-color: rgba(0, 0, 0, 0.5);
    }
    
    .container_eedf95::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        backdrop-filter: none;
        filter: blur(10px);
        background-color: inherit;
        z-index: -1;
    }
    
    .container_a6d69a {
        background: transparent !important;
        background-color: transparent !important;
        backdrop-filter: blur(10px); !important;
    }
    
    .mainCard_a6d69a {
        background-color: rgb(0, 0, 0, 0.15) !important;
    }
    
    .listItem_c96c45:has(div[aria-label="Download Apps"]) {
        display: none !important;
    }
    
    // should fix strange out-of-place gradient-- weirdly does not
    .children_fc4f04:after {
        background: 0 !important;
        width: 0 !important;
    }
    
    .expandedFolderBackground_bc7085,
    .folder_bc7085 {
    /* revert to --background-secondary before override */
        background: color-mix(
            in oklab,
            var(--primary-630) 100%,
            var(--theme-base-color, black) var(--theme-base-color-amount, 0%)
        ) !important;
    }
    """

// MARK: - Utility Functions

/// Retrieves the contents of a plugin file
func getPluginContents(name fileName: String) -> String {
    if let filePath = Bundle.main.path(forResource: fileName, ofType: "js") {
        do {
            return try String(contentsOfFile: filePath, encoding: .utf8)
        } catch {
            print("Error reading plugin file contents: \(error.localizedDescription)")
        }
    }

    return ""
}

// MARK: - Plugin and CSS Loader

/// Loads plugins and CSS into the provided WebView
func loadPluginsAndCSS(webView: WKWebView) {
    // Inject default CSS
    webView.configuration.userContentController.addUserScript(
        WKUserScript(
            source: """
            const defaultStyle = document.createElement('style');
            defaultStyle.id = 'voxaStyle';
            defaultStyle.textContent = `\(defaultCSS)`;
            document.head.appendChild(defaultStyle);
            
            const customStyle = document.createElement('style');
            customStyle.id = 'voxaCustomStyle';
            customStyle.textContent = "";
            document.head.appendChild(customStyle);
            """,
            injectionTime: .atDocumentEnd,
            forMainFrameOnly: true
        )
    )

    // Load active plugins
    activePlugins.forEach { plugin in
        webView.configuration.userContentController.addUserScript(
            WKUserScript(
                source: plugin.contents,
                injectionTime: .atDocumentEnd,
                forMainFrameOnly: true
            )
        )
    }
}

// MARK: - WebView Representable

struct WebView: NSViewRepresentable {
    var channelClickWidth: CGFloat
    var initialURL: String
    @Binding var webViewReference: WKWebView?

    // Initializers
    init(channelClickWidth: CGFloat, initialURL: String) {
        self.channelClickWidth = channelClickWidth
        self.initialURL = initialURL
        self._webViewReference = .constant(nil)
    }

    init(channelClickWidth: CGFloat, initialURL: String, webViewReference: Binding<WKWebView?>) {
        self.channelClickWidth = channelClickWidth
        self.initialURL = initialURL
        self._webViewReference = webViewReference
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    func makeNSView(context: Context) -> WKWebView {
        // MARK: WebView Configuration

        let config = WKWebViewConfiguration()

        config.applicationNameForUserAgent = "Version/17.2.1 Safari/605.1.15"

        // Enable media capture
        config.mediaTypesRequiringUserActionForPlayback = []
        config.allowsAirPlayForMediaPlayback = true

        // If macOS 14 or higher, enable fullscreen
        if #available(macOS 14.0, *) {
            config.preferences.isElementFullscreenEnabled = true
        }

        // Additional media constraints
        config.preferences.setValue(true, forKey: "mediaDevicesEnabled")
        config.preferences.setValue(true, forKey: "mediaStreamEnabled")
        config.preferences.setValue(true, forKey: "peerConnectionEnabled")
        config.preferences.setValue(true, forKey: "screenCaptureEnabled")

        // Allow inspector while app is running in DEBUG
    #if DEBUG
        config.preferences.setValue(true, forKey: "developerExtrasEnabled")
    #endif

        // Edit CSP to allow for 3rd party scripts and stylesheets to be loaded
        config.setValue(
            "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';",
            forKey: "overrideContentSecurityPolicy"
        )

        // MARK: WebView Initialisation

        let webView = WKWebView(frame: .zero, configuration: config)
        Task { @MainActor in webViewReference = webView }

        // Store a weak reference in Coordinator to break potential cycles
        context.coordinator.webView = webView

        // Configure webview delegates
        webView.uiDelegate = context.coordinator
        webView.navigationDelegate = context.coordinator

        // Make background transparent
        webView.setValue(false, forKey: "drawsBackground")

        // Add message handlers
        // If these properties are added to, ensure you remove the handlers as well in `Coordinator` `deinit`
        webView.configuration.userContentController.add(context.coordinator, name: "channelClick")
        webView.configuration.userContentController.add(context.coordinator, name: "notify")
        webView.configuration.userContentController.add(context.coordinator, name: "notificationPermission")

        // MARK: Script Injection

        // Media Permissions Script
        webView.configuration.userContentController.addUserScript(
            WKUserScript(
                source: """
                const originalGetUserMedia = navigator.mediaDevices.getUserMedia;
                navigator.mediaDevices.getUserMedia = async function(constraints) {
                    console.log('getUserMedia requested with constraints:', constraints);
                    return originalGetUserMedia.call(navigator.mediaDevices, constraints);
                };
                
                const originalEnumerateDevices = navigator.mediaDevices.enumerateDevices;
                navigator.mediaDevices.enumerateDevices = async function() {
                    console.log('enumerateDevices requested');
                    return originalEnumerateDevices.call(navigator.mediaDevices);
                };
                """,
                injectionTime: .atDocumentEnd,
                forMainFrameOnly: true
            )
        )

        // Channel Click Handler Script
        webView.configuration.userContentController.addUserScript(
            WKUserScript(
                source: """
                (function () {
                    document.addEventListener('click', function(e) {
                        const channel = e.target.closest('.blobContainer_a5ad63');
                        if (channel) {
                            window.webkit.messageHandlers.channelClick.postMessage({type: 'channel'});
                            return;
                        }
                
                        const link = e.target.closest('.link_c91bad');
                        if (link) {
                            e.preventDefault();
                            let href = link.getAttribute('href') || link.href || '/channels/@me';
                            if (href.startsWith('/')) {
                                href = 'https://discord.com' + href;
                            }
                            console.log('Link clicked with href:', href);
                            window.webkit.messageHandlers.channelClick.postMessage({type: 'user', url: href});
                            return;
                        }
                
                        const serverIcon = e.target.closest('.wrapper_f90abb');
                        if (serverIcon) {
                            window.webkit.messageHandlers.channelClick.postMessage({type: 'server'});
                        }
                    });
                })();
                """,
                injectionTime: .atDocumentEnd,
                forMainFrameOnly: true
            )
        )

        // Notification Handling Script
        webView.configuration.userContentController.addUserScript(
            WKUserScript(
                source: """
                (function () {
                    const Original = window.Notification;
                    let perm = "default";
                    const map = new Map();
                
                    Object.defineProperty(Notification, "permission", {
                        get: () => perm,
                        configurable: true,
                    });
                
                    class VoxaNotification extends Original {
                        constructor(title, options = {}) {
                            const id = crypto.randomUUID().toUpperCase();
                            super(title, options);
                            this.notificationId = id;
                            map.set(id, this);
                            window.webkit?.messageHandlers?.notify?.postMessage({
                                title,
                                options,
                                notificationId: id,
                            });
                
                            this.onshow = null;
                            setTimeout(() => {
                                this.dispatchEvent(new Event("show"));
                                if (typeof this._onshow === "function") this._onshow();
                            }, 0);
                        }
                    
                        close() {
                            if (this.notificationId) {
                                window.webkit?.messageHandlers?.closeNotification?.postMessage({
                                    id: this.notificationId,
                                });
                            }
                            super.close();
                        }
                    
                        set onshow(h) { this._onshow = h; }
                        get onshow() { return this._onshow; }
                    
                        set onerror(h) { this._onerror = h; }
                        get onerror() { return this._onerror; }
                    
                        handleError(e) {
                            if (typeof this._onerror === "function") this._onerror(e);
                        }
                    }
                
                    window.Notification = VoxaNotification;
                
                    Notification.requestPermission = function (cb) {
                        return new Promise((resolve) => {
                            window.webkit?.messageHandlers?.notificationPermission?.postMessage({});
                            window.notificationPermissionCallback = resolve;
                        }).then((res) => {
                            if (typeof cb === "function") cb(res);
                            return res;
                        });
                    };
                
                    window.addEventListener("nativePermissionResponse", (e) => {
                        if (window.notificationPermissionCallback) {
                            perm = e.detail.permission || "default";
                            window.notificationPermissionCallback(perm);
                            window.notificationPermissionCallback = null;
                        }
                    });
                
                    window.addEventListener("notificationError", (e) => {
                        const { notificationId, error } = e.detail;
                        const n = map.get(notificationId);
                        if (n) {
                            n.handleError(error);
                            map.delete(notificationId);
                        }
                    });
                
                    window.addEventListener("notificationSuccess", (e) => {
                        const { notificationId } = e.detail;
                        const n = map.get(notificationId);
                        if (n) {
                            console.log(`Notification successfully added: ${notificationId}`);
                            map.delete(notificationId);
                        }
                    });
                })();
                """,
                injectionTime: .atDocumentStart,
                forMainFrameOnly: false
            )
        )

        loadPluginsAndCSS(webView: webView)
        loadInitialURL(webView: webView) // TODO: swiftUI view err instead

        return webView
    }

    func updateNSView(_ nsView: WKWebView, context: Context) {
        // If you wish to update the webView here (e.g., reload or inject new CSS),
        // you can do so. Currently, no updates are necessary.
        loadPluginsAndCSS(webView: nsView)
    }

    private func loadInitialURL(webView: WKWebView) {
        if let url = URL(string: initialURL) {
            webView.load(URLRequest(url: url))
        } else {
            let errorHTML = """
                <html>
                  <body>
                    <h2>Invalid URL</h2>
                    <p>The provided URL could not be parsed.</p>
                  </body>
                </html>
                """
            webView.loadHTMLString(errorHTML, baseURL: nil)
        }
    }

    // MARK: - Coordinator

    class Coordinator: NSObject, WKScriptMessageHandler, WKUIDelegate, WKNavigationDelegate {
        weak var webView: WKWebView?
        var parent: WebView

        init(_ parent: WebView) {
            self.parent = parent
        }

        deinit {
            // avoid memory leaks
            webView?.configuration.userContentController.removeScriptMessageHandler(forName: "channelClick")
            webView?.configuration.userContentController.removeScriptMessageHandler(forName: "notify")
            webView?.configuration.userContentController.removeScriptMessageHandler(forName: "notificationPermission")
        }

        // MARK: - WKWebView Delegate Methods

        @available(macOS 12.0, *)
        func webView(
            _ webView: WKWebView,
            requestMediaCapturePermissionFor origin: WKSecurityOrigin,
            initiatedByFrame frame: WKFrameInfo,
            type: WKMediaCaptureType,
            decisionHandler: @escaping (WKPermissionDecision) -> Void
        ) {
            print("Requesting permission for media type:", type)
            decisionHandler(.grant)
        }

        func webView(
            _ webView: WKWebView,
            runOpenPanelWith parameters: WKOpenPanelParameters,
            initiatedByFrame frame: WKFrameInfo,
            completionHandler: @escaping ([URL]?) -> Void
        ) {
            let openPanel = NSOpenPanel()
            openPanel.canChooseFiles = true
            openPanel.canChooseDirectories = false
            openPanel.allowsMultipleSelection = parameters.allowsMultipleSelection

            openPanel.begin { response in
                if response == .OK {
                    completionHandler(openPanel.urls)
                } else {
                    completionHandler(nil)
                }
            }
        }

        func webView(
            _ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction,
            decisionHandler: @escaping (WKNavigationActionPolicy) -> Void
        ) {
            if let url = navigationAction.request.url,
               navigationAction.navigationType == .linkActivated
            {
                NSWorkspace.shared.open(url)
                decisionHandler(.cancel)
            } else {
                decisionHandler(.allow)
            }
        }

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            loadPluginsAndCSS(webView: webView)
        }

        // MARK: - Script Message Handling

        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            switch message.name {
            case "notify": /// Notification payload is sent to webview
                guard
                    let body = message.body as? [String: Any],
                    let title = body["title"] as? String,
                    let options = body["options"] as? [String: Any],
                    let notificationId = body["notificationId"] as? String
                else {
                    print("Recieved malformed notify message.")
                    return
                }

                print("Received notify message: \(title) - \(options) - ID: \(notificationId)")

                let notification = UNMutableNotificationContent()
                notification.title = title
                notification.body = options["body"] as? String ?? ""

                if let soundName = options["sound"] as? String {
                    notification.sound = UNNotificationSound(named: UNNotificationSoundName(soundName))
                } else {
                    notification.sound = .default
                }

                let request = UNNotificationRequest(
                    identifier: notificationId,
                    content: notification,
                    trigger: nil
                )

                UNUserNotificationCenter.current().add(request) { error in
                    guard error == nil else {
                        let error = error!
                        print("Error adding notification: \(error.localizedDescription)")

                        // Dispatch notification error event
                        Task { @MainActor in
                            do {
                                try await self.webView?.evaluateJavaScript("""
                                    window.dispatchEvent(
                                        new CustomEvent('notificationError', {
                                            detail: {
                                                notificationId: '\(notificationId)',
                                                error: '\(error.localizedDescription)'
                                            }
                                        })
                                    );
                                    """
                                )
                                print("Error response has additionally been dispatched to web content. (notificationId: \(notificationId))")
                            } catch {
                                print("Error evaluating notification error event JavaScript: \(error.localizedDescription)")
                            }
                        }
                        return
                    }

                    print("Notification added: \(title) - ID: \(notificationId)")

                    // Dispatch notification success event
                    Task { @MainActor in
                        do {
                            try await self.webView?.evaluateJavaScript("""
                                window.dispatchEvent(
                                    new CustomEvent('notificationSuccess', {
                                        detail: {
                                            notificationId: '\(notificationId)'
                                        }
                                    })
                                );
                                """
                            )
                            print("Success response dispatched to web content for notification ID: \(notificationId)")
                        } catch {
                            print("Error evaluating notification success event JavaScript: \(error.localizedDescription)")
                        }
                    }
                }

            case "notificationPermission": /// Notification permission payload is sent to webview
                print("Received notificationPermission message")
                UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
                    let permission = granted ? "granted" : "denied"
                    print("Notification permission \(permission)")

                    // Dispatch permission response event
                    Task { @MainActor in
                        do {
                            try await self.webView?.evaluateJavaScript("""
                                window.dispatchEvent(
                                    new CustomEvent('nativePermissionResponse', {
                                        detail: {
                                            permission: '\(permission)'
                                        }
                                    })
                                );
                                """
                            )
                            print("Permission response dispatched to web content")
                        } catch {
                            print("Error evaluating permission response event JavaScript: \(error.localizedDescription)")
                        }
                    }
                }

            default:
                print("Unimplemented message: \(message.name)")
            }
        }
    }
}


/// Performs a hard reload of the WebView by clearing scripts and reloading the initial URL
func hardReloadWebView(webView: WKWebView) {
    webView.configuration.userContentController.removeAllUserScripts()
    loadPluginsAndCSS(webView: webView)

    if let url = URL(string: "https://discord.com/app") {
        webView.load(URLRequest(url: url))
    }
}
