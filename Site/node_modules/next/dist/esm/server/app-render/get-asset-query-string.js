export function getAssetQueryString(ctx, addTimestamp) {
    const isDev = process.env.NODE_ENV === "development";
    let qs = "";
    if (isDev && addTimestamp) {
        qs += `?v=${ctx.requestTimestamp}`;
    }
    if (ctx.renderOpts.deploymentId) {
        qs += `${isDev ? "&" : "?"}dpl=${ctx.renderOpts.deploymentId}`;
    }
    return qs;
}

//# sourceMappingURL=get-asset-query-string.js.map