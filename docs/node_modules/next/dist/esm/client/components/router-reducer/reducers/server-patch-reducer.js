import { createHrefFromUrl } from "../create-href-from-url";
import { applyRouterStatePatchToTree } from "../apply-router-state-patch-to-tree";
import { isNavigatingToNewRootLayout } from "../is-navigating-to-new-root-layout";
import { handleExternalUrl } from "./navigate-reducer";
import { applyFlightData } from "../apply-flight-data";
import { handleMutable } from "../handle-mutable";
import { createEmptyCacheNode } from "../../app-router";
export function serverPatchReducer(state, action) {
    const { flightData, overrideCanonicalUrl } = action;
    const mutable = {};
    mutable.preserveCustomHistoryState = false;
    // Handle case when navigating to page in `pages` from `app`
    if (typeof flightData === "string") {
        return handleExternalUrl(state, mutable, flightData, state.pushRef.pendingPush);
    }
    let currentTree = state.tree;
    let currentCache = state.cache;
    for (const flightDataPath of flightData){
        // Slices off the last segment (which is at -4) as it doesn't exist in the tree yet
        const flightSegmentPath = flightDataPath.slice(0, -4);
        const [treePatch] = flightDataPath.slice(-3, -2);
        const newTree = applyRouterStatePatchToTree(// TODO-APP: remove ''
        [
            "",
            ...flightSegmentPath
        ], currentTree, treePatch);
        if (newTree === null) {
            throw new Error("SEGMENT MISMATCH");
        }
        if (isNavigatingToNewRootLayout(currentTree, newTree)) {
            return handleExternalUrl(state, mutable, state.canonicalUrl, state.pushRef.pendingPush);
        }
        const canonicalUrlOverrideHref = overrideCanonicalUrl ? createHrefFromUrl(overrideCanonicalUrl) : undefined;
        if (canonicalUrlOverrideHref) {
            mutable.canonicalUrl = canonicalUrlOverrideHref;
        }
        const cache = createEmptyCacheNode();
        applyFlightData(currentCache, cache, flightDataPath);
        mutable.patchedTree = newTree;
        mutable.cache = cache;
        currentCache = cache;
        currentTree = newTree;
    }
    return handleMutable(state, mutable);
}

//# sourceMappingURL=server-patch-reducer.js.map