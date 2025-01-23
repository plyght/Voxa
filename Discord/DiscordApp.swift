//
//  DiscordApp.swift
//  Discord
//
//  Created by Austin Thomas on 24/11/2024.
//

import SwiftUI
import AppKit
import Foundation

class WindowDelegate: NSObject, NSWindowDelegate {
    func windowDidResize(_ notification: Notification) {
        repositionTrafficLights(for: notification)
    }
    
    func windowDidEndLiveResize(_ notification: Notification) {
        repositionTrafficLights(for: notification)
    }
    
    func windowDidMove(_ notification: Notification) {
        repositionTrafficLights(for: notification)
    }
    
    func windowDidLayout(_ notification: Notification) {
        repositionTrafficLights(for: notification)
    }
    
    func windowDidBecomeKey(_ notification: Notification) {
        repositionTrafficLights(for: notification)
    }
    
    private func repositionTrafficLights(for notification: Notification) {
        guard let window = notification.object as? NSWindow else { return }
        
        let repositionBlock = {
            window.standardWindowButton(.closeButton)?.isHidden = false
            window.standardWindowButton(.miniaturizeButton)?.isHidden = false
            window.standardWindowButton(.zoomButton)?.isHidden = false
            
            // Position traffic lights
            window.standardWindowButton(.closeButton)?.setFrameOrigin(NSPoint(x: 10, y: -5))
            window.standardWindowButton(.miniaturizeButton)?.setFrameOrigin(NSPoint(x: 30, y: -5))
            window.standardWindowButton(.zoomButton)?.setFrameOrigin(NSPoint(x: 50, y: -5))
        }
        
        // Execute immediately
        repositionBlock()
        
        // And after a slight delay (0.1 s) to catch any animation completions
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
            repositionBlock()
        }
    }
}

@main
struct DiscordApp: App {
    @NSApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    
    func extractMetadata(from plugin: String) -> ([String: String]) {
        var metadata = [String: String]()
        
        let lines = plugin.components(separatedBy: "\n")

        for line in lines {
            if line.contains ("==/VoxaPlugin==") {
                return metadata
            }
            
            if line.trimmingCharacters(in: .whitespaces).starts(with: "// @") {
                let cleanedLine = line.replacingOccurrences(of: "// @", with: "").trimmingCharacters(in: .whitespaces)
                if let separatorIndex = cleanedLine.firstIndex(of: ":") {
                    let key = String(cleanedLine[..<separatorIndex]).trimmingCharacters(in: .whitespaces)
                    let value = String(cleanedLine[cleanedLine.index(after: separatorIndex)...]).trimmingCharacters(in: .whitespaces)
                    metadata[key] = value
                }
            }
        }
        
        return metadata
    }
    
    init() {
        if let resourcePath = Bundle.main.resourcePath {
            let fileManager = FileManager.default
            
            do {
                let files = try fileManager.contentsOfDirectory(atPath: resourcePath)
				let possiblePluginFiles = files.filter { $0.hasSuffix(".js") }
                
                for file in possiblePluginFiles {
                    // Build the full file path
                    let filePath = (resourcePath as NSString).appendingPathComponent(file)
                    
                    // Check if it's a file (not a directory)
                    var isDir: ObjCBool = false
                    if fileManager.fileExists(atPath: filePath, isDirectory: &isDir), !isDir.boolValue {
						do {
							let script = try String(contentsOfFile: filePath, encoding: .utf8)
							var metadata = extractMetadata(from: script)
							let pathWithoutExtension = (file as NSString).deletingPathExtension
							let id = pathWithoutExtension.lowercased()

							metadata["pathWithoutExtension"] = pathWithoutExtension
							
							Vars.plugins[id] = metadata
						} catch {
							print("Couldn't load plugin \(filePath): \(error.localizedDescription)")
						}
                    }
                }
            } catch {
                print("Error reading files from Bundle: \(error.localizedDescription)")
            }
        } else {
            print("Could not find the resource path in Bundle.main.")
        }
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .onAppear {
                    // Use a guard to ensure there's a main screen
                    if (NSScreen.main == nil) {
                        print("No available main screen to set initial window frame.")
                        return
                    }
                    
                    // If there's a main application window, configure it
                    if let window = NSApplication.shared.windows.first {
						// Get the visible frame of the main screen
						let screenFrame = NSScreen.main?.visibleFrame ?? .zero
						
						// Set the window frame to match the screen's visible frame
						window.setFrame(screenFrame, display: true)
						
						// Configure window for resizing
						window.styleMask.insert(.resizable)
						
						// Optionally, set min/max sizes if needed
						window.minSize = NSSize(width: 600, height: 400)
						
						// Disable frame autosaving
						window.setFrameAutosaveName("")
						
						// Assign delegate for traffic light positioning
						window.delegate = appDelegate.windowDelegate
                    }
                }
        }
        .windowStyle(.hiddenTitleBar)
		.commands {
			CommandGroup(replacing: .newItem) {
				Button("Reload") {
					hardReloadWebView(webView: Vars.webViewReference!)
				}
				.keyboardShortcut("r", modifiers: .command)
			}
		}
        
        Settings {
            SettingsView()
        }
    }
}

class AppDelegate: NSObject, NSApplicationDelegate {
    let windowDelegate = WindowDelegate()
}
