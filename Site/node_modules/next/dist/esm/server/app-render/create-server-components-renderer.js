import React, { use } from "react";
import { useFlightResponse } from "./use-flight-response";
/**
 * Create a component that renders the Flight stream.
 * This is only used for renderToHTML, the Flight response does not need additional wrappers.
 */ export function createServerComponentRenderer(ComponentToRender, { ComponentMod, inlinedDataTransformStream, clientReferenceManifest, formState, nonce, serverComponentsErrorHandler }) {
    let flightStream;
    const createFlightStream = (props)=>{
        if (!flightStream) {
            flightStream = ComponentMod.renderToReadableStream(/*#__PURE__*/ React.createElement(ComponentToRender, props), clientReferenceManifest.clientModules, {
                onError: serverComponentsErrorHandler
            });
        }
        return flightStream;
    };
    const flightResponseRef = {
        current: null
    };
    const writable = inlinedDataTransformStream.writable;
    return function ServerComponentWrapper(props) {
        const response = useFlightResponse(writable, createFlightStream(props), clientReferenceManifest, flightResponseRef, formState, nonce);
        return use(response);
    };
}

//# sourceMappingURL=create-server-components-renderer.js.map