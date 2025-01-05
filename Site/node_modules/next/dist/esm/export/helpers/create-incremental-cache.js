import path from "path";
import { IncrementalCache } from "../../server/lib/incremental-cache";
import { hasNextSupport } from "../../telemetry/ci-info";
import { nodeFs } from "../../server/lib/node-fs-methods";
export function createIncrementalCache({ incrementalCacheHandlerPath, isrMemoryCacheSize, fetchCacheKeyPrefix, distDir, dir, enabledDirectories, experimental, flushToDisk }) {
    // Custom cache handler overrides.
    let CacheHandler;
    if (incrementalCacheHandlerPath) {
        CacheHandler = require(path.isAbsolute(incrementalCacheHandlerPath) ? incrementalCacheHandlerPath : path.join(dir, incrementalCacheHandlerPath));
        CacheHandler = CacheHandler.default || CacheHandler;
    }
    const incrementalCache = new IncrementalCache({
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
        fs: nodeFs,
        pagesDir: enabledDirectories.pages,
        appDir: enabledDirectories.app,
        serverDistDir: path.join(distDir, "server"),
        CurCacheHandler: CacheHandler,
        minimalMode: hasNextSupport,
        experimental
    });
    globalThis.__incrementalCache = incrementalCache;
    return incrementalCache;
}

//# sourceMappingURL=create-incremental-cache.js.map