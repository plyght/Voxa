import WebKit

class Vars {
    static var webViewReference: WKWebView?
}

enum DiscordReleaseChannel: String, CaseIterable {
    case stable = "stable"
    case PTB = "ptb"
    case canary = "canary"

    var description: String {
        switch self {
        case .stable:
            return "Stable"
        case .PTB:
            return "Public Test Branch (PTB)"
        case .canary:
            return "Canary"
        }
    }

    var url: URL {
        switch self {
        case .stable:
            return URL(string: "https://discord.com/app")!
        case .PTB:
            return URL(string: "https://ptb.discord.com/app")!
        case .canary:
            return URL(string: "https://canary.discord.com/app")!
        }
    }
}
