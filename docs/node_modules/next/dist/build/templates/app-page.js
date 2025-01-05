"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    tree: null,
    pages: null,
    GlobalError: null,
    originalPathname: null,
    __next_app__: null,
    routeModule: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    tree: function() {
        return tree;
    },
    pages: function() {
        return pages;
    },
    GlobalError: function() {
        return _VAR_MODULE_GLOBAL_ERROR.default;
    },
    originalPathname: function() {
        return originalPathname;
    },
    __next_app__: function() {
        return __next_app__;
    },
    routeModule: function() {
        return routeModule;
    }
});
0 && __export(require("../../server/app-render/entry-base"));
const _modulecompiled = require("../../server/future/route-modules/app-page/module.compiled");
const _routekind = require("../../server/future/route-kind");
const _VAR_MODULE_GLOBAL_ERROR = /*#__PURE__*/ _interop_require_default(require("VAR_MODULE_GLOBAL_ERROR"));
_export_star(require("../../server/app-render/entry-base"), exports);
"TURBOPACK { transition: next-ssr }";
function _export_star(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
            Object.defineProperty(to, k, {
                enumerable: true,
                get: function() {
                    return from[k];
                }
            });
        }
    });
    return from;
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const originalPathname = "VAR_ORIGINAL_PATHNAME";
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};
const routeModule = new _modulecompiled.AppPageRouteModule({
    definition: {
        kind: _routekind.RouteKind.APP_PAGE,
        page: "VAR_DEFINITION_PAGE",
        pathname: "VAR_DEFINITION_PATHNAME",
        // The following aren't used in production.
        bundlePath: "",
        filename: "",
        appPaths: []
    },
    userland: {
        loaderTree: tree
    }
});

//# sourceMappingURL=app-page.js.map