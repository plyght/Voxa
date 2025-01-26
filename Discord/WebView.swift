import SwiftUI
import Foundation
@preconcurrency import WebKit

var accentColorCSS: String {
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
    /* revert to --background-modifier-accent before override */
    color-mix(
        in oklab,
        hsl(var(--primary-500-hsl) / 0.48) 100%,
        hsl(var(--theme-base-color-hsl, 0 0% 0%) / 0.48) var(--theme-base-color-amount, 0%)
    )
    """
}

func loadPluginsAndCSS(webView: WKWebView) {

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
            background-color: \(accentColorCSS) !important;
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
        .children_fc4f04:after
            background: none !important;
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

    let initialScript = WKUserScript(
        source: """
                const defaultStyle = document.createElement('style');
                defaultStyle.id = 'voxaStyle'
                defaultStyle.textContent = `\(defaultCSS)`;
                document.head.appendChild(defaultStyle);

                const customStyle = document.createElement('style');
                customStyle.id = 'voxaCustomStyle'
                customStyle.textContent = "";
                document.head.appendChild(customStyle);
            """, injectionTime: .atDocumentEnd, forMainFrameOnly: true)
    webView.configuration.userContentController.addUserScript(initialScript)

    // Load active plugins
    @AppStorage("activePlugins") var activePluginsData: Data = Data()

    var activePlugins: [String] = []

    activePlugins = dataToArray(stringArrayData: activePluginsData) ?? []

    for pluginId in activePlugins {
        let pluginPath: String = Vars.plugins[pluginId]?["pathWithoutExtension"] ?? ""
        let pluginScript = getPluginContents(name: pluginPath)

        let initialScriptTwo = WKUserScript(
            source: pluginScript, injectionTime: .atDocumentEnd, forMainFrameOnly: true)
        webView.configuration.userContentController.addUserScript(initialScriptTwo)
    }
}

func hardReloadWebView(webView: WKWebView) {
    webView.configuration.userContentController.removeAllUserScripts()

    let link = URL(string: "https://discord.com/app")!
    let request = URLRequest(url: link)
    webView.load(request)

    loadPluginsAndCSS(webView: webView)
}

struct WebView: NSViewRepresentable {
    var channelClickWidth: CGFloat
    var initialURL: String
    @Binding var webViewReference: WKWebView?

    // 2. Multiple initializers for convenience
    init(channelClickWidth: CGFloat, initialURL: String) {
        self.channelClickWidth = channelClickWidth
        self.initialURL = initialURL
        self._webViewReference = .constant(nil)
    }

    init(
        channelClickWidth: CGFloat,
        initialURL: String,
        webViewReference: Binding<WKWebView?>
    ) {
        self.channelClickWidth = channelClickWidth
        self.initialURL = initialURL
        self._webViewReference = webViewReference
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    func makeNSView(context: Context) -> WKWebView {
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
        // config.preferences.setValue(true, forKey: "developerExtrasEnabled")

        // Edit CSP to allow for 3rd party scripts and stylesheets to be loaded
        config.setValue(
            "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';",
            forKey: "overrideContentSecurityPolicy")

        let webView = WKWebView(frame: .zero, configuration: config)
        DispatchQueue.main.async {
            webViewReference = webView
        }

        // Store a weak reference in Coordinator to break potential cycles
        context.coordinator.webView = webView

        // delegates
        webView.uiDelegate = context.coordinator
        webView.navigationDelegate = context.coordinator

        // Make background transparent
        webView.setValue(false, forKey: "drawsBackground")

        // Add message handler
        webView.configuration.userContentController.add(context.coordinator, name: "channelClick")

        // Add a debugging script for media permissions
        let permissionScript = WKUserScript(
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
                """, injectionTime: .atDocumentEnd, forMainFrameOnly: true)
        webView.configuration.userContentController.addUserScript(permissionScript)

        #if DEBUG
            if #available(iOS 16.4, *) {
                webView.isInspectable = true
            }
        #endif

        // Monitor channel clicks, DMs, servers
        let channelClickScript = WKUserScript(
            source: """
                    function attachClickListener() {
                        document.addEventListener('click', function(e) {
                            // Check for channel click
                            const channel = e.target.closest('.blobContainer_a5ad63');
                            if (channel) {
                                window.webkit.messageHandlers.channelClick.postMessage({type: 'channel'});
                                return;
                            }

                            // Check for link click (e.g., DMs)
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

                            // Check for server icon click
                            const serverIcon = e.target.closest('.wrapper_f90abb');
                            if (serverIcon) {
                                window.webkit.messageHandlers.channelClick.postMessage({type: 'server'});
                            }
                        });
                    }
                    attachClickListener();
                """, injectionTime: .atDocumentEnd, forMainFrameOnly: true)
        webView.configuration.userContentController.addUserScript(channelClickScript)

        loadPluginsAndCSS(webView: webView)

        // Safely load the provided URL, fallback if invalid
        if let url = URL(string: initialURL) {
            webView.load(URLRequest(url: url))
        } else {
            // Provide some fallback or show an error page if URL is invalid
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

        return webView
    }

    func updateNSView(_ nsView: WKWebView, context: Context) {
        // *Analysis*: If you wish to update the webView here (e.g., reload or inject new CSS),
        // you can do so. Currently, no updates are necessary.
        loadPluginsAndCSS(webView: nsView)
    }

    class Coordinator: NSObject, WKScriptMessageHandler, WKUIDelegate, WKNavigationDelegate {
        // Weak reference to avoid strong reference cycles
        weak var webView: WKWebView?

        var parent: WebView

        init(_ parent: WebView) {
            self.parent = parent
        }

        // Remove script message handler on deinit to avoid potential leaks
        deinit {
            webView?.configuration.userContentController.removeScriptMessageHandler(
                forName: "channelClick")
        }

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

        func userContentController(
            _ userContentController: WKUserContentController,
            didReceive message: WKScriptMessage
        ) {}

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
            loadPluginsAndCSS(webView: Vars.webViewReference ?? webView)
        }
    }
}

func getPluginContents(name fileName: String) -> String {
    if let filePath = Bundle.main.path(forResource: fileName, ofType: "js") {
        do {
            let fileContent = try String(contentsOfFile: filePath, encoding: .utf8)

            return fileContent
        } catch {
            print("Error reading file: \(error.localizedDescription)")
        }
    }
    return ""
}
