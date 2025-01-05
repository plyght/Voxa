import { createHrefFromUrl } from "../create-href-from-url";
import { extractPathFromFlightRouterState } from "../compute-changed-path";
export function restoreReducer(state, action) {
    const { url, tree } = action;
    const href = createHrefFromUrl(url);
    var _extractPathFromFlightRouterState;
    return {
        buildId: state.buildId,
        // Set canonical url
        canonicalUrl: href,
        pushRef: {
            pendingPush: false,
            mpaNavigation: false,
            // Ensures that the custom history state that was set is preserved when applying this update.
            preserveCustomHistoryState: true
        },
        focusAndScrollRef: state.focusAndScrollRef,
        cache: state.cache,
        prefetchCache: state.prefetchCache,
        // Restore provided tree
        tree: tree,
        nextUrl: (_extractPathFromFlightRouterState = extractPathFromFlightRouterState(tree)) != null ? _extractPathFromFlightRouterState : url.pathname
    };
}

//# sourceMappingURL=restore-reducer.js.map