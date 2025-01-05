"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    renderToReadableStream: null,
    decodeReply: null,
    decodeAction: null,
    decodeFormState: null,
    AppRouter: null,
    LayoutRouter: null,
    RenderFromTemplateContext: null,
    staticGenerationAsyncStorage: null,
    requestAsyncStorage: null,
    actionAsyncStorage: null,
    staticGenerationBailout: null,
    createSearchParamsBailoutProxy: null,
    serverHooks: null,
    preloadStyle: null,
    preloadFont: null,
    preconnect: null,
    taintObjectReference: null,
    StaticGenerationSearchParamsBailoutProvider: null,
    NotFoundBoundary: null,
    patchFetch: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    renderToReadableStream: function() {
        return _serveredge.renderToReadableStream;
    },
    decodeReply: function() {
        return _serveredge.decodeReply;
    },
    decodeAction: function() {
        return _serveredge.decodeAction;
    },
    decodeFormState: function() {
        return _serveredge.decodeFormState;
    },
    AppRouter: function() {
        return _approuter.default;
    },
    LayoutRouter: function() {
        return _layoutrouter.default;
    },
    RenderFromTemplateContext: function() {
        return _renderfromtemplatecontext.default;
    },
    staticGenerationAsyncStorage: function() {
        return _staticgenerationasyncstorageexternal.staticGenerationAsyncStorage;
    },
    requestAsyncStorage: function() {
        return _requestasyncstorageexternal.requestAsyncStorage;
    },
    actionAsyncStorage: function() {
        return _actionasyncstorageexternal.actionAsyncStorage;
    },
    staticGenerationBailout: function() {
        return _staticgenerationbailout.staticGenerationBailout;
    },
    createSearchParamsBailoutProxy: function() {
        return _searchparamsbailoutproxy.createSearchParamsBailoutProxy;
    },
    serverHooks: function() {
        return _hooksservercontext;
    },
    preloadStyle: function() {
        return _preloads.preloadStyle;
    },
    preloadFont: function() {
        return _preloads.preloadFont;
    },
    preconnect: function() {
        return _preloads.preconnect;
    },
    taintObjectReference: function() {
        return _taint.taintObjectReference;
    },
    StaticGenerationSearchParamsBailoutProvider: function() {
        return _staticgenerationsearchparamsbailoutprovider.default;
    },
    NotFoundBoundary: function() {
        return _notfoundboundary.NotFoundBoundary;
    },
    patchFetch: function() {
        return patchFetch;
    }
});
const _serveredge = require("react-server-dom-webpack/server.edge");
const _approuter = /*#__PURE__*/ _interop_require_default(require("../../client/components/app-router"));
const _layoutrouter = /*#__PURE__*/ _interop_require_default(require("../../client/components/layout-router"));
const _renderfromtemplatecontext = /*#__PURE__*/ _interop_require_default(require("../../client/components/render-from-template-context"));
const _staticgenerationasyncstorageexternal = require("../../client/components/static-generation-async-storage.external");
const _requestasyncstorageexternal = require("../../client/components/request-async-storage.external");
const _actionasyncstorageexternal = require("../../client/components/action-async-storage.external");
const _staticgenerationbailout = require("../../client/components/static-generation-bailout");
const _staticgenerationsearchparamsbailoutprovider = /*#__PURE__*/ _interop_require_default(require("../../client/components/static-generation-searchparams-bailout-provider"));
const _searchparamsbailoutproxy = require("../../client/components/searchparams-bailout-proxy");
const _hooksservercontext = /*#__PURE__*/ _interop_require_wildcard(require("../../client/components/hooks-server-context"));
const _notfoundboundary = require("../../client/components/not-found-boundary");
const _patchfetch = require("../lib/patch-fetch");
require("../../client/components/error-boundary");
const _preloads = require("../../server/app-render/rsc/preloads");
const _taint = require("../../server/app-render/rsc/taint");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
// patchFetch makes use of APIs such as `React.unstable_postpone` which are only available
// in the experimental channel of React, so export it from here so that it comes from the bundled runtime
function patchFetch() {
    return (0, _patchfetch.patchFetch)({
        serverHooks: _hooksservercontext,
        staticGenerationAsyncStorage: _staticgenerationasyncstorageexternal.staticGenerationAsyncStorage
    });
}

//# sourceMappingURL=entry-base.js.map