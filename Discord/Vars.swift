import WebKit

class Vars {
    static var webViewReference: WKWebView?
    static var plugins: [String: [String: String]] = [:]
    static var activePlugins: [String] = []
}

func arrayToData(array: [String])-> Data {
    if let encoded = try? JSONEncoder().encode(array) {
        return encoded
    }
    return Data()
}

func dataToArray(stringArrayData: Data) -> [String]? {
    if let decoded = try? JSONDecoder().decode([String].self, from: stringArrayData) {
        return decoded
    }
    return nil
}
