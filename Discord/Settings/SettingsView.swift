import SwiftUI

struct SettingsView: View {
    @State private var selectedItem: String? = "general"
    
    var body: some View {
        NavigationSplitView(columnVisibility: .constant(.doubleColumn)) {
            List(selection: $selectedItem) {
                NavigationLink(value: "general") {
                    Label("General", systemImage: "gear")
                }
                NavigationLink(value: "plugins") {
                    Label("Plugins", systemImage: "puzzlepiece.extension")
                }
                NavigationLink(value: "customcss") {
                    Label("Custom CSS", systemImage: "paintbrush")
                }
            }
            .padding(.top)
            .frame(width: 215)
            .toolbar(removing: .sidebarToggle)
        } detail: {
            switch selectedItem {
            case "general": GeneralView()
            case "plugins": PluginsView()
            case "customcss": CustomCSSView()
            default: Text("")
            }
        }
        .frame(minWidth: 715, maxWidth: 715, minHeight: 470, maxHeight: .infinity)
    }
}
