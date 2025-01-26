import SwiftUI
import WebKit

struct PluginsView: View {
    @State public var pluginsChanged: Bool = false

    var body: some View {
        Form {
            ForEach(availablePlugins) { plugin in
                PluginListItem(
                    plugin: plugin,
                    pluginsChanged: $pluginsChanged
                )
            }
        }
        .formStyle(.grouped)

        if pluginsChanged {
            Form {
                HStack {
                    Text("Refresh Voxa to Apply Changes")
                    Spacer()
                    Button("Refresh") {
                        hardReloadWebView(webView: Vars.webViewReference!)

                        withAnimation {
                            pluginsChanged = false
                        }
                    }
                }
            }
            .formStyle(.grouped)
        }
    }
}

struct PluginListItem: View {
    let plugin: Plugin
    @Binding var pluginsChanged: Bool

    var body: some View {
        Toggle(
            isOn: Binding(
                get: { activePlugins.contains(plugin) },
                set: { isActive in
                    if isActive {
                        activePlugins.append(plugin)
                    } else {
                        activePlugins.removeAll(where: { $0 == plugin })
                    }

                    withAnimation {
                        pluginsChanged = true
                    }
                }
            )
        ) {
            Section {
                HStack {
                    Text(plugin.name)
                        .foregroundStyle(.primary)

                    if let url = plugin.url {
                        Button {
                            NSWorkspace.shared.open(url)
                        } label: {
                            Image(systemName: "globe")
                                .foregroundColor(.blue)
                        }
                        .buttonStyle(.plain)
                    }
                }
            } footer: {
                Text(plugin.author)
                    .foregroundStyle(.secondary)
                Text(plugin.description)
                    .foregroundStyle(.tertiary)
            }
        }
    }
}

#Preview {
    PluginsView()
}
