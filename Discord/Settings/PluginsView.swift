import SwiftUI
import WebKit

struct PluginsView: View {
    @State public var pluginsChanged: Bool = false
    
    var body: some View {
        ScrollView {
            GroupBox() {
                VStack {
                    let pluginIds = Vars.plugins.keys.sorted()
                    
                    ForEach(pluginIds.indices, id: \.self) { index in
                        let pluginId = pluginIds[index]
                        
                        if let pluginMetadata = Vars.plugins[pluginId] {
                            PluginList(plugin: pluginMetadata, pluginId: pluginId, showDivider: index != pluginIds.count - 1, pluginsChanged: $pluginsChanged)
                        }
                    }
                }
                .padding(4)
            }
            .padding(.horizontal)
            if (pluginsChanged) {
                GroupBox {
                    HStack {
                        Text("Refresh Voxa to Apply Changes")
                        Spacer()
                        Button("Refresh") {
                            hardReloadWebView(webView: Vars.webViewReference!)
                        }
                    }
                    .padding(4)
                }
                .padding(.horizontal)
                .padding(.bottom)
            }
        }
        .padding(.top)
    }
}

var activePlugins: [String] = []

struct PluginList: View {
    let plugin: [String: String]
    let pluginId: String
    let showDivider: Bool
    
    @Binding var pluginsChanged: Bool
    
    @AppStorage("activePlugins") private var activePluginsData: Data = Data()
    
    init (plugin: [String: String], pluginId: String, showDivider: Bool, pluginsChanged: Binding<Bool>) {
        self.plugin = plugin
        self.pluginId = pluginId
        self.showDivider = showDivider
        self._pluginsChanged = pluginsChanged
        
        activePlugins = dataToArray(stringArrayData: activePluginsData) ?? []
    }
    
    var body: some View {
        HStack {
            Form {
                Section {
                    Text(plugin["name"] ?? "Unknown")
                } footer: {
                    Text("By: " + (plugin["author"] ?? "An error occurred while trying to load the plugin.")).font(.system(size: 12, weight: .light))
                    Text(plugin["description"] ?? "An error occurred while trying to load the plugin.").font(.system(size: 10, weight: .light))
                }
            }
            Spacer()
            if (plugin["url"] != nil) {
                Button(action: {
                    let url = URL(string: plugin["url"] ?? "http://voxa.peril.lol")!
                    NSWorkspace.shared.open(url)
                }) {
                    Image(systemName: "globe")
                        .foregroundColor(.blue)
                }.buttonStyle(PlainButtonStyle())
            }
            Toggle("", isOn: Binding(
                get: { activePlugins.contains(pluginId) },
                set: { isActive in
                    if isActive {
                        activePlugins.append(pluginId)
                    } else {
                        activePlugins.removeAll { $0 == pluginId }
                    }
                    activePluginsData = arrayToData(array: activePlugins)
                    pluginsChanged = true
                }
            ))
                .toggleStyle(.switch)
                .controlSize(.mini)
        }
        if showDivider {
            Divider()
        }
    }
}
