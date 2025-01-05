import React from "react";
import { isNotFoundError } from "../../client/components/not-found";
import { getURLFromRedirectError, isRedirectError, getRedirectStatusCodeFromError } from "../../client/components/redirect";
import { renderToReadableStream } from "react-dom/server.edge";
import { streamToString } from "../stream-utils/node-web-streams-helper";
import { RedirectStatusCode } from "../../client/components/redirect-status-code";
export function makeGetServerInsertedHTML({ polyfills, renderServerInsertedHTML, hasPostponed }) {
    let flushedErrorMetaTagsUntilIndex = 0;
    // If the render had postponed, then we have already flushed the polyfills.
    let polyfillsFlushed = hasPostponed;
    return async function getServerInsertedHTML(serverCapturedErrors) {
        // Loop through all the errors that have been captured but not yet
        // flushed.
        const errorMetaTags = [];
        while(flushedErrorMetaTagsUntilIndex < serverCapturedErrors.length){
            const error = serverCapturedErrors[flushedErrorMetaTagsUntilIndex];
            flushedErrorMetaTagsUntilIndex++;
            if (isNotFoundError(error)) {
                errorMetaTags.push(/*#__PURE__*/ React.createElement("meta", {
                    name: "robots",
                    content: "noindex",
                    key: error.digest
                }), process.env.NODE_ENV === "development" ? /*#__PURE__*/ React.createElement("meta", {
                    name: "next-error",
                    content: "not-found",
                    key: "next-error"
                }) : null);
            } else if (isRedirectError(error)) {
                const redirectUrl = getURLFromRedirectError(error);
                const statusCode = getRedirectStatusCodeFromError(error);
                const isPermanent = statusCode === RedirectStatusCode.PermanentRedirect ? true : false;
                if (redirectUrl) {
                    errorMetaTags.push(/*#__PURE__*/ React.createElement("meta", {
                        httpEquiv: "refresh",
                        content: `${isPermanent ? 0 : 1};url=${redirectUrl}`,
                        key: error.digest
                    }));
                }
            }
        }
        const stream = await renderToReadableStream(/*#__PURE__*/ React.createElement(React.Fragment, null, !polyfillsFlushed && (polyfills == null ? void 0 : polyfills.map((polyfill)=>{
            return /*#__PURE__*/ React.createElement("script", {
                key: polyfill.src,
                ...polyfill
            });
        })), renderServerInsertedHTML(), errorMetaTags));
        // Mark polyfills as flushed so they don't get flushed again.
        if (!polyfillsFlushed) polyfillsFlushed = true;
        // Wait for the stream to be ready.
        await stream.allReady;
        return streamToString(stream);
    };
}

//# sourceMappingURL=make-get-server-inserted-html.js.map