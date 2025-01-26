import SwiftUI

struct GeneralView: View {
    @AppStorage("sidebarDividerAccentColor") private var sidebarDividerAccentColor: Bool = true

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

                Toggle(isOn: $sidebarDividerAccentColor) {
                    Text("Sidebar divider matches system accent color")
                    Text("Modifying this setting will reload Voxa.")
                        .foregroundStyle(.placeholder)
                }
                    .toggleStyle(.switch)
                    .onChange(of: sidebarDividerAccentColor, { hardReloadWebView(webView: Vars.webViewReference!) })
            }
            .formStyle(.grouped)
        }
    }
}

#Preview {
    GeneralView()
}
