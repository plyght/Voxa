import SwiftUI
import WebKit
import UnixDomainSocket

struct DiscordWindowContent: View {
    var channelClickWidth: CGFloat
    @AppStorage("discordReleaseChannel") private var discordReleaseChannel: String = "stable"

    // Reference to the underlying WKWebView
    @State var webViewReference: WKWebView?
    
    var body: some View {
        ZStack(alignment: .topLeading) {
            // Main background & web content
            ZStack {
                // Add a subtle system effect
                VisualEffectView(material: .sidebar, blendingMode: .behindWindow)
                
                // Embed the Discord WebView
                WebView(
                    channelClickWidth: channelClickWidth,
                    initialURL: DiscordReleaseChannel.allCases.first(where: { $0.rawValue == discordReleaseChannel })!.url,
                    webViewReference: $webViewReference
                )
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .onChange(of: webViewReference) {
                    Vars.webViewReference = webViewReference
                }
            }

            // Draggable area for traffic lights
            DraggableView()
                .frame(height: 48)
        }
        .ignoresSafeArea()
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .onDisappear {
            // *Analysis*: If you wanted to do cleanup or set webViewReference = nil, you could do so here.
            print("DiscordWindowContent disappeared.")
        }
    }
}

#Preview {
    DiscordWindowContent(channelClickWidth: 1000)
}
