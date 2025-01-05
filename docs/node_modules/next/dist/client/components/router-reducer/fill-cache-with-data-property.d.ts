import type { FetchServerResponseResult } from './fetch-server-response';
import type { FlightSegmentPath } from '../../../server/app-render/types';
import type { CacheNode } from '../../../shared/lib/app-router-context.shared-runtime';
/**
 * Kick off fetch based on the common layout between two routes. Fill cache with data property holding the in-progress fetch.
 */
export declare function fillCacheWithDataProperty(newCache: CacheNode, existingCache: CacheNode, flightSegmentPath: FlightSegmentPath, fetchResponse: () => Promise<FetchServerResponseResult>): void;
