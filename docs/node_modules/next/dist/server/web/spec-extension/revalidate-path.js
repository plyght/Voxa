"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "revalidatePath", {
    enumerable: true,
    get: function() {
        return revalidatePath;
    }
});
const _revalidatetag = require("./revalidate-tag");
const _utils = require("../../../shared/lib/router/utils");
const _constants = require("../../../lib/constants");
function revalidatePath(originalPath, type) {
    if (originalPath.length > _constants.NEXT_CACHE_SOFT_TAG_MAX_LENGTH) {
        console.warn(`Warning: revalidatePath received "${originalPath}" which exceeded max length of ${_constants.NEXT_CACHE_SOFT_TAG_MAX_LENGTH}. See more info here https://nextjs.org/docs/app/api-reference/functions/revalidatePath`);
        return;
    }
    let normalizedPath = `${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}${originalPath}`;
    if (type) {
        normalizedPath += `${normalizedPath.endsWith("/") ? "" : "/"}${type}`;
    } else if ((0, _utils.isDynamicRoute)(originalPath)) {
        console.warn(`Warning: a dynamic page path "${originalPath}" was passed to "revalidatePath" without the "page" argument. This has no affect by default, see more info here https://nextjs.org/docs/app/api-reference/functions/revalidatePath`);
    }
    return (0, _revalidatetag.revalidateTag)(normalizedPath);
}

//# sourceMappingURL=revalidate-path.js.map