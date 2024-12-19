import SwiftUI
import WebKit

struct DiscordWindowContent: View {
    var channelClickWidth: CGFloat
    var initialURL: String = "https://discord.com/channels/@me"
    var customCSS: String?
    @State var webViewReference: WKWebView?
    
    var body: some View {
        ZStack(alignment: .top) {
            // Main content spans full window
            ZStack {
                VisualEffectView(material: .sidebar, blendingMode: .behindWindow)
                WebView(channelClickWidth: channelClickWidth, 
                       initialURL: initialURL,
                       customCSS: customCSS,
                       webViewReference: $webViewReference)
            }
            
            // Invisible draggable title bar overlaid on top
            DraggableView()
                .frame(height: 48)
                .frame(maxWidth: .infinity)
        }
        .ignoresSafeArea()
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
} 
