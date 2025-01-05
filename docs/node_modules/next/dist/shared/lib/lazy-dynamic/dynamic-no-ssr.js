"use client";

"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NoSSR", {
    enumerable: true,
    get: function() {
        return NoSSR;
    }
});
const _nossrerror = require("./no-ssr-error");
function NoSSR(param) {
    let { children } = param;
    if (typeof window === "undefined") {
        (0, _nossrerror.throwWithNoSSR)();
    }
    return children;
}

//# sourceMappingURL=dynamic-no-ssr.js.map