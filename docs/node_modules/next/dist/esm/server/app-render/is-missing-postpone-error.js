export const MISSING_POSTPONE_DATA_ERROR = "MISSING_POSTPONE_DATA_ERROR";
export class MissingPostponeDataError extends Error {
    constructor(type){
        super(`Missing Postpone Data Error: ${type}`);
        this.digest = MISSING_POSTPONE_DATA_ERROR;
    }
}
export const isMissingPostponeDataError = (err)=>err.digest === MISSING_POSTPONE_DATA_ERROR;

//# sourceMappingURL=is-missing-postpone-error.js.map