"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    MISSING_POSTPONE_DATA_ERROR: null,
    MissingPostponeDataError: null,
    isMissingPostponeDataError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    MISSING_POSTPONE_DATA_ERROR: function() {
        return MISSING_POSTPONE_DATA_ERROR;
    },
    MissingPostponeDataError: function() {
        return MissingPostponeDataError;
    },
    isMissingPostponeDataError: function() {
        return isMissingPostponeDataError;
    }
});
const MISSING_POSTPONE_DATA_ERROR = "MISSING_POSTPONE_DATA_ERROR";
class MissingPostponeDataError extends Error {
    constructor(type){
        super(`Missing Postpone Data Error: ${type}`);
        this.digest = MISSING_POSTPONE_DATA_ERROR;
    }
}
const isMissingPostponeDataError = (err)=>err.digest === MISSING_POSTPONE_DATA_ERROR;

//# sourceMappingURL=is-missing-postpone-error.js.map