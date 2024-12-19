import SwiftUI
import AppKit
import WebKit

class SecondaryWindow: NSWindow {
    override func awakeFromNib() {
        super.awakeFromNib()
        positionTrafficLights()
    }
    
    override func setFrame(_ frameRect: NSRect, display flag: Bool, animate animateFlag: Bool) {
        super.setFrame(frameRect, display: flag, animate: animateFlag)
        positionTrafficLights()
    }
    
    override func makeKeyAndOrderFront(_ sender: Any?) {
        super.makeKeyAndOrderFront(sender)
        positionTrafficLights()
    }
    
    override func makeKey() {
        super.makeKey()
        positionTrafficLights()
    }
    
    override func makeMain() {
        super.makeMain()
        positionTrafficLights()
    }
    
    private func positionTrafficLights() {
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            
            // Force layout if needed
            self.layoutIfNeeded()
            
            // Position each button with a slight delay to ensure they're ready
            let buttons: [(NSWindow.ButtonType, CGPoint)] = [
                (.closeButton, NSPoint(x: 10, y: -5)),
                (.miniaturizeButton, NSPoint(x: 30, y: -5)),
                (.zoomButton, NSPoint(x: 50, y: -5))
            ]
            
            for (buttonType, point) in buttons {
                if let button = self.standardWindowButton(buttonType) {
                    button.isHidden = false
                    button.setFrameOrigin(point)
                }
            }
        }
    }
}

class SecondaryWindowController: NSWindowController {
    convenience init(url: String, channelClickWidth: CGFloat) {
        let window = SecondaryWindow(
            contentRect: NSRect(x: 0, y: 0, width: 800, height: 600),
            styleMask: [.titled, .closable, .miniaturizable, .resizable, .fullSizeContentView],
            backing: .buffered,
            defer: false
        )
        
        // Configure window appearance
        window.titlebarAppearsTransparent = true
        window.titleVisibility = .hidden
        window.toolbarStyle = .unifiedCompact
        window.backgroundColor = .clear
        
        // Create custom CSS for secondary windows
        let secondaryCSS = """
        :root {
            --background-accent: rgb(0, 0, 0, 0.5) !important;
            --background-floating: transparent !important;
            --background-message-highlight: transparent !important;
            --background-message-highlight-hover: transparent !important;
            --background-message-hover: transparent !important;
            --background-mobile-primary: transparent !important;
            --background-mobile-secondary: transparent !important;
            --background-modifier-accent: transparent !important;
            --background-modifier-active: transparent !important;
            --background-modifier-hover: transparent !important;
            --background-modifier-selected: transparent !important;
            --background-nested-floating: transparent !important;
            --background-primary: transparent !important;
            --background-secondary: transparent !important;
            --background-secondary-alt: transparent !important;
            --background-tertiary: transparent !important;
            --bg-overlay-3: transparent !important;
            --channeltextarea-background: transparent !important;
        }
        
        /* Hide sidebar and guilds list */
        .sidebar_a4d4d9,
        .guilds_a4d4d9 {
            display: none !important;
        }
        
        /* Add padding to upper container */
        .upperContainer_fc4f04 {
            padding-left: 60px !important;
        }
        
        .theme-dark .themed_fc4f04 {
            background-color: transparent !important;
        }
        
        .channelTextArea_a7d72e {
            background-color: rgb(0, 0, 0, 0.15) !important;
        }
        
        .button_df39bd {
            background-color: rgb(0, 0, 0, 0.15) !important;
        }
        
        .chatContent_a7d72e {
            background-color: transparent !important;
            background: transparent !important;
        }
        
        .chat_a7d72e {
            background: transparent !important;
        }
        
        .content_a7d72e {
            background: none !important;
        }
        
        .container_a6d69a {
            background: transparent !important;
            background-color: transparent !important;
        }
        
        .mainCard_a6d69a {
            background-color: rgb(0, 0, 0, 0.15) !important;
        }
        """
        
        // Create the SwiftUI view for the window with custom CSS
        let contentView = SecondaryWindowView(url: url, channelClickWidth: channelClickWidth, customCSS: secondaryCSS)
        window.contentView = NSHostingView(rootView: contentView)
        
        self.init(window: window)
        
        // Use the shared window delegate from AppDelegate
        if let appDelegate = NSApplication.shared.delegate as? AppDelegate {
            window.delegate = appDelegate.windowDelegate
        }
        
        // Ensure traffic lights are visible
        window.standardWindowButton(.closeButton)?.isHidden = false
        window.standardWindowButton(.miniaturizeButton)?.isHidden = false
        window.standardWindowButton(.zoomButton)?.isHidden = false
    }
}

struct SecondaryWindowView: View {
    let url: String
    let channelClickWidth: CGFloat
    let customCSS: String
    
    var body: some View {
        DiscordWindowContent(channelClickWidth: channelClickWidth,
                           initialURL: url,
                           customCSS: customCSS)
            .frame(minWidth: 200, minHeight: 200)
    }
}

struct SecondaryWindowScene: Scene {
    let url: String
    let channelClickWidth: CGFloat
    
    var body: some Scene {
        WindowGroup {
            SecondaryWindowView(url: url, channelClickWidth: channelClickWidth, customCSS: "")
        }
        .windowStyle(.hiddenTitleBar)
        .windowResizability(.contentSize)
        .defaultPosition(.center)
        .defaultSize(width: 800, height: 600)
    }
}
