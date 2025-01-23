import SwiftUI
import WebKit

struct CustomCssView: View {
    @AppStorage("customCSS") private var customCSS: String = """
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

.sidebar_a4d4d9 {
    background-color: rgb(0, 0, 0, 0.15) !important;
    border-right: solid 1px rgb(0, 0, 0, 0.3) !important;
}

.guilds_a4d4d9 {
    background-color: rgb(0, 0, 0, 0.3) !important;
    border-right: solid 1px rgb(0, 0, 0, 0.3) !important;
    padding-top: 48px;
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

.container_eedf95 {
    position: relative;
    background-color: rgba(0, 0, 0, 0.5);
}

.container_eedf95::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: none;
    filter: blur(10px);
    background-color: inherit;
    z-index: -1;
}

.container_a6d69a {
    background: transparent !important;
    background-color: transparent !important;
    backdrop-filter: blur(10px); !important;
}

.mainCard_a6d69a {
    background-color: rgb(0, 0, 0, 0.15) !important;
}
"""
    
    var body: some View {
        TextEditor(text: $customCSS)
            .padding()
            .onChange(of: customCSS) {
                Vars.webViewReference!.evaluateJavaScript("document.getElementById('voxastyle').textContent = `\(customCSS)`;")
            }
    }
}

