"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "makeGetServerInsertedHTML", {
    enumerable: true,
    get: function() {
        return makeGetServerInsertedHTML;
    }
});
const _react = /*#__PURE__*/ _interop_require_default(require("react"));
const _notfound = require("../../client/components/not-found");
const _redirect = require("../../client/components/redirect");
const _serveredge = require("react-dom/server.edge");
const _nodewebstreamshelper = require("../stream-utils/node-web-streams-helper");
const _redirectstatuscode = require("../../client/components/redirect-status-code");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function makeGetServerInsertedHTML({ polyfills, renderServerInsertedHTML, hasPostponed }) {
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
            if ((0, _notfound.isNotFoundError)(error)) {
                errorMetaTags.push(/*#__PURE__*/ _react.default.createElement("meta", {
                    name: "robots",
                    content: "noindex",
                    key: error.digest
                }), process.env.NODE_ENV === "development" ? /*#__PURE__*/ _react.default.createElement("meta", {
                    name: "next-error",
                    content: "not-found",
                    key: "next-error"
                }) : null);
            } else if ((0, _redirect.isRedirectError)(error)) {
                const redirectUrl = (0, _redirect.getURLFromRedirectError)(error);
                const statusCode = (0, _redirect.getRedirectStatusCodeFromError)(error);
                const isPermanent = statusCode === _redirectstatuscode.RedirectStatusCode.PermanentRedirect ? true : false;
                if (redirectUrl) {
                    errorMetaTags.push(/*#__PURE__*/ _react.default.createElement("meta", {
                        httpEquiv: "refresh",
                        content: `${isPermanent ? 0 : 1};url=${redirectUrl}`,
                        key: error.digest
                    }));
                }
            }
        }
        const stream = await (0, _serveredge.renderToReadableStream)(/*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, !polyfillsFlushed && (polyfills == null ? void 0 : polyfills.map((polyfill)=>{
            return /*#__PURE__*/ _react.default.createElement("script", {
                key: polyfill.src,
                ...polyfill
            });
        })), renderServerInsertedHTML(), errorMetaTags));
        // Mark polyfills as flushed so they don't get flushed again.
        if (!polyfillsFlushed) polyfillsFlushed = true;
        // Wait for the stream to be ready.
        await stream.allReady;
        return (0, _nodewebstreamshelper.streamToString)(stream);
    };
}

//# sourceMappingURL=make-get-server-inserted-html.js.map