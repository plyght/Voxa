import SwiftUI
import WebKit

struct WebView: NSViewRepresentable {
    var channelClickWidth: CGFloat
    var initialURL: String
    var customCSS: String?
    @Binding var webViewReference: WKWebView?
    
    // Add default CSS
    private let defaultCSS = """
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
        padding-top: 48px;
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
    
    .content_a7d72e {
        background: none !important;
    }
    
    .container_a6d69a {
        background: transparent !important;
        background-color: transparent !important;
    }
    
    .mainCard_a6d69a {
        background-color: rgb(0, 0, 0, 0.15) !important;
    }
    """
    
    init(channelClickWidth: CGFloat, initialURL: String, customCSS: String? = nil) {
        self.channelClickWidth = channelClickWidth
        self.initialURL = initialURL
        self.customCSS = customCSS
        self._webViewReference = .constant(nil)
    }
    
    init(channelClickWidth: CGFloat, initialURL: String, customCSS: String? = nil, webViewReference: Binding<WKWebView?>) {
        self.channelClickWidth = channelClickWidth
        self.initialURL = initialURL
        self.customCSS = customCSS
        self._webViewReference = webViewReference
    }
    
    func makeNSView(context: Context) -> WKWebView {
        // Create configuration with custom user agent and media permissions
        let config = WKWebViewConfiguration()
        config.applicationNameForUserAgent = "Version/17.2.1 Safari/605.1.15"
        
        // Enable media capture
        config.mediaTypesRequiringUserActionForPlayback = []
        config.allowsAirPlayForMediaPlayback = true
        
        // Enable all required permissions
        if #available(macOS 14.0, *) {
            config.preferences.isElementFullscreenEnabled = true
        }
        
        // Set media permissions using setValue
        config.preferences.setValue(true, forKey: "mediaDevicesEnabled")
        config.preferences.setValue(true, forKey: "mediaStreamEnabled")
        config.preferences.setValue(true, forKey: "peerConnectionEnabled")
        config.preferences.setValue(true, forKey: "screenCaptureEnabled")
        
        // Create webview with configuration
        let webView = WKWebView(frame: .zero, configuration: config)
        webViewReference = webView
        webView.uiDelegate = context.coordinator
        
        // Make webview background transparent
        webView.setValue(false, forKey: "drawsBackground")
        
        // Configure WKWebView to handle messages from JavaScript
        webView.configuration.userContentController.add(context.coordinator, name: "channelClick")
        
        // Modify permission request script to be more conservative
        let permissionScript = WKUserScript(source: """
            // Override the getUserMedia to handle permissions when actually needed
            const originalGetUserMedia = navigator.mediaDevices.getUserMedia;
            navigator.mediaDevices.getUserMedia = async function(constraints) {
                console.log('getUserMedia requested with constraints:', constraints);
                return originalGetUserMedia.call(navigator.mediaDevices, constraints);
            };
            
            // Override enumerateDevices to only work when permissions are granted
            const originalEnumerateDevices = navigator.mediaDevices.enumerateDevices;
            navigator.mediaDevices.enumerateDevices = async function() {
                console.log('enumerateDevices requested');
                return originalEnumerateDevices.call(navigator.mediaDevices);
            };
        """, injectionTime: .atDocumentEnd, forMainFrameOnly: true)
        
        webView.configuration.userContentController.addUserScript(permissionScript)
        
        // Load Discord and inject CSS
        let url = URL(string: initialURL)!
        let request = URLRequest(url: url)
        
        // Add channel click monitoring JavaScript
        let channelClickScript = WKUserScript(source: """
            function attachClickListener() {
                document.addEventListener('click', function clickHandler(e) {
                    // Check for user click
                    const channel = e.target.closest('.blobContainer_a5ad63');
                    if (channel) {
                        window.webkit.messageHandlers.channelClick.postMessage({type: 'channel'});
                        return;
                    }
                    
                    // Check for link click
                    const link = e.target.closest('.link_c91bad');
                    if (link) {
                        e.preventDefault(); // Prevent default navigation
                        let href = link.getAttribute('href') || link.href || '/channels/@me';
                        // Prepend discord.com if href starts with /
                        if (href.startsWith('/')) {
                            href = 'https://discord.com' + href;
                        }
                        console.log('Link clicked with href:', href); // Debug log
                        window.webkit.messageHandlers.channelClick.postMessage({
                            type: 'user',
                            url: href
                        });
                        return;
                    }
                    
                    // Check for server/blob click
                    const serverIcon = e.target.closest('.wrapper_f90abb');
                    if (serverIcon) {
                        window.webkit.messageHandlers.channelClick.postMessage({type: 'server'});
                    }
                });
            }
            
            // Initial attachment
            attachClickListener();
        """, injectionTime: .atDocumentEnd, forMainFrameOnly: true)
        
        webView.configuration.userContentController.addUserScript(channelClickScript)
        
        // Use custom CSS if provided, otherwise use default CSS
        let cssToUse = customCSS ?? defaultCSS
        
        // Initial CSS injection
        let initialScript = WKUserScript(source: """
            const style = document.createElement('style');
            style.textContent = `\(cssToUse)`;
            document.head.appendChild(style);
        """, injectionTime: .atDocumentEnd, forMainFrameOnly: true)
        
        webView.configuration.userContentController.addUserScript(initialScript)
        webView.load(request)
        
        return webView
    }
    
    func updateNSView(_ nsView: WKWebView, context: Context) {}
    
    // Add coordinator to handle messages from JavaScript
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    // Update Coordinator to implement WKUIDelegate
    class Coordinator: NSObject, WKScriptMessageHandler, WKUIDelegate {
        var parent: WebView
        var extraWindow: NSWindow?
        
        init(_ parent: WebView) {
            self.parent = parent
        }
        
        // Updated permission handling for newer macOS versions
        @available(macOS 12.0, *)
        func webView(_ webView: WKWebView,
                    requestMediaCapturePermissionFor origin: WKSecurityOrigin,
                    initiatedByFrame frame: WKFrameInfo,
                    type: WKMediaCaptureType,
                    decisionHandler: @escaping (WKPermissionDecision) -> Void) {
            print("Requesting permission for media type:", type)
            decisionHandler(.grant)
        }
        
        // Fallback for older macOS versions
        func webView(_ webView: WKWebView, 
                    runOpenPanelWith parameters: WKOpenPanelParameters,
                    initiatedByFrame frame: WKFrameInfo,
                    completionHandler: @escaping ([URL]?) -> Void) {
            completionHandler(nil)
        }
        
        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            if message.name == "channelClick" {
                DispatchQueue.main.async {
                    if let window = NSApplication.shared.windows.first,
                       let messageDict = message.body as? [String: Any],
                       let type = messageDict["type"] as? String {
                        
                        switch type {
                        case "server":
                            self.resizeMainWindow(window, to: 313)
                        case "channel":
                            self.resizeMainWindow(window, to: self.parent.channelClickWidth)
                        case "user":
                            self.resizeMainWindow(window, to: 313)
                            if let url = messageDict["url"] as? String {
                                self.handleLinkClick(relativeTo: window, url: url)
                            }
                        default:
                            break
                        }
                    }
                }
            }
        }
        
        private func resizeMainWindow(_ window: NSWindow, to width: CGFloat) {
            let frame = window.frame
            window.setFrame(NSRect(x: frame.origin.x,
                                 y: frame.origin.y,
                                 width: width,
                                 height: frame.height),
                           display: true,
                           animate: true)
        }
        
        private func handleLinkClick(relativeTo window: NSWindow, url: String) {
            // If extra window already exists, update its URL and bring it to front
            if let existing = extraWindow,
               let contentView = existing.contentView as? NSHostingView<DiscordWindowContent>,
               let webView = contentView.rootView.webViewReference {
                // Create and load the new request
                let newRequest = URLRequest(url: URL(string: url)!)
                webView.load(newRequest)
                
                // Bring window to front after loading new URL
                existing.makeKeyAndOrderFront(nil)
                return
            }
            
            // Create new window using SwiftUI window management
            let windowController = SecondaryWindowController(url: url, channelClickWidth: self.parent.channelClickWidth)
            extraWindow = windowController.window
            windowController.showWindow(nil)
            
            // Position relative to main window
            if let newWindow = extraWindow {
                let frame = window.frame
                newWindow.setFrameOrigin(NSPoint(
                    x: frame.maxX + 20,
                    y: frame.maxY - 600
                ))
            }
            
            // Add window close observer
            if let newWindow = extraWindow {
                NotificationCenter.default.addObserver(
                    forName: NSWindow.willCloseNotification,
                    object: newWindow,
                    queue: .main) { [weak self] _ in
                        self?.extraWindow = nil
                }
            }
        }
    }
} 
