import SwiftUI

struct GeneralView: View {
    @AppStorage("sidebarDividerAccentColor") private var sidebarDividerAccentColor: Bool = true
    @State private var sidebarDividerAccentColorToggleChanged = false

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
                    if sidebarDividerAccentColorToggleChanged {
                        Text("Relaunch Voxa for this setting to take effect.")
                            .foregroundStyle(.placeholder)
                    }
                }
                    .toggleStyle(.switch)
                    .onChange(of: sidebarDividerAccentColor) {
                        withAnimation {
                            sidebarDividerAccentColorToggleChanged = true
                        }
                    }
            }
            .formStyle(.grouped)
        }
    }
}

#Preview {
    GeneralView()
}
