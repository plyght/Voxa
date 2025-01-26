//
//  DiscordApp.swift
//  Discord
//
//  Created by Austin Thomas on 24/11/2024.
//

import AppKit
import Foundation
import SwiftUI

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

    var body: some Scene {
        WindowGroup {
            ContentView()
                .frame(minWidth: 800, minHeight: 400)
                .onAppear {
                    // Use a guard to ensure there's a main screen
                    if NSScreen.main == nil {
                        print("No available main screen to set initial window frame.")
                        return
                    }

                    // If there's a main application window, configure it
                    if let window = NSApplication.shared.windows.first {
                        // Configure window for resizing
                        window.styleMask.insert(.resizable)

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
