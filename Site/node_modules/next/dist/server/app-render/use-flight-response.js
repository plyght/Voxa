"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useFlightResponse", {
    enumerable: true,
    get: function() {
        return useFlightResponse;
    }
});
const _htmlescape = require("../htmlescape");
const _encodedecode = require("../stream-utils/encode-decode");
const isEdgeRuntime = process.env.NEXT_RUNTIME === "edge";
const INLINE_FLIGHT_PAYLOAD_BOOTSTRAP = 0;
const INLINE_FLIGHT_PAYLOAD_DATA = 1;
const INLINE_FLIGHT_PAYLOAD_FORM_STATE = 2;
function createFlightTransformer(nonce, formState) {
    const startScriptTag = nonce ? `<script nonce=${JSON.stringify(nonce)}>` : "<script>";
    return new TransformStream({
        // Bootstrap the flight information.
        start (controller) {
            controller.enqueue(`${startScriptTag}(self.__next_f=self.__next_f||[]).push(${(0, _htmlescape.htmlEscapeJsonString)(JSON.stringify([
                INLINE_FLIGHT_PAYLOAD_BOOTSTRAP
            ]))});self.__next_f.push(${(0, _htmlescape.htmlEscapeJsonString)(JSON.stringify([
                INLINE_FLIGHT_PAYLOAD_FORM_STATE,
                formState
            ]))})</script>`);
        },
        transform (chunk, controller) {
            const scripts = `${startScriptTag}self.__next_f.push(${(0, _htmlescape.htmlEscapeJsonString)(JSON.stringify([
                INLINE_FLIGHT_PAYLOAD_DATA,
                chunk
            ]))})</script>`;
            controller.enqueue(scripts);
        }
    });
}
function useFlightResponse(writable, flightStream, clientReferenceManifest, flightResponseRef, formState, nonce) {
    if (flightResponseRef.current !== null) {
        return flightResponseRef.current;
    }
    // react-server-dom-webpack/client.edge must not be hoisted for require cache clearing to work correctly
    let createFromReadableStream;
    // @TODO: investigate why the aliasing for turbopack doesn't pick this up, requiring this runtime check
    if (process.env.TURBOPACK) {
        createFromReadableStream = // eslint-disable-next-line import/no-extraneous-dependencies
        require("react-server-dom-turbopack/client.edge").createFromReadableStream;
    } else {
        createFromReadableStream = // eslint-disable-next-line import/no-extraneous-dependencies
        require("react-server-dom-webpack/client.edge").createFromReadableStream;
    }
    const [renderStream, forwardStream] = flightStream.tee();
    const res = createFromReadableStream(renderStream, {
        ssrManifest: {
            moduleLoading: clientReferenceManifest.moduleLoading,
            moduleMap: isEdgeRuntime ? clientReferenceManifest.edgeSSRModuleMapping : clientReferenceManifest.ssrModuleMapping
        },
        nonce
    });
    flightResponseRef.current = res;
    forwardStream.pipeThrough((0, _encodedecode.createDecodeTransformStream)()).pipeThrough(createFlightTransformer(nonce, formState)).pipeThrough((0, _encodedecode.createEncodeTransformStream)()).pipeTo(writable).finally(()=>{
        // Once the last encoding stream has flushed, then unset the flight
        // response ref.
        flightResponseRef.current = null;
    }).catch((err)=>{
        console.error("Unexpected error while rendering Flight stream", err);
    });
    return res;
}

//# sourceMappingURL=use-flight-response.js.map