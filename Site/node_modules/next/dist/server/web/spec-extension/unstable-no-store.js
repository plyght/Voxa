"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "unstable_noStore", {
    enumerable: true,
    get: function() {
        return unstable_noStore;
    }
});
const _staticgenerationasyncstorageexternal = require("../../../client/components/static-generation-async-storage.external");
const _staticgenerationbailout = require("../../../client/components/static-generation-bailout");
function unstable_noStore() {
    const staticGenerationStore = _staticgenerationasyncstorageexternal.staticGenerationAsyncStorage.getStore();
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.isUnstableCacheCallback) {
        // if called within a next/cache call, we want to cache the result
        // and defer to the next/cache call to handle how to cache the result.
        return;
    }
    (0, _staticgenerationbailout.staticGenerationBailout)("unstable_noStore", {
        link: "https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering"
    });
}

//# sourceMappingURL=unstable-no-store.js.map