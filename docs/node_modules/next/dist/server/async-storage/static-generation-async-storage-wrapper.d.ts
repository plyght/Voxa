import type { AsyncStorageWrapper } from './async-storage-wrapper';
import type { StaticGenerationStore } from '../../client/components/static-generation-async-storage.external';
import type { IncrementalCache } from '../lib/incremental-cache';
export type StaticGenerationContext = {
    urlPathname: string;
    postpone?: (reason: string) => never;
    renderOpts: {
        originalPathname?: string;
        incrementalCache?: IncrementalCache;
        supportsDynamicHTML: boolean;
        isRevalidate?: boolean;
        isOnDemandRevalidate?: boolean;
        isBot?: boolean;
        nextExport?: boolean;
        fetchCache?: StaticGenerationStore['fetchCache'];
        isDraftMode?: boolean;
        isServerAction?: boolean;
        waitUntil?: Promise<any>;
        experimental: {
            ppr: boolean;
        };
    };
};
export declare const StaticGenerationAsyncStorageWrapper: AsyncStorageWrapper<StaticGenerationStore, StaticGenerationContext>;
