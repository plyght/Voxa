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
        
        // Permission script
        let permissionScript = WKUserScript(source: """
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
        
        // Channel click monitoring script
        let channelClickScript = WKUserScript(source: """
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
        
        // Use custom CSS if provided, otherwise use default CSS
        let cssToUse = customCSS ?? defaultCSS
        let initialScript = WKUserScript(source: """
            const style = document.createElement('style');
            style.textContent = `\(cssToUse)`;
            document.head.appendChild(style);
        """, injectionTime: .atDocumentEnd, forMainFrameOnly: true)
        
        webView.configuration.userContentController.addUserScript(initialScript)
        
        // Load Discord
        let url = URL(string: initialURL)!
        let request = URLRequest(url: url)
        webView.load(request)
        
        return webView
    }
    
    func updateNSView(_ nsView: WKWebView, context: Context) {}
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    class Coordinator: NSObject, WKScriptMessageHandler, WKUIDelegate {
        var parent: WebView
        
        init(_ parent: WebView) {
            self.parent = parent
        }
        
        @available(macOS 12.0, *)
        func webView(_ webView: WKWebView,
                     requestMediaCapturePermissionFor origin: WKSecurityOrigin,
                     initiatedByFrame frame: WKFrameInfo,
                     type: WKMediaCaptureType,
                     decisionHandler: @escaping (WKPermissionDecision) -> Void) {
            print("Requesting permission for media type:", type)
            decisionHandler(.grant)
        }
        
        func webView(_ webView: WKWebView,
                     runOpenPanelWith parameters: WKOpenPanelParameters,
                     initiatedByFrame frame: WKFrameInfo,
                     completionHandler: @escaping ([URL]?) -> Void) {
            completionHandler(nil)
        }
        
        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            guard let messageDict = message.body as? [String: Any],
                  let type = messageDict["type"] as? String else { return }
            
            switch type {
            case "server":
                // No window resizing; just load in place if needed.
                // The server panel is already part of the current UI, so do nothing.
                break
                
            case "channel":
                // Load channel in the same window if needed.
                // Channels are also already within the main UI context.
                break
                
            case "user":
                if let urlString = messageDict["url"] as? String, let url = URL(string: urlString) {
                    // Instead of opening a new window, just load the URL in the main webView
                    parent.webViewReference?.load(URLRequest(url: url))
                }
                
            default:
                break
            }
        }
    }
}
