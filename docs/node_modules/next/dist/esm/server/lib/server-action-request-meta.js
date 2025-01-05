import { ACTION } from "../../client/components/app-router-headers";
export function getServerActionRequestMetadata(req) {
    let actionId;
    let contentType;
    if (req.headers instanceof Headers) {
        actionId = req.headers.get(ACTION.toLowerCase()) ?? null;
        contentType = req.headers.get("content-type");
    } else {
        actionId = req.headers[ACTION.toLowerCase()] ?? null;
        contentType = req.headers["content-type"] ?? null;
    }
    const isURLEncodedAction = Boolean(req.method === "POST" && contentType === "application/x-www-form-urlencoded");
    const isMultipartAction = Boolean(req.method === "POST" && (contentType == null ? void 0 : contentType.startsWith("multipart/form-data")));
    const isFetchAction = Boolean(actionId !== undefined && typeof actionId === "string" && req.method === "POST");
    return {
        actionId,
        isURLEncodedAction,
        isMultipartAction,
        isFetchAction
    };
}
export function getIsServerAction(req) {
    const { isFetchAction, isURLEncodedAction, isMultipartAction } = getServerActionRequestMetadata(req);
    return Boolean(isFetchAction || isURLEncodedAction || isMultipartAction);
}

//# sourceMappingURL=server-action-request-meta.js.map