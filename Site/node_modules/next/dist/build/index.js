"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    buildCustomRoute: null,
    default: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    buildCustomRoute: function() {
        return buildCustomRoute;
    },
    default: function() {
        return build;
    }
});
require("../lib/setup-exception-listeners");
const _env = require("@next/env");
const _picocolors = require("../lib/picocolors");
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
const _micromatch = require("next/dist/compiled/micromatch");
const _fs = require("fs");
const _os = /*#__PURE__*/ _interop_require_default(require("os"));
const _worker = require("../lib/worker");
const _configshared = require("../server/config-shared");
const _devalue = /*#__PURE__*/ _interop_require_default(require("next/dist/compiled/devalue"));
const _findup = /*#__PURE__*/ _interop_require_default(require("next/dist/compiled/find-up"));
const _indexcjs = require("next/dist/compiled/nanoid/index.cjs");
const _pathtoregexp = require("next/dist/compiled/path-to-regexp");
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _constants = require("../lib/constants");
const _fileexists = require("../lib/file-exists");
const _findpagesdir = require("../lib/find-pages-dir");
const _loadcustomroutes = /*#__PURE__*/ _interop_require_wildcard(require("../lib/load-custom-routes"));
const _redirectstatus = require("../lib/redirect-status");
const _nonnullable = require("../lib/non-nullable");
const _recursivedelete = require("../lib/recursive-delete");
const _verifypartytownsetup = require("../lib/verify-partytown-setup");
const _constants1 = require("../shared/lib/constants");
const _utils = require("../shared/lib/router/utils");
const _config = /*#__PURE__*/ _interop_require_default(require("../server/config"));
const _normalizepagepath = require("../shared/lib/page-path/normalize-page-path");
const _require = require("../server/require");
const _ciinfo = /*#__PURE__*/ _interop_require_wildcard(require("../telemetry/ci-info"));
const _events = require("../telemetry/events");
const _storage = require("../telemetry/storage");
const _getpagestaticinfo = require("./analysis/get-page-static-info");
const _entries = require("./entries");
const _generatebuildid = require("./generate-build-id");
const _iswriteable = require("./is-writeable");
const _log = /*#__PURE__*/ _interop_require_wildcard(require("./output/log"));
const _spinner = /*#__PURE__*/ _interop_require_default(require("./spinner"));
const _trace = require("../trace");
const _utils1 = require("./utils");
const _writebuildid = require("./write-build-id");
const _normalizelocalepath = require("../shared/lib/i18n/normalize-locale-path");
const _iserror = /*#__PURE__*/ _interop_require_default(require("../lib/is-error"));
const _isedgeruntime = require("../lib/is-edge-runtime");
const _recursivecopy = require("../lib/recursive-copy");
const _recursivereaddir = require("../lib/recursive-readdir");
const _swc = require("./swc");
const _routeregex = require("../shared/lib/router/utils/route-regex");
const _getfilesindir = require("../lib/get-files-in-dir");
const _swcplugins = require("../telemetry/events/swc-plugins");
const _apppaths = require("../shared/lib/router/utils/app-paths");
const _approuterheaders = require("../client/components/app-router-headers");
const _webpackbuild = require("./webpack-build");
const _buildcontext = require("./build-context");
const _normalizepathsep = require("../shared/lib/page-path/normalize-path-sep");
const _isapprouteroute = require("../lib/is-app-route-route");
const _createclientrouterfilter = require("../lib/create-client-router-filter");
const _findpagefile = require("../server/lib/find-page-file");
const _typecheck = require("./type-check");
const _generateinterceptionroutesrewrites = require("../lib/generate-interception-routes-rewrites");
const _builddataroute = require("../server/lib/router-utils/build-data-route");
const _incrementalcacheserver = require("../server/lib/incremental-cache-server");
const _nodefsmethods = require("../server/lib/node-fs-methods");
const _collectbuildtraces = require("./collect-build-traces");
const _formatmanifest = require("./manifests/formatter/format-manifest");
const _appinfolog = require("../server/lib/app-info-log");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function buildCustomRoute(type, route, restrictedRedirectPaths) {
    const compiled = (0, _pathtoregexp.pathToRegexp)(route.source, [], {
        strict: true,
        sensitive: false,
        delimiter: "/"
    });
    let source = compiled.source;
    if (!route.internal) {
        source = (0, _redirectstatus.modifyRouteRegex)(source, type === "redirect" ? restrictedRedirectPaths : undefined);
    }
    const regex = (0, _loadcustomroutes.normalizeRouteRegex)(source);
    if (type !== "redirect") {
        return {
            ...route,
            regex
        };
    }
    return {
        ...route,
        statusCode: (0, _redirectstatus.getRedirectStatus)(route),
        permanent: undefined,
        regex
    };
}
async function generateClientSsgManifest(prerenderManifest, { buildId, distDir, locales }) {
    const ssgPages = new Set([
        ...Object.entries(prerenderManifest.routes)// Filter out dynamic routes
        .filter(([, { srcRoute }])=>srcRoute == null).map(([route])=>(0, _normalizelocalepath.normalizeLocalePath)(route, locales).pathname),
        ...Object.keys(prerenderManifest.dynamicRoutes)
    ].sort());
    const clientSsgManifestContent = `self.__SSG_MANIFEST=${(0, _devalue.default)(ssgPages)};self.__SSG_MANIFEST_CB&&self.__SSG_MANIFEST_CB()`;
    await _fs.promises.writeFile(_path.default.join(distDir, _constants1.CLIENT_STATIC_FILES_PATH, buildId, "_ssgManifest.js"), clientSsgManifestContent);
}
function pageToRoute(page) {
    const routeRegex = (0, _routeregex.getNamedRouteRegex)(page, true);
    return {
        page,
        regex: (0, _loadcustomroutes.normalizeRouteRegex)(routeRegex.re.source),
        routeKeys: routeRegex.routeKeys,
        namedRegex: routeRegex.namedRegex
    };
}
async function build(dir, reactProductionProfiling = false, debugOutput = false, runLint = true, noMangling = false, appDirOnly = false, turboNextBuild = false, turboNextBuildRoot = null, buildMode) {
    const isCompile = buildMode === "experimental-compile";
    const isGenerate = buildMode === "experimental-generate";
    try {
        const nextBuildSpan = (0, _trace.trace)("next-build", undefined, {
            buildMode: buildMode,
            isTurboBuild: String(turboNextBuild),
            version: "14.0.4"
        });
        _buildcontext.NextBuildContext.nextBuildSpan = nextBuildSpan;
        _buildcontext.NextBuildContext.dir = dir;
        _buildcontext.NextBuildContext.appDirOnly = appDirOnly;
        _buildcontext.NextBuildContext.reactProductionProfiling = reactProductionProfiling;
        _buildcontext.NextBuildContext.noMangling = noMangling;
        const buildResult = await nextBuildSpan.traceAsyncFn(async ()=>{
            var _mappedPages_404, _config_images;
            // attempt to load global env values so they are available in next.config.js
            const { loadedEnvFiles } = nextBuildSpan.traceChild("load-dotenv").traceFn(()=>(0, _env.loadEnvConfig)(dir, false, _log));
            _buildcontext.NextBuildContext.loadedEnvFiles = loadedEnvFiles;
            const config = await nextBuildSpan.traceChild("load-next-config").traceAsyncFn(()=>(0, _config.default)(_constants1.PHASE_PRODUCTION_BUILD, dir, {
                    // Log for next.config loading process
                    silent: false
                }));
            process.env.NEXT_DEPLOYMENT_ID = config.experimental.deploymentId || "";
            _buildcontext.NextBuildContext.config = config;
            let configOutDir = "out";
            if (config.output === "export" && config.distDir !== ".next") {
                // In the past, a user had to run "next build" to generate
                // ".next" (or whatever the distDir) followed by "next export"
                // to generate "out" (or whatever the outDir). However, when
                // "output: export" is configured, "next build" does both steps.
                // So the user-configured distDir is actually the outDir.
                configOutDir = config.distDir;
                config.distDir = ".next";
            }
            const distDir = _path.default.join(dir, config.distDir);
            (0, _trace.setGlobal)("phase", _constants1.PHASE_PRODUCTION_BUILD);
            (0, _trace.setGlobal)("distDir", distDir);
            let buildId = "";
            if (isGenerate) {
                buildId = await _fs.promises.readFile(_path.default.join(distDir, "BUILD_ID"), "utf8");
            } else {
                buildId = await nextBuildSpan.traceChild("generate-buildid").traceAsyncFn(()=>(0, _generatebuildid.generateBuildId)(config.generateBuildId, _indexcjs.nanoid));
            }
            _buildcontext.NextBuildContext.buildId = buildId;
            const customRoutes = await nextBuildSpan.traceChild("load-custom-routes").traceAsyncFn(()=>(0, _loadcustomroutes.default)(config));
            const { headers, rewrites, redirects } = customRoutes;
            _buildcontext.NextBuildContext.rewrites = rewrites;
            _buildcontext.NextBuildContext.originalRewrites = config._originalRewrites;
            _buildcontext.NextBuildContext.originalRedirects = config._originalRedirects;
            const cacheDir = _path.default.join(distDir, "cache");
            if (_ciinfo.isCI && !_ciinfo.hasNextSupport) {
                const hasCache = (0, _fs.existsSync)(cacheDir);
                if (!hasCache) {
                    // Intentionally not piping to stderr in case people fail in CI when
                    // stderr is detected.
                    console.log(`${_log.prefixes.warn} No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache`);
                }
            }
            const telemetry = new _storage.Telemetry({
                distDir
            });
            (0, _trace.setGlobal)("telemetry", telemetry);
            const publicDir = _path.default.join(dir, "public");
            const { pagesDir, appDir } = (0, _findpagesdir.findPagesDir)(dir);
            _buildcontext.NextBuildContext.pagesDir = pagesDir;
            _buildcontext.NextBuildContext.appDir = appDir;
            const enabledDirectories = {
                app: typeof appDir === "string",
                pages: typeof pagesDir === "string"
            };
            const isSrcDir = _path.default.relative(dir, pagesDir || appDir || "").startsWith("src");
            const hasPublicDir = (0, _fs.existsSync)(publicDir);
            telemetry.record((0, _events.eventCliSession)(dir, config, {
                webpackVersion: 5,
                cliCommand: "build",
                isSrcDir,
                hasNowJson: !!await (0, _findup.default)("now.json", {
                    cwd: dir
                }),
                isCustomServer: null,
                turboFlag: false,
                pagesDir: !!pagesDir,
                appDir: !!appDir
            }));
            (0, _events.eventNextPlugins)(_path.default.resolve(dir)).then((events)=>telemetry.record(events));
            (0, _swcplugins.eventSwcPlugins)(_path.default.resolve(dir), config).then((events)=>telemetry.record(events));
            const ignoreESLint = Boolean(config.eslint.ignoreDuringBuilds);
            const shouldLint = !ignoreESLint && runLint;
            const typeCheckingOptions = {
                dir,
                appDir,
                pagesDir,
                runLint,
                shouldLint,
                ignoreESLint,
                telemetry,
                nextBuildSpan,
                config,
                cacheDir
            };
            // For app directory, we run type checking after build. That's because
            // we dynamically generate types for each layout and page in the app
            // directory.
            if (!appDir && !isCompile) await (0, _typecheck.startTypeChecking)(typeCheckingOptions);
            if (appDir && "exportPathMap" in config) {
                _log.error('The "exportPathMap" configuration cannot be used with the "app" directory. Please use generateStaticParams() instead.');
                await telemetry.flush();
                process.exit(1);
            }
            const buildLintEvent = {
                featureName: "build-lint",
                invocationCount: shouldLint ? 1 : 0
            };
            telemetry.record({
                eventName: _events.EVENT_BUILD_FEATURE_USAGE,
                payload: buildLintEvent
            });
            let buildSpinner = {
                stopAndPersist () {
                    return this;
                }
            };
            const { envInfo, expFeatureInfo } = await (0, _appinfolog.getStartServerInfo)(dir);
            (0, _appinfolog.logStartInfo)({
                networkUrl: null,
                appUrl: null,
                envInfo,
                expFeatureInfo
            });
            if (!isGenerate) {
                buildSpinner = (0, _spinner.default)("Creating an optimized production build");
            }
            _buildcontext.NextBuildContext.buildSpinner = buildSpinner;
            const validFileMatcher = (0, _findpagefile.createValidFileMatcher)(config.pageExtensions, appDir);
            const pagesPaths = !appDirOnly && pagesDir ? await nextBuildSpan.traceChild("collect-pages").traceAsyncFn(()=>(0, _recursivereaddir.recursiveReadDir)(pagesDir, {
                    pathnameFilter: validFileMatcher.isPageFile
                })) : [];
            const middlewareDetectionRegExp = new RegExp(`^${_constants.MIDDLEWARE_FILENAME}\\.(?:${config.pageExtensions.join("|")})$`);
            const instrumentationHookDetectionRegExp = new RegExp(`^${_constants.INSTRUMENTATION_HOOK_FILENAME}\\.(?:${config.pageExtensions.join("|")})$`);
            const rootDir = _path.default.join(pagesDir || appDir, "..");
            const instrumentationHookEnabled = Boolean(config.experimental.instrumentationHook);
            const includes = [
                middlewareDetectionRegExp,
                ...instrumentationHookEnabled ? [
                    instrumentationHookDetectionRegExp
                ] : []
            ];
            const rootPaths = (await (0, _getfilesindir.getFilesInDir)(rootDir)).filter((file)=>includes.some((include)=>include.test(file))).sort((0, _entries.sortByPageExts)(config.pageExtensions)).map((file)=>_path.default.join(rootDir, file).replace(dir, ""));
            const hasInstrumentationHook = rootPaths.some((p)=>p.includes(_constants.INSTRUMENTATION_HOOK_FILENAME));
            _buildcontext.NextBuildContext.hasInstrumentationHook = hasInstrumentationHook;
            const previewProps = {
                previewModeId: _crypto.default.randomBytes(16).toString("hex"),
                previewModeSigningKey: _crypto.default.randomBytes(32).toString("hex"),
                previewModeEncryptionKey: _crypto.default.randomBytes(32).toString("hex")
            };
            _buildcontext.NextBuildContext.previewProps = previewProps;
            const mappedPages = nextBuildSpan.traceChild("create-pages-mapping").traceFn(()=>(0, _entries.createPagesMapping)({
                    isDev: false,
                    pageExtensions: config.pageExtensions,
                    pagesType: "pages",
                    pagePaths: pagesPaths,
                    pagesDir
                }));
            _buildcontext.NextBuildContext.mappedPages = mappedPages;
            let mappedAppPages;
            let denormalizedAppPages;
            if (appDir) {
                const appPaths = await nextBuildSpan.traceChild("collect-app-paths").traceAsyncFn(()=>(0, _recursivereaddir.recursiveReadDir)(appDir, {
                        pathnameFilter: (absolutePath)=>validFileMatcher.isAppRouterPage(absolutePath) || // For now we only collect the root /not-found page in the app
                            // directory as the 404 fallback
                            validFileMatcher.isRootNotFound(absolutePath),
                        ignorePartFilter: (part)=>part.startsWith("_")
                    }));
                mappedAppPages = nextBuildSpan.traceChild("create-app-mapping").traceFn(()=>(0, _entries.createPagesMapping)({
                        pagePaths: appPaths,
                        isDev: false,
                        pagesType: "app",
                        pageExtensions: config.pageExtensions,
                        pagesDir: pagesDir
                    }));
                // If the metadata route doesn't contain generating dynamic exports,
                // we can replace the dynamic catch-all route and use the static route instead.
                for (const [pageKey, pagePath] of Object.entries(mappedAppPages)){
                    if (pageKey.includes("[[...__metadata_id__]]")) {
                        const pageFilePath = (0, _entries.getPageFilePath)({
                            absolutePagePath: pagePath,
                            pagesDir,
                            appDir,
                            rootDir
                        });
                        const isDynamic = await (0, _getpagestaticinfo.isDynamicMetadataRoute)(pageFilePath);
                        if (!isDynamic) {
                            delete mappedAppPages[pageKey];
                            mappedAppPages[pageKey.replace("[[...__metadata_id__]]/", "")] = pagePath;
                        }
                        if (pageKey.includes("sitemap.xml/[[...__metadata_id__]]") && isDynamic) {
                            delete mappedAppPages[pageKey];
                            mappedAppPages[pageKey.replace("sitemap.xml/[[...__metadata_id__]]", "sitemap/[__metadata_id__]")] = pagePath;
                        }
                    }
                }
                _buildcontext.NextBuildContext.mappedAppPages = mappedAppPages;
            }
            let mappedRootPaths = {};
            if (rootPaths.length > 0) {
                mappedRootPaths = (0, _entries.createPagesMapping)({
                    isDev: false,
                    pageExtensions: config.pageExtensions,
                    pagePaths: rootPaths,
                    pagesType: "root",
                    pagesDir: pagesDir
                });
            }
            _buildcontext.NextBuildContext.mappedRootPaths = mappedRootPaths;
            const pagesPageKeys = Object.keys(mappedPages);
            const conflictingAppPagePaths = [];
            const appPageKeys = [];
            if (mappedAppPages) {
                denormalizedAppPages = Object.keys(mappedAppPages);
                for (const appKey of denormalizedAppPages){
                    const normalizedAppPageKey = (0, _apppaths.normalizeAppPath)(appKey);
                    const pagePath = mappedPages[normalizedAppPageKey];
                    if (pagePath) {
                        const appPath = mappedAppPages[appKey];
                        conflictingAppPagePaths.push([
                            pagePath.replace(/^private-next-pages/, "pages"),
                            appPath.replace(/^private-next-app-dir/, "app")
                        ]);
                    }
                    appPageKeys.push(normalizedAppPageKey);
                }
            }
            // Interception routes are modelled as beforeFiles rewrites
            rewrites.beforeFiles.push(...(0, _generateinterceptionroutesrewrites.generateInterceptionRoutesRewrites)(appPageKeys));
            const totalAppPagesCount = appPageKeys.length;
            const pageKeys = {
                pages: pagesPageKeys,
                app: appPageKeys.length > 0 ? appPageKeys : undefined
            };
            if (turboNextBuild) {
                // TODO(WEB-397) This is a temporary workaround to allow for filtering a
                // subset of pages when building with --experimental-turbo, until we
                // have complete support for all pages.
                if (process.env.NEXT_TURBO_FILTER_PAGES) {
                    var _pageKeys_app;
                    const filterPages = process.env.NEXT_TURBO_FILTER_PAGES.split(",");
                    pageKeys.pages = pageKeys.pages.filter((page)=>{
                        return filterPages.some((filterPage)=>{
                            return (0, _micromatch.isMatch)(page, filterPage);
                        });
                    });
                    pageKeys.app = (_pageKeys_app = pageKeys.app) == null ? void 0 : _pageKeys_app.filter((page)=>{
                        return filterPages.some((filterPage)=>{
                            return (0, _micromatch.isMatch)(page, filterPage);
                        });
                    });
                }
            }
            const numConflictingAppPaths = conflictingAppPagePaths.length;
            if (mappedAppPages && numConflictingAppPaths > 0) {
                _log.error(`Conflicting app and page file${numConflictingAppPaths === 1 ? " was" : "s were"} found, please remove the conflicting files to continue:`);
                for (const [pagePath, appPath] of conflictingAppPagePaths){
                    _log.error(`  "${pagePath}" - "${appPath}"`);
                }
                await telemetry.flush();
                process.exit(1);
            }
            const conflictingPublicFiles = [];
            const hasPages404 = (_mappedPages_404 = mappedPages["/404"]) == null ? void 0 : _mappedPages_404.startsWith(_constants.PAGES_DIR_ALIAS);
            const hasApp404 = !!(mappedAppPages == null ? void 0 : mappedAppPages["/_not-found"]);
            const hasCustomErrorPage = mappedPages["/_error"].startsWith(_constants.PAGES_DIR_ALIAS);
            if (hasPublicDir) {
                const hasPublicUnderScoreNextDir = (0, _fs.existsSync)(_path.default.join(publicDir, "_next"));
                if (hasPublicUnderScoreNextDir) {
                    throw new Error(_constants.PUBLIC_DIR_MIDDLEWARE_CONFLICT);
                }
            }
            await nextBuildSpan.traceChild("public-dir-conflict-check").traceAsyncFn(async ()=>{
                // Check if pages conflict with files in `public`
                // Only a page of public file can be served, not both.
                for(const page in mappedPages){
                    const hasPublicPageFile = await (0, _fileexists.fileExists)(_path.default.join(publicDir, page === "/" ? "/index" : page), _fileexists.FileType.File);
                    if (hasPublicPageFile) {
                        conflictingPublicFiles.push(page);
                    }
                }
                const numConflicting = conflictingPublicFiles.length;
                if (numConflicting) {
                    throw new Error(`Conflicting public and page file${numConflicting === 1 ? " was" : "s were"} found. https://nextjs.org/docs/messages/conflicting-public-file-page\n${conflictingPublicFiles.join("\n")}`);
                }
            });
            const nestedReservedPages = pageKeys.pages.filter((page)=>{
                return page.match(/\/(_app|_document|_error)$/) && _path.default.dirname(page) !== "/";
            });
            if (nestedReservedPages.length) {
                _log.warn(`The following reserved Next.js pages were detected not directly under the pages directory:\n` + nestedReservedPages.join("\n") + `\nSee more info here: https://nextjs.org/docs/messages/nested-reserved-page\n`);
            }
            const restrictedRedirectPaths = [
                "/_next"
            ].map((p)=>config.basePath ? `${config.basePath}${p}` : p);
            const routesManifestPath = _path.default.join(distDir, _constants1.ROUTES_MANIFEST);
            const routesManifest = nextBuildSpan.traceChild("generate-routes-manifest").traceFn(()=>{
                const sortedRoutes = (0, _utils.getSortedRoutes)([
                    ...pageKeys.pages,
                    ...pageKeys.app ?? []
                ]);
                const dynamicRoutes = [];
                const staticRoutes = [];
                for (const route of sortedRoutes){
                    if ((0, _utils.isDynamicRoute)(route)) {
                        dynamicRoutes.push(pageToRoute(route));
                    } else if (!(0, _utils1.isReservedPage)(route)) {
                        staticRoutes.push(pageToRoute(route));
                    }
                }
                return {
                    version: 3,
                    pages404: true,
                    caseSensitive: !!config.experimental.caseSensitiveRoutes,
                    basePath: config.basePath,
                    redirects: redirects.map((r)=>buildCustomRoute("redirect", r, restrictedRedirectPaths)),
                    headers: headers.map((r)=>buildCustomRoute("header", r)),
                    dynamicRoutes,
                    staticRoutes,
                    dataRoutes: [],
                    i18n: config.i18n || undefined,
                    rsc: {
                        header: _approuterheaders.RSC_HEADER,
                        varyHeader: _approuterheaders.RSC_VARY_HEADER,
                        prefetchHeader: _approuterheaders.NEXT_ROUTER_PREFETCH_HEADER,
                        didPostponeHeader: _approuterheaders.NEXT_DID_POSTPONE_HEADER,
                        contentTypeHeader: _approuterheaders.RSC_CONTENT_TYPE_HEADER,
                        suffix: _constants.RSC_SUFFIX,
                        prefetchSuffix: _constants.RSC_PREFETCH_SUFFIX
                    },
                    skipMiddlewareUrlNormalize: config.skipMiddlewareUrlNormalize
                };
            });
            if (rewrites.beforeFiles.length === 0 && rewrites.fallback.length === 0) {
                routesManifest.rewrites = rewrites.afterFiles.map((r)=>buildCustomRoute("rewrite", r));
            } else {
                routesManifest.rewrites = {
                    beforeFiles: rewrites.beforeFiles.map((r)=>buildCustomRoute("rewrite", r)),
                    afterFiles: rewrites.afterFiles.map((r)=>buildCustomRoute("rewrite", r)),
                    fallback: rewrites.fallback.map((r)=>buildCustomRoute("rewrite", r))
                };
            }
            const combinedRewrites = [
                ...rewrites.beforeFiles,
                ...rewrites.afterFiles,
                ...rewrites.fallback
            ];
            if (config.experimental.clientRouterFilter) {
                const nonInternalRedirects = (config._originalRedirects || []).filter((r)=>!r.internal);
                const clientRouterFilters = (0, _createclientrouterfilter.createClientRouterFilter)(appPageKeys, config.experimental.clientRouterFilterRedirects ? nonInternalRedirects : [], config.experimental.clientRouterFilterAllowedRate);
                _buildcontext.NextBuildContext.clientRouterFilters = clientRouterFilters;
            }
            const distDirCreated = await nextBuildSpan.traceChild("create-dist-dir").traceAsyncFn(async ()=>{
                try {
                    await _fs.promises.mkdir(distDir, {
                        recursive: true
                    });
                    return true;
                } catch (err) {
                    if ((0, _iserror.default)(err) && err.code === "EPERM") {
                        return false;
                    }
                    throw err;
                }
            });
            if (!distDirCreated || !await (0, _iswriteable.isWriteable)(distDir)) {
                throw new Error("> Build directory is not writeable. https://nextjs.org/docs/messages/build-dir-not-writeable");
            }
            if (config.cleanDistDir && !isGenerate) {
                await (0, _recursivedelete.recursiveDelete)(distDir, /^cache/);
            }
            // Ensure commonjs handling is used for files in the distDir (generally .next)
            // Files outside of the distDir can be "type": "module"
            await _fs.promises.writeFile(_path.default.join(distDir, "package.json"), '{"type": "commonjs"}');
            // We need to write the manifest with rewrites before build
            await nextBuildSpan.traceChild("write-routes-manifest").traceAsyncFn(()=>_fs.promises.writeFile(routesManifestPath, (0, _formatmanifest.formatManifest)(routesManifest), "utf8"));
            // We need to write a partial prerender manifest to make preview mode settings available in edge middleware
            const partialManifest = {
                preview: previewProps
            };
            await _fs.promises.writeFile(_path.default.join(distDir, _constants1.PRERENDER_MANIFEST).replace(/\.json$/, ".js"), `self.__PRERENDER_MANIFEST=${JSON.stringify(JSON.stringify(partialManifest))}`, "utf8");
            const outputFileTracingRoot = config.experimental.outputFileTracingRoot || dir;
            const manifestPath = _path.default.join(distDir, _constants1.SERVER_DIRECTORY, _constants1.PAGES_MANIFEST);
            const { incrementalCacheHandlerPath } = config.experimental;
            const requiredServerFiles = nextBuildSpan.traceChild("generate-required-server-files").traceFn(()=>({
                    version: 1,
                    config: {
                        ...config,
                        configFile: undefined,
                        ..._ciinfo.hasNextSupport ? {
                            compress: false
                        } : {},
                        experimental: {
                            ...config.experimental,
                            trustHostHeader: _ciinfo.hasNextSupport,
                            incrementalCacheHandlerPath: incrementalCacheHandlerPath ? _path.default.relative(distDir, incrementalCacheHandlerPath) : undefined,
                            isExperimentalCompile: isCompile
                        }
                    },
                    appDir: dir,
                    relativeAppDir: _path.default.relative(outputFileTracingRoot, dir),
                    files: [
                        _constants1.ROUTES_MANIFEST,
                        _path.default.relative(distDir, manifestPath),
                        _constants1.BUILD_MANIFEST,
                        _constants1.PRERENDER_MANIFEST,
                        _constants1.PRERENDER_MANIFEST.replace(/\.json$/, ".js"),
                        _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.MIDDLEWARE_MANIFEST),
                        _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.MIDDLEWARE_BUILD_MANIFEST + ".js"),
                        _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.MIDDLEWARE_REACT_LOADABLE_MANIFEST + ".js"),
                        ...appDir ? [
                            ...config.experimental.sri ? [
                                _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.SUBRESOURCE_INTEGRITY_MANIFEST + ".js"),
                                _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.SUBRESOURCE_INTEGRITY_MANIFEST + ".json")
                            ] : [],
                            _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.APP_PATHS_MANIFEST),
                            _path.default.join(_constants1.APP_PATH_ROUTES_MANIFEST),
                            _constants1.APP_BUILD_MANIFEST,
                            _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.SERVER_REFERENCE_MANIFEST + ".js"),
                            _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.SERVER_REFERENCE_MANIFEST + ".json")
                        ] : [],
                        _constants1.REACT_LOADABLE_MANIFEST,
                        config.optimizeFonts ? _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.FONT_MANIFEST) : null,
                        _constants1.BUILD_ID_FILE,
                        _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.NEXT_FONT_MANIFEST + ".js"),
                        _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.NEXT_FONT_MANIFEST + ".json"),
                        ...hasInstrumentationHook ? [
                            _path.default.join(_constants1.SERVER_DIRECTORY, `${_constants.INSTRUMENTATION_HOOK_FILENAME}.js`),
                            _path.default.join(_constants1.SERVER_DIRECTORY, `edge-${_constants.INSTRUMENTATION_HOOK_FILENAME}.js`)
                        ] : []
                    ].filter(_nonnullable.nonNullable).map((file)=>_path.default.join(config.distDir, file)),
                    ignore: []
                }));
            async function turbopackBuild() {
                var _config_experimental;
                const turboNextBuildStart = process.hrtime();
                const turboJson = _findup.default.sync("turbo.json", {
                    cwd: dir
                });
                // eslint-disable-next-line no-shadow
                const packagePath = _findup.default.sync("package.json", {
                    cwd: dir
                });
                let binding = await (0, _swc.loadBindings)(config == null ? void 0 : (_config_experimental = config.experimental) == null ? void 0 : _config_experimental.useWasmBinary);
                let root = turboNextBuildRoot ?? (turboJson ? _path.default.dirname(turboJson) : packagePath ? _path.default.dirname(packagePath) : undefined);
                const hasRewrites = rewrites.beforeFiles.length > 0 || rewrites.afterFiles.length > 0 || rewrites.fallback.length > 0;
                await binding.turbo.nextBuild({
                    ..._buildcontext.NextBuildContext,
                    root,
                    distDir: config.distDir,
                    defineEnv: (0, _swc.createDefineEnv)({
                        isTurbopack: turboNextBuild,
                        allowedRevalidateHeaderKeys: config.experimental.allowedRevalidateHeaderKeys,
                        clientRouterFilters: _buildcontext.NextBuildContext.clientRouterFilters,
                        config,
                        dev: false,
                        distDir,
                        fetchCacheKeyPrefix: config.experimental.fetchCacheKeyPrefix,
                        hasRewrites,
                        middlewareMatchers: undefined,
                        previewModeId: undefined
                    })
                });
                const [duration] = process.hrtime(turboNextBuildStart);
                return {
                    duration,
                    buildTraceContext: null
                };
            }
            let buildTraceContext;
            let buildTracesPromise = undefined;
            if (!isGenerate) {
                if (isCompile && config.experimental.webpackBuildWorker) {
                    let durationInSeconds = 0;
                    await (0, _webpackbuild.webpackBuild)([
                        "server"
                    ]).then((res)=>{
                        buildTraceContext = res.buildTraceContext;
                        durationInSeconds += res.duration;
                        const buildTraceWorker = new _worker.Worker(require.resolve("./collect-build-traces"), {
                            numWorkers: 1,
                            exposedMethods: [
                                "collectBuildTraces"
                            ]
                        });
                        buildTracesPromise = buildTraceWorker.collectBuildTraces({
                            dir,
                            config,
                            distDir,
                            pageInfos: [],
                            staticPages: [],
                            hasSsrAmpPages: false,
                            buildTraceContext,
                            outputFileTracingRoot
                        }).catch((err)=>{
                            console.error(err);
                            process.exit(1);
                        });
                    });
                    await (0, _webpackbuild.webpackBuild)([
                        "edge-server"
                    ]).then((res)=>{
                        durationInSeconds += res.duration;
                    });
                    await (0, _webpackbuild.webpackBuild)([
                        "client"
                    ]).then((res)=>{
                        durationInSeconds += res.duration;
                    });
                    buildSpinner == null ? void 0 : buildSpinner.stopAndPersist();
                    _log.event("Compiled successfully");
                    telemetry.record((0, _events.eventBuildCompleted)(pagesPaths, {
                        durationInSeconds,
                        totalAppPagesCount
                    }));
                } else {
                    const { duration: webpackBuildDuration, ...rest } = turboNextBuild ? await turbopackBuild() : await (0, _webpackbuild.webpackBuild)();
                    buildTraceContext = rest.buildTraceContext;
                    telemetry.record((0, _events.eventBuildCompleted)(pagesPaths, {
                        durationInSeconds: webpackBuildDuration,
                        totalAppPagesCount
                    }));
                }
            }
            // For app directory, we run type checking after build.
            if (appDir && !(isCompile || isGenerate)) {
                await (0, _typecheck.startTypeChecking)(typeCheckingOptions);
            }
            const postCompileSpinner = (0, _spinner.default)("Collecting page data");
            const buildManifestPath = _path.default.join(distDir, _constants1.BUILD_MANIFEST);
            const appBuildManifestPath = _path.default.join(distDir, _constants1.APP_BUILD_MANIFEST);
            let staticAppPagesCount = 0;
            let serverAppPagesCount = 0;
            let edgeRuntimeAppCount = 0;
            let edgeRuntimePagesCount = 0;
            const ssgPages = new Set();
            const ssgStaticFallbackPages = new Set();
            const ssgBlockingFallbackPages = new Set();
            const staticPages = new Set();
            const invalidPages = new Set();
            const hybridAmpPages = new Set();
            const serverPropsPages = new Set();
            const additionalSsgPaths = new Map();
            const additionalSsgPathsEncoded = new Map();
            const appStaticPaths = new Map();
            const appPrefetchPaths = new Map();
            const appStaticPathsEncoded = new Map();
            const appNormalizedPaths = new Map();
            const appDynamicParamPaths = new Set();
            const appDefaultConfigs = new Map();
            const pageInfos = new Map();
            const pagesManifest = JSON.parse(await _fs.promises.readFile(manifestPath, "utf8"));
            const buildManifest = JSON.parse(await _fs.promises.readFile(buildManifestPath, "utf8"));
            const appBuildManifest = appDir ? JSON.parse(await _fs.promises.readFile(appBuildManifestPath, "utf8")) : undefined;
            const timeout = config.staticPageGenerationTimeout || 0;
            const staticWorkerPath = require.resolve("./worker");
            let appPathsManifest = {};
            const appPathRoutes = {};
            if (appDir) {
                appPathsManifest = JSON.parse(await _fs.promises.readFile(_path.default.join(distDir, _constants1.SERVER_DIRECTORY, _constants1.APP_PATHS_MANIFEST), "utf8"));
                Object.keys(appPathsManifest).forEach((entry)=>{
                    appPathRoutes[entry] = (0, _apppaths.normalizeAppPath)(entry);
                });
                await _fs.promises.writeFile(_path.default.join(distDir, _constants1.APP_PATH_ROUTES_MANIFEST), (0, _formatmanifest.formatManifest)(appPathRoutes), "utf-8");
            }
            process.env.NEXT_PHASE = _constants1.PHASE_PRODUCTION_BUILD;
            const numWorkers = config.experimental.memoryBasedWorkersCount ? Math.max(config.experimental.cpus !== _configshared.defaultConfig.experimental.cpus ? config.experimental.cpus : Math.min(config.experimental.cpus || 1, Math.floor(_os.default.freemem() / 1e9)), // enforce a minimum of 4 workers
            4) : config.experimental.cpus || 4;
            function createStaticWorker(incrementalCacheIpcPort, incrementalCacheIpcValidationKey) {
                let infoPrinted = false;
                return new _worker.Worker(staticWorkerPath, {
                    timeout: timeout * 1000,
                    logger: _log,
                    onRestart: (method, [arg], attempts)=>{
                        if (method === "exportPage") {
                            const pagePath = arg.path;
                            if (attempts >= 3) {
                                throw new Error(`Static page generation for ${pagePath} is still timing out after 3 attempts. See more info here https://nextjs.org/docs/messages/static-page-generation-timeout`);
                            }
                            _log.warn(`Restarted static page generation for ${pagePath} because it took more than ${timeout} seconds`);
                        } else {
                            const pagePath = arg.path;
                            if (attempts >= 2) {
                                throw new Error(`Collecting page data for ${pagePath} is still timing out after 2 attempts. See more info here https://nextjs.org/docs/messages/page-data-collection-timeout`);
                            }
                            _log.warn(`Restarted collecting page data for ${pagePath} because it took more than ${timeout} seconds`);
                        }
                        if (!infoPrinted) {
                            _log.warn("See more info here https://nextjs.org/docs/messages/static-page-generation-timeout");
                            infoPrinted = true;
                        }
                    },
                    numWorkers,
                    forkOptions: {
                        env: {
                            ...process.env,
                            __NEXT_INCREMENTAL_CACHE_IPC_PORT: incrementalCacheIpcPort ? incrementalCacheIpcPort + "" : undefined,
                            __NEXT_INCREMENTAL_CACHE_IPC_KEY: incrementalCacheIpcValidationKey
                        }
                    },
                    enableWorkerThreads: config.experimental.workerThreads,
                    exposedMethods: [
                        "hasCustomGetInitialProps",
                        "isPageStatic",
                        "getDefinedNamedExports",
                        "exportPage"
                    ]
                });
            }
            let incrementalCacheIpcPort;
            let incrementalCacheIpcValidationKey;
            if (config.experimental.staticWorkerRequestDeduping) {
                let CacheHandler;
                if (incrementalCacheHandlerPath) {
                    CacheHandler = require(_path.default.isAbsolute(incrementalCacheHandlerPath) ? incrementalCacheHandlerPath : _path.default.join(dir, incrementalCacheHandlerPath));
                    CacheHandler = CacheHandler.default || CacheHandler;
                }
                const cacheInitialization = await (0, _incrementalcacheserver.initialize)({
                    fs: _nodefsmethods.nodeFs,
                    dev: false,
                    pagesDir: true,
                    appDir: true,
                    fetchCache: true,
                    flushToDisk: _ciinfo.hasNextSupport ? false : config.experimental.isrFlushToDisk,
                    serverDistDir: _path.default.join(distDir, "server"),
                    fetchCacheKeyPrefix: config.experimental.fetchCacheKeyPrefix,
                    maxMemoryCacheSize: config.experimental.isrMemoryCacheSize,
                    getPrerenderManifest: ()=>({
                            version: -1,
                            routes: {},
                            dynamicRoutes: {},
                            notFoundRoutes: [],
                            preview: null
                        }),
                    requestHeaders: {},
                    CurCacheHandler: CacheHandler,
                    minimalMode: _ciinfo.hasNextSupport,
                    allowedRevalidateHeaderKeys: config.experimental.allowedRevalidateHeaderKeys,
                    experimental: {
                        ppr: config.experimental.ppr === true
                    }
                });
                incrementalCacheIpcPort = cacheInitialization.ipcPort;
                incrementalCacheIpcValidationKey = cacheInitialization.ipcValidationKey;
            }
            const pagesStaticWorkers = createStaticWorker(incrementalCacheIpcPort, incrementalCacheIpcValidationKey);
            const appStaticWorkers = appDir ? createStaticWorker(incrementalCacheIpcPort, incrementalCacheIpcValidationKey) : undefined;
            const analysisBegin = process.hrtime();
            const staticCheckSpan = nextBuildSpan.traceChild("static-check");
            const functionsConfigManifest = {};
            const { customAppGetInitialProps, namedExports, isNextImageImported, hasSsrAmpPages, hasNonStaticErrorPage } = await staticCheckSpan.traceAsyncFn(async ()=>{
                if (isCompile) {
                    return {
                        customAppGetInitialProps: false,
                        namedExports: [],
                        isNextImageImported: true,
                        hasSsrAmpPages: !!pagesDir,
                        hasNonStaticErrorPage: true
                    };
                }
                const { configFileName, publicRuntimeConfig, serverRuntimeConfig } = config;
                const runtimeEnvConfig = {
                    publicRuntimeConfig,
                    serverRuntimeConfig
                };
                const nonStaticErrorPageSpan = staticCheckSpan.traceChild("check-static-error-page");
                const errorPageHasCustomGetInitialProps = nonStaticErrorPageSpan.traceAsyncFn(async ()=>hasCustomErrorPage && await pagesStaticWorkers.hasCustomGetInitialProps("/_error", distDir, runtimeEnvConfig, false));
                const errorPageStaticResult = nonStaticErrorPageSpan.traceAsyncFn(async ()=>{
                    var _config_i18n, _config_i18n1;
                    return hasCustomErrorPage && pagesStaticWorkers.isPageStatic({
                        dir,
                        page: "/_error",
                        distDir,
                        configFileName,
                        runtimeEnvConfig,
                        httpAgentOptions: config.httpAgentOptions,
                        locales: (_config_i18n = config.i18n) == null ? void 0 : _config_i18n.locales,
                        defaultLocale: (_config_i18n1 = config.i18n) == null ? void 0 : _config_i18n1.defaultLocale,
                        nextConfigOutput: config.output,
                        ppr: config.experimental.ppr === true
                    });
                });
                const appPageToCheck = "/_app";
                const customAppGetInitialPropsPromise = pagesStaticWorkers.hasCustomGetInitialProps(appPageToCheck, distDir, runtimeEnvConfig, true);
                const namedExportsPromise = pagesStaticWorkers.getDefinedNamedExports(appPageToCheck, distDir, runtimeEnvConfig);
                // eslint-disable-next-line @typescript-eslint/no-shadow
                let isNextImageImported;
                // eslint-disable-next-line @typescript-eslint/no-shadow
                let hasSsrAmpPages = false;
                const computedManifestData = await (0, _utils1.computeFromManifest)({
                    build: buildManifest,
                    app: appBuildManifest
                }, distDir, config.experimental.gzipSize);
                const middlewareManifest = require(_path.default.join(distDir, _constants1.SERVER_DIRECTORY, _constants1.MIDDLEWARE_MANIFEST));
                const actionManifest = appDir ? require(_path.default.join(distDir, _constants1.SERVER_DIRECTORY, _constants1.SERVER_REFERENCE_MANIFEST + ".json")) : null;
                const entriesWithAction = actionManifest ? new Set() : null;
                if (actionManifest && entriesWithAction) {
                    for(const id in actionManifest.node){
                        for(const entry in actionManifest.node[id].workers){
                            entriesWithAction.add(entry);
                        }
                    }
                    for(const id in actionManifest.edge){
                        for(const entry in actionManifest.edge[id].workers){
                            entriesWithAction.add(entry);
                        }
                    }
                }
                for (const key of Object.keys(middlewareManifest == null ? void 0 : middlewareManifest.functions)){
                    if (key.startsWith("/api")) {
                        edgeRuntimePagesCount++;
                    }
                }
                await Promise.all(Object.entries(pageKeys).reduce((acc, [key, files])=>{
                    if (!files) {
                        return acc;
                    }
                    const pageType = key;
                    for (const page of files){
                        acc.push({
                            pageType,
                            page
                        });
                    }
                    return acc;
                }, []).map(({ pageType, page })=>{
                    const checkPageSpan = staticCheckSpan.traceChild("check-page", {
                        page
                    });
                    return checkPageSpan.traceAsyncFn(async ()=>{
                        const actualPage = (0, _normalizepagepath.normalizePagePath)(page);
                        const [size, totalSize] = await (0, _utils1.getJsPageSizeInKb)(pageType, actualPage, distDir, buildManifest, appBuildManifest, config.experimental.gzipSize, computedManifestData);
                        let isPPR = false;
                        let isSSG = false;
                        let isStatic = false;
                        let isServerComponent = false;
                        let isHybridAmp = false;
                        let ssgPageRoutes = null;
                        let pagePath = "";
                        if (pageType === "pages") {
                            pagePath = pagesPaths.find((p)=>{
                                p = (0, _normalizepathsep.normalizePathSep)(p);
                                return p.startsWith(actualPage + ".") || p.startsWith(actualPage + "/index.");
                            }) || "";
                        }
                        let originalAppPath;
                        if (pageType === "app" && mappedAppPages) {
                            for (const [originalPath, normalizedPath] of Object.entries(appPathRoutes)){
                                if (normalizedPath === page) {
                                    pagePath = mappedAppPages[originalPath].replace(/^private-next-app-dir/, "");
                                    originalAppPath = originalPath;
                                    break;
                                }
                            }
                        }
                        const pageFilePath = (0, _utils1.isAppBuiltinNotFoundPage)(pagePath) ? require.resolve("next/dist/client/components/not-found-error") : _path.default.join((pageType === "pages" ? pagesDir : appDir) || "", pagePath);
                        const staticInfo = pagePath ? await (0, _getpagestaticinfo.getPageStaticInfo)({
                            pageFilePath,
                            nextConfig: config,
                            pageType
                        }) : undefined;
                        if (staticInfo == null ? void 0 : staticInfo.extraConfig) {
                            functionsConfigManifest[page] = staticInfo.extraConfig;
                        }
                        const pageRuntime = middlewareManifest.functions[originalAppPath || page] ? "edge" : staticInfo == null ? void 0 : staticInfo.runtime;
                        if (!isCompile) {
                            isServerComponent = pageType === "app" && (staticInfo == null ? void 0 : staticInfo.rsc) !== _constants1.RSC_MODULE_TYPES.client;
                            if (pageType === "app" || !(0, _utils1.isReservedPage)(page)) {
                                try {
                                    let edgeInfo;
                                    if ((0, _isedgeruntime.isEdgeRuntime)(pageRuntime)) {
                                        if (pageType === "app") {
                                            edgeRuntimeAppCount++;
                                        } else {
                                            edgeRuntimePagesCount++;
                                        }
                                        const manifestKey = pageType === "pages" ? page : originalAppPath || "";
                                        edgeInfo = middlewareManifest.functions[manifestKey];
                                    }
                                    let isPageStaticSpan = checkPageSpan.traceChild("is-page-static");
                                    let workerResult = await isPageStaticSpan.traceAsyncFn(()=>{
                                        var _config_i18n, _config_i18n1;
                                        return (pageType === "app" ? appStaticWorkers : pagesStaticWorkers).isPageStatic({
                                            dir,
                                            page,
                                            originalAppPath,
                                            distDir,
                                            configFileName,
                                            runtimeEnvConfig,
                                            httpAgentOptions: config.httpAgentOptions,
                                            locales: (_config_i18n = config.i18n) == null ? void 0 : _config_i18n.locales,
                                            defaultLocale: (_config_i18n1 = config.i18n) == null ? void 0 : _config_i18n1.defaultLocale,
                                            parentId: isPageStaticSpan.getId(),
                                            pageRuntime,
                                            edgeInfo,
                                            pageType,
                                            incrementalCacheHandlerPath: config.experimental.incrementalCacheHandlerPath,
                                            isrFlushToDisk: _ciinfo.hasNextSupport ? false : config.experimental.isrFlushToDisk,
                                            maxMemoryCacheSize: config.experimental.isrMemoryCacheSize,
                                            nextConfigOutput: config.output,
                                            ppr: config.experimental.ppr === true
                                        });
                                    });
                                    if (pageType === "app" && originalAppPath) {
                                        appNormalizedPaths.set(originalAppPath, page);
                                        // TODO-APP: handle prerendering with edge
                                        if ((0, _isedgeruntime.isEdgeRuntime)(pageRuntime)) {
                                            isStatic = false;
                                            isSSG = false;
                                            _log.warnOnce(`Using edge runtime on a page currently disables static generation for that page`);
                                        } else {
                                            // If this route can be partially pre-rendered, then
                                            // mark it as such and mark it that it can be
                                            // generated server-side.
                                            if (workerResult.isPPR) {
                                                isPPR = workerResult.isPPR;
                                                isSSG = true;
                                                isStatic = true;
                                                appStaticPaths.set(originalAppPath, []);
                                                appStaticPathsEncoded.set(originalAppPath, []);
                                            }
                                            if (workerResult.encodedPrerenderRoutes && workerResult.prerenderRoutes) {
                                                appStaticPaths.set(originalAppPath, workerResult.prerenderRoutes);
                                                appStaticPathsEncoded.set(originalAppPath, workerResult.encodedPrerenderRoutes);
                                                ssgPageRoutes = workerResult.prerenderRoutes;
                                                isSSG = true;
                                            }
                                            const appConfig = workerResult.appConfig || {};
                                            if (appConfig.revalidate !== 0) {
                                                var _workerResult_prerenderRoutes;
                                                const isDynamic = (0, _utils.isDynamicRoute)(page);
                                                const hasGenerateStaticParams = !!((_workerResult_prerenderRoutes = workerResult.prerenderRoutes) == null ? void 0 : _workerResult_prerenderRoutes.length);
                                                if (config.output === "export" && isDynamic && !hasGenerateStaticParams) {
                                                    throw new Error(`Page "${page}" is missing "generateStaticParams()" so it cannot be used with "output: export" config.`);
                                                }
                                                if (// Mark the app as static if:
                                                // - It has no dynamic param
                                                // - It doesn't have generateStaticParams but `dynamic` is set to
                                                //   `error` or `force-static`
                                                !isDynamic) {
                                                    appStaticPaths.set(originalAppPath, [
                                                        page
                                                    ]);
                                                    appStaticPathsEncoded.set(originalAppPath, [
                                                        page
                                                    ]);
                                                    isStatic = true;
                                                } else if (isDynamic && !hasGenerateStaticParams && (appConfig.dynamic === "error" || appConfig.dynamic === "force-static")) {
                                                    appStaticPaths.set(originalAppPath, []);
                                                    appStaticPathsEncoded.set(originalAppPath, []);
                                                    isStatic = true;
                                                    isPPR = false;
                                                }
                                            }
                                            if (workerResult.prerenderFallback) {
                                                // whether or not to allow requests for paths not
                                                // returned from generateStaticParams
                                                appDynamicParamPaths.add(originalAppPath);
                                            }
                                            appDefaultConfigs.set(originalAppPath, appConfig);
                                            // Only generate the app prefetch rsc if the route is
                                            // an app page.
                                            if (!isStatic && !(0, _isapprouteroute.isAppRouteRoute)(originalAppPath) && !(0, _utils.isDynamicRoute)(originalAppPath) && !isPPR) {
                                                appPrefetchPaths.set(originalAppPath, page);
                                            }
                                        }
                                    } else {
                                        if ((0, _isedgeruntime.isEdgeRuntime)(pageRuntime)) {
                                            if (workerResult.hasStaticProps) {
                                                console.warn(`"getStaticProps" is not yet supported fully with "experimental-edge", detected on ${page}`);
                                            }
                                            // TODO: add handling for statically rendering edge
                                            // pages and allow edge with Prerender outputs
                                            workerResult.isStatic = false;
                                            workerResult.hasStaticProps = false;
                                        }
                                        if (workerResult.isStatic === false && (workerResult.isHybridAmp || workerResult.isAmpOnly)) {
                                            hasSsrAmpPages = true;
                                        }
                                        if (workerResult.isHybridAmp) {
                                            isHybridAmp = true;
                                            hybridAmpPages.add(page);
                                        }
                                        if (workerResult.isNextImageImported) {
                                            isNextImageImported = true;
                                        }
                                        if (workerResult.hasStaticProps) {
                                            ssgPages.add(page);
                                            isSSG = true;
                                            if (workerResult.prerenderRoutes && workerResult.encodedPrerenderRoutes) {
                                                additionalSsgPaths.set(page, workerResult.prerenderRoutes);
                                                additionalSsgPathsEncoded.set(page, workerResult.encodedPrerenderRoutes);
                                                ssgPageRoutes = workerResult.prerenderRoutes;
                                            }
                                            if (workerResult.prerenderFallback === "blocking") {
                                                ssgBlockingFallbackPages.add(page);
                                            } else if (workerResult.prerenderFallback === true) {
                                                ssgStaticFallbackPages.add(page);
                                            }
                                        } else if (workerResult.hasServerProps) {
                                            serverPropsPages.add(page);
                                        } else if (workerResult.isStatic && !isServerComponent && await customAppGetInitialPropsPromise === false) {
                                            staticPages.add(page);
                                            isStatic = true;
                                        } else if (isServerComponent) {
                                            // This is a static server component page that doesn't have
                                            // gSP or gSSP. We still treat it as a SSG page.
                                            ssgPages.add(page);
                                            isSSG = true;
                                        }
                                        if (hasPages404 && page === "/404") {
                                            if (!workerResult.isStatic && !workerResult.hasStaticProps) {
                                                throw new Error(`\`pages/404\` ${_constants.STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR}`);
                                            }
                                            // we need to ensure the 404 lambda is present since we use
                                            // it when _app has getInitialProps
                                            if (await customAppGetInitialPropsPromise && !workerResult.hasStaticProps) {
                                                staticPages.delete(page);
                                            }
                                        }
                                        if (_constants1.STATIC_STATUS_PAGES.includes(page) && !workerResult.isStatic && !workerResult.hasStaticProps) {
                                            throw new Error(`\`pages${page}\` ${_constants.STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR}`);
                                        }
                                    }
                                } catch (err) {
                                    if (!(0, _iserror.default)(err) || err.message !== "INVALID_DEFAULT_EXPORT") throw err;
                                    invalidPages.add(page);
                                }
                            }
                            if (pageType === "app") {
                                if (isSSG || isStatic) {
                                    staticAppPagesCount++;
                                } else {
                                    serverAppPagesCount++;
                                }
                            }
                        }
                        pageInfos.set(page, {
                            size,
                            totalSize,
                            isStatic,
                            isSSG,
                            isPPR,
                            isHybridAmp,
                            ssgPageRoutes,
                            initialRevalidateSeconds: false,
                            runtime: pageRuntime,
                            pageDuration: undefined,
                            ssgPageDurations: undefined,
                            hasEmptyPrelude: undefined
                        });
                    });
                }));
                const errorPageResult = await errorPageStaticResult;
                const nonStaticErrorPage = await errorPageHasCustomGetInitialProps || errorPageResult && errorPageResult.hasServerProps;
                const returnValue = {
                    customAppGetInitialProps: await customAppGetInitialPropsPromise,
                    namedExports: await namedExportsPromise,
                    isNextImageImported,
                    hasSsrAmpPages,
                    hasNonStaticErrorPage: nonStaticErrorPage
                };
                return returnValue;
            });
            if (postCompileSpinner) postCompileSpinner.stopAndPersist();
            if (customAppGetInitialProps) {
                console.warn((0, _picocolors.bold)((0, _picocolors.yellow)(`Warning: `)) + (0, _picocolors.yellow)(`You have opted-out of Automatic Static Optimization due to \`getInitialProps\` in \`pages/_app\`. This does not opt-out pages with \`getStaticProps\``));
                console.warn("Read more: https://nextjs.org/docs/messages/opt-out-auto-static-optimization\n");
            }
            if (!hasSsrAmpPages) {
                requiredServerFiles.ignore.push(_path.default.relative(dir, _path.default.join(_path.default.dirname(require.resolve("next/dist/compiled/@ampproject/toolbox-optimizer")), "**/*")));
            }
            if (Object.keys(functionsConfigManifest).length > 0) {
                const manifest = {
                    version: 1,
                    functions: functionsConfigManifest
                };
                await _fs.promises.writeFile(_path.default.join(distDir, _constants1.SERVER_DIRECTORY, _constants1.FUNCTIONS_CONFIG_MANIFEST), (0, _formatmanifest.formatManifest)(manifest), "utf8");
            }
            if (!isGenerate && config.outputFileTracing && !buildTracesPromise) {
                buildTracesPromise = (0, _collectbuildtraces.collectBuildTraces)({
                    dir,
                    config,
                    distDir,
                    pageInfos: Object.entries(pageInfos),
                    staticPages: [
                        ...staticPages
                    ],
                    nextBuildSpan,
                    hasSsrAmpPages,
                    buildTraceContext,
                    outputFileTracingRoot
                }).catch((err)=>{
                    console.error(err);
                    process.exit(1);
                });
            }
            if (serverPropsPages.size > 0 || ssgPages.size > 0) {
                // We update the routes manifest after the build with the
                // data routes since we can't determine these until after build
                routesManifest.dataRoutes = (0, _utils.getSortedRoutes)([
                    ...serverPropsPages,
                    ...ssgPages
                ]).map((page)=>{
                    return (0, _builddataroute.buildDataRoute)(page, buildId);
                });
                await _fs.promises.writeFile(routesManifestPath, (0, _formatmanifest.formatManifest)(routesManifest), "utf8");
            }
            // Since custom _app.js can wrap the 404 page we have to opt-out of static optimization if it has getInitialProps
            // Only export the static 404 when there is no /_error present
            const useStaticPages404 = !customAppGetInitialProps && (!hasNonStaticErrorPage || hasPages404);
            if (invalidPages.size > 0) {
                const err = new Error(`Build optimization failed: found page${invalidPages.size === 1 ? "" : "s"} without a React Component as default export in \n${[
                    ...invalidPages
                ].map((pg)=>`pages${pg}`).join("\n")}\n\nSee https://nextjs.org/docs/messages/page-without-valid-component for more info.\n`);
                err.code = "BUILD_OPTIMIZATION_FAILED";
                throw err;
            }
            await (0, _writebuildid.writeBuildId)(distDir, buildId);
            if (config.experimental.optimizeCss) {
                const globOrig = require("next/dist/compiled/glob");
                const cssFilePaths = await new Promise((resolve, reject)=>{
                    globOrig("**/*.css", {
                        cwd: _path.default.join(distDir, "static")
                    }, (err, files)=>{
                        if (err) {
                            return reject(err);
                        }
                        resolve(files);
                    });
                });
                requiredServerFiles.files.push(...cssFilePaths.map((filePath)=>_path.default.join(config.distDir, "static", filePath)));
            }
            const features = [
                {
                    featureName: "experimental/optimizeCss",
                    invocationCount: config.experimental.optimizeCss ? 1 : 0
                },
                {
                    featureName: "experimental/nextScriptWorkers",
                    invocationCount: config.experimental.nextScriptWorkers ? 1 : 0
                },
                {
                    featureName: "optimizeFonts",
                    invocationCount: config.optimizeFonts ? 1 : 0
                }
            ];
            telemetry.record(features.map((feature)=>{
                return {
                    eventName: _events.EVENT_BUILD_FEATURE_USAGE,
                    payload: feature
                };
            }));
            await _fs.promises.writeFile(_path.default.join(distDir, _constants1.SERVER_FILES_MANIFEST), (0, _formatmanifest.formatManifest)(requiredServerFiles), "utf8");
            const middlewareManifest = JSON.parse(await _fs.promises.readFile(_path.default.join(distDir, _constants1.SERVER_DIRECTORY, _constants1.MIDDLEWARE_MANIFEST), "utf8"));
            const finalPrerenderRoutes = {};
            const finalDynamicRoutes = {};
            const tbdPrerenderRoutes = [];
            let ssgNotFoundPaths = [];
            const { i18n } = config;
            const usedStaticStatusPages = _constants1.STATIC_STATUS_PAGES.filter((page)=>mappedPages[page] && mappedPages[page].startsWith("private-next-pages"));
            usedStaticStatusPages.forEach((page)=>{
                if (!ssgPages.has(page) && !customAppGetInitialProps) {
                    staticPages.add(page);
                }
            });
            const hasPages500 = usedStaticStatusPages.includes("/500");
            const useDefaultStatic500 = !hasPages500 && !hasNonStaticErrorPage && !customAppGetInitialProps;
            const combinedPages = [
                ...staticPages,
                ...ssgPages
            ];
            const isApp404Static = appStaticPaths.has("/_not-found");
            const hasStaticApp404 = hasApp404 && isApp404Static;
            // we need to trigger automatic exporting when we have
            // - static 404/500
            // - getStaticProps paths
            // - experimental app is enabled
            if (!isCompile && (combinedPages.length > 0 || useStaticPages404 || useDefaultStatic500 || appDir)) {
                const staticGenerationSpan = nextBuildSpan.traceChild("static-generation");
                await staticGenerationSpan.traceAsyncFn(async ()=>{
                    (0, _utils1.detectConflictingPaths)([
                        ...combinedPages,
                        ...pageKeys.pages.filter((page)=>!combinedPages.includes(page))
                    ], ssgPages, additionalSsgPaths);
                    const exportApp = require("../export").default;
                    const exportConfig = {
                        ...config,
                        // Default map will be the collection of automatic statically exported
                        // pages and incremental pages.
                        // n.b. we cannot handle this above in combinedPages because the dynamic
                        // page must be in the `pages` array, but not in the mapping.
                        exportPathMap: (defaultMap)=>{
                            // Dynamically routed pages should be prerendered to be used as
                            // a client-side skeleton (fallback) while data is being fetched.
                            // This ensures the end-user never sees a 500 or slow response from the
                            // server.
                            //
                            // Note: prerendering disables automatic static optimization.
                            ssgPages.forEach((page)=>{
                                if ((0, _utils.isDynamicRoute)(page)) {
                                    tbdPrerenderRoutes.push(page);
                                    if (ssgStaticFallbackPages.has(page)) {
                                        // Override the rendering for the dynamic page to be treated as a
                                        // fallback render.
                                        if (i18n) {
                                            defaultMap[`/${i18n.defaultLocale}${page}`] = {
                                                page,
                                                query: {
                                                    __nextFallback: "true"
                                                }
                                            };
                                        } else {
                                            defaultMap[page] = {
                                                page,
                                                query: {
                                                    __nextFallback: "true"
                                                }
                                            };
                                        }
                                    } else {
                                        // Remove dynamically routed pages from the default path map when
                                        // fallback behavior is disabled.
                                        delete defaultMap[page];
                                    }
                                }
                            });
                            // Append the "well-known" routes we should prerender for, e.g. blog
                            // post slugs.
                            additionalSsgPaths.forEach((routes, page)=>{
                                const encodedRoutes = additionalSsgPathsEncoded.get(page);
                                routes.forEach((route, routeIdx)=>{
                                    defaultMap[route] = {
                                        page,
                                        query: {
                                            __nextSsgPath: encodedRoutes == null ? void 0 : encodedRoutes[routeIdx]
                                        }
                                    };
                                });
                            });
                            if (useStaticPages404) {
                                defaultMap["/404"] = {
                                    page: hasPages404 ? "/404" : "/_error"
                                };
                            }
                            if (useDefaultStatic500) {
                                defaultMap["/500"] = {
                                    page: "/_error"
                                };
                            }
                            // TODO: output manifest specific to app paths and their
                            // revalidate periods and dynamicParams settings
                            appStaticPaths.forEach((routes, originalAppPath)=>{
                                const encodedRoutes = appStaticPathsEncoded.get(originalAppPath);
                                const appConfig = appDefaultConfigs.get(originalAppPath) || {};
                                routes.forEach((route, routeIdx)=>{
                                    defaultMap[route] = {
                                        page: originalAppPath,
                                        query: {
                                            __nextSsgPath: encodedRoutes == null ? void 0 : encodedRoutes[routeIdx]
                                        },
                                        _isDynamicError: appConfig.dynamic === "error",
                                        _isAppDir: true
                                    };
                                });
                            });
                            // Ensure we don't generate explicit app prefetches while in PPR.
                            if (config.experimental.ppr && appPrefetchPaths.size > 0) {
                                throw new Error("Invariant: explicit app prefetches shouldn't generated with PPR");
                            }
                            for (const [originalAppPath, page] of appPrefetchPaths){
                                defaultMap[page] = {
                                    page: originalAppPath,
                                    query: {},
                                    _isAppDir: true,
                                    _isAppPrefetch: true
                                };
                            }
                            if (i18n) {
                                for (const page of [
                                    ...staticPages,
                                    ...ssgPages,
                                    ...useStaticPages404 ? [
                                        "/404"
                                    ] : [],
                                    ...useDefaultStatic500 ? [
                                        "/500"
                                    ] : []
                                ]){
                                    const isSsg = ssgPages.has(page);
                                    const isDynamic = (0, _utils.isDynamicRoute)(page);
                                    const isFallback = isSsg && ssgStaticFallbackPages.has(page);
                                    for (const locale of i18n.locales){
                                        var _defaultMap_page;
                                        // skip fallback generation for SSG pages without fallback mode
                                        if (isSsg && isDynamic && !isFallback) continue;
                                        const outputPath = `/${locale}${page === "/" ? "" : page}`;
                                        defaultMap[outputPath] = {
                                            page: ((_defaultMap_page = defaultMap[page]) == null ? void 0 : _defaultMap_page.page) || page,
                                            query: {
                                                __nextLocale: locale,
                                                __nextFallback: isFallback ? "true" : undefined
                                            }
                                        };
                                    }
                                    if (isSsg) {
                                        // remove non-locale prefixed variant from defaultMap
                                        delete defaultMap[page];
                                    }
                                }
                            }
                            return defaultMap;
                        }
                    };
                    const exportOptions = {
                        nextConfig: exportConfig,
                        enabledDirectories,
                        silent: false,
                        buildExport: true,
                        debugOutput,
                        threads: config.experimental.cpus,
                        pages: combinedPages,
                        outdir: _path.default.join(distDir, "export"),
                        statusMessage: "Generating static pages",
                        // The worker already explicitly binds `this` to each of the
                        // exposed methods.
                        exportAppPageWorker: appStaticWorkers == null ? void 0 : appStaticWorkers.exportPage,
                        exportPageWorker: pagesStaticWorkers == null ? void 0 : pagesStaticWorkers.exportPage,
                        endWorker: async ()=>{
                            await pagesStaticWorkers.end();
                            await (appStaticWorkers == null ? void 0 : appStaticWorkers.end());
                        }
                    };
                    const exportResult = await exportApp(dir, exportOptions, nextBuildSpan);
                    // If there was no result, there's nothing more to do.
                    if (!exportResult) return;
                    ssgNotFoundPaths = Array.from(exportResult.ssgNotFoundPaths);
                    // remove server bundles that were exported
                    for (const page of staticPages){
                        const serverBundle = (0, _require.getPagePath)(page, distDir, undefined, false);
                        await _fs.promises.unlink(serverBundle);
                    }
                    for (const [originalAppPath, routes] of appStaticPaths){
                        var _exportResult_byPath_get, _pageInfos_get;
                        const page = appNormalizedPaths.get(originalAppPath) || "";
                        const appConfig = appDefaultConfigs.get(originalAppPath) || {};
                        let hasDynamicData = appConfig.revalidate === 0 || ((_exportResult_byPath_get = exportResult.byPath.get(page)) == null ? void 0 : _exportResult_byPath_get.revalidate) === 0;
                        if (hasDynamicData && ((_pageInfos_get = pageInfos.get(page)) == null ? void 0 : _pageInfos_get.isStatic)) {
                            // if the page was marked as being static, but it contains dynamic data
                            // (ie, in the case of a static generation bailout), then it should be marked dynamic
                            pageInfos.set(page, {
                                ...pageInfos.get(page),
                                isStatic: false,
                                isSSG: false
                            });
                        }
                        const isRouteHandler = (0, _isapprouteroute.isAppRouteRoute)(originalAppPath);
                        // When this is an app page and PPR is enabled, the route supports
                        // partial pre-rendering.
                        const experimentalPPR = !isRouteHandler && config.experimental.ppr === true ? true : undefined;
                        // this flag is used to selectively bypass the static cache and invoke the lambda directly
                        // to enable server actions on static routes
                        const bypassFor = [
                            {
                                type: "header",
                                key: _approuterheaders.ACTION
                            },
                            {
                                type: "header",
                                key: "content-type",
                                value: "multipart/form-data"
                            }
                        ];
                        routes.forEach((route)=>{
                            if ((0, _utils.isDynamicRoute)(page) && route === page) return;
                            if (route === "/_not-found") return;
                            const { revalidate = appConfig.revalidate ?? false, metadata = {}, hasEmptyPrelude, hasPostponed } = exportResult.byPath.get(route) ?? {};
                            pageInfos.set(route, {
                                ...pageInfos.get(route),
                                hasPostponed,
                                hasEmptyPrelude
                            });
                            // update the page (eg /blog/[slug]) to also have the postpone metadata
                            pageInfos.set(page, {
                                ...pageInfos.get(page),
                                hasPostponed,
                                hasEmptyPrelude
                            });
                            if (revalidate !== 0) {
                                const normalizedRoute = (0, _normalizepagepath.normalizePagePath)(route);
                                let dataRoute;
                                if (isRouteHandler) {
                                    dataRoute = null;
                                } else {
                                    dataRoute = _path.default.posix.join(`${normalizedRoute}${_constants.RSC_SUFFIX}`);
                                }
                                let prefetchDataRoute;
                                if (experimentalPPR) {
                                    prefetchDataRoute = _path.default.posix.join(`${normalizedRoute}${_constants.RSC_PREFETCH_SUFFIX}`);
                                }
                                const routeMeta = {};
                                if (metadata.status !== 200) {
                                    routeMeta.initialStatus = metadata.status;
                                }
                                const exportHeaders = metadata.headers;
                                const headerKeys = Object.keys(exportHeaders || {});
                                if (exportHeaders && headerKeys.length) {
                                    routeMeta.initialHeaders = {};
                                    // normalize header values as initialHeaders
                                    // must be Record<string, string>
                                    for (const key of headerKeys){
                                        let value = exportHeaders[key];
                                        if (Array.isArray(value)) {
                                            if (key === "set-cookie") {
                                                value = value.join(",");
                                            } else {
                                                value = value[value.length - 1];
                                            }
                                        }
                                        if (typeof value === "string") {
                                            routeMeta.initialHeaders[key] = value;
                                        }
                                    }
                                }
                                finalPrerenderRoutes[route] = {
                                    ...routeMeta,
                                    experimentalPPR,
                                    experimentalBypassFor: bypassFor,
                                    initialRevalidateSeconds: revalidate,
                                    srcRoute: page,
                                    dataRoute,
                                    prefetchDataRoute
                                };
                            } else {
                                hasDynamicData = true;
                                // we might have determined during prerendering that this page
                                // used dynamic data
                                pageInfos.set(route, {
                                    ...pageInfos.get(route),
                                    isSSG: false,
                                    isStatic: false
                                });
                            }
                        });
                        if (!hasDynamicData && (0, _utils.isDynamicRoute)(originalAppPath)) {
                            const normalizedRoute = (0, _normalizepagepath.normalizePagePath)(page);
                            const dataRoute = _path.default.posix.join(`${normalizedRoute}${_constants.RSC_SUFFIX}`);
                            let prefetchDataRoute;
                            if (experimentalPPR) {
                                prefetchDataRoute = _path.default.posix.join(`${normalizedRoute}${_constants.RSC_PREFETCH_SUFFIX}`);
                            }
                            pageInfos.set(page, {
                                ...pageInfos.get(page),
                                isDynamicAppRoute: true,
                                // if PPR is turned on and the route contains a dynamic segment,
                                // we assume it'll be partially prerendered
                                hasPostponed: experimentalPPR
                            });
                            // TODO: create a separate manifest to allow enforcing
                            // dynamicParams for non-static paths?
                            finalDynamicRoutes[page] = {
                                experimentalPPR,
                                experimentalBypassFor: bypassFor,
                                routeRegex: (0, _loadcustomroutes.normalizeRouteRegex)((0, _routeregex.getNamedRouteRegex)(page, false).re.source),
                                dataRoute,
                                // if dynamicParams are enabled treat as fallback:
                                // 'blocking' if not it's fallback: false
                                fallback: appDynamicParamPaths.has(originalAppPath) ? null : false,
                                dataRouteRegex: isRouteHandler ? null : (0, _loadcustomroutes.normalizeRouteRegex)((0, _routeregex.getNamedRouteRegex)(dataRoute.replace(/\.rsc$/, ""), false).re.source.replace(/\(\?:\\\/\)\?\$$/, "\\.rsc$")),
                                prefetchDataRoute,
                                prefetchDataRouteRegex: isRouteHandler || !prefetchDataRoute ? undefined : (0, _loadcustomroutes.normalizeRouteRegex)((0, _routeregex.getNamedRouteRegex)(prefetchDataRoute.replace(/\.prefetch\.rsc$/, ""), false).re.source.replace(/\(\?:\\\/\)\?\$$/, "\\.prefetch\\.rsc$"))
                            };
                        }
                    }
                    const moveExportedPage = async (originPage, page, file, isSsg, ext, additionalSsgFile = false)=>{
                        return staticGenerationSpan.traceChild("move-exported-page").traceAsyncFn(async ()=>{
                            file = `${file}.${ext}`;
                            const orig = _path.default.join(exportOptions.outdir, file);
                            const pagePath = (0, _require.getPagePath)(originPage, distDir, undefined, false);
                            const relativeDest = _path.default.relative(_path.default.join(distDir, _constants1.SERVER_DIRECTORY), _path.default.join(_path.default.join(pagePath, // strip leading / and then recurse number of nested dirs
                            // to place from base folder
                            originPage.slice(1).split("/").map(()=>"..").join("/")), file)).replace(/\\/g, "/");
                            if (!isSsg && !// don't add static status page to manifest if it's
                            // the default generated version e.g. no pages/500
                            (_constants1.STATIC_STATUS_PAGES.includes(page) && !usedStaticStatusPages.includes(page))) {
                                pagesManifest[page] = relativeDest;
                            }
                            const dest = _path.default.join(distDir, _constants1.SERVER_DIRECTORY, relativeDest);
                            const isNotFound = ssgNotFoundPaths.includes(page);
                            // for SSG files with i18n the non-prerendered variants are
                            // output with the locale prefixed so don't attempt moving
                            // without the prefix
                            if ((!i18n || additionalSsgFile) && !isNotFound) {
                                await _fs.promises.mkdir(_path.default.dirname(dest), {
                                    recursive: true
                                });
                                await _fs.promises.rename(orig, dest);
                            } else if (i18n && !isSsg) {
                                // this will be updated with the locale prefixed variant
                                // since all files are output with the locale prefix
                                delete pagesManifest[page];
                            }
                            if (i18n) {
                                if (additionalSsgFile) return;
                                for (const locale of i18n.locales){
                                    const curPath = `/${locale}${page === "/" ? "" : page}`;
                                    const localeExt = page === "/" ? _path.default.extname(file) : "";
                                    const relativeDestNoPages = relativeDest.slice("pages/".length);
                                    if (isSsg && ssgNotFoundPaths.includes(curPath)) {
                                        continue;
                                    }
                                    const updatedRelativeDest = _path.default.join("pages", locale + localeExt, // if it's the top-most index page we want it to be locale.EXT
                                    // instead of locale/index.html
                                    page === "/" ? "" : relativeDestNoPages).replace(/\\/g, "/");
                                    const updatedOrig = _path.default.join(exportOptions.outdir, locale + localeExt, page === "/" ? "" : file);
                                    const updatedDest = _path.default.join(distDir, _constants1.SERVER_DIRECTORY, updatedRelativeDest);
                                    if (!isSsg) {
                                        pagesManifest[curPath] = updatedRelativeDest;
                                    }
                                    await _fs.promises.mkdir(_path.default.dirname(updatedDest), {
                                        recursive: true
                                    });
                                    await _fs.promises.rename(updatedOrig, updatedDest);
                                }
                            }
                        });
                    };
                    async function moveExportedAppNotFoundTo404() {
                        return staticGenerationSpan.traceChild("move-exported-app-not-found-").traceAsyncFn(async ()=>{
                            const orig = _path.default.join(distDir, "server", "app", "_not-found.html");
                            const updatedRelativeDest = _path.default.join("pages", "404.html").replace(/\\/g, "/");
                            if ((0, _fs.existsSync)(orig)) {
                                await _fs.promises.copyFile(orig, _path.default.join(distDir, "server", updatedRelativeDest));
                                pagesManifest["/404"] = updatedRelativeDest;
                            }
                        });
                    }
                    // If there's /not-found inside app, we prefer it over the pages 404
                    if (hasStaticApp404) {
                        await moveExportedAppNotFoundTo404();
                    } else {
                        // Only move /404 to /404 when there is no custom 404 as in that case we don't know about the 404 page
                        if (!hasPages404 && !hasApp404 && useStaticPages404) {
                            await moveExportedPage("/_error", "/404", "/404", false, "html");
                        }
                    }
                    if (useDefaultStatic500) {
                        await moveExportedPage("/_error", "/500", "/500", false, "html");
                    }
                    for (const page of combinedPages){
                        const isSsg = ssgPages.has(page);
                        const isStaticSsgFallback = ssgStaticFallbackPages.has(page);
                        const isDynamic = (0, _utils.isDynamicRoute)(page);
                        const hasAmp = hybridAmpPages.has(page);
                        const file = (0, _normalizepagepath.normalizePagePath)(page);
                        const pageInfo = pageInfos.get(page);
                        const durationInfo = exportResult.byPage.get(page);
                        if (pageInfo && durationInfo) {
                            // Set Build Duration
                            if (pageInfo.ssgPageRoutes) {
                                pageInfo.ssgPageDurations = pageInfo.ssgPageRoutes.map((pagePath)=>{
                                    const duration = durationInfo.durationsByPath.get(pagePath);
                                    if (typeof duration === "undefined") {
                                        throw new Error("Invariant: page wasn't built");
                                    }
                                    return duration;
                                });
                            }
                            pageInfo.pageDuration = durationInfo.durationsByPath.get(page);
                        }
                        // The dynamic version of SSG pages are only prerendered if the
                        // fallback is enabled. Below, we handle the specific prerenders
                        // of these.
                        const hasHtmlOutput = !(isSsg && isDynamic && !isStaticSsgFallback);
                        if (hasHtmlOutput) {
                            await moveExportedPage(page, page, file, isSsg, "html");
                        }
                        if (hasAmp && (!isSsg || isSsg && !isDynamic)) {
                            const ampPage = `${file}.amp`;
                            await moveExportedPage(page, ampPage, ampPage, isSsg, "html");
                            if (isSsg) {
                                await moveExportedPage(page, ampPage, ampPage, isSsg, "json");
                            }
                        }
                        if (isSsg) {
                            // For a non-dynamic SSG page, we must copy its data file
                            // from export, we already moved the HTML file above
                            if (!isDynamic) {
                                await moveExportedPage(page, page, file, isSsg, "json");
                                if (i18n) {
                                    // TODO: do we want to show all locale variants in build output
                                    for (const locale of i18n.locales){
                                        var _exportResult_byPath_get1;
                                        const localePage = `/${locale}${page === "/" ? "" : page}`;
                                        finalPrerenderRoutes[localePage] = {
                                            initialRevalidateSeconds: ((_exportResult_byPath_get1 = exportResult.byPath.get(localePage)) == null ? void 0 : _exportResult_byPath_get1.revalidate) ?? false,
                                            experimentalPPR: undefined,
                                            srcRoute: null,
                                            dataRoute: _path.default.posix.join("/_next/data", buildId, `${file}.json`),
                                            prefetchDataRoute: undefined
                                        };
                                    }
                                } else {
                                    var _exportResult_byPath_get2;
                                    finalPrerenderRoutes[page] = {
                                        initialRevalidateSeconds: ((_exportResult_byPath_get2 = exportResult.byPath.get(page)) == null ? void 0 : _exportResult_byPath_get2.revalidate) ?? false,
                                        experimentalPPR: undefined,
                                        srcRoute: null,
                                        dataRoute: _path.default.posix.join("/_next/data", buildId, `${file}.json`),
                                        // Pages does not have a prefetch data route.
                                        prefetchDataRoute: undefined
                                    };
                                }
                                // Set Page Revalidation Interval
                                if (pageInfo) {
                                    var _exportResult_byPath_get3;
                                    pageInfo.initialRevalidateSeconds = ((_exportResult_byPath_get3 = exportResult.byPath.get(page)) == null ? void 0 : _exportResult_byPath_get3.revalidate) ?? false;
                                }
                            } else {
                                // For a dynamic SSG page, we did not copy its data exports and only
                                // copy the fallback HTML file (if present).
                                // We must also copy specific versions of this page as defined by
                                // `getStaticPaths` (additionalSsgPaths).
                                const extraRoutes = additionalSsgPaths.get(page) || [];
                                for (const route of extraRoutes){
                                    var _exportResult_byPath_get4;
                                    const pageFile = (0, _normalizepagepath.normalizePagePath)(route);
                                    await moveExportedPage(page, route, pageFile, isSsg, "html", true);
                                    await moveExportedPage(page, route, pageFile, isSsg, "json", true);
                                    if (hasAmp) {
                                        const ampPage = `${pageFile}.amp`;
                                        await moveExportedPage(page, ampPage, ampPage, isSsg, "html", true);
                                        await moveExportedPage(page, ampPage, ampPage, isSsg, "json", true);
                                    }
                                    const initialRevalidateSeconds = ((_exportResult_byPath_get4 = exportResult.byPath.get(route)) == null ? void 0 : _exportResult_byPath_get4.revalidate) ?? false;
                                    if (typeof initialRevalidateSeconds === "undefined") {
                                        throw new Error("Invariant: page wasn't built");
                                    }
                                    finalPrerenderRoutes[route] = {
                                        initialRevalidateSeconds,
                                        experimentalPPR: undefined,
                                        srcRoute: page,
                                        dataRoute: _path.default.posix.join("/_next/data", buildId, `${(0, _normalizepagepath.normalizePagePath)(route)}.json`),
                                        // Pages does not have a prefetch data route.
                                        prefetchDataRoute: undefined
                                    };
                                    // Set route Revalidation Interval
                                    if (pageInfo) {
                                        pageInfo.initialRevalidateSeconds = initialRevalidateSeconds;
                                    }
                                }
                            }
                        }
                    }
                    // remove temporary export folder
                    await _fs.promises.rm(exportOptions.outdir, {
                        recursive: true,
                        force: true
                    });
                    await _fs.promises.writeFile(manifestPath, (0, _formatmanifest.formatManifest)(pagesManifest), "utf8");
                });
            }
            const postBuildSpinner = (0, _spinner.default)("Finalizing page optimization");
            let buildTracesSpinner = (0, _spinner.default)(`Collecting build traces`);
            // ensure the worker is not left hanging
            pagesStaticWorkers.close();
            appStaticWorkers == null ? void 0 : appStaticWorkers.close();
            const analysisEnd = process.hrtime(analysisBegin);
            telemetry.record((0, _events.eventBuildOptimize)(pagesPaths, {
                durationInSeconds: analysisEnd[0],
                staticPageCount: staticPages.size,
                staticPropsPageCount: ssgPages.size,
                serverPropsPageCount: serverPropsPages.size,
                ssrPageCount: pagesPaths.length - (staticPages.size + ssgPages.size + serverPropsPages.size),
                hasStatic404: useStaticPages404,
                hasReportWebVitals: (namedExports == null ? void 0 : namedExports.includes("reportWebVitals")) ?? false,
                rewritesCount: combinedRewrites.length,
                headersCount: headers.length,
                redirectsCount: redirects.length - 1,
                headersWithHasCount: headers.filter((r)=>!!r.has).length,
                rewritesWithHasCount: combinedRewrites.filter((r)=>!!r.has).length,
                redirectsWithHasCount: redirects.filter((r)=>!!r.has).length,
                middlewareCount: Object.keys(rootPaths).length > 0 ? 1 : 0,
                totalAppPagesCount,
                staticAppPagesCount,
                serverAppPagesCount,
                edgeRuntimeAppCount,
                edgeRuntimePagesCount
            }));
            if (_buildcontext.NextBuildContext.telemetryPlugin) {
                const events = (0, _events.eventBuildFeatureUsage)(_buildcontext.NextBuildContext.telemetryPlugin);
                telemetry.record(events);
                telemetry.record((0, _events.eventPackageUsedInGetServerSideProps)(_buildcontext.NextBuildContext.telemetryPlugin));
            }
            if (ssgPages.size > 0 || appDir) {
                var _config_i18n;
                tbdPrerenderRoutes.forEach((tbdRoute)=>{
                    const normalizedRoute = (0, _normalizepagepath.normalizePagePath)(tbdRoute);
                    const dataRoute = _path.default.posix.join("/_next/data", buildId, `${normalizedRoute}.json`);
                    finalDynamicRoutes[tbdRoute] = {
                        routeRegex: (0, _loadcustomroutes.normalizeRouteRegex)((0, _routeregex.getNamedRouteRegex)(tbdRoute, false).re.source),
                        experimentalPPR: undefined,
                        dataRoute,
                        fallback: ssgBlockingFallbackPages.has(tbdRoute) ? null : ssgStaticFallbackPages.has(tbdRoute) ? `${normalizedRoute}.html` : false,
                        dataRouteRegex: (0, _loadcustomroutes.normalizeRouteRegex)((0, _routeregex.getNamedRouteRegex)(dataRoute.replace(/\.json$/, ""), false).re.source.replace(/\(\?:\\\/\)\?\$$/, "\\.json$")),
                        // Pages does not have a prefetch data route.
                        prefetchDataRoute: undefined,
                        prefetchDataRouteRegex: undefined
                    };
                });
                const prerenderManifest = {
                    version: 4,
                    routes: finalPrerenderRoutes,
                    dynamicRoutes: finalDynamicRoutes,
                    notFoundRoutes: ssgNotFoundPaths,
                    preview: previewProps
                };
                _buildcontext.NextBuildContext.previewModeId = previewProps.previewModeId;
                _buildcontext.NextBuildContext.fetchCacheKeyPrefix = config.experimental.fetchCacheKeyPrefix;
                _buildcontext.NextBuildContext.allowedRevalidateHeaderKeys = config.experimental.allowedRevalidateHeaderKeys;
                await _fs.promises.writeFile(_path.default.join(distDir, _constants1.PRERENDER_MANIFEST), (0, _formatmanifest.formatManifest)(prerenderManifest), "utf8");
                await _fs.promises.writeFile(_path.default.join(distDir, _constants1.PRERENDER_MANIFEST).replace(/\.json$/, ".js"), `self.__PRERENDER_MANIFEST=${JSON.stringify(JSON.stringify(prerenderManifest))}`, "utf8");
                await generateClientSsgManifest(prerenderManifest, {
                    distDir,
                    buildId,
                    locales: ((_config_i18n = config.i18n) == null ? void 0 : _config_i18n.locales) || []
                });
            } else {
                const prerenderManifest = {
                    version: 4,
                    routes: {},
                    dynamicRoutes: {},
                    preview: previewProps,
                    notFoundRoutes: []
                };
                await _fs.promises.writeFile(_path.default.join(distDir, _constants1.PRERENDER_MANIFEST), (0, _formatmanifest.formatManifest)(prerenderManifest), "utf8");
                await _fs.promises.writeFile(_path.default.join(distDir, _constants1.PRERENDER_MANIFEST).replace(/\.json$/, ".js"), `self.__PRERENDER_MANIFEST=${JSON.stringify(JSON.stringify(prerenderManifest))}`, "utf8");
            }
            const images = {
                ...config.images
            };
            const { deviceSizes, imageSizes } = images;
            images.sizes = [
                ...deviceSizes,
                ...imageSizes
            ];
            images.remotePatterns = ((config == null ? void 0 : (_config_images = config.images) == null ? void 0 : _config_images.remotePatterns) || []).map((p)=>({
                    // Should be the same as matchRemotePattern()
                    protocol: p.protocol,
                    hostname: (0, _micromatch.makeRe)(p.hostname).source,
                    port: p.port,
                    pathname: (0, _micromatch.makeRe)(p.pathname ?? "**").source
                }));
            await _fs.promises.writeFile(_path.default.join(distDir, _constants1.IMAGES_MANIFEST), (0, _formatmanifest.formatManifest)({
                version: 1,
                images
            }), "utf8");
            await _fs.promises.writeFile(_path.default.join(distDir, _constants1.EXPORT_MARKER), (0, _formatmanifest.formatManifest)({
                version: 1,
                hasExportPathMap: typeof config.exportPathMap === "function",
                exportTrailingSlash: config.trailingSlash === true,
                isNextImageImported: isNextImageImported === true
            }), "utf8");
            await _fs.promises.unlink(_path.default.join(distDir, _constants1.EXPORT_DETAIL)).catch((err)=>{
                if (err.code === "ENOENT") {
                    return Promise.resolve();
                }
                return Promise.reject(err);
            });
            if (debugOutput) {
                nextBuildSpan.traceChild("print-custom-routes").traceFn(()=>(0, _utils1.printCustomRoutes)({
                        redirects,
                        rewrites,
                        headers
                    }));
            }
            if (config.analyticsId) {
                console.log((0, _picocolors.bold)((0, _picocolors.green)("Next.js Speed Insights")) + " is enabled for this production build. " + "You'll receive a Real Experience Score computed by all of your visitors.");
                console.log("");
            }
            if (Boolean(config.experimental.nextScriptWorkers)) {
                await nextBuildSpan.traceChild("verify-partytown-setup").traceAsyncFn(async ()=>{
                    await (0, _verifypartytownsetup.verifyPartytownSetup)(dir, _path.default.join(distDir, _constants1.CLIENT_STATIC_FILES_PATH));
                });
            }
            if (config.output === "export") {
                if (buildTracesSpinner) {
                    buildTracesSpinner == null ? void 0 : buildTracesSpinner.stop();
                    buildTracesSpinner = undefined;
                }
                const exportApp = require("../export").default;
                const pagesWorker = createStaticWorker(incrementalCacheIpcPort, incrementalCacheIpcValidationKey);
                const appWorker = createStaticWorker(incrementalCacheIpcPort, incrementalCacheIpcValidationKey);
                const options = {
                    buildExport: false,
                    nextConfig: config,
                    enabledDirectories,
                    silent: true,
                    threads: config.experimental.cpus,
                    outdir: _path.default.join(dir, configOutDir),
                    // The worker already explicitly binds `this` to each of the
                    // exposed methods.
                    exportAppPageWorker: appWorker == null ? void 0 : appWorker.exportPage,
                    exportPageWorker: pagesWorker == null ? void 0 : pagesWorker.exportPage,
                    endWorker: async ()=>{
                        await pagesWorker.end();
                        await appWorker.end();
                    }
                };
                await exportApp(dir, options, nextBuildSpan);
                // ensure the worker is not left hanging
                pagesWorker.close();
                appWorker.close();
            }
            await buildTracesPromise;
            if (config.output === "standalone") {
                await nextBuildSpan.traceChild("copy-traced-files").traceAsyncFn(async ()=>{
                    await (0, _utils1.copyTracedFiles)(dir, distDir, pageKeys.pages, denormalizedAppPages, outputFileTracingRoot, requiredServerFiles.config, middlewareManifest, hasInstrumentationHook, staticPages);
                    if (config.output === "standalone") {
                        for (const file of [
                            ...requiredServerFiles.files,
                            _path.default.join(config.distDir, _constants1.SERVER_FILES_MANIFEST),
                            ...loadedEnvFiles.reduce((acc, envFile)=>{
                                if ([
                                    ".env",
                                    ".env.production"
                                ].includes(envFile.path)) {
                                    acc.push(envFile.path);
                                }
                                return acc;
                            }, [])
                        ]){
                            const filePath = _path.default.join(dir, file);
                            const outputPath = _path.default.join(distDir, "standalone", _path.default.relative(outputFileTracingRoot, filePath));
                            await _fs.promises.mkdir(_path.default.dirname(outputPath), {
                                recursive: true
                            });
                            await _fs.promises.copyFile(filePath, outputPath);
                        }
                        await (0, _recursivecopy.recursiveCopy)(_path.default.join(distDir, _constants1.SERVER_DIRECTORY, "pages"), _path.default.join(distDir, "standalone", _path.default.relative(outputFileTracingRoot, distDir), _constants1.SERVER_DIRECTORY, "pages"), {
                            overwrite: true
                        });
                        if (appDir) {
                            const originalServerApp = _path.default.join(distDir, _constants1.SERVER_DIRECTORY, "app");
                            if ((0, _fs.existsSync)(originalServerApp)) {
                                await (0, _recursivecopy.recursiveCopy)(originalServerApp, _path.default.join(distDir, "standalone", _path.default.relative(outputFileTracingRoot, distDir), _constants1.SERVER_DIRECTORY, "app"), {
                                    overwrite: true
                                });
                            }
                        }
                    }
                });
            }
            if (buildTracesSpinner) {
                buildTracesSpinner.stopAndPersist();
                buildTracesSpinner = undefined;
            }
            if (postBuildSpinner) postBuildSpinner.stopAndPersist();
            console.log();
            await nextBuildSpan.traceChild("print-tree-view").traceAsyncFn(()=>(0, _utils1.printTreeView)(pageKeys, pageInfos, {
                    distPath: distDir,
                    buildId: buildId,
                    pagesDir,
                    useStaticPages404,
                    pageExtensions: config.pageExtensions,
                    appBuildManifest,
                    buildManifest,
                    middlewareManifest,
                    gzipSize: config.experimental.gzipSize
                }));
            await nextBuildSpan.traceChild("telemetry-flush").traceAsyncFn(()=>telemetry.flush());
        });
        return buildResult;
    } finally{
        // Ensure we wait for lockfile patching if present
        await _swc.lockfilePatchPromise.cur;
        // Ensure all traces are flushed before finishing the command
        await (0, _trace.flushAllTraces)();
        (0, _swc.teardownTraceSubscriber)();
        (0, _swc.teardownHeapProfiler)();
        (0, _swc.teardownCrashReporter)();
    }
}

//# sourceMappingURL=index.js.map