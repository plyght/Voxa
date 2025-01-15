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
    class Coordinator: NSObject {
        @objc func handlePanGesture(_ gesture: NSPanGestureRecognizer) {
            guard let window = gesture.view?.window, let event = NSApp.currentEvent else { return }

            switch gesture.state {
            case .began, .changed:
                window.performDrag(with: event)
            default:
                break
            }
        }
    }

    func makeNSView(context: Context) -> NSView {
        let view = NSView()
        view.wantsLayer = true
        view.layer?.backgroundColor = .clear

        // Ensure the view is above others and can receive mouse events
        view.translatesAutoresizingMaskIntoConstraints = false
        view.layer?.zPosition = 999

        let panGesture = NSPanGestureRecognizer(
            target: context.coordinator,
            action: #selector(Coordinator.handlePanGesture(_:))
        )
        panGesture.allowedTouchTypes = [.direct]
        view.addGestureRecognizer(panGesture)

        return view
    }

    func updateNSView(_ nsView: NSView, context: Context) {}

    func makeCoordinator() -> Coordinator {
        Coordinator()
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
