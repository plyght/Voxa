"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "revalidateTag", {
    enumerable: true,
    get: function() {
        return revalidateTag;
    }
});
const _staticgenerationbailout = require("../../../client/components/static-generation-bailout");
function revalidateTag(tag) {
    const staticGenerationAsyncStorage = fetch.__nextGetStaticStore == null ? void 0 : fetch.__nextGetStaticStore.call(fetch);
    const store = staticGenerationAsyncStorage == null ? void 0 : staticGenerationAsyncStorage.getStore();
    if (!store || !store.incrementalCache) {
        throw new Error(`Invariant: static generation store missing in revalidateTag ${tag}`);
    }
    // a route that makes use of revalidation APIs should be considered dynamic
    // as otherwise it would be impossible to revalidate
    (0, _staticgenerationbailout.staticGenerationBailout)(`revalidateTag ${tag}`);
    if (!store.revalidatedTags) {
        store.revalidatedTags = [];
    }
    if (!store.revalidatedTags.includes(tag)) {
        store.revalidatedTags.push(tag);
    }
    if (!store.pendingRevalidates) {
        store.pendingRevalidates = {};
    }
    store.pendingRevalidates[tag] = store.incrementalCache.revalidateTag == null ? void 0 : store.incrementalCache.revalidateTag.call(store.incrementalCache, tag).catch((err)=>{
        console.error(`revalidateTag failed for ${tag}`, err);
    });
    // TODO: only revalidate if the path matches
    store.pathWasRevalidated = true;
}

//# sourceMappingURL=revalidate-tag.js.map