import SwiftUI
import WebKit

struct DiscordWindowContent: View {
    var channelClickWidth: CGFloat
    var initialURL: String = "https://discord.com/channels/@me"
    var customCSS: String?
    @AppStorage("FakeNitro") var fakeNitro: Bool = false
    
    // Reference to the underlying WKWebView
    @State var webViewReference: WKWebView?
    
    var body: some View {
        ZStack(alignment: .topLeading) {
            // Main background & web content
            ZStack {
                // Add a subtle system effect
                VisualEffectView(material: .sidebar, blendingMode: .behindWindow)
                
                // Embed the Discord WebView
                WebView(channelClickWidth: channelClickWidth,
                        initialURL: initialURL,
                        customCSS: customCSS,
                        webViewReference: $webViewReference)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .onChange(of: fakeNitro) {
                        guard let webView = webViewReference else { return }
                        if fakeNitro {
                            enableFakeNitro(webView)
                        } else {
                            disableFakeNitro(webView)
                        }
                    }
            }
            
            // Draggable area for traffic lights
            DraggableView()
                .frame(width: 70, height: 48)
        }
        .ignoresSafeArea()
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .onDisappear {
            // *Analysis*: If you wanted to do cleanup or set webViewReference = nil, you could do so here.
            print("DiscordWindowContent disappeared.")
        }
    }
}

func disableFakeNitro(_ webView: WKWebView) {
    let script = "disableFNitro();"
    webView.reload()
    webView.configuration.userContentController.addUserScript(WKUserScript(source: script, injectionTime: .atDocumentEnd, forMainFrameOnly: true))
}

func enableFakeNitro(_ webView: WKWebView) {
    let script = "enableFNitro();"
    webView.reload()
    webView.configuration.userContentController.addUserScript(WKUserScript(source: script, injectionTime: .atDocumentEnd, forMainFrameOnly: true))
}
