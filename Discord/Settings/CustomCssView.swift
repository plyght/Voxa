import SwiftUI
import WebKit

struct CustomCssView: View {
    @AppStorage("customCSS") private var customCSS: String = ""

    var body: some View {
        TextEditor(text: $customCSS)
            .padding()
            .onChange(of: customCSS) {
                Vars.webViewReference!.evaluateJavaScript(
                    "document.getElementById('voxaCustomStyle').textContent = `\(customCSS)`;")
            }
    }
}
