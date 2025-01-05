"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    createDecodeTransformStream: null,
    createEncodeTransformStream: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createDecodeTransformStream: function() {
        return createDecodeTransformStream;
    },
    createEncodeTransformStream: function() {
        return createEncodeTransformStream;
    }
});
function createDecodeTransformStream(decoder = new TextDecoder()) {
    return new TransformStream({
        transform (chunk, controller) {
            return controller.enqueue(decoder.decode(chunk, {
                stream: true
            }));
        },
        flush (controller) {
            return controller.enqueue(decoder.decode());
        }
    });
}
function createEncodeTransformStream(encoder = new TextEncoder()) {
    return new TransformStream({
        transform (chunk, controller) {
            return controller.enqueue(encoder.encode(chunk));
        }
    });
}

//# sourceMappingURL=encode-decode.js.map