// This has to be a shared module which is shared between client component error boundary and dynamic component
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    NEXT_DYNAMIC_NO_SSR_CODE: null,
    throwWithNoSSR: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NEXT_DYNAMIC_NO_SSR_CODE: function() {
        return NEXT_DYNAMIC_NO_SSR_CODE;
    },
    throwWithNoSSR: function() {
        return throwWithNoSSR;
    }
});
const NEXT_DYNAMIC_NO_SSR_CODE = "NEXT_DYNAMIC_NO_SSR_CODE";
function throwWithNoSSR() {
    const error = new Error(NEXT_DYNAMIC_NO_SSR_CODE);
    error.digest = NEXT_DYNAMIC_NO_SSR_CODE;
    throw error;
}

//# sourceMappingURL=no-ssr-error.js.map