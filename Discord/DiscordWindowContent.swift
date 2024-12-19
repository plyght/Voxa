import SwiftUI
import WebKit

struct DiscordWindowContent: View {
    var channelClickWidth: CGFloat
    var initialURL: String = "https://discord.com/channels/@me"
    var customCSS: String?
    @State var webViewReference: WKWebView?
    
    var body: some View {
        ZStack(alignment: .topLeading) {
            // Main content spans full window
            ZStack {
                VisualEffectView(material: .sidebar, blendingMode: .behindWindow)
                WebView(channelClickWidth: channelClickWidth,
                        initialURL: initialURL,
                        customCSS: customCSS,
                        webViewReference: $webViewReference)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
            
            // Make the draggable area smaller so that it doesn't cover the entire top bar
            // Only cover the area around the traffic lights, leaving the rest of the top bar clickable.
            DraggableView()
                .frame(width: 70, height: 48)
        }
        .ignoresSafeArea()
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}
