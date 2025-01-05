"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createIncrementalCache", {
    enumerable: true,
    get: function() {
        return createIncrementalCache;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _incrementalcache = require("../../server/lib/incremental-cache");
const _ciinfo = require("../../telemetry/ci-info");
const _nodefsmethods = require("../../server/lib/node-fs-methods");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function createIncrementalCache({ incrementalCacheHandlerPath, isrMemoryCacheSize, fetchCacheKeyPrefix, distDir, dir, enabledDirectories, experimental, flushToDisk }) {
    // Custom cache handler overrides.
    let CacheHandler;
    if (incrementalCacheHandlerPath) {
        CacheHandler = require(_path.default.isAbsolute(incrementalCacheHandlerPath) ? incrementalCacheHandlerPath : _path.default.join(dir, incrementalCacheHandlerPath));
        CacheHandler = CacheHandler.default || CacheHandler;
    }
    const incrementalCache = new _incrementalcache.IncrementalCache({
        dev: false,
        requestHeaders: {},
        flushToDisk,
        fetchCache: true,
        maxMemoryCacheSize: isrMemoryCacheSize,
        fetchCacheKeyPrefix,
        getPrerenderManifest: ()=>({
                version: 4,
                routes: {},
                dynamicRoutes: {},
                preview: {
                    previewModeEncryptionKey: "",
                    previewModeId: "",
                    previewModeSigningKey: ""
                },
                notFoundRoutes: []
            }),
        fs: _nodefsmethods.nodeFs,
        pagesDir: enabledDirectories.pages,
        appDir: enabledDirectories.app,
        serverDistDir: _path.default.join(distDir, "server"),
        CurCacheHandler: CacheHandler,
        minimalMode: _ciinfo.hasNextSupport,
        experimental
    });
    globalThis.__incrementalCache = incrementalCache;
    return incrementalCache;
}

//# sourceMappingURL=create-incremental-cache.js.map