import SwiftUI

struct GeneralView: View {
    var body: some View {
        ScrollView {
            GroupBox {
                HStack {
                    Text("Join The Discord")
                    Spacer()
                    Button("Join Discord") {
                        let link = URL(string:"https://discord.gg/Dps8HnDBpw")!
                        let request = URLRequest(url: link)
                        Vars.webViewReference!.load(request)
                    }
                }
                .padding(4)
            }
            .padding(.horizontal)
            GroupBox {
                HStack {
                    Text("Support Us On GitHub")
                    Spacer()
                    Button("Go To Voxa's GitHub") {
                        let url = URL(string: "https://github.com/plyght/Voxa")!
                        NSWorkspace.shared.open(url)
                    }
                }
                .padding(4)
            }
            .padding(.horizontal)
            .padding(.bottom)
        }
        .padding(.top)
    }
}
