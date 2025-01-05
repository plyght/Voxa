export declare const MISSING_POSTPONE_DATA_ERROR = "MISSING_POSTPONE_DATA_ERROR";
export declare class MissingPostponeDataError extends Error {
    digest: typeof MISSING_POSTPONE_DATA_ERROR;
    constructor(type: string);
}
export declare const isMissingPostponeDataError: (err: any) => boolean;
