import type { NextEnabledDirectories } from '../../server/base-server';
import { IncrementalCache } from '../../server/lib/incremental-cache';
export declare function createIncrementalCache({ incrementalCacheHandlerPath, isrMemoryCacheSize, fetchCacheKeyPrefix, distDir, dir, enabledDirectories, experimental, flushToDisk, }: {
    incrementalCacheHandlerPath?: string;
    isrMemoryCacheSize?: number;
    fetchCacheKeyPrefix?: string;
    distDir: string;
    dir: string;
    enabledDirectories: NextEnabledDirectories;
    experimental: {
        ppr: boolean;
    };
    flushToDisk?: boolean;
}): IncrementalCache;
