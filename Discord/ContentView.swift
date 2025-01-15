//
//  ContentView.swift
//  Discord
//
//  Created by Austin Thomas on 24/11/2024.
//

import SwiftUI
import AppKit

struct ContentView: View {
    // *Analysis*: Add minimal logging or user guidance
    var body: some View {
        // If you wanted a small text area or overlay, you could do it here
        DiscordWindowContent(channelClickWidth: 1000)
            .onAppear {
                print("ContentView has appeared.")
            }
    }
}

struct DraggableView: NSViewRepresentable {
    func makeNSView(context: Context) -> NSView {
        let view = DragView()
        view.wantsLayer = true
        view.layer?.backgroundColor = NSColor.systemBlue.withAlphaComponent(0.5).cgColor // Semi-transparent for visibility

        // Ensure the view is above others and can receive mouse events
        view.translatesAutoresizingMaskIntoConstraints = false
        view.layer?.zPosition = 999
        return view
    }

    func updateNSView(_ nsView: NSView, context: Context) {}
}

class DragView: NSView {
    override var mouseDownCanMoveWindow: Bool { true }

    override var allowsVibrancy: Bool { true }

    // determine if the view should handle the mouse event or fall through
    override func hitTest(_ point: NSPoint) -> NSView? {
        if let currentEvent = NSApplication.shared.currentEvent {
            switch currentEvent.type {
            case .leftMouseDown, .leftMouseDragged:
                return self
            default:
                return nil
            }
        }
        return nil
    }

    override func mouseDown(with event: NSEvent) {
        // Initiate window dragging
        window?.performDrag(with: event)
    }
}

struct VisualEffectView: NSViewRepresentable {
    let material: NSVisualEffectView.Material
    let blendingMode: NSVisualEffectView.BlendingMode

    func makeNSView(context: Context) -> NSVisualEffectView {
        let visualEffectView = NSVisualEffectView()
        visualEffectView.material = material
        visualEffectView.blendingMode = blendingMode
        return visualEffectView
    }

    func updateNSView(_ visualEffectView: NSVisualEffectView, context: Context) {
        visualEffectView.material = material
        visualEffectView.blendingMode = blendingMode
    }
}

#Preview {
    ContentView()
}
