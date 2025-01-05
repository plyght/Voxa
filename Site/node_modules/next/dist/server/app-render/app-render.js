"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderToHTMLOrFlight", {
    enumerable: true,
    get: function() {
        return renderToHTMLOrFlight;
    }
});
const _react = /*#__PURE__*/ _interop_require_default(require("react"));
const _createservercomponentsrenderer = require("./create-server-components-renderer");
const _renderresult = /*#__PURE__*/ _interop_require_default(require("../render-result"));
const _nodewebstreamshelper = require("../stream-utils/node-web-streams-helper");
const _matchsegments = require("../../client/components/match-segments");
const _internalutils = require("../internal-utils");
const _approuterheaders = require("../../client/components/app-router-headers");
const _metadata = require("../../lib/metadata/metadata");
const _requestasyncstoragewrapper = require("../async-storage/request-async-storage-wrapper");
const _staticgenerationasyncstoragewrapper = require("../async-storage/static-generation-async-storage-wrapper");
const _notfound = require("../../client/components/not-found");
const _redirect = require("../../client/components/redirect");
const _patchfetch = require("../lib/patch-fetch");
const _constants = require("../lib/trace/constants");
const _tracer = require("../lib/trace/tracer");
const _flightrenderresult = require("./flight-render-result");
const _createerrorhandler = require("./create-error-handler");
const _getshortdynamicparamtype = require("./get-short-dynamic-param-type");
const _getsegmentparam = require("./get-segment-param");
const _getscriptnoncefromheader = require("./get-script-nonce-from-header");
const _parseandvalidateflightrouterstate = require("./parse-and-validate-flight-router-state");
const _validateurl = require("./validate-url");
const _createflightrouterstatefromloadertree = require("./create-flight-router-state-from-loader-tree");
const _actionhandler = require("./action-handler");
const _nossrerror = require("../../shared/lib/lazy-dynamic/no-ssr-error");
const _log = require("../../build/output/log");
const _requestcookies = require("../web/spec-extension/adapters/request-cookies");
const _serverinsertedhtml = require("./server-inserted-html");
const _requiredscripts = require("./required-scripts");
const _addpathprefix = require("../../shared/lib/router/utils/add-path-prefix");
const _makegetserverinsertedhtml = require("./make-get-server-inserted-html");
const _walktreewithflightrouterstate = require("./walk-tree-with-flight-router-state");
const _createcomponenttree = require("./create-component-tree");
const _getassetquerystring = require("./get-asset-query-string");
const _actionencryptionutils = require("./action-encryption-utils");
const _staticrenderer = require("./static/static-renderer");
const _ismissingpostponeerror = require("./is-missing-postpone-error");
const _detachedpromise = require("../../lib/detached-promise");
const _hooksservercontext = require("../../client/components/hooks-server-context");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function createNotFoundLoaderTree(loaderTree) {
    // Align the segment with parallel-route-default in next-app-loader
    return [
        "",
        {},
        loaderTree[2]
    ];
}
/* This method is important for intercepted routes to function:
 * when a route is intercepted, e.g. /blog/[slug], it will be rendered
 * with the layout of the previous page, e.g. /profile/[id]. The problem is
 * that the loader tree needs to know the dynamic param in order to render (id and slug in the example).
 * Normally they are read from the path but since we are intercepting the route, the path would not contain id,
 * so we need to read it from the router state.
 */ function findDynamicParamFromRouterState(providedFlightRouterState, segment) {
    if (!providedFlightRouterState) {
        return null;
    }
    const treeSegment = providedFlightRouterState[0];
    if ((0, _matchsegments.canSegmentBeOverridden)(segment, treeSegment)) {
        if (!Array.isArray(treeSegment) || Array.isArray(segment)) {
            return null;
        }
        return {
            param: treeSegment[0],
            value: treeSegment[1],
            treeSegment: treeSegment,
            type: treeSegment[2]
        };
    }
    for (const parallelRouterState of Object.values(providedFlightRouterState[1])){
        const maybeDynamicParam = findDynamicParamFromRouterState(parallelRouterState, segment);
        if (maybeDynamicParam) {
            return maybeDynamicParam;
        }
    }
    return null;
}
/**
 * Returns a function that parses the dynamic segment and return the associated value.
 */ function makeGetDynamicParamFromSegment(params, providedFlightRouterState) {
    return function getDynamicParamFromSegment(// [slug] / [[slug]] / [...slug]
    segment) {
        const segmentParam = (0, _getsegmentparam.getSegmentParam)(segment);
        if (!segmentParam) {
            return null;
        }
        const key = segmentParam.param;
        let value = params[key];
        // this is a special marker that will be present for interception routes
        if (value === "__NEXT_EMPTY_PARAM__") {
            value = undefined;
        }
        if (Array.isArray(value)) {
            value = value.map((i)=>encodeURIComponent(i));
        } else if (typeof value === "string") {
            value = encodeURIComponent(value);
        }
        if (!value) {
            // Handle case where optional catchall does not have a value, e.g. `/dashboard/[...slug]` when requesting `/dashboard`
            if (segmentParam.type === "optional-catchall") {
                const type = _getshortdynamicparamtype.dynamicParamTypes[segmentParam.type];
                return {
                    param: key,
                    value: null,
                    type: type,
                    // This value always has to be a string.
                    treeSegment: [
                        key,
                        "",
                        type
                    ]
                };
            }
            return findDynamicParamFromRouterState(providedFlightRouterState, segment);
        }
        const type = (0, _getshortdynamicparamtype.getShortDynamicParamType)(segmentParam.type);
        return {
            param: key,
            // The value that is passed to user code.
            value: value,
            // The value that is rendered in the router tree.
            treeSegment: [
                key,
                Array.isArray(value) ? value.join("/") : value,
                type
            ],
            type: type
        };
    };
}
// Handle Flight render request. This is only used when client-side navigating. E.g. when you `router.push('/dashboard')` or `router.reload()`.
async function generateFlight(ctx, options) {
    // Flight data that is going to be passed to the browser.
    // Currently a single item array but in the future multiple patches might be combined in a single request.
    let flightData = null;
    const { componentMod: { tree: loaderTree, renderToReadableStream }, getDynamicParamFromSegment, appUsingSizeAdjustment, staticGenerationStore: { urlPathname }, providedSearchParams, requestId, providedFlightRouterState } = ctx;
    if (!(options == null ? void 0 : options.skipFlight)) {
        const [MetadataTree, MetadataOutlet] = (0, _metadata.createMetadataComponents)({
            tree: loaderTree,
            pathname: urlPathname,
            searchParams: providedSearchParams,
            getDynamicParamFromSegment,
            appUsingSizeAdjustment
        });
        flightData = (await (0, _walktreewithflightrouterstate.walkTreeWithFlightRouterState)({
            ctx,
            createSegmentPath: (child)=>child,
            loaderTreeToFilter: loaderTree,
            parentParams: {},
            flightRouterState: providedFlightRouterState,
            isFirst: true,
            // For flight, render metadata inside leaf page
            rscPayloadHead: // Adding requestId as react key to make metadata remount for each render
            /*#__PURE__*/ _react.default.createElement(MetadataTree, {
                key: requestId
            }),
            injectedCSS: new Set(),
            injectedJS: new Set(),
            injectedFontPreloadTags: new Set(),
            rootLayoutIncluded: false,
            asNotFound: ctx.isNotFoundPath || (options == null ? void 0 : options.asNotFound),
            metadataOutlet: /*#__PURE__*/ _react.default.createElement(MetadataOutlet, null)
        })).map((path)=>path.slice(1)) // remove the '' (root) segment
        ;
    }
    const buildIdFlightDataPair = [
        ctx.renderOpts.buildId,
        flightData
    ];
    // For app dir, use the bundled version of Flight server renderer (renderToReadableStream)
    // which contains the subset React.
    const flightReadableStream = renderToReadableStream(options ? [
        options.actionResult,
        buildIdFlightDataPair
    ] : buildIdFlightDataPair, ctx.clientReferenceManifest.clientModules, {
        onError: ctx.flightDataRendererErrorHandler
    });
    return new _flightrenderresult.FlightRenderResult(flightReadableStream);
}
/**
 * Creates a resolver that eagerly generates a flight payload that is then
 * resolved when the resolver is called.
 */ function createFlightDataResolver(ctx) {
    // Generate the flight data and as soon as it can, convert it into a string.
    const promise = generateFlight(ctx).then(async (result)=>({
            flightData: await result.toUnchunkedString(true)
        }))// Otherwise if it errored, return the error.
    .catch((err)=>({
            err
        }));
    return async ()=>{
        // Resolve the promise to get the flight data or error.
        const result = await promise;
        // If the flight data failed to render due to an error, re-throw the error
        // here.
        if ("err" in result) {
            throw result.err;
        }
        // Otherwise, return the flight data.
        return result.flightData;
    };
}
/**
 * A new React Component that renders the provided React Component
 * using Flight which can then be rendered to HTML.
 */ function createServerComponentsRenderer(loaderTreeToRender, { ctx, preinitScripts, options }) {
    return (0, _createservercomponentsrenderer.createServerComponentRenderer)(async (props)=>{
        preinitScripts();
        // Create full component tree from root to leaf.
        const injectedCSS = new Set();
        const injectedJS = new Set();
        const injectedFontPreloadTags = new Set();
        const { getDynamicParamFromSegment, query, providedSearchParams, appUsingSizeAdjustment, componentMod: { AppRouter, GlobalError }, staticGenerationStore: { urlPathname } } = ctx;
        const initialTree = (0, _createflightrouterstatefromloadertree.createFlightRouterStateFromLoaderTree)(loaderTreeToRender, getDynamicParamFromSegment, query);
        const [MetadataTree, MetadataOutlet] = (0, _metadata.createMetadataComponents)({
            tree: loaderTreeToRender,
            errorType: props.asNotFound ? "not-found" : undefined,
            pathname: urlPathname,
            searchParams: providedSearchParams,
            getDynamicParamFromSegment: getDynamicParamFromSegment,
            appUsingSizeAdjustment: appUsingSizeAdjustment
        });
        const { seedData, styles } = await (0, _createcomponenttree.createComponentTree)({
            ctx,
            createSegmentPath: (child)=>child,
            loaderTree: loaderTreeToRender,
            parentParams: {},
            firstItem: true,
            injectedCSS,
            injectedJS,
            injectedFontPreloadTags,
            rootLayoutIncluded: false,
            asNotFound: props.asNotFound,
            metadataOutlet: /*#__PURE__*/ _react.default.createElement(MetadataOutlet, null)
        });
        return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, styles, /*#__PURE__*/ _react.default.createElement(AppRouter, {
            buildId: ctx.renderOpts.buildId,
            assetPrefix: ctx.assetPrefix,
            initialCanonicalUrl: urlPathname,
            // This is the router state tree.
            initialTree: initialTree,
            // This is the tree of React nodes that are seeded into the cache
            initialSeedData: seedData,
            initialHead: /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, ctx.res.statusCode > 400 && /*#__PURE__*/ _react.default.createElement("meta", {
                name: "robots",
                content: "noindex"
            }), /*#__PURE__*/ _react.default.createElement(MetadataTree, {
                key: ctx.requestId
            })),
            globalErrorComponent: GlobalError
        }));
    }, options);
}
async function renderToHTMLOrFlightImpl(req, res, pagePath, query, renderOpts, baseCtx) {
    var _getTracer_getRootSpanAttributes;
    const isNotFoundPath = pagePath === "/404";
    // A unique request timestamp used by development to ensure that it's
    // consistent and won't change during this request. This is important to
    // avoid that resources can be deduped by React Float if the same resource is
    // rendered or preloaded multiple times: `<link href="a.css?v={Date.now()}"/>`.
    const requestTimestamp = Date.now();
    const { buildManifest, subresourceIntegrityManifest, serverActionsManifest, ComponentMod, dev, nextFontManifest, supportsDynamicHTML, serverActions, buildId, appDirDevErrorLogger, assetPrefix = "", enableTainting } = renderOpts;
    // We need to expose the bundled `require` API globally for
    // react-server-dom-webpack. This is a hack until we find a better way.
    if (ComponentMod.__next_app__) {
        // @ts-ignore
        globalThis.__next_require__ = ComponentMod.__next_app__.require;
        // @ts-ignore
        globalThis.__next_chunk_load__ = ComponentMod.__next_app__.loadChunk;
    }
    const metadata = {};
    const appUsingSizeAdjustment = !!(nextFontManifest == null ? void 0 : nextFontManifest.appUsingSizeAdjust);
    // TODO: fix this typescript
    const clientReferenceManifest = renderOpts.clientReferenceManifest;
    const workerName = "app" + renderOpts.page;
    const serverModuleMap = new Proxy({}, {
        get: (_, id)=>{
            return {
                id: serverActionsManifest[process.env.NEXT_RUNTIME === "edge" ? "edge" : "node"][id].workers[workerName],
                name: id,
                chunks: []
            };
        }
    });
    (0, _actionencryptionutils.setReferenceManifestsSingleton)({
        clientReferenceManifest,
        serverActionsManifest,
        serverModuleMap
    });
    const capturedErrors = [];
    const allCapturedErrors = [];
    const isNextExport = !!renderOpts.nextExport;
    const { staticGenerationStore, requestStore } = baseCtx;
    const { isStaticGeneration } = staticGenerationStore;
    // when static generation fails during PPR, we log the errors separately. We intentionally
    // silence the error logger in this case to avoid double logging.
    const silenceStaticGenerationErrors = renderOpts.experimental.ppr && isStaticGeneration;
    const serverComponentsErrorHandler = (0, _createerrorhandler.createErrorHandler)({
        _source: "serverComponentsRenderer",
        dev,
        isNextExport,
        errorLogger: appDirDevErrorLogger,
        capturedErrors,
        silenceLogger: silenceStaticGenerationErrors
    });
    const flightDataRendererErrorHandler = (0, _createerrorhandler.createErrorHandler)({
        _source: "flightDataRenderer",
        dev,
        isNextExport,
        errorLogger: appDirDevErrorLogger,
        capturedErrors,
        silenceLogger: silenceStaticGenerationErrors
    });
    const htmlRendererErrorHandler = (0, _createerrorhandler.createErrorHandler)({
        _source: "htmlRenderer",
        dev,
        isNextExport,
        errorLogger: appDirDevErrorLogger,
        capturedErrors,
        allCapturedErrors,
        silenceLogger: silenceStaticGenerationErrors
    });
    ComponentMod.patchFetch();
    /**
   * Rules of Static & Dynamic HTML:
   *
   *    1.) We must generate static HTML unless the caller explicitly opts
   *        in to dynamic HTML support.
   *
   *    2.) If dynamic HTML support is requested, we must honor that request
   *        or throw an error. It is the sole responsibility of the caller to
   *        ensure they aren't e.g. requesting dynamic HTML for an AMP page.
   *
   * These rules help ensure that other existing features like request caching,
   * coalescing, and ISR continue working as intended.
   */ const generateStaticHTML = supportsDynamicHTML !== true;
    // Pull out the hooks/references from the component.
    const { createSearchParamsBailoutProxy, AppRouter, GlobalError, tree: loaderTree, taintObjectReference } = ComponentMod;
    if (enableTainting) {
        taintObjectReference("Do not pass process.env to client components since it will leak sensitive data", process.env);
    }
    const { urlPathname } = staticGenerationStore;
    staticGenerationStore.fetchMetrics = [];
    metadata.fetchMetrics = staticGenerationStore.fetchMetrics;
    // don't modify original query object
    query = {
        ...query
    };
    (0, _internalutils.stripInternalQueries)(query);
    const isRSCRequest = req.headers[_approuterheaders.RSC_HEADER.toLowerCase()] !== undefined;
    const isPrefetchRSCRequest = isRSCRequest && req.headers[_approuterheaders.NEXT_ROUTER_PREFETCH_HEADER.toLowerCase()] !== undefined;
    /**
   * Router state provided from the client-side router. Used to handle rendering from the common layout down.
   */ let providedFlightRouterState = isRSCRequest && (!isPrefetchRSCRequest || !renderOpts.experimental.ppr) ? (0, _parseandvalidateflightrouterstate.parseAndValidateFlightRouterState)(req.headers[_approuterheaders.NEXT_ROUTER_STATE_TREE.toLowerCase()]) : undefined;
    /**
   * The metadata items array created in next-app-loader with all relevant information
   * that we need to resolve the final metadata.
   */ let requestId;
    if (process.env.NEXT_RUNTIME === "edge") {
        requestId = crypto.randomUUID();
    } else {
        requestId = require("next/dist/compiled/nanoid").nanoid();
    }
    // During static generation we need to call the static generation bailout when reading searchParams
    const providedSearchParams = isStaticGeneration ? createSearchParamsBailoutProxy() : query;
    const searchParamsProps = {
        searchParams: providedSearchParams
    };
    /**
   * Dynamic parameters. E.g. when you visit `/dashboard/vercel` which is rendered by `/dashboard/[slug]` the value will be {"slug": "vercel"}.
   */ const params = renderOpts.params ?? {};
    const getDynamicParamFromSegment = makeGetDynamicParamFromSegment(params, providedFlightRouterState);
    const ctx = {
        ...baseCtx,
        getDynamicParamFromSegment,
        query,
        isPrefetch: isPrefetchRSCRequest,
        providedSearchParams,
        requestTimestamp,
        searchParamsProps,
        appUsingSizeAdjustment,
        providedFlightRouterState,
        requestId,
        defaultRevalidate: false,
        pagePath,
        clientReferenceManifest,
        assetPrefix,
        flightDataRendererErrorHandler,
        serverComponentsErrorHandler,
        isNotFoundPath,
        res
    };
    if (isRSCRequest && !isStaticGeneration) {
        return generateFlight(ctx);
    }
    const hasPostponed = typeof renderOpts.postponed === "string";
    // Create the resolver that can get the flight payload when it's ready or
    // throw the error if it occurred. If we are not generating static HTML, we
    // don't need to generate the flight payload because it's a dynamic request
    // which means we're either getting the flight payload only or just the
    // regular HTML.
    const flightDataResolver = isStaticGeneration ? createFlightDataResolver(ctx) : null;
    // Get the nonce from the incoming request if it has one.
    const csp = req.headers["content-security-policy"] || req.headers["content-security-policy-report-only"];
    let nonce;
    if (csp && typeof csp === "string") {
        nonce = (0, _getscriptnoncefromheader.getScriptNonceFromHeader)(csp);
    }
    const serverComponentsRenderOpts = {
        inlinedDataTransformStream: new TransformStream(),
        clientReferenceManifest,
        formState: null,
        ComponentMod,
        serverComponentsErrorHandler,
        nonce
    };
    const validateRootLayout = dev ? {
        assetPrefix: renderOpts.assetPrefix,
        getTree: ()=>(0, _createflightrouterstatefromloadertree.createFlightRouterStateFromLoaderTree)(loaderTree, getDynamicParamFromSegment, query)
    } : undefined;
    const { HeadManagerContext } = require("../../shared/lib/head-manager-context.shared-runtime");
    // On each render, create a new `ServerInsertedHTML` context to capture
    // injected nodes from user code (`useServerInsertedHTML`).
    const { ServerInsertedHTMLProvider, renderServerInsertedHTML } = (0, _serverinsertedhtml.createServerInsertedHTML)();
    (_getTracer_getRootSpanAttributes = (0, _tracer.getTracer)().getRootSpanAttributes()) == null ? void 0 : _getTracer_getRootSpanAttributes.set("next.route", pagePath);
    // Create a promise that will help us signal when the headers have been
    // written to the metadata for static generation as they aren't written to the
    // response directly.
    const onHeadersFinished = new _detachedpromise.DetachedPromise();
    const renderToStream = (0, _tracer.getTracer)().wrap(_constants.AppRenderSpan.getBodyResult, {
        spanName: `render route (app) ${pagePath}`,
        attributes: {
            "next.route": pagePath
        }
    }, async ({ asNotFound, tree, formState })=>{
        const polyfills = buildManifest.polyfillFiles.filter((polyfill)=>polyfill.endsWith(".js") && !polyfill.endsWith(".module.js")).map((polyfill)=>({
                src: `${assetPrefix}/_next/${polyfill}${(0, _getassetquerystring.getAssetQueryString)(ctx, false)}`,
                integrity: subresourceIntegrityManifest == null ? void 0 : subresourceIntegrityManifest[polyfill],
                crossOrigin: renderOpts.crossOrigin,
                noModule: true,
                nonce
            }));
        const [preinitScripts, bootstrapScript] = (0, _requiredscripts.getRequiredScripts)(buildManifest, assetPrefix, renderOpts.crossOrigin, subresourceIntegrityManifest, (0, _getassetquerystring.getAssetQueryString)(ctx, true), nonce);
        const ServerComponentsRenderer = createServerComponentsRenderer(tree, {
            ctx,
            preinitScripts,
            options: serverComponentsRenderOpts
        });
        const children = /*#__PURE__*/ _react.default.createElement(HeadManagerContext.Provider, {
            value: {
                appDir: true,
                nonce
            }
        }, /*#__PURE__*/ _react.default.createElement(ServerInsertedHTMLProvider, null, /*#__PURE__*/ _react.default.createElement(ServerComponentsRenderer, {
            asNotFound: asNotFound
        })));
        const getServerInsertedHTML = (0, _makegetserverinsertedhtml.makeGetServerInsertedHTML)({
            polyfills,
            renderServerInsertedHTML,
            hasPostponed
        });
        const renderer = (0, _staticrenderer.createStaticRenderer)({
            ppr: renderOpts.experimental.ppr,
            isStaticGeneration,
            // If provided, the postpone state should be parsed as JSON so it can be
            // provided to React.
            postponed: renderOpts.postponed ? JSON.parse(renderOpts.postponed) : null,
            streamOptions: {
                onError: htmlRendererErrorHandler,
                onHeaders: (headers)=>{
                    // If this is during static generation, we shouldn't write to the
                    // headers object directly, instead we should add to the render
                    // result.
                    if (isStaticGeneration) {
                        headers.forEach((value, key)=>{
                            metadata.headers ??= {};
                            metadata.headers[key] = value;
                        });
                        // Resolve the promise to continue the stream.
                        onHeadersFinished.resolve();
                    } else {
                        headers.forEach((value, key)=>{
                            res.appendHeader(key, value);
                        });
                    }
                },
                maxHeadersLength: 600,
                nonce,
                bootstrapScripts: [
                    bootstrapScript
                ],
                formState
            }
        });
        try {
            let { stream, postponed } = await renderer.render(children);
            // If the stream was postponed, we need to add the result to the
            // metadata so that it can be resumed later.
            if (postponed) {
                metadata.postponed = JSON.stringify(postponed);
                // We don't need to "continue" this stream now as it's continued when
                // we resume the stream.
                return stream;
            }
            const options = {
                inlinedDataStream: serverComponentsRenderOpts.inlinedDataTransformStream.readable,
                isStaticGeneration: isStaticGeneration || generateStaticHTML,
                getServerInsertedHTML: ()=>getServerInsertedHTML(allCapturedErrors),
                serverInsertedHTMLToHead: !renderOpts.postponed,
                // If this render generated a postponed state or this is a resume
                // render, we don't want to validate the root layout as it's already
                // partially rendered.
                validateRootLayout: !postponed && !renderOpts.postponed ? validateRootLayout : undefined,
                // App Render doesn't need to inject any additional suffixes.
                suffix: undefined
            };
            if (renderOpts.postponed) {
                return await (0, _nodewebstreamshelper.continuePostponedFizzStream)(stream, options);
            }
            return await (0, _nodewebstreamshelper.continueFizzStream)(stream, options);
        } catch (err) {
            var _err_message;
            if (err.code === "NEXT_STATIC_GEN_BAILOUT" || ((_err_message = err.message) == null ? void 0 : _err_message.includes("https://nextjs.org/docs/advanced-features/static-html-export"))) {
                // Ensure that "next dev" prints the red error overlay
                throw err;
            }
            if (isStaticGeneration && err.digest === _hooksservercontext.DYNAMIC_ERROR_CODE) {
                // ensure that DynamicUsageErrors bubble up during static generation
                // as this will indicate that the page needs to be dynamically rendered
                throw err;
            }
            if (err.digest === _nossrerror.NEXT_DYNAMIC_NO_SSR_CODE) {
                (0, _log.warn)(`Entire page ${pagePath} deopted into client-side rendering. https://nextjs.org/docs/messages/deopted-into-client-rendering`, pagePath);
            }
            if ((0, _notfound.isNotFoundError)(err)) {
                res.statusCode = 404;
            }
            let hasRedirectError = false;
            if ((0, _redirect.isRedirectError)(err)) {
                hasRedirectError = true;
                res.statusCode = (0, _redirect.getRedirectStatusCodeFromError)(err);
                if (err.mutableCookies) {
                    const headers = new Headers();
                    // If there were mutable cookies set, we need to set them on the
                    // response.
                    if ((0, _requestcookies.appendMutableCookies)(headers, err.mutableCookies)) {
                        res.setHeader("set-cookie", Array.from(headers.values()));
                    }
                }
                const redirectUrl = (0, _addpathprefix.addPathPrefix)((0, _redirect.getURLFromRedirectError)(err), renderOpts.basePath);
                res.setHeader("Location", redirectUrl);
            }
            const is404 = res.statusCode === 404;
            if (!is404 && !hasRedirectError) {
                res.statusCode = 500;
            }
            // Preserve the existing RSC inline chunks from the page rendering.
            // To avoid the same stream being operated twice, clone the origin stream for error rendering.
            const serverErrorComponentsRenderOpts = {
                ...serverComponentsRenderOpts,
                inlinedDataTransformStream: (0, _nodewebstreamshelper.cloneTransformStream)(serverComponentsRenderOpts.inlinedDataTransformStream),
                formState
            };
            const errorType = is404 ? "not-found" : hasRedirectError ? "redirect" : undefined;
            const errorMeta = /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, res.statusCode >= 400 && /*#__PURE__*/ _react.default.createElement("meta", {
                name: "robots",
                content: "noindex"
            }), process.env.NODE_ENV === "development" && /*#__PURE__*/ _react.default.createElement("meta", {
                name: "next-error",
                content: "not-found"
            }));
            const [errorPreinitScripts, errorBootstrapScript] = (0, _requiredscripts.getRequiredScripts)(buildManifest, assetPrefix, renderOpts.crossOrigin, subresourceIntegrityManifest, (0, _getassetquerystring.getAssetQueryString)(ctx, false), nonce);
            const ErrorPage = (0, _createservercomponentsrenderer.createServerComponentRenderer)(async ()=>{
                errorPreinitScripts();
                const [MetadataTree] = (0, _metadata.createMetadataComponents)({
                    tree,
                    pathname: urlPathname,
                    errorType,
                    searchParams: providedSearchParams,
                    getDynamicParamFromSegment,
                    appUsingSizeAdjustment
                });
                const head = /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(MetadataTree, {
                    key: requestId
                }), errorMeta);
                const initialTree = (0, _createflightrouterstatefromloadertree.createFlightRouterStateFromLoaderTree)(tree, getDynamicParamFromSegment, query);
                // For metadata notFound error there's no global not found boundary on top
                // so we create a not found page with AppRouter
                const initialSeedData = [
                    initialTree[0],
                    null,
                    /*#__PURE__*/ _react.default.createElement("html", {
                        id: "__next_error__"
                    }, /*#__PURE__*/ _react.default.createElement("head", null), /*#__PURE__*/ _react.default.createElement("body", null))
                ];
                return /*#__PURE__*/ _react.default.createElement(AppRouter, {
                    buildId: buildId,
                    assetPrefix: assetPrefix,
                    initialCanonicalUrl: urlPathname,
                    initialTree: initialTree,
                    initialHead: head,
                    globalErrorComponent: GlobalError,
                    initialSeedData: initialSeedData
                });
            }, {
                ...serverErrorComponentsRenderOpts,
                ComponentMod,
                serverComponentsErrorHandler,
                nonce
            });
            try {
                const fizzStream = await (0, _nodewebstreamshelper.renderToInitialFizzStream)({
                    ReactDOMServer: require("react-dom/server.edge"),
                    element: /*#__PURE__*/ _react.default.createElement(ErrorPage, null),
                    streamOptions: {
                        nonce,
                        // Include hydration scripts in the HTML
                        bootstrapScripts: [
                            errorBootstrapScript
                        ],
                        formState
                    }
                });
                return await (0, _nodewebstreamshelper.continueFizzStream)(fizzStream, {
                    inlinedDataStream: serverErrorComponentsRenderOpts.inlinedDataTransformStream.readable,
                    isStaticGeneration,
                    getServerInsertedHTML: ()=>getServerInsertedHTML([]),
                    serverInsertedHTMLToHead: true,
                    validateRootLayout,
                    suffix: undefined
                });
            } catch (finalErr) {
                if (process.env.NODE_ENV === "development" && (0, _notfound.isNotFoundError)(finalErr)) {
                    const bailOnNotFound = require("../../client/components/dev-root-not-found-boundary").bailOnNotFound;
                    bailOnNotFound();
                }
                throw finalErr;
            }
        }
    });
    // For action requests, we handle them differently with a special render result.
    const actionRequestResult = await (0, _actionhandler.handleAction)({
        req,
        res,
        ComponentMod,
        serverModuleMap,
        generateFlight,
        staticGenerationStore,
        requestStore,
        serverActions,
        ctx
    });
    let formState = null;
    if (actionRequestResult) {
        if (actionRequestResult.type === "not-found") {
            const notFoundLoaderTree = createNotFoundLoaderTree(loaderTree);
            return new _renderresult.default(await renderToStream({
                asNotFound: true,
                tree: notFoundLoaderTree,
                formState
            }), {
                metadata
            });
        } else if (actionRequestResult.type === "done") {
            if (actionRequestResult.result) {
                actionRequestResult.result.assignMetadata(metadata);
                return actionRequestResult.result;
            } else if (actionRequestResult.formState) {
                formState = actionRequestResult.formState;
            }
        }
    }
    const options = {
        metadata
    };
    let response = await renderToStream({
        asNotFound: isNotFoundPath,
        tree: loaderTree,
        formState
    });
    // If we have pending revalidates, wait until they are all resolved.
    if (staticGenerationStore.pendingRevalidates) {
        options.waitUntil = Promise.all(Object.values(staticGenerationStore.pendingRevalidates));
    }
    (0, _patchfetch.addImplicitTags)(staticGenerationStore);
    if (staticGenerationStore.tags) {
        metadata.fetchTags = staticGenerationStore.tags.join(",");
    }
    // Create the new render result for the response.
    const result = new _renderresult.default(response, options);
    // If we aren't performing static generation, we can return the result now.
    if (!isStaticGeneration) {
        return result;
    }
    // If this is static generation, we should read this in now rather than
    // sending it back to be sent to the client.
    response = await result.toUnchunkedString(true);
    // Timeout after 1.5 seconds for the headers to write. If it takes
    // longer than this it's more likely that the stream has stalled and
    // there is a React bug. The headers will then be updated in the render
    // result below when the metadata is re-added to the new render result.
    const onTimeout = new _detachedpromise.DetachedPromise();
    const timeout = setTimeout(()=>{
        onTimeout.reject(new Error("Timeout waiting for headers to be emitted, this is a bug in Next.js"));
    }, 1500);
    // Race against the timeout and the headers being written.
    await Promise.race([
        onHeadersFinished.promise,
        onTimeout.promise
    ]);
    // It got here, which means it did not reject, so clear the timeout to avoid
    // it from rejecting again (which is a no-op anyways).
    clearTimeout(timeout);
    if (// if PPR is enabled
    renderOpts.experimental.ppr && // and a call to `postpone` happened
    staticGenerationStore.postponeWasTriggered && // but there's no postpone state
    !metadata.postponed) {
        // a call to postpone was made but was caught and not detected by Next.js. We should fail the build immediately
        // as we won't be able to generate the static part
        (0, _log.warn)("");
        (0, _log.error)(`Prerendering ${urlPathname} needs to partially bail out because something dynamic was used. ` + `React throws a special object to indicate where we need to bail out but it was caught ` + `by a try/catch or a Promise was not awaited. These special objects should not be caught ` + `by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`);
        if (capturedErrors.length > 0) {
            (0, _log.warn)("The following error was thrown during build, and may help identify the source of the issue:");
            (0, _log.error)(capturedErrors[0]);
        }
        throw new _ismissingpostponeerror.MissingPostponeDataError(`An unexpected error occurred while prerendering ${urlPathname}. Please check the logs above for more details.`);
    }
    if (!flightDataResolver) {
        throw new Error("Invariant: Flight data resolver is missing when generating static HTML");
    }
    // If we encountered any unexpected errors during build we fail the
    // prerendering phase and the build.
    if (capturedErrors.length > 0) {
        throw capturedErrors[0];
    }
    // Wait for and collect the flight payload data if we don't have it
    // already
    const flightData = await flightDataResolver();
    if (flightData) {
        metadata.flightData = flightData;
    }
    // If force static is specifically set to false, we should not revalidate
    // the page.
    if (staticGenerationStore.forceStatic === false) {
        staticGenerationStore.revalidate = 0;
    }
    // Copy the revalidation value onto the render result metadata.
    metadata.revalidate = staticGenerationStore.revalidate ?? ctx.defaultRevalidate;
    // provide bailout info for debugging
    if (metadata.revalidate === 0) {
        metadata.staticBailoutInfo = {
            description: staticGenerationStore.dynamicUsageDescription,
            stack: staticGenerationStore.dynamicUsageStack
        };
    }
    return new _renderresult.default(response, options);
}
const renderToHTMLOrFlight = (req, res, pagePath, query, renderOpts)=>{
    // TODO: this includes query string, should it?
    const pathname = (0, _validateurl.validateURL)(req.url);
    return _requestasyncstoragewrapper.RequestAsyncStorageWrapper.wrap(renderOpts.ComponentMod.requestAsyncStorage, {
        req,
        res,
        renderOpts
    }, (requestStore)=>_staticgenerationasyncstoragewrapper.StaticGenerationAsyncStorageWrapper.wrap(renderOpts.ComponentMod.staticGenerationAsyncStorage, {
            urlPathname: pathname,
            renderOpts,
            postpone: _react.default.unstable_postpone
        }, (staticGenerationStore)=>renderToHTMLOrFlightImpl(req, res, pagePath, query, renderOpts, {
                requestStore,
                staticGenerationStore,
                componentMod: renderOpts.ComponentMod,
                renderOpts
            })));
};

//# sourceMappingURL=app-render.js.map