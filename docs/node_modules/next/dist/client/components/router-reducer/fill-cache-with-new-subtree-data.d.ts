import type { CacheNode } from '../../../shared/lib/app-router-context.shared-runtime';
import type { FlightDataPath } from '../../../server/app-render/types';
/**
 * Fill cache with subTreeData based on flightDataPath
 */
export declare function fillCacheWithNewSubTreeData(newCache: CacheNode, existingCache: CacheNode, flightDataPath: FlightDataPath, wasPrefetched?: boolean): void;
