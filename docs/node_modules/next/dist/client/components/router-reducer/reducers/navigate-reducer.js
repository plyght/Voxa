"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    handleExternalUrl: null,
    navigateReducer: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    handleExternalUrl: function() {
        return handleExternalUrl;
    },
    navigateReducer: function() {
        return navigateReducer;
    }
});
const _approutercontextsharedruntime = require("../../../../shared/lib/app-router-context.shared-runtime");
const _fetchserverresponse = require("../fetch-server-response");
const _createhreffromurl = require("../create-href-from-url");
const _invalidatecachebelowflightsegmentpath = require("../invalidate-cache-below-flight-segmentpath");
const _fillcachewithdataproperty = require("../fill-cache-with-data-property");
const _applyrouterstatepatchtotree = require("../apply-router-state-patch-to-tree");
const _shouldhardnavigate = require("../should-hard-navigate");
const _isnavigatingtonewrootlayout = require("../is-navigating-to-new-root-layout");
const _routerreducertypes = require("../router-reducer-types");
const _handlemutable = require("../handle-mutable");
const _applyflightdata = require("../apply-flight-data");
const _getprefetchcacheentrystatus = require("../get-prefetch-cache-entry-status");
const _pruneprefetchcache = require("./prune-prefetch-cache");
const _prefetchreducer = require("./prefetch-reducer");
const _approuter = require("../../app-router");
function handleExternalUrl(state, mutable, url, pendingPush) {
    mutable.mpaNavigation = true;
    mutable.canonicalUrl = url;
    mutable.pendingPush = pendingPush;
    mutable.scrollableSegments = undefined;
    return (0, _handlemutable.handleMutable)(state, mutable);
}
function generateSegmentsFromPatch(flightRouterPatch) {
    const segments = [];
    const [segment, parallelRoutes] = flightRouterPatch;
    if (Object.keys(parallelRoutes).length === 0) {
        return [
            [
                segment
            ]
        ];
    }
    for (const [parallelRouteKey, parallelRoute] of Object.entries(parallelRoutes)){
        for (const childSegment of generateSegmentsFromPatch(parallelRoute)){
            // If the segment is empty, it means we are at the root of the tree
            if (segment === "") {
                segments.push([
                    parallelRouteKey,
                    ...childSegment
                ]);
            } else {
                segments.push([
                    segment,
                    parallelRouteKey,
                    ...childSegment
                ]);
            }
        }
    }
    return segments;
}
function addRefetchToLeafSegments(newCache, currentCache, flightSegmentPath, treePatch, data) {
    let appliedPatch = false;
    newCache.status = _approutercontextsharedruntime.CacheStates.READY;
    newCache.subTreeData = currentCache.subTreeData;
    newCache.parallelRoutes = new Map(currentCache.parallelRoutes);
    const segmentPathsToFill = generateSegmentsFromPatch(treePatch).map((segment)=>[
            ...flightSegmentPath,
            ...segment
        ]);
    for (const segmentPaths of segmentPathsToFill){
        (0, _fillcachewithdataproperty.fillCacheWithDataProperty)(newCache, currentCache, segmentPaths, data);
        appliedPatch = true;
    }
    return appliedPatch;
}
function navigateReducer(state, action) {
    const { url, isExternalUrl, navigateType, shouldScroll } = action;
    const mutable = {};
    const { hash } = url;
    const href = (0, _createhreffromurl.createHrefFromUrl)(url);
    const pendingPush = navigateType === "push";
    // we want to prune the prefetch cache on every navigation to avoid it growing too large
    (0, _pruneprefetchcache.prunePrefetchCache)(state.prefetchCache);
    mutable.preserveCustomHistoryState = false;
    if (isExternalUrl) {
        return handleExternalUrl(state, mutable, url.toString(), pendingPush);
    }
    let prefetchValues = state.prefetchCache.get((0, _createhreffromurl.createHrefFromUrl)(url, false));
    // If we don't have a prefetch value, we need to create one
    if (!prefetchValues) {
        const data = (0, _fetchserverresponse.fetchServerResponse)(url, state.tree, state.nextUrl, state.buildId, // in dev, there's never gonna be a prefetch entry so we want to prefetch here
        // in order to simulate the behavior of the prefetch cache
        process.env.NODE_ENV === "development" ? _routerreducertypes.PrefetchKind.AUTO : undefined);
        const newPrefetchValue = {
            data,
            // this will make sure that the entry will be discarded after 30s
            kind: process.env.NODE_ENV === "development" ? _routerreducertypes.PrefetchKind.AUTO : _routerreducertypes.PrefetchKind.TEMPORARY,
            prefetchTime: Date.now(),
            treeAtTimeOfPrefetch: state.tree,
            lastUsedTime: null
        };
        state.prefetchCache.set((0, _createhreffromurl.createHrefFromUrl)(url, false), newPrefetchValue);
        prefetchValues = newPrefetchValue;
    }
    const prefetchEntryCacheStatus = (0, _getprefetchcacheentrystatus.getPrefetchEntryCacheStatus)(prefetchValues);
    // The one before last item is the router state tree patch
    const { treeAtTimeOfPrefetch, data } = prefetchValues;
    _prefetchreducer.prefetchQueue.bump(data);
    return data.then((param)=>{
        let [flightData, canonicalUrlOverride, postponed] = param;
        // we only want to mark this once
        if (prefetchValues && !prefetchValues.lastUsedTime) {
            // important: we should only mark the cache node as dirty after we unsuspend from the call above
            prefetchValues.lastUsedTime = Date.now();
        }
        // Handle case when navigating to page in `pages` from `app`
        if (typeof flightData === "string") {
            return handleExternalUrl(state, mutable, flightData, pendingPush);
        }
        let currentTree = state.tree;
        let currentCache = state.cache;
        let scrollableSegments = [];
        for (const flightDataPath of flightData){
            const flightSegmentPath = flightDataPath.slice(0, -4);
            // The one before last item is the router state tree patch
            const treePatch = flightDataPath.slice(-3)[0];
            // TODO-APP: remove ''
            const flightSegmentPathWithLeadingEmpty = [
                "",
                ...flightSegmentPath
            ];
            // Create new tree based on the flightSegmentPath and router state patch
            let newTree = (0, _applyrouterstatepatchtotree.applyRouterStatePatchToTree)(// TODO-APP: remove ''
            flightSegmentPathWithLeadingEmpty, currentTree, treePatch);
            // If the tree patch can't be applied to the current tree then we use the tree at time of prefetch
            // TODO-APP: This should instead fill in the missing pieces in `currentTree` with the data from `treeAtTimeOfPrefetch`, then apply the patch.
            if (newTree === null) {
                newTree = (0, _applyrouterstatepatchtotree.applyRouterStatePatchToTree)(// TODO-APP: remove ''
                flightSegmentPathWithLeadingEmpty, treeAtTimeOfPrefetch, treePatch);
            }
            if (newTree !== null) {
                if ((0, _isnavigatingtonewrootlayout.isNavigatingToNewRootLayout)(currentTree, newTree)) {
                    return handleExternalUrl(state, mutable, href, pendingPush);
                }
                const cache = (0, _approuter.createEmptyCacheNode)();
                let applied = (0, _applyflightdata.applyFlightData)(currentCache, cache, flightDataPath, (prefetchValues == null ? void 0 : prefetchValues.kind) === "auto" && prefetchEntryCacheStatus === _getprefetchcacheentrystatus.PrefetchCacheEntryStatus.reusable);
                if (!applied && prefetchEntryCacheStatus === _getprefetchcacheentrystatus.PrefetchCacheEntryStatus.stale || // TODO-APP: If the prefetch was postponed, we don't want to apply it
                // until we land router changes to handle the postponed case.
                postponed) {
                    applied = addRefetchToLeafSegments(cache, currentCache, flightSegmentPath, treePatch, // eslint-disable-next-line no-loop-func
                    ()=>(0, _fetchserverresponse.fetchServerResponse)(url, currentTree, state.nextUrl, state.buildId));
                }
                const hardNavigate = (0, _shouldhardnavigate.shouldHardNavigate)(// TODO-APP: remove ''
                flightSegmentPathWithLeadingEmpty, currentTree);
                if (hardNavigate) {
                    cache.status = _approutercontextsharedruntime.CacheStates.READY;
                    // Copy subTreeData for the root node of the cache.
                    cache.subTreeData = currentCache.subTreeData;
                    (0, _invalidatecachebelowflightsegmentpath.invalidateCacheBelowFlightSegmentPath)(cache, currentCache, flightSegmentPath);
                    // Ensure the existing cache value is used when the cache was not invalidated.
                    mutable.cache = cache;
                } else if (applied) {
                    mutable.cache = cache;
                }
                currentCache = cache;
                currentTree = newTree;
                for (const subSegment of generateSegmentsFromPatch(treePatch)){
                    const scrollableSegmentPath = [
                        ...flightSegmentPath,
                        ...subSegment
                    ];
                    // Filter out the __DEFAULT__ paths as they shouldn't be scrolled to in this case.
                    if (scrollableSegmentPath[scrollableSegmentPath.length - 1] !== "__DEFAULT__") {
                        scrollableSegments.push(scrollableSegmentPath);
                    }
                }
            }
        }
        mutable.patchedTree = currentTree;
        mutable.canonicalUrl = canonicalUrlOverride ? (0, _createhreffromurl.createHrefFromUrl)(canonicalUrlOverride) : href;
        mutable.pendingPush = pendingPush;
        mutable.scrollableSegments = scrollableSegments;
        mutable.hashFragment = hash;
        mutable.shouldScroll = shouldScroll;
        return (0, _handlemutable.handleMutable)(state, mutable);
    }, ()=>state);
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=navigate-reducer.js.map