import SwiftUI

struct GeneralView: View {
    @AppStorage("discordUsesSystemAccent") private var fullSystemAccent: Bool = true
    @AppStorage("discordSidebarDividerUsesSystemAccent") private var sidebarDividerSystemAccent: Bool = true


    var body: some View {
        ScrollView {
            Form {
                HStack {
                    Text("Join The Discord")
                    Spacer()
                    Button("Join Discord") {
                        let link = URL(string:"https://discord.gg/Dps8HnDBpw")!
                        let request = URLRequest(url: link)
                        Vars.webViewReference!.load(request)
                    }
                }

                HStack {
                    Text("Support Us On GitHub")
                    Spacer()
                    Button("Go To Voxa's GitHub") {
                        let url = URL(string: "https://github.com/plyght/Voxa")!
                        NSWorkspace.shared.open(url)
                    }
                }

                Toggle(isOn: $fullSystemAccent) {
                    Text("Voxa matches system accent color")
                    Text("Modifying this setting will reload Voxa.")
                        .foregroundStyle(.placeholder)
                }
                .onChange(of: fullSystemAccent, { hardReloadWebView(webView: Vars.webViewReference!) })

                Toggle(isOn: $sidebarDividerSystemAccent) {
                    Text("Sidebar divider matches system accent color")
                    Text("Modifying this setting will reload Voxa.")
                        .foregroundStyle(.placeholder)
                }
                .onChange(of: sidebarDividerSystemAccent, { hardReloadWebView(webView: Vars.webViewReference!) })

            }
            .formStyle(.grouped)
        }
    }
}

#Preview {
    GeneralView()
}
