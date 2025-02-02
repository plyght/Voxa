import SwiftUI

struct GeneralView: View {
    @AppStorage("discordUsesSystemAccent") private var fullSystemAccent: Bool = true
    @AppStorage("discordSidebarDividerUsesSystemAccent") private var sidebarDividerSystemAccent: Bool = true
    @AppStorage("discordReleaseChannel") private var discordReleaseChannel: String = "stable"
    @State private var discordReleaseChannelSelection: DiscordReleaseChannel = .stable

    // ===== PROXY SUPPORT ADDED =====
    @AppStorage("useDiscordProxy") private var useDiscordProxy: Bool = false
    @AppStorage("discordProxyAddress") private var discordProxyAddress: String = ""
    // ================================

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

                Picker(selection: $discordReleaseChannelSelection, content: {
                    ForEach(DiscordReleaseChannel.allCases, id: \.self) {
                        Text($0.description)
                    }
                }, label: {
                    Text("Discord Release Channel")
                    Text("Modifying this setting will reload Voxa.")
                        .foregroundStyle(.placeholder)
                })
                .onChange(of: discordReleaseChannelSelection) {
                    switch discordReleaseChannelSelection {
                    case .stable:
                        discordReleaseChannel = "stable"
                    case .PTB:
                        discordReleaseChannel = "ptb"
                    case .canary:
                        discordReleaseChannel = "canary"
                    }
                }
                .onChange(of: discordReleaseChannelSelection, { hardReloadWebView(webView: Vars.webViewReference!) })
                
                // ===== PROXY SUPPORT ADDED =====
                Section(header: Text("Proxy Settings")) {
                    Toggle("Use Proxy for Discord", isOn: $useDiscordProxy)
                    if useDiscordProxy {
                        TextField("Enter proxy URL (e.g. http://proxy.example.com:8080)",
                                  text: $discordProxyAddress)
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                    }
                }
                // ================================
            }
            .formStyle(.grouped)
        }
    }
}

#Preview {
    GeneralView()
}
