//
//  Plugin.swift
//  Discord
//
//  Created by vapidinfinity (esi) on 27/1/2025.
//

import Foundation

var activePlugins: [Plugin] {
    get {
        do {
            let pluginURLs = try UserDefaults.standard.decodeAndGet([URL].self, forKey: "activePluginURLs") ?? []
            return try pluginURLs.compactMap({ try Plugin(fileURL: $0) })
        } catch {
            print("Error fetching active plugins from UserDefaults: \(error)")
        }

        return []
    }
    set {
        do {
            try UserDefaults.standard.encodeAndSet(newValue.map(\.fileURL), forKey: "activePluginURLs")
        } catch {
            print("Error storing active plugins in UserDefaults: \(error)")
        }
    }
}

var availablePlugins: [Plugin] {
    guard let resources = Bundle.main.resourceURL else {
        return []
    }
    var plugins: [Plugin] = []

    let resourceContents = (try? FileManager.default.contentsOfDirectory(atPath: resources.path)) ?? []

    for file in resourceContents where file.hasSuffix(".js") {
        let fileURL = resources.appending(path: file)

        var isDir: ObjCBool = false
        if FileManager.default.fileExists(atPath: fileURL.path, isDirectory: &isDir), !isDir.boolValue {
            do {
                let plugin = try Plugin(fileURL: fileURL)
                plugins.append(plugin)
            } catch {
                print("Couldn't fetch plugin at \(fileURL.path): \(error.localizedDescription)")
            }
        }
    }

    return plugins
}

struct Plugin: Identifiable, Equatable, Codable {
    static func == (lhs: Plugin, rhs: Plugin) -> Bool {
        return lhs.fileURL == rhs.fileURL
    }

    var id: UUID = UUID()
    var name: String = "Unknown"
    var author: String = "Unknown"
    var description: String = "Unknown"
    var url: URL?

    var contents: String = ""
    var fileURL: URL

    
    init(fileURL: URL) throws {
        self.fileURL = fileURL

        let rawPlugin = try String(contentsOfFile: fileURL.path, encoding: .utf8)
        let lines = rawPlugin.split(whereSeparator: \.isNewline)

        guard
            let initialLine = lines.firstIndex(where: {(try? Regex("==[^=]+==").firstMatch(in: String($0)) != nil) ?? false }),
            let terminalLine = lines.firstIndex(where: { (try? Regex("==/[^=]+==").firstMatch(in: String($0)) != nil) ?? false })
        else {
            return
        }

        for line in lines[initialLine...terminalLine] {
            guard
                let match = try? Regex(#"@(\w+):? ([^\n]+)"#).firstMatch(in: String(line)),
                let label = match[1].substring,
                let content = match[2].substring
            else {
                continue
            }

            switch label {
            case "name":
                self.name = String(content)
            case "author":
                self.author = String(content)
            case "description":
                self.description = String(content)
            case "url":
                self.url = URL(string: String(content))
            default:
                print("Unhandled Plugin header label \"\(label)\"; ignoring.")
            }
        }

        self.contents = lines[terminalLine ..< lines.endIndex].joined(separator: "\n")
    }

    struct ExtractionError: LocalizedError {  }
}
