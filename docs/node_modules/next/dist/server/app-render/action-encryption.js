/* eslint-disable import/no-extraneous-dependencies */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    encryptActionBoundArgs: null,
    decryptActionBoundArgs: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    encryptActionBoundArgs: function() {
        return encryptActionBoundArgs;
    },
    decryptActionBoundArgs: function() {
        return decryptActionBoundArgs;
    }
});
require("server-only");
const _serveredge = require("react-server-dom-webpack/server.edge");
const _clientedge = require("react-server-dom-webpack/client.edge");
const _nodewebstreamshelper = require("../stream-utils/node-web-streams-helper");
const _actionencryptionutils = require("./action-encryption-utils");
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
async function decodeActionBoundArg(actionId, arg) {
    const key = await (0, _actionencryptionutils.getActionEncryptionKey)();
    if (typeof key === "undefined") {
        throw new Error(`Missing encryption key for Server Action. This is a bug in Next.js`);
    }
    // Get the iv (16 bytes) and the payload from the arg.
    const originalPayload = atob(arg);
    const ivValue = originalPayload.slice(0, 16);
    const payload = originalPayload.slice(16);
    if (payload === undefined) {
        throw new Error("Invalid Server Action payload.");
    }
    const decrypted = textDecoder.decode(await (0, _actionencryptionutils.decrypt)(key, (0, _actionencryptionutils.stringToUint8Array)(ivValue), (0, _actionencryptionutils.stringToUint8Array)(payload)));
    if (!decrypted.startsWith(actionId)) {
        throw new Error("Invalid Server Action payload: failed to decrypt.");
    }
    return decrypted.slice(actionId.length);
}
async function encodeActionBoundArg(actionId, arg) {
    const key = await (0, _actionencryptionutils.getActionEncryptionKey)();
    if (key === undefined) {
        throw new Error(`Missing encryption key for Server Action. This is a bug in Next.js`);
    }
    // Get 16 random bytes as iv.
    const randomBytes = new Uint8Array(16);
    crypto.getRandomValues(randomBytes);
    const ivValue = (0, _actionencryptionutils.arrayBufferToString)(randomBytes.buffer);
    const encrypted = await (0, _actionencryptionutils.encrypt)(key, randomBytes, textEncoder.encode(actionId + arg));
    return btoa(ivValue + (0, _actionencryptionutils.arrayBufferToString)(encrypted));
}
async function encryptActionBoundArgs(actionId, args) {
    const clientReferenceManifestSingleton = (0, _actionencryptionutils.getClientReferenceManifestSingleton)();
    // Using Flight to serialize the args into a string.
    const serialized = await (0, _nodewebstreamshelper.streamToString)((0, _serveredge.renderToReadableStream)(args, clientReferenceManifestSingleton.clientModules));
    // Encrypt the serialized string with the action id as the salt.
    // Add a prefix to later ensure that the payload is correctly decrypted, similar
    // to a checksum.
    const encrypted = await encodeActionBoundArg(actionId, serialized);
    return encrypted;
}
async function decryptActionBoundArgs(actionId, encrypted) {
    // Decrypt the serialized string with the action id as the salt.
    const decryped = await decodeActionBoundArg(actionId, await encrypted);
    // Using Flight to deserialize the args from the string.
    const deserialized = await (0, _clientedge.createFromReadableStream)(new ReadableStream({
        start (controller) {
            controller.enqueue(new TextEncoder().encode(decryped));
            controller.close();
        }
    }), {
        ssrManifest: {
            // TODO: We can't use the client reference manifest to resolve the modules
            // on the server side - instead they need to be recovered as the module
            // references (proxies) again.
            // For now, we'll just use an empty module map.
            moduleLoading: {},
            moduleMap: {}
        }
    });
    // This extra step ensures that the server references are recovered.
    const serverModuleMap = (0, _actionencryptionutils.getServerModuleMap)();
    const transformed = await (0, _serveredge.decodeReply)(await (0, _clientedge.encodeReply)(deserialized), serverModuleMap);
    return transformed;
}

//# sourceMappingURL=action-encryption.js.map