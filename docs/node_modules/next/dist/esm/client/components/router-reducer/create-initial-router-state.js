import { CacheStates } from "../../../shared/lib/app-router-context.shared-runtime";
import { createHrefFromUrl } from "./create-href-from-url";
import { fillLazyItemsTillLeafWithHead } from "./fill-lazy-items-till-leaf-with-head";
import { extractPathFromFlightRouterState } from "./compute-changed-path";
export function createInitialRouterState(param) {
    let { buildId, initialTree, initialSeedData, initialCanonicalUrl, initialParallelRoutes, isServer, location, initialHead } = param;
    const subTreeData = initialSeedData[2];
    const cache = {
        status: CacheStates.READY,
        data: null,
        subTreeData: subTreeData,
        // The cache gets seeded during the first render. `initialParallelRoutes` ensures the cache from the first render is there during the second render.
        parallelRoutes: isServer ? new Map() : initialParallelRoutes
    };
    // When the cache hasn't been seeded yet we fill the cache with the head.
    if (initialParallelRoutes === null || initialParallelRoutes.size === 0) {
        fillLazyItemsTillLeafWithHead(cache, undefined, initialTree, initialSeedData, initialHead);
    }
    var // the || operator is intentional, the pathname can be an empty string
    _ref;
    return {
        buildId,
        tree: initialTree,
        cache,
        prefetchCache: new Map(),
        pushRef: {
            pendingPush: false,
            mpaNavigation: false,
            // First render needs to preserve the previous window.history.state
            // to avoid it being overwritten on navigation back/forward with MPA Navigation.
            preserveCustomHistoryState: true
        },
        focusAndScrollRef: {
            apply: false,
            onlyHashChange: false,
            hashFragment: null,
            segmentPaths: []
        },
        canonicalUrl: // location.href is read as the initial value for canonicalUrl in the browser
        // This is safe to do as canonicalUrl can't be rendered, it's only used to control the history updates in the useEffect further down in this file.
        location ? createHrefFromUrl(location) : initialCanonicalUrl,
        nextUrl: (_ref = extractPathFromFlightRouterState(initialTree) || (location == null ? void 0 : location.pathname)) != null ? _ref : null
    };
}

//# sourceMappingURL=create-initial-router-state.js.map