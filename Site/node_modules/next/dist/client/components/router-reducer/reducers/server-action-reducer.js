"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "serverActionReducer", {
    enumerable: true,
    get: function() {
        return serverActionReducer;
    }
});
const _appcallserver = require("../../../app-call-server");
const _approuterheaders = require("../../app-router-headers");
const _addbasepath = require("../../../add-base-path");
const _createhreffromurl = require("../create-href-from-url");
const _navigatereducer = require("./navigate-reducer");
const _applyrouterstatepatchtotree = require("../apply-router-state-patch-to-tree");
const _isnavigatingtonewrootlayout = require("../is-navigating-to-new-root-layout");
const _approutercontextsharedruntime = require("../../../../shared/lib/app-router-context.shared-runtime");
const _handlemutable = require("../handle-mutable");
const _filllazyitemstillleafwithhead = require("../fill-lazy-items-till-leaf-with-head");
const _approuter = require("../../app-router");
const _computechangedpath = require("../compute-changed-path");
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { createFromFetch } from 'react-server-dom-webpack/client'
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { encodeReply } from 'react-server-dom-webpack/client'
const { createFromFetch, encodeReply } = !!process.env.NEXT_RUNTIME ? require("react-server-dom-webpack/client.edge") : require("react-server-dom-webpack/client");
async function fetchServerAction(state, param) {
    let { actionId, actionArgs } = param;
    const body = await encodeReply(actionArgs);
    const newNextUrl = (0, _computechangedpath.extractPathFromFlightRouterState)(state.tree);
    // only pass along the `nextUrl` param (used for interception routes) if it exists and
    // if it's different from the current `nextUrl`. This indicates the route has already been intercepted,
    // and so the action should be as well. Otherwise the server action might be intercepted
    // with the wrong action id (ie, one that corresponds with the intercepted route)
    const includeNextUrl = state.nextUrl && state.nextUrl !== newNextUrl;
    const res = await fetch("", {
        method: "POST",
        headers: {
            Accept: _approuterheaders.RSC_CONTENT_TYPE_HEADER,
            [_approuterheaders.ACTION]: actionId,
            [_approuterheaders.NEXT_ROUTER_STATE_TREE]: encodeURIComponent(JSON.stringify(state.tree)),
            ...process.env.__NEXT_ACTIONS_DEPLOYMENT_ID && process.env.NEXT_DEPLOYMENT_ID ? {
                "x-deployment-id": process.env.NEXT_DEPLOYMENT_ID
            } : {},
            ...includeNextUrl ? {
                [_approuterheaders.NEXT_URL]: state.nextUrl
            } : {}
        },
        body
    });
    const location = res.headers.get("x-action-redirect");
    let revalidatedParts;
    try {
        const revalidatedHeader = JSON.parse(res.headers.get("x-action-revalidated") || "[[],0,0]");
        revalidatedParts = {
            paths: revalidatedHeader[0] || [],
            tag: !!revalidatedHeader[1],
            cookie: revalidatedHeader[2]
        };
    } catch (e) {
        revalidatedParts = {
            paths: [],
            tag: false,
            cookie: false
        };
    }
    const redirectLocation = location ? new URL((0, _addbasepath.addBasePath)(location), // Ensure relative redirects in Server Actions work, e.g. redirect('./somewhere-else')
    new URL(state.canonicalUrl, window.location.href)) : undefined;
    let isFlightResponse = res.headers.get("content-type") === _approuterheaders.RSC_CONTENT_TYPE_HEADER;
    if (isFlightResponse) {
        const response = await createFromFetch(Promise.resolve(res), {
            callServer: _appcallserver.callServer
        });
        if (location) {
            // if it was a redirection, then result is just a regular RSC payload
            const [, actionFlightData] = response != null ? response : [];
            return {
                actionFlightData: actionFlightData,
                redirectLocation,
                revalidatedParts
            };
        }
        // otherwise it's a tuple of [actionResult, actionFlightData]
        const [actionResult, [, actionFlightData]] = response != null ? response : [];
        return {
            actionResult,
            actionFlightData,
            redirectLocation,
            revalidatedParts
        };
    }
    return {
        redirectLocation,
        revalidatedParts
    };
}
function serverActionReducer(state, action) {
    const { resolve, reject } = action;
    const mutable = {};
    const href = state.canonicalUrl;
    let currentTree = state.tree;
    mutable.preserveCustomHistoryState = false;
    mutable.inFlightServerAction = fetchServerAction(state, action);
    // suspends until the server action is resolved.
    return mutable.inFlightServerAction.then((param)=>{
        let { actionResult, actionFlightData: flightData, redirectLocation } = param;
        // Make sure the redirection is a push instead of a replace.
        // Issue: https://github.com/vercel/next.js/issues/53911
        if (redirectLocation) {
            state.pushRef.pendingPush = true;
            mutable.pendingPush = true;
        }
        if (!flightData) {
            if (!mutable.actionResultResolved) {
                resolve(actionResult);
                mutable.actionResultResolved = true;
            }
            // If there is a redirect but no flight data we need to do a mpaNavigation.
            if (redirectLocation) {
                return (0, _navigatereducer.handleExternalUrl)(state, mutable, redirectLocation.href, state.pushRef.pendingPush);
            }
            return state;
        }
        if (typeof flightData === "string") {
            // Handle case when navigating to page in `pages` from `app`
            return (0, _navigatereducer.handleExternalUrl)(state, mutable, flightData, state.pushRef.pendingPush);
        }
        // Remove cache.data as it has been resolved at this point.
        mutable.inFlightServerAction = null;
        for (const flightDataPath of flightData){
            // FlightDataPath with more than two items means unexpected Flight data was returned
            if (flightDataPath.length !== 3) {
                // TODO-APP: handle this case better
                console.log("SERVER ACTION APPLY FAILED");
                return state;
            }
            // Given the path can only have two items the items are only the router state and subTreeData for the root.
            const [treePatch] = flightDataPath;
            const newTree = (0, _applyrouterstatepatchtotree.applyRouterStatePatchToTree)(// TODO-APP: remove ''
            [
                ""
            ], currentTree, treePatch);
            if (newTree === null) {
                throw new Error("SEGMENT MISMATCH");
            }
            if ((0, _isnavigatingtonewrootlayout.isNavigatingToNewRootLayout)(currentTree, newTree)) {
                return (0, _navigatereducer.handleExternalUrl)(state, mutable, href, state.pushRef.pendingPush);
            }
            // The one before last item is the router state tree patch
            const [cacheNodeSeedData, head] = flightDataPath.slice(-2);
            const subTreeData = cacheNodeSeedData !== null ? cacheNodeSeedData[2] : null;
            // Handles case where prefetch only returns the router tree patch without rendered components.
            if (subTreeData !== null) {
                const cache = (0, _approuter.createEmptyCacheNode)();
                cache.status = _approutercontextsharedruntime.CacheStates.READY;
                cache.subTreeData = subTreeData;
                (0, _filllazyitemstillleafwithhead.fillLazyItemsTillLeafWithHead)(cache, // Existing cache is not passed in as `router.refresh()` has to invalidate the entire cache.
                undefined, treePatch, cacheNodeSeedData, head);
                mutable.cache = cache;
                mutable.prefetchCache = new Map();
            }
            mutable.patchedTree = newTree;
            mutable.canonicalUrl = href;
            currentTree = newTree;
        }
        if (redirectLocation) {
            const newHref = (0, _createhreffromurl.createHrefFromUrl)(redirectLocation, false);
            mutable.canonicalUrl = newHref;
        }
        if (!mutable.actionResultResolved) {
            resolve(actionResult);
            mutable.actionResultResolved = true;
        }
        return (0, _handlemutable.handleMutable)(state, mutable);
    }, (e)=>{
        if (e.status === "rejected") {
            if (!mutable.actionResultResolved) {
                reject(e.reason);
                mutable.actionResultResolved = true;
            }
            // When the server action is rejected we don't update the state and instead call the reject handler of the promise.
            return state;
        }
        throw e;
    });
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=server-action-reducer.js.map