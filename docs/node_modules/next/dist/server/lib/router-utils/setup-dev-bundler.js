"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "setupDevBundler", {
    enumerable: true,
    get: function() {
        return setupDevBundler;
    }
});
const _ws = /*#__PURE__*/ _interop_require_default(require("next/dist/compiled/ws"));
const _swc = require("../../../build/swc");
const _fs = /*#__PURE__*/ _interop_require_default(require("fs"));
const _url = /*#__PURE__*/ _interop_require_default(require("url"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _querystring = /*#__PURE__*/ _interop_require_default(require("querystring"));
const _watchpack = /*#__PURE__*/ _interop_require_default(require("watchpack"));
const _env = require("@next/env");
const _iserror = /*#__PURE__*/ _interop_require_default(require("../../../lib/is-error"));
const _findup = /*#__PURE__*/ _interop_require_default(require("next/dist/compiled/find-up"));
const _filesystem = require("./filesystem");
const _log = /*#__PURE__*/ _interop_require_wildcard(require("../../../build/output/log"));
const _hotreloaderwebpack = /*#__PURE__*/ _interop_require_wildcard(require("../../dev/hot-reloader-webpack"));
const _shared = require("../../../trace/shared");
const _loadjsconfig = /*#__PURE__*/ _interop_require_default(require("../../../build/load-jsconfig"));
const _findpagefile = require("../find-page-file");
const _events = require("../../../telemetry/events");
const _defineenvplugin = require("../../../build/webpack/plugins/define-env-plugin");
const _logappdirerror = require("../../dev/log-app-dir-error");
const _utils = require("../../../shared/lib/router/utils");
const _entries = require("../../../build/entries");
const _verifytypescriptsetup = require("../../../lib/verify-typescript-setup");
const _verifypartytownsetup = require("../../../lib/verify-partytown-setup");
const _routeregex = require("../../../shared/lib/router/utils/route-regex");
const _apppaths = require("../../../shared/lib/router/utils/app-paths");
const _builddataroute = require("./build-data-route");
const _routematcher = require("../../../shared/lib/router/utils/route-matcher");
const _normalizepathsep = require("../../../shared/lib/page-path/normalize-path-sep");
const _createclientrouterfilter = require("../../../lib/create-client-router-filter");
const _absolutepathtopage = require("../../../shared/lib/page-path/absolute-path-to-page");
const _generateinterceptionroutesrewrites = require("../../../lib/generate-interception-routes-rewrites");
const _store = require("../../../build/output/store");
const _constants = require("../../../shared/lib/constants");
const _middlewareroutematcher = require("../../../shared/lib/router/utils/middleware-route-matcher");
const _buildcontext = require("../../../build/build-context");
const _worker = require("../../../build/worker");
const _middleware = require("next/dist/compiled/@next/react-dev-overlay/dist/middleware");
const _middlewareturbopack = require("next/dist/compiled/@next/react-dev-overlay/dist/middleware-turbopack");
const _promises = require("fs/promises");
const _utils1 = require("../../../shared/lib/utils");
const _buildmanifestplugin = require("../../../build/webpack/plugins/build-manifest-plugin");
const _shared1 = require("../../../build/webpack/plugins/next-types-plugin/shared");
const _pathtoregexp = require("next/dist/compiled/path-to-regexp");
const _hotreloadertypes = require("../../dev/hot-reloader-types");
const _utils2 = require("../../utils");
const _nextjsrequirecachehotreloader = require("../../../build/webpack/plugins/nextjs-require-cache-hot-reloader");
const _getmetadataroute = require("../../../lib/metadata/get-metadata-route");
const _renderserver = require("../render-server");
const _denormalizepagepath = require("../../../shared/lib/page-path/denormalize-page-path");
const _actionencryptionutils = require("../../app-render/action-encryption-utils");
const _picocolors = require("../../../lib/picocolors");
const _writeatomic = require("../../../lib/fs/write-atomic");
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
const wsServer = new _ws.default.Server({
    noServer: true
});
async function verifyTypeScript(opts) {
    let usingTypeScript = false;
    const verifyResult = await (0, _verifytypescriptsetup.verifyTypeScriptSetup)({
        dir: opts.dir,
        distDir: opts.nextConfig.distDir,
        intentDirs: [
            opts.pagesDir,
            opts.appDir
        ].filter(Boolean),
        typeCheckPreflight: false,
        tsconfigPath: opts.nextConfig.typescript.tsconfigPath,
        disableStaticImages: opts.nextConfig.images.disableStaticImages,
        hasAppDir: !!opts.appDir,
        hasPagesDir: !!opts.pagesDir
    });
    if (verifyResult.version) {
        usingTypeScript = true;
    }
    return usingTypeScript;
}
class ModuleBuildError extends Error {
}
async function startWatcher(opts) {
    const { nextConfig, appDir, pagesDir, dir } = opts;
    const { useFileSystemPublicRoutes } = nextConfig;
    const usingTypeScript = await verifyTypeScript(opts);
    const distDir = _path.default.join(opts.dir, opts.nextConfig.distDir);
    (0, _shared.setGlobal)("distDir", distDir);
    (0, _shared.setGlobal)("phase", _constants.PHASE_DEVELOPMENT_SERVER);
    const validFileMatcher = (0, _findpagefile.createValidFileMatcher)(nextConfig.pageExtensions, appDir);
    async function propagateServerField(field, args) {
        var _opts_renderServer_instance, _opts_renderServer;
        await ((_opts_renderServer = opts.renderServer) == null ? void 0 : (_opts_renderServer_instance = _opts_renderServer.instance) == null ? void 0 : _opts_renderServer_instance.propagateServerField(opts.dir, field, args));
    }
    const serverFields = {};
    let hotReloader;
    let project;
    if (opts.turbo) {
        const { loadBindings } = require("../../../build/swc");
        let bindings = await loadBindings();
        const { jsConfig } = await (0, _loadjsconfig.default)(dir, opts.nextConfig);
        // For the debugging purpose, check if createNext or equivalent next instance setup in test cases
        // works correctly. Normally `run-test` hides output so only will be visible when `--debug` flag is used.
        if (process.env.TURBOPACK && process.env.NEXT_TEST_MODE) {
            require("console").log("Creating turbopack project", {
                dir,
                testMode: process.env.NEXT_TEST_MODE
            });
        }
        const hasRewrites = opts.fsChecker.rewrites.afterFiles.length > 0 || opts.fsChecker.rewrites.beforeFiles.length > 0 || opts.fsChecker.rewrites.fallback.length > 0;
        project = await bindings.turbo.createProject({
            projectPath: dir,
            rootPath: opts.nextConfig.experimental.outputFileTracingRoot || dir,
            nextConfig: opts.nextConfig,
            jsConfig: jsConfig ?? {
                compilerOptions: {}
            },
            watch: true,
            env: process.env,
            defineEnv: (0, _swc.createDefineEnv)({
                isTurbopack: true,
                allowedRevalidateHeaderKeys: undefined,
                clientRouterFilters: undefined,
                config: nextConfig,
                dev: true,
                distDir,
                fetchCacheKeyPrefix: undefined,
                hasRewrites,
                middlewareMatchers: undefined,
                previewModeId: undefined
            }),
            serverAddr: `127.0.0.1:${opts.port}`
        });
        const iter = project.entrypointsSubscribe();
        const curEntries = new Map();
        const changeSubscriptions = new Map();
        let prevMiddleware = undefined;
        const globalEntries = {
            app: undefined,
            document: undefined,
            error: undefined
        };
        let currentEntriesHandlingResolve;
        let currentEntriesHandling = new Promise((resolve)=>currentEntriesHandlingResolve = resolve);
        const hmrPayloads = new Map();
        const turbopackUpdates = [];
        let hmrBuilding = false;
        const issues = new Map();
        function issueKey(issue) {
            return [
                issue.severity,
                issue.filePath,
                JSON.stringify(issue.title),
                JSON.stringify(issue.description)
            ].join("-");
        }
        function formatIssue(issue) {
            const { filePath, title, description, source } = issue;
            let { documentationLink } = issue;
            let formattedTitle = renderStyledStringToErrorAnsi(title).replace(/\n/g, "\n    ");
            // TODO: Use error codes to identify these
            // TODO: Generalize adapting Turbopack errors to Next.js errors
            if (formattedTitle.includes("Module not found")) {
                // For compatiblity with webpack
                // TODO: include columns in webpack errors.
                documentationLink = "https://nextjs.org/docs/messages/module-not-found";
            }
            let formattedFilePath = filePath.replace("[project]/", "./").replaceAll("/./", "/").replace("\\\\?\\", "");
            let message;
            if (source) {
                if (source.range) {
                    const { start } = source.range;
                    message = `${formattedFilePath}:${start.line + 1}:${start.column}\n${formattedTitle}`;
                } else {
                    message = formattedFilePath;
                }
            } else if (formattedFilePath) {
                message = `${formattedFilePath}\n${formattedTitle}`;
            } else {
                message = formattedTitle;
            }
            message += "\n";
            if ((source == null ? void 0 : source.range) && source.source.content) {
                const { start, end } = source.range;
                const { codeFrameColumns } = require("next/dist/compiled/babel/code-frame");
                message += codeFrameColumns(source.source.content, {
                    start: {
                        line: start.line + 1,
                        column: start.column + 1
                    },
                    end: {
                        line: end.line + 1,
                        column: end.column + 1
                    }
                }, {
                    forceColor: true
                }).trim() + "\n\n";
            }
            if (description) {
                message += renderStyledStringToErrorAnsi(description) + "\n\n";
            }
            // TODO: Include a trace from the issue.
            if (documentationLink) {
                message += documentationLink + "\n\n";
            }
            return message;
        }
        function processIssues(name, result, throwIssue = false) {
            const newIssues = new Map();
            issues.set(name, newIssues);
            const relevantIssues = new Set();
            for (const issue of result.issues){
                if (issue.severity !== "error" && issue.severity !== "fatal") continue;
                const key = issueKey(issue);
                const formatted = formatIssue(issue);
                newIssues.set(key, issue);
                // We show errors in node_modules to the console, but don't throw for them
                if (/(^|\/)node_modules(\/|$)/.test(issue.filePath)) continue;
                relevantIssues.add(formatted);
            }
            if (relevantIssues.size && throwIssue) {
                throw new ModuleBuildError([
                    ...relevantIssues
                ].join("\n\n"));
            }
        }
        const serverPathState = new Map();
        async function processResult(id, result) {
            // Figure out if the server files have changed
            let hasChange = false;
            for (const { path: p, contentHash } of result.serverPaths){
                // We ignore source maps
                if (p.endsWith(".map")) continue;
                let key = `${id}:${p}`;
                const localHash = serverPathState.get(key);
                const globaHash = serverPathState.get(p);
                if (localHash && localHash !== contentHash || globaHash && globaHash !== contentHash) {
                    hasChange = true;
                    serverPathState.set(key, contentHash);
                    serverPathState.set(p, contentHash);
                } else {
                    if (!localHash) {
                        serverPathState.set(key, contentHash);
                    }
                    if (!globaHash) {
                        serverPathState.set(p, contentHash);
                    }
                }
            }
            if (!hasChange) {
                return result;
            }
            const hasAppPaths = result.serverPaths.some(({ path: p })=>p.startsWith("server/app"));
            if (hasAppPaths) {
                (0, _nextjsrequirecachehotreloader.deleteAppClientCache)();
            }
            const serverPaths = result.serverPaths.map(({ path: p })=>_path.default.join(distDir, p));
            for (const file of serverPaths){
                (0, _renderserver.clearModuleContext)(file);
                (0, _nextjsrequirecachehotreloader.deleteCache)(file);
            }
            return result;
        }
        const buildingIds = new Set();
        const readyIds = new Set();
        function startBuilding(id, requestUrl, forceRebuild = false) {
            if (!forceRebuild && readyIds.has(id)) {
                return ()=>{};
            }
            if (buildingIds.size === 0) {
                _store.store.setState({
                    loading: true,
                    trigger: id,
                    url: requestUrl
                }, true);
                hotReloader.send({
                    action: _hotreloadertypes.HMR_ACTIONS_SENT_TO_BROWSER.BUILDING
                });
            }
            buildingIds.add(id);
            return function finishBuilding() {
                if (buildingIds.size === 0) {
                    return;
                }
                readyIds.add(id);
                buildingIds.delete(id);
                if (buildingIds.size === 0) {
                    hotReloader.send({
                        action: _hotreloadertypes.HMR_ACTIONS_SENT_TO_BROWSER.FINISH_BUILDING
                    });
                    _store.store.setState({
                        loading: false
                    }, true);
                }
            };
        }
        let hmrHash = 0;
        const sendHmrDebounce = (0, _utils2.debounce)(()=>{
            const errors = new Map();
            for (const [, issueMap] of issues){
                for (const [key, issue] of issueMap){
                    if (errors.has(key)) continue;
                    const message = formatIssue(issue);
                    errors.set(key, {
                        message,
                        details: issue.detail ? renderStyledStringToErrorAnsi(issue.detail) : undefined
                    });
                }
            }
            hotReloader.send({
                action: _hotreloadertypes.HMR_ACTIONS_SENT_TO_BROWSER.BUILT,
                hash: String(++hmrHash),
                errors: [
                    ...errors.values()
                ],
                warnings: []
            });
            hmrBuilding = false;
            if (errors.size === 0) {
                for (const payload of hmrPayloads.values()){
                    hotReloader.send(payload);
                }
                hmrPayloads.clear();
                if (turbopackUpdates.length > 0) {
                    hotReloader.send({
                        type: _hotreloadertypes.HMR_ACTIONS_SENT_TO_BROWSER.TURBOPACK_MESSAGE,
                        data: turbopackUpdates
                    });
                    turbopackUpdates.length = 0;
                }
            }
        }, 2);
        function sendHmr(key, id, payload) {
            // We've detected a change in some part of the graph. If nothing has
            // been inserted into building yet, then this is the first change
            // emitted, but their may be many more coming.
            if (!hmrBuilding) {
                hotReloader.send({
                    action: _hotreloadertypes.HMR_ACTIONS_SENT_TO_BROWSER.BUILDING
                });
                hmrBuilding = true;
            }
            hmrPayloads.set(`${key}:${id}`, payload);
            hmrEventHappend = true;
            sendHmrDebounce();
        }
        function sendTurbopackMessage(payload) {
            // We've detected a change in some part of the graph. If nothing has
            // been inserted into building yet, then this is the first change
            // emitted, but their may be many more coming.
            if (!hmrBuilding) {
                hotReloader.send({
                    action: _hotreloadertypes.HMR_ACTIONS_SENT_TO_BROWSER.BUILDING
                });
                hmrBuilding = true;
            }
            turbopackUpdates.push(payload);
            hmrEventHappend = true;
            sendHmrDebounce();
        }
        async function loadPartialManifest(name, pageName, type = "pages") {
            const manifestPath = _path.default.posix.join(distDir, `server`, type === "app-route" ? "app" : type, type === "middleware" || type === "instrumentation" ? "" : pageName === "/" ? "index" : pageName === "/index" || pageName.startsWith("/index/") ? `/index${pageName}` : pageName, type === "app" ? "page" : type === "app-route" ? "route" : "", name);
            return JSON.parse(await (0, _promises.readFile)(_path.default.posix.join(manifestPath), "utf-8"));
        }
        const buildManifests = new Map();
        const appBuildManifests = new Map();
        const pagesManifests = new Map();
        const appPathsManifests = new Map();
        const middlewareManifests = new Map();
        const actionManifests = new Map();
        const clientToHmrSubscription = new Map();
        const loadbleManifests = new Map();
        const clients = new Set();
        async function loadMiddlewareManifest(pageName, type) {
            middlewareManifests.set(pageName, await loadPartialManifest(_constants.MIDDLEWARE_MANIFEST, pageName, type));
        }
        async function loadBuildManifest(pageName, type = "pages") {
            buildManifests.set(pageName, await loadPartialManifest(_constants.BUILD_MANIFEST, pageName, type));
        }
        async function loadAppBuildManifest(pageName) {
            appBuildManifests.set(pageName, await loadPartialManifest(_constants.APP_BUILD_MANIFEST, pageName, "app"));
        }
        async function loadPagesManifest(pageName) {
            pagesManifests.set(pageName, await loadPartialManifest(_constants.PAGES_MANIFEST, pageName));
        }
        async function loadAppPathManifest(pageName, type = "app") {
            appPathsManifests.set(pageName, await loadPartialManifest(_constants.APP_PATHS_MANIFEST, pageName, type));
        }
        async function loadActionManifest(pageName) {
            actionManifests.set(pageName, await loadPartialManifest(`${_constants.SERVER_REFERENCE_MANIFEST}.json`, pageName, "app"));
        }
        async function loadLoadableManifest(pageName, type = "pages") {
            loadbleManifests.set(pageName, await loadPartialManifest(_constants.REACT_LOADABLE_MANIFEST, pageName, type));
        }
        async function changeSubscription(page, type, includeIssues, endpoint, makePayload) {
            const key = `${page} (${type})`;
            if (!endpoint || changeSubscriptions.has(key)) return;
            const changedPromise = endpoint[`${type}Changed`](includeIssues);
            changeSubscriptions.set(key, changedPromise);
            const changed = await changedPromise;
            for await (const change of changed){
                processIssues(page, change);
                const payload = await makePayload(page, change);
                if (payload) sendHmr("endpoint-change", key, payload);
            }
        }
        async function clearChangeSubscription(page, type) {
            const key = `${page} (${type})`;
            const subscription = await changeSubscriptions.get(key);
            if (subscription) {
                subscription.return == null ? void 0 : subscription.return.call(subscription);
                changeSubscriptions.delete(key);
            }
            issues.delete(key);
        }
        function mergeBuildManifests(manifests) {
            const manifest = {
                pages: {
                    "/_app": []
                },
                // Something in next.js depends on these to exist even for app dir rendering
                devFiles: [],
                ampDevFiles: [],
                polyfillFiles: [],
                lowPriorityFiles: [
                    "static/development/_ssgManifest.js",
                    "static/development/_buildManifest.js"
                ],
                rootMainFiles: [],
                ampFirstPages: []
            };
            for (const m of manifests){
                Object.assign(manifest.pages, m.pages);
                if (m.rootMainFiles.length) manifest.rootMainFiles = m.rootMainFiles;
            }
            return manifest;
        }
        function mergeAppBuildManifests(manifests) {
            const manifest = {
                pages: {}
            };
            for (const m of manifests){
                Object.assign(manifest.pages, m.pages);
            }
            return manifest;
        }
        function mergePagesManifests(manifests) {
            const manifest = {};
            for (const m of manifests){
                Object.assign(manifest, m);
            }
            return manifest;
        }
        function mergeMiddlewareManifests(manifests) {
            const manifest = {
                version: 2,
                middleware: {},
                sortedMiddleware: [],
                functions: {}
            };
            let instrumentation = undefined;
            for (const m of manifests){
                Object.assign(manifest.functions, m.functions);
                Object.assign(manifest.middleware, m.middleware);
                if (m.instrumentation) {
                    instrumentation = m.instrumentation;
                }
            }
            const updateFunctionDefinition = (fun)=>{
                return {
                    ...fun,
                    files: [
                        ...(instrumentation == null ? void 0 : instrumentation.files) ?? [],
                        ...fun.files
                    ]
                };
            };
            for (const key of Object.keys(manifest.middleware)){
                const value = manifest.middleware[key];
                manifest.middleware[key] = updateFunctionDefinition(value);
            }
            for (const key of Object.keys(manifest.functions)){
                const value = manifest.functions[key];
                manifest.functions[key] = updateFunctionDefinition(value);
            }
            for (const fun of Object.values(manifest.functions).concat(Object.values(manifest.middleware))){
                for (const matcher of fun.matchers){
                    if (!matcher.regexp) {
                        matcher.regexp = (0, _pathtoregexp.pathToRegexp)(matcher.originalSource, [], {
                            delimiter: "/",
                            sensitive: false,
                            strict: true
                        }).source.replaceAll("\\/", "/");
                    }
                }
            }
            manifest.sortedMiddleware = Object.keys(manifest.middleware);
            return manifest;
        }
        async function mergeActionManifests(manifests) {
            const manifest = {
                node: {},
                edge: {},
                encryptionKey: await (0, _actionencryptionutils.generateRandomActionKeyRaw)(true)
            };
            function mergeActionIds(actionEntries, other) {
                for(const key in other){
                    const action = actionEntries[key] ??= {
                        workers: {},
                        layer: {}
                    };
                    Object.assign(action.workers, other[key].workers);
                    Object.assign(action.layer, other[key].layer);
                }
            }
            for (const m of manifests){
                mergeActionIds(manifest.node, m.node);
                mergeActionIds(manifest.edge, m.edge);
            }
            return manifest;
        }
        function mergeLoadableManifests(manifests) {
            const manifest = {};
            for (const m of manifests){
                Object.assign(manifest, m);
            }
            return manifest;
        }
        async function writeBuildManifest(rewrites) {
            const buildManifest = mergeBuildManifests(buildManifests.values());
            const buildManifestPath = _path.default.join(distDir, _constants.BUILD_MANIFEST);
            const middlewareBuildManifestPath = _path.default.join(distDir, "server", `${_constants.MIDDLEWARE_BUILD_MANIFEST}.js`);
            (0, _nextjsrequirecachehotreloader.deleteCache)(buildManifestPath);
            (0, _nextjsrequirecachehotreloader.deleteCache)(middlewareBuildManifestPath);
            await (0, _writeatomic.writeFileAtomic)(buildManifestPath, JSON.stringify(buildManifest, null, 2));
            await (0, _writeatomic.writeFileAtomic)(middlewareBuildManifestPath, `self.__BUILD_MANIFEST=${JSON.stringify(buildManifest)}`);
            const content = {
                __rewrites: rewrites ? (0, _buildmanifestplugin.normalizeRewritesForBuildManifest)(rewrites) : {
                    afterFiles: [],
                    beforeFiles: [],
                    fallback: []
                },
                ...Object.fromEntries([
                    ...curEntries.keys()
                ].map((pathname)=>[
                        pathname,
                        `static/chunks/pages${pathname === "/" ? "/index" : pathname}.js`
                    ])),
                sortedPages: [
                    ...curEntries.keys()
                ]
            };
            const buildManifestJs = `self.__BUILD_MANIFEST = ${JSON.stringify(content)};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()`;
            await (0, _writeatomic.writeFileAtomic)(_path.default.join(distDir, "static", "development", "_buildManifest.js"), buildManifestJs);
            await (0, _writeatomic.writeFileAtomic)(_path.default.join(distDir, "static", "development", "_ssgManifest.js"), _buildmanifestplugin.srcEmptySsgManifest);
        }
        async function writeFallbackBuildManifest() {
            const fallbackBuildManifest = mergeBuildManifests([
                buildManifests.get("_app"),
                buildManifests.get("_error")
            ].filter(Boolean));
            const fallbackBuildManifestPath = _path.default.join(distDir, `fallback-${_constants.BUILD_MANIFEST}`);
            (0, _nextjsrequirecachehotreloader.deleteCache)(fallbackBuildManifestPath);
            await (0, _writeatomic.writeFileAtomic)(fallbackBuildManifestPath, JSON.stringify(fallbackBuildManifest, null, 2));
        }
        async function writeAppBuildManifest() {
            const appBuildManifest = mergeAppBuildManifests(appBuildManifests.values());
            const appBuildManifestPath = _path.default.join(distDir, _constants.APP_BUILD_MANIFEST);
            (0, _nextjsrequirecachehotreloader.deleteCache)(appBuildManifestPath);
            await (0, _writeatomic.writeFileAtomic)(appBuildManifestPath, JSON.stringify(appBuildManifest, null, 2));
        }
        async function writePagesManifest() {
            const pagesManifest = mergePagesManifests(pagesManifests.values());
            const pagesManifestPath = _path.default.join(distDir, "server", _constants.PAGES_MANIFEST);
            (0, _nextjsrequirecachehotreloader.deleteCache)(pagesManifestPath);
            await (0, _writeatomic.writeFileAtomic)(pagesManifestPath, JSON.stringify(pagesManifest, null, 2));
        }
        async function writeAppPathsManifest() {
            const appPathsManifest = mergePagesManifests(appPathsManifests.values());
            const appPathsManifestPath = _path.default.join(distDir, "server", _constants.APP_PATHS_MANIFEST);
            (0, _nextjsrequirecachehotreloader.deleteCache)(appPathsManifestPath);
            await (0, _writeatomic.writeFileAtomic)(appPathsManifestPath, JSON.stringify(appPathsManifest, null, 2));
        }
        async function writeMiddlewareManifest() {
            const middlewareManifest = mergeMiddlewareManifests(middlewareManifests.values());
            const middlewareManifestPath = _path.default.join(distDir, "server", _constants.MIDDLEWARE_MANIFEST);
            (0, _nextjsrequirecachehotreloader.deleteCache)(middlewareManifestPath);
            await (0, _writeatomic.writeFileAtomic)(middlewareManifestPath, JSON.stringify(middlewareManifest, null, 2));
        }
        async function writeActionManifest() {
            const actionManifest = await mergeActionManifests(actionManifests.values());
            const actionManifestJsonPath = _path.default.join(distDir, "server", `${_constants.SERVER_REFERENCE_MANIFEST}.json`);
            const actionManifestJsPath = _path.default.join(distDir, "server", `${_constants.SERVER_REFERENCE_MANIFEST}.js`);
            const json = JSON.stringify(actionManifest, null, 2);
            (0, _nextjsrequirecachehotreloader.deleteCache)(actionManifestJsonPath);
            (0, _nextjsrequirecachehotreloader.deleteCache)(actionManifestJsPath);
            await (0, _promises.writeFile)(actionManifestJsonPath, json, "utf-8");
            await (0, _promises.writeFile)(actionManifestJsPath, `self.__RSC_SERVER_MANIFEST=${JSON.stringify(json)}`, "utf-8");
        }
        async function writeFontManifest() {
            // TODO: turbopack should write the correct
            // version of this
            const fontManifest = {
                pages: {},
                app: {},
                appUsingSizeAdjust: false,
                pagesUsingSizeAdjust: false
            };
            const json = JSON.stringify(fontManifest, null, 2);
            const fontManifestJsonPath = _path.default.join(distDir, "server", `${_constants.NEXT_FONT_MANIFEST}.json`);
            const fontManifestJsPath = _path.default.join(distDir, "server", `${_constants.NEXT_FONT_MANIFEST}.js`);
            (0, _nextjsrequirecachehotreloader.deleteCache)(fontManifestJsonPath);
            (0, _nextjsrequirecachehotreloader.deleteCache)(fontManifestJsPath);
            await (0, _writeatomic.writeFileAtomic)(fontManifestJsonPath, json);
            await (0, _writeatomic.writeFileAtomic)(fontManifestJsPath, `self.__NEXT_FONT_MANIFEST=${JSON.stringify(json)}`);
        }
        async function writeLoadableManifest() {
            const loadableManifest = mergeLoadableManifests(loadbleManifests.values());
            const loadableManifestPath = _path.default.join(distDir, _constants.REACT_LOADABLE_MANIFEST);
            const middlewareloadableManifestPath = _path.default.join(distDir, "server", `${_constants.MIDDLEWARE_REACT_LOADABLE_MANIFEST}.js`);
            const json = JSON.stringify(loadableManifest, null, 2);
            (0, _nextjsrequirecachehotreloader.deleteCache)(loadableManifestPath);
            (0, _nextjsrequirecachehotreloader.deleteCache)(middlewareloadableManifestPath);
            await (0, _writeatomic.writeFileAtomic)(loadableManifestPath, json);
            await (0, _writeatomic.writeFileAtomic)(middlewareloadableManifestPath, `self.__REACT_LOADABLE_MANIFEST=${JSON.stringify(json)}`);
        }
        async function subscribeToHmrEvents(id, client) {
            let mapping = clientToHmrSubscription.get(client);
            if (mapping === undefined) {
                mapping = new Map();
                clientToHmrSubscription.set(client, mapping);
            }
            if (mapping.has(id)) return;
            const subscription = project.hmrEvents(id);
            mapping.set(id, subscription);
            // The subscription will always emit once, which is the initial
            // computation. This is not a change, so swallow it.
            try {
                await subscription.next();
                for await (const data of subscription){
                    processIssues(id, data);
                    sendTurbopackMessage(data);
                }
            } catch (e) {
                // The client might be using an HMR session from a previous server, tell them
                // to fully reload the page to resolve the issue. We can't use
                // `hotReloader.send` since that would force very connected client to
                // reload, only this client is out of date.
                const reloadAction = {
                    action: _hotreloadertypes.HMR_ACTIONS_SENT_TO_BROWSER.RELOAD_PAGE
                };
                client.send(JSON.stringify(reloadAction));
                client.close();
                return;
            }
        }
        function unsubscribeToHmrEvents(id, client) {
            const mapping = clientToHmrSubscription.get(client);
            const subscription = mapping == null ? void 0 : mapping.get(id);
            subscription == null ? void 0 : subscription.return();
        }
        try {
            async function handleEntries() {
                for await (const entrypoints of iter){
                    if (!currentEntriesHandlingResolve) {
                        currentEntriesHandling = new Promise(// eslint-disable-next-line no-loop-func
                        (resolve)=>currentEntriesHandlingResolve = resolve);
                    }
                    globalEntries.app = entrypoints.pagesAppEndpoint;
                    globalEntries.document = entrypoints.pagesDocumentEndpoint;
                    globalEntries.error = entrypoints.pagesErrorEndpoint;
                    curEntries.clear();
                    for (const [pathname, route] of entrypoints.routes){
                        switch(route.type){
                            case "page":
                            case "page-api":
                            case "app-page":
                            case "app-route":
                                {
                                    curEntries.set(pathname, route);
                                    break;
                                }
                            default:
                                _log.info(`skipping ${pathname} (${route.type})`);
                                break;
                        }
                    }
                    for (const [pathname, subscriptionPromise] of changeSubscriptions){
                        if (pathname === "") {
                            continue;
                        }
                        if (!curEntries.has(pathname)) {
                            const subscription = await subscriptionPromise;
                            subscription.return == null ? void 0 : subscription.return.call(subscription);
                            changeSubscriptions.delete(pathname);
                        }
                    }
                    const { middleware, instrumentation } = entrypoints;
                    // We check for explicit true/false, since it's initialized to
                    // undefined during the first loop (middlewareChanges event is
                    // unnecessary during the first serve)
                    if (prevMiddleware === true && !middleware) {
                        // Went from middleware to no middleware
                        await clearChangeSubscription("middleware", "server");
                        sendHmr("entrypoint-change", "middleware", {
                            event: _hotreloadertypes.HMR_ACTIONS_SENT_TO_BROWSER.MIDDLEWARE_CHANGES
                        });
                    } else if (prevMiddleware === false && middleware) {
                        // Went from no middleware to middleware
                        sendHmr("endpoint-change", "middleware", {
                            event: _hotreloadertypes.HMR_ACTIONS_SENT_TO_BROWSER.MIDDLEWARE_CHANGES
                        });
                    }
                    if (opts.nextConfig.experimental.instrumentationHook && instrumentation) {
                        const processInstrumentation = async (displayName, name, prop)=>{
                            const writtenEndpoint = await processResult(displayName, await instrumentation[prop].writeToDisk());
                            processIssues(name, writtenEndpoint);
                        };
                        await processInstrumentation("instrumentation (node.js)", "instrumentation.nodeJs", "nodeJs");
                        await processInstrumentation("instrumentation (edge)", "instrumentation.edge", "edge");
                        await loadMiddlewareManifest("instrumentation", "instrumentation");
                        _buildcontext.NextBuildContext.hasInstrumentationHook = true;
                        serverFields.actualInstrumentationHookFile = "/instrumentation";
                        await propagateServerField("actualInstrumentationHookFile", serverFields.actualInstrumentationHookFile);
                    } else {
                        _buildcontext.NextBuildContext.hasInstrumentationHook = false;
                        serverFields.actualInstrumentationHookFile = undefined;
                        await propagateServerField("actualInstrumentationHookFile", serverFields.actualInstrumentationHookFile);
                    }
                    if (middleware) {
                        const processMiddleware = async ()=>{
                            var _middlewareManifests_get;
                            const writtenEndpoint = await processResult("middleware", await middleware.endpoint.writeToDisk());
                            processIssues("middleware", writtenEndpoint);
                            await loadMiddlewareManifest("middleware", "middleware");
                            serverFields.middleware = {
                                match: null,
                                page: "/",
                                matchers: (_middlewareManifests_get = middlewareManifests.get("middleware")) == null ? void 0 : _middlewareManifests_get.middleware["/"].matchers
                            };
                        };
                        await processMiddleware();
                        changeSubscription("middleware", "server", false, middleware.endpoint, async ()=>{
                            const finishBuilding = startBuilding("middleware", undefined, true);
                            await processMiddleware();
                            await propagateServerField("actualMiddlewareFile", serverFields.actualMiddlewareFile);
                            await propagateServerField("middleware", serverFields.middleware);
                            await writeMiddlewareManifest();
                            finishBuilding();
                            return {
                                event: _hotreloadertypes.HMR_ACTIONS_SENT_TO_BROWSER.MIDDLEWARE_CHANGES
                            };
                        });
                        prevMiddleware = true;
                    } else {
                        middlewareManifests.delete("middleware");
                        serverFields.actualMiddlewareFile = undefined;
                        serverFields.middleware = undefined;
                        prevMiddleware = false;
                    }
                    await propagateServerField("actualMiddlewareFile", serverFields.actualMiddlewareFile);
                    await propagateServerField("middleware", serverFields.middleware);
                    currentEntriesHandlingResolve();
                    currentEntriesHandlingResolve = undefined;
                }
            }
            handleEntries().catch((err)=>{
                console.error(err);
                process.exit(1);
            });
        } catch (e) {
            console.error(e);
        }
        // Write empty manifests
        await (0, _promises.mkdir)(_path.default.join(distDir, "server"), {
            recursive: true
        });
        await (0, _promises.mkdir)(_path.default.join(distDir, "static/development"), {
            recursive: true
        });
        await (0, _promises.writeFile)(_path.default.join(distDir, "package.json"), JSON.stringify({
            type: "commonjs"
        }, null, 2));
        await currentEntriesHandling;
        await writeBuildManifest(opts.fsChecker.rewrites);
        await writeAppBuildManifest();
        await writeFallbackBuildManifest();
        await writePagesManifest();
        await writeAppPathsManifest();
        await writeMiddlewareManifest();
        await writeActionManifest();
        await writeFontManifest();
        await writeLoadableManifest();
        let hmrEventHappend = false;
        if (process.env.NEXT_HMR_TIMING) {
            (async (proj)=>{
                for await (const updateInfo of proj.updateInfoSubscribe()){
                    if (hmrEventHappend) {
                        const time = updateInfo.duration;
                        const timeMessage = time > 2000 ? `${Math.round(time / 100) / 10}s` : `${time}ms`;
                        _log.event(`Compiled in ${timeMessage}`);
                        hmrEventHappend = false;
                    }
                }
            })(project);
        }
        const overlayMiddleware = (0, _middlewareturbopack.getOverlayMiddleware)(project);
        hotReloader = {
            turbopackProject: project,
            activeWebpackConfigs: undefined,
            serverStats: null,
            edgeServerStats: null,
            async run (req, res, _parsedUrl) {
                var _req_url;
                // intercept page chunks request and ensure them with turbopack
                if ((_req_url = req.url) == null ? void 0 : _req_url.startsWith("/_next/static/chunks/pages/")) {
                    const params = (0, _hotreloaderwebpack.matchNextPageBundleRequest)(req.url);
                    if (params) {
                        const decodedPagePath = `/${params.path.map((param)=>decodeURIComponent(param)).join("/")}`;
                        const denormalizedPagePath = (0, _denormalizepagepath.denormalizePagePath)(decodedPagePath);
                        await hotReloader.ensurePage({
                            page: denormalizedPagePath,
                            clientOnly: false,
                            definition: undefined,
                            url: req.url
                        }).catch(console.error);
                    }
                }
                await overlayMiddleware(req, res);
                // Request was not finished.
                return {
                    finished: undefined
                };
            },
            // TODO: Figure out if socket type can match the NextJsHotReloaderInterface
            onHMR (req, socket, head) {
                wsServer.handleUpgrade(req, socket, head, (client)=>{
                    clients.add(client);
                    client.on("close", ()=>clients.delete(client));
                    client.addEventListener("message", ({ data })=>{
                        const parsedData = JSON.parse(typeof data !== "string" ? data.toString() : data);
                        // Next.js messages
                        switch(parsedData.event){
                            case "ping":
                                break;
                            case "span-end":
                            case "client-error":
                            case "client-warning":
                            case "client-success":
                            case "server-component-reload-page":
                            case "client-reload-page":
                            case "client-removed-page":
                            case "client-full-reload":
                            case "client-added-page":
                                break;
                            default:
                                // Might be a Turbopack message...
                                if (!parsedData.type) {
                                    throw new Error(`unrecognized HMR message "${data}"`);
                                }
                        }
                        // Turbopack messages
                        switch(parsedData.type){
                            case "turbopack-subscribe":
                                subscribeToHmrEvents(parsedData.path, client);
                                break;
                            case "turbopack-unsubscribe":
                                unsubscribeToHmrEvents(parsedData.path, client);
                                break;
                            default:
                                if (!parsedData.event) {
                                    throw new Error(`unrecognized Turbopack HMR message "${data}"`);
                                }
                        }
                    });
                    const turbopackConnected = {
                        type: _hotreloadertypes.HMR_ACTIONS_SENT_TO_BROWSER.TURBOPACK_CONNECTED
                    };
                    client.send(JSON.stringify(turbopackConnected));
                    const errors = [];
                    for (const pageIssues of issues.values()){
                        for (const issue of pageIssues.values()){
                            errors.push({
                                message: formatIssue(issue)
                            });
                        }
                    }
                    const sync = {
                        action: _hotreloadertypes.HMR_ACTIONS_SENT_TO_BROWSER.SYNC,
                        errors,
                        warnings: [],
                        hash: "",
                        versionInfo: {
                            installed: "0.0.0",
                            staleness: "unknown"
                        }
                    };
                    this.send(sync);
                });
            },
            send (action) {
                const payload = JSON.stringify(action);
                for (const client of clients){
                    client.send(payload);
                }
            },
            setHmrServerError (_error) {
            // Not implemented yet.
            },
            clearHmrServerError () {
            // Not implemented yet.
            },
            async start () {
            // Not implemented yet.
            },
            async stop () {
            // Not implemented yet.
            },
            async getCompilationErrors (page) {
                const thisPageIssues = issues.get(page);
                if (thisPageIssues !== undefined && thisPageIssues.size > 0) {
                    // If there is an error related to the requesting page we display it instead of the first error
                    return [
                        ...thisPageIssues.values()
                    ].map((issue)=>new Error(formatIssue(issue)));
                }
                // Otherwise, return all errors across pages
                const errors = [];
                for (const pageIssues of issues.values()){
                    for (const issue of pageIssues.values()){
                        errors.push(new Error(formatIssue(issue)));
                    }
                }
                return errors;
            },
            invalidate () {
            // Not implemented yet.
            },
            async buildFallbackError () {
            // Not implemented yet.
            },
            async ensurePage ({ page: inputPage, // Unused parameters
            // clientOnly,
            // appPaths,
            definition, isApp, url: requestUrl }) {
                let page = (definition == null ? void 0 : definition.pathname) ?? inputPage;
                if (page === "/_error") {
                    let finishBuilding = startBuilding(page, requestUrl);
                    try {
                        if (globalEntries.app) {
                            const writtenEndpoint = await processResult("_app", await globalEntries.app.writeToDisk());
                            processIssues("_app", writtenEndpoint);
                        }
                        await loadBuildManifest("_app");
                        await loadPagesManifest("_app");
                        if (globalEntries.document) {
                            const writtenEndpoint = await processResult("_document", await globalEntries.document.writeToDisk());
                            changeSubscription("_document", "server", false, globalEntries.document, ()=>{
                                return {
                                    action: _hotreloadertypes.HMR_ACTIONS_SENT_TO_BROWSER.RELOAD_PAGE
                                };
                            });
                            processIssues("_document", writtenEndpoint);
                        }
                        await loadPagesManifest("_document");
                        if (globalEntries.error) {
                            const writtenEndpoint = await processResult("_error", await globalEntries.error.writeToDisk());
                            processIssues(page, writtenEndpoint);
                        }
                        await loadBuildManifest("_error");
                        await loadPagesManifest("_error");
                        await writeBuildManifest(opts.fsChecker.rewrites);
                        await writeFallbackBuildManifest();
                        await writePagesManifest();
                        await writeMiddlewareManifest();
                        await writeLoadableManifest();
                    } finally{
                        finishBuilding();
                    }
                    return;
                }
                await currentEntriesHandling;
                const route = curEntries.get(page) ?? curEntries.get((0, _apppaths.normalizeAppPath)((0, _getmetadataroute.normalizeMetadataRoute)((definition == null ? void 0 : definition.page) ?? inputPage)));
                if (!route) {
                    // TODO: why is this entry missing in turbopack?
                    if (page === "/_app") return;
                    if (page === "/_document") return;
                    if (page === "/middleware") return;
                    if (page === "/src/middleware") return;
                    if (page === "/instrumentation") return;
                    if (page === "/src/instrumentation") return;
                    throw new _utils1.PageNotFoundError(`route not found ${page}`);
                }
                let finishBuilding = undefined;
                try {
                    switch(route.type){
                        case "page":
                            {
                                if (isApp) {
                                    throw new Error(`mis-matched route type: isApp && page for ${page}`);
                                }
                                finishBuilding = startBuilding(page, requestUrl);
                                try {
                                    if (globalEntries.app) {
                                        const writtenEndpoint = await processResult("_app", await globalEntries.app.writeToDisk());
                                        processIssues("_app", writtenEndpoint);
                                    }
                                    await loadBuildManifest("_app");
                                    await loadPagesManifest("_app");
                                    if (globalEntries.document) {
                                        const writtenEndpoint = await processResult("_document", await globalEntries.document.writeToDisk());
                                        changeSubscription("_document", "server", false, globalEntries.document, ()=>{
                                            return {
                                                action: _hotreloadertypes.HMR_ACTIONS_SENT_TO_BROWSER.RELOAD_PAGE
                                            };
                                        });
                                        processIssues("_document", writtenEndpoint);
                                    }
                                    await loadPagesManifest("_document");
                                    const writtenEndpoint = await processResult(page, await route.htmlEndpoint.writeToDisk());
                                    const type = writtenEndpoint == null ? void 0 : writtenEndpoint.type;
                                    await loadBuildManifest(page);
                                    await loadPagesManifest(page);
                                    if (type === "edge") {
                                        await loadMiddlewareManifest(page, "pages");
                                    } else {
                                        middlewareManifests.delete(page);
                                    }
                                    await loadLoadableManifest(page, "pages");
                                    await writeBuildManifest(opts.fsChecker.rewrites);
                                    await writeFallbackBuildManifest();
                                    await writePagesManifest();
                                    await writeMiddlewareManifest();
                                    await writeLoadableManifest();
                                    processIssues(page, writtenEndpoint);
                                } finally{
                                    changeSubscription(page, "server", false, route.dataEndpoint, (pageName)=>{
                                        return {
                                            event: _hotreloadertypes.HMR_ACTIONS_SENT_TO_BROWSER.SERVER_ONLY_CHANGES,
                                            pages: [
                                                pageName
                                            ]
                                        };
                                    });
                                    changeSubscription(page, "client", false, route.htmlEndpoint, ()=>{
                                        return {
                                            event: _hotreloadertypes.HMR_ACTIONS_SENT_TO_BROWSER.CLIENT_CHANGES
                                        };
                                    });
                                }
                                break;
                            }
                        case "page-api":
                            {
                                // We don't throw on ensureOpts.isApp === true here
                                // since this can happen when app pages make
                                // api requests to page API routes.
                                finishBuilding = startBuilding(page, requestUrl);
                                const writtenEndpoint = await processResult(page, await route.endpoint.writeToDisk());
                                const type = writtenEndpoint == null ? void 0 : writtenEndpoint.type;
                                await loadPagesManifest(page);
                                if (type === "edge") {
                                    await loadMiddlewareManifest(page, "pages");
                                } else {
                                    middlewareManifests.delete(page);
                                }
                                await loadLoadableManifest(page, "pages");
                                await writePagesManifest();
                                await writeMiddlewareManifest();
                                await writeLoadableManifest();
                                processIssues(page, writtenEndpoint);
                                break;
                            }
                        case "app-page":
                            {
                                finishBuilding = startBuilding(page, requestUrl);
                                const writtenEndpoint = await processResult(page, await route.htmlEndpoint.writeToDisk());
                                changeSubscription(page, "server", true, route.rscEndpoint, (_page, change)=>{
                                    if (change.issues.some((issue)=>issue.severity === "error")) {
                                        // Ignore any updates that has errors
                                        // There will be another update without errors eventually
                                        return;
                                    }
                                    return {
                                        action: _hotreloadertypes.HMR_ACTIONS_SENT_TO_BROWSER.SERVER_COMPONENT_CHANGES
                                    };
                                });
                                const type = writtenEndpoint == null ? void 0 : writtenEndpoint.type;
                                if (type === "edge") {
                                    await loadMiddlewareManifest(page, "app");
                                } else {
                                    middlewareManifests.delete(page);
                                }
                                await loadAppBuildManifest(page);
                                await loadBuildManifest(page, "app");
                                await loadAppPathManifest(page, "app");
                                await loadActionManifest(page);
                                await writeAppBuildManifest();
                                await writeBuildManifest(opts.fsChecker.rewrites);
                                await writeAppPathsManifest();
                                await writeMiddlewareManifest();
                                await writeActionManifest();
                                await writeLoadableManifest();
                                processIssues(page, writtenEndpoint, true);
                                break;
                            }
                        case "app-route":
                            {
                                finishBuilding = startBuilding(page, requestUrl);
                                const writtenEndpoint = await processResult(page, await route.endpoint.writeToDisk());
                                const type = writtenEndpoint == null ? void 0 : writtenEndpoint.type;
                                await loadAppPathManifest(page, "app-route");
                                if (type === "edge") {
                                    await loadMiddlewareManifest(page, "app-route");
                                } else {
                                    middlewareManifests.delete(page);
                                }
                                await writeAppBuildManifest();
                                await writeAppPathsManifest();
                                await writeMiddlewareManifest();
                                await writeMiddlewareManifest();
                                await writeLoadableManifest();
                                processIssues(page, writtenEndpoint, true);
                                break;
                            }
                        default:
                            {
                                throw new Error(`unknown route type ${route.type} for ${page}`);
                            }
                    }
                } finally{
                    if (finishBuilding) finishBuilding();
                }
            }
        };
    } else {
        hotReloader = new _hotreloaderwebpack.default(opts.dir, {
            appDir,
            pagesDir,
            distDir: distDir,
            config: opts.nextConfig,
            buildId: "development",
            telemetry: opts.telemetry,
            rewrites: opts.fsChecker.rewrites,
            previewProps: opts.fsChecker.prerenderManifest.preview
        });
    }
    await hotReloader.start();
    if (opts.nextConfig.experimental.nextScriptWorkers) {
        await (0, _verifypartytownsetup.verifyPartytownSetup)(opts.dir, _path.default.join(distDir, _constants.CLIENT_STATIC_FILES_PATH));
    }
    opts.fsChecker.ensureCallback(async function ensure(item) {
        if (item.type === "appFile" || item.type === "pageFile") {
            await hotReloader.ensurePage({
                clientOnly: false,
                page: item.itemPath,
                isApp: item.type === "appFile",
                definition: undefined
            });
        }
    });
    let resolved = false;
    let prevSortedRoutes = [];
    await new Promise(async (resolve, reject)=>{
        if (pagesDir) {
            // Watchpack doesn't emit an event for an empty directory
            _fs.default.readdir(pagesDir, (_, files)=>{
                if (files == null ? void 0 : files.length) {
                    return;
                }
                if (!resolved) {
                    resolve();
                    resolved = true;
                }
            });
        }
        const pages = pagesDir ? [
            pagesDir
        ] : [];
        const app = appDir ? [
            appDir
        ] : [];
        const directories = [
            ...pages,
            ...app
        ];
        const rootDir = pagesDir || appDir;
        const files = [
            ...(0, _worker.getPossibleMiddlewareFilenames)(_path.default.join(rootDir, ".."), nextConfig.pageExtensions),
            ...(0, _worker.getPossibleInstrumentationHookFilenames)(_path.default.join(rootDir, ".."), nextConfig.pageExtensions)
        ];
        let nestedMiddleware = [];
        const envFiles = [
            ".env.development.local",
            ".env.local",
            ".env.development",
            ".env"
        ].map((file)=>_path.default.join(dir, file));
        files.push(...envFiles);
        // tsconfig/jsconfig paths hot-reloading
        const tsconfigPaths = [
            _path.default.join(dir, "tsconfig.json"),
            _path.default.join(dir, "jsconfig.json")
        ];
        files.push(...tsconfigPaths);
        const wp = new _watchpack.default({
            ignored: (pathname)=>{
                return !files.some((file)=>file.startsWith(pathname)) && !directories.some((d)=>pathname.startsWith(d) || d.startsWith(pathname));
            }
        });
        const fileWatchTimes = new Map();
        let enabledTypeScript = usingTypeScript;
        let previousClientRouterFilters;
        let previousConflictingPagePaths = new Set();
        wp.on("aggregated", async ()=>{
            var _serverFields_middleware, _serverFields_middleware1, _generateInterceptionRoutesRewrites;
            let middlewareMatchers;
            const routedPages = [];
            const knownFiles = wp.getTimeInfoEntries();
            const appPaths = {};
            const pageNameSet = new Set();
            const conflictingAppPagePaths = new Set();
            const appPageFilePaths = new Map();
            const pagesPageFilePaths = new Map();
            let envChange = false;
            let tsconfigChange = false;
            let conflictingPageChange = 0;
            let hasRootAppNotFound = false;
            const { appFiles, pageFiles } = opts.fsChecker;
            appFiles.clear();
            pageFiles.clear();
            _shared1.devPageFiles.clear();
            const sortedKnownFiles = [
                ...knownFiles.keys()
            ].sort((0, _entries.sortByPageExts)(nextConfig.pageExtensions));
            for (const fileName of sortedKnownFiles){
                if (!files.includes(fileName) && !directories.some((d)=>fileName.startsWith(d))) {
                    continue;
                }
                const meta = knownFiles.get(fileName);
                const watchTime = fileWatchTimes.get(fileName);
                // If the file is showing up for the first time or the meta.timestamp is changed since last time
                const watchTimeChange = watchTime === undefined || watchTime && watchTime !== (meta == null ? void 0 : meta.timestamp);
                fileWatchTimes.set(fileName, meta.timestamp);
                if (envFiles.includes(fileName)) {
                    if (watchTimeChange) {
                        envChange = true;
                    }
                    continue;
                }
                if (tsconfigPaths.includes(fileName)) {
                    if (fileName.endsWith("tsconfig.json")) {
                        enabledTypeScript = true;
                    }
                    if (watchTimeChange) {
                        tsconfigChange = true;
                    }
                    continue;
                }
                if ((meta == null ? void 0 : meta.accuracy) === undefined || !validFileMatcher.isPageFile(fileName)) {
                    continue;
                }
                const isAppPath = Boolean(appDir && (0, _normalizepathsep.normalizePathSep)(fileName).startsWith((0, _normalizepathsep.normalizePathSep)(appDir) + "/"));
                const isPagePath = Boolean(pagesDir && (0, _normalizepathsep.normalizePathSep)(fileName).startsWith((0, _normalizepathsep.normalizePathSep)(pagesDir) + "/"));
                const rootFile = (0, _absolutepathtopage.absolutePathToPage)(fileName, {
                    dir: dir,
                    extensions: nextConfig.pageExtensions,
                    keepIndex: false,
                    pagesType: "root"
                });
                if ((0, _worker.isMiddlewareFile)(rootFile)) {
                    var _staticInfo_middleware;
                    const staticInfo = await (0, _entries.getStaticInfoIncludingLayouts)({
                        pageFilePath: fileName,
                        config: nextConfig,
                        appDir: appDir,
                        page: rootFile,
                        isDev: true,
                        isInsideAppDir: isAppPath,
                        pageExtensions: nextConfig.pageExtensions
                    });
                    if (nextConfig.output === "export") {
                        _log.error('Middleware cannot be used with "output: export". See more info here: https://nextjs.org/docs/advanced-features/static-html-export');
                        continue;
                    }
                    serverFields.actualMiddlewareFile = rootFile;
                    await propagateServerField("actualMiddlewareFile", serverFields.actualMiddlewareFile);
                    middlewareMatchers = ((_staticInfo_middleware = staticInfo.middleware) == null ? void 0 : _staticInfo_middleware.matchers) || [
                        {
                            regexp: ".*",
                            originalSource: "/:path*"
                        }
                    ];
                    continue;
                }
                if ((0, _worker.isInstrumentationHookFile)(rootFile) && nextConfig.experimental.instrumentationHook) {
                    _buildcontext.NextBuildContext.hasInstrumentationHook = true;
                    serverFields.actualInstrumentationHookFile = rootFile;
                    await propagateServerField("actualInstrumentationHookFile", serverFields.actualInstrumentationHookFile);
                    continue;
                }
                if (fileName.endsWith(".ts") || fileName.endsWith(".tsx")) {
                    enabledTypeScript = true;
                }
                if (!(isAppPath || isPagePath)) {
                    continue;
                }
                // Collect all current filenames for the TS plugin to use
                _shared1.devPageFiles.add(fileName);
                let pageName = (0, _absolutepathtopage.absolutePathToPage)(fileName, {
                    dir: isAppPath ? appDir : pagesDir,
                    extensions: nextConfig.pageExtensions,
                    keepIndex: isAppPath,
                    pagesType: isAppPath ? "app" : "pages"
                });
                if (!isAppPath && pageName.startsWith("/api/") && nextConfig.output === "export") {
                    _log.error('API Routes cannot be used with "output: export". See more info here: https://nextjs.org/docs/advanced-features/static-html-export');
                    continue;
                }
                if (isAppPath) {
                    const isRootNotFound = validFileMatcher.isRootNotFound(fileName);
                    hasRootAppNotFound = true;
                    if (isRootNotFound) {
                        continue;
                    }
                    if (!isRootNotFound && !validFileMatcher.isAppRouterPage(fileName)) {
                        continue;
                    }
                    // Ignore files/directories starting with `_` in the app directory
                    if ((0, _normalizepathsep.normalizePathSep)(pageName).includes("/_")) {
                        continue;
                    }
                    const originalPageName = pageName;
                    pageName = (0, _apppaths.normalizeAppPath)(pageName).replace(/%5F/g, "_");
                    if (!appPaths[pageName]) {
                        appPaths[pageName] = [];
                    }
                    appPaths[pageName].push(originalPageName);
                    if (useFileSystemPublicRoutes) {
                        appFiles.add(pageName);
                    }
                    if (routedPages.includes(pageName)) {
                        continue;
                    }
                } else {
                    if (useFileSystemPublicRoutes) {
                        pageFiles.add(pageName);
                        // always add to nextDataRoutes for now but in future only add
                        // entries that actually use getStaticProps/getServerSideProps
                        opts.fsChecker.nextDataRoutes.add(pageName);
                    }
                }
                (isAppPath ? appPageFilePaths : pagesPageFilePaths).set(pageName, fileName);
                if (appDir && pageNameSet.has(pageName)) {
                    conflictingAppPagePaths.add(pageName);
                } else {
                    pageNameSet.add(pageName);
                }
                /**
         * If there is a middleware that is not declared in the root we will
         * warn without adding it so it doesn't make its way into the system.
         */ if (/[\\\\/]_middleware$/.test(pageName)) {
                    nestedMiddleware.push(pageName);
                    continue;
                }
                routedPages.push(pageName);
            }
            const numConflicting = conflictingAppPagePaths.size;
            conflictingPageChange = numConflicting - previousConflictingPagePaths.size;
            if (conflictingPageChange !== 0) {
                if (numConflicting > 0) {
                    let errorMessage = `Conflicting app and page file${numConflicting === 1 ? " was" : "s were"} found, please remove the conflicting files to continue:\n`;
                    for (const p of conflictingAppPagePaths){
                        const appPath = _path.default.relative(dir, appPageFilePaths.get(p));
                        const pagesPath = _path.default.relative(dir, pagesPageFilePaths.get(p));
                        errorMessage += `  "${pagesPath}" - "${appPath}"\n`;
                    }
                    hotReloader.setHmrServerError(new Error(errorMessage));
                } else if (numConflicting === 0) {
                    hotReloader.clearHmrServerError();
                    await propagateServerField("reloadMatchers", undefined);
                }
            }
            previousConflictingPagePaths = conflictingAppPagePaths;
            let clientRouterFilters;
            if (nextConfig.experimental.clientRouterFilter) {
                clientRouterFilters = (0, _createclientrouterfilter.createClientRouterFilter)(Object.keys(appPaths), nextConfig.experimental.clientRouterFilterRedirects ? (nextConfig._originalRedirects || []).filter((r)=>!r.internal) : [], nextConfig.experimental.clientRouterFilterAllowedRate);
                if (!previousClientRouterFilters || JSON.stringify(previousClientRouterFilters) !== JSON.stringify(clientRouterFilters)) {
                    envChange = true;
                    previousClientRouterFilters = clientRouterFilters;
                }
            }
            if (!usingTypeScript && enabledTypeScript) {
                // we tolerate the error here as this is best effort
                // and the manual install command will be shown
                await verifyTypeScript(opts).then(()=>{
                    tsconfigChange = true;
                }).catch(()=>{});
            }
            if (envChange || tsconfigChange) {
                var _hotReloader_activeWebpackConfigs;
                if (envChange) {
                    // only log changes in router server
                    (0, _env.loadEnvConfig)(dir, true, _log, true, (envFilePath)=>{
                        _log.info(`Reload env: ${envFilePath}`);
                    });
                    await propagateServerField("loadEnvConfig", [
                        {
                            dev: true,
                            forceReload: true,
                            silent: true
                        }
                    ]);
                }
                let tsconfigResult;
                if (tsconfigChange) {
                    try {
                        tsconfigResult = await (0, _loadjsconfig.default)(dir, nextConfig);
                    } catch (_) {
                    /* do we want to log if there are syntax errors in tsconfig  while editing? */ }
                }
                if (hotReloader.turbopackProject) {
                    const hasRewrites = opts.fsChecker.rewrites.afterFiles.length > 0 || opts.fsChecker.rewrites.beforeFiles.length > 0 || opts.fsChecker.rewrites.fallback.length > 0;
                    await hotReloader.turbopackProject.update({
                        defineEnv: (0, _swc.createDefineEnv)({
                            isTurbopack: true,
                            allowedRevalidateHeaderKeys: undefined,
                            clientRouterFilters,
                            config: nextConfig,
                            dev: true,
                            distDir,
                            fetchCacheKeyPrefix: undefined,
                            hasRewrites,
                            middlewareMatchers: undefined,
                            previewModeId: undefined
                        })
                    });
                }
                (_hotReloader_activeWebpackConfigs = hotReloader.activeWebpackConfigs) == null ? void 0 : _hotReloader_activeWebpackConfigs.forEach((config, idx)=>{
                    const isClient = idx === 0;
                    const isNodeServer = idx === 1;
                    const isEdgeServer = idx === 2;
                    const hasRewrites = opts.fsChecker.rewrites.afterFiles.length > 0 || opts.fsChecker.rewrites.beforeFiles.length > 0 || opts.fsChecker.rewrites.fallback.length > 0;
                    if (tsconfigChange) {
                        var _config_resolve_plugins, _config_resolve;
                        (_config_resolve = config.resolve) == null ? void 0 : (_config_resolve_plugins = _config_resolve.plugins) == null ? void 0 : _config_resolve_plugins.forEach((plugin)=>{
                            // look for the JsConfigPathsPlugin and update with
                            // the latest paths/baseUrl config
                            if (plugin && plugin.jsConfigPlugin && tsconfigResult) {
                                var _config_resolve_modules, _config_resolve, _jsConfig_compilerOptions;
                                const { resolvedBaseUrl, jsConfig } = tsconfigResult;
                                const currentResolvedBaseUrl = plugin.resolvedBaseUrl;
                                const resolvedUrlIndex = (_config_resolve = config.resolve) == null ? void 0 : (_config_resolve_modules = _config_resolve.modules) == null ? void 0 : _config_resolve_modules.findIndex((item)=>item === currentResolvedBaseUrl);
                                if (resolvedBaseUrl) {
                                    if (resolvedBaseUrl.baseUrl !== currentResolvedBaseUrl.baseUrl) {
                                        // remove old baseUrl and add new one
                                        if (resolvedUrlIndex && resolvedUrlIndex > -1) {
                                            var _config_resolve_modules1, _config_resolve1;
                                            (_config_resolve1 = config.resolve) == null ? void 0 : (_config_resolve_modules1 = _config_resolve1.modules) == null ? void 0 : _config_resolve_modules1.splice(resolvedUrlIndex, 1);
                                        }
                                        // If the resolvedBaseUrl is implicit we only remove the previous value.
                                        // Only add the baseUrl if it's explicitly set in tsconfig/jsconfig
                                        if (!resolvedBaseUrl.isImplicit) {
                                            var _config_resolve_modules2, _config_resolve2;
                                            (_config_resolve2 = config.resolve) == null ? void 0 : (_config_resolve_modules2 = _config_resolve2.modules) == null ? void 0 : _config_resolve_modules2.push(resolvedBaseUrl.baseUrl);
                                        }
                                    }
                                }
                                if ((jsConfig == null ? void 0 : (_jsConfig_compilerOptions = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions.paths) && resolvedBaseUrl) {
                                    Object.keys(plugin.paths).forEach((key)=>{
                                        delete plugin.paths[key];
                                    });
                                    Object.assign(plugin.paths, jsConfig.compilerOptions.paths);
                                    plugin.resolvedBaseUrl = resolvedBaseUrl;
                                }
                            }
                        });
                    }
                    if (envChange) {
                        var _config_plugins;
                        (_config_plugins = config.plugins) == null ? void 0 : _config_plugins.forEach((plugin)=>{
                            // we look for the DefinePlugin definitions so we can
                            // update them on the active compilers
                            if (plugin && typeof plugin.definitions === "object" && plugin.definitions.__NEXT_DEFINE_ENV) {
                                const newDefine = (0, _defineenvplugin.getDefineEnv)({
                                    isTurbopack: false,
                                    allowedRevalidateHeaderKeys: undefined,
                                    clientRouterFilters,
                                    config: nextConfig,
                                    dev: true,
                                    distDir,
                                    fetchCacheKeyPrefix: undefined,
                                    hasRewrites,
                                    isClient,
                                    isEdgeServer,
                                    isNodeOrEdgeCompilation: isNodeServer || isEdgeServer,
                                    isNodeServer,
                                    middlewareMatchers: undefined,
                                    previewModeId: undefined
                                });
                                Object.keys(plugin.definitions).forEach((key)=>{
                                    if (!(key in newDefine)) {
                                        delete plugin.definitions[key];
                                    }
                                });
                                Object.assign(plugin.definitions, newDefine);
                            }
                        });
                    }
                });
                hotReloader.invalidate({
                    reloadAfterInvalidation: envChange
                });
            }
            if (nestedMiddleware.length > 0) {
                _log.error(new _worker.NestedMiddlewareError(nestedMiddleware, dir, pagesDir || appDir).message);
                nestedMiddleware = [];
            }
            // Make sure to sort parallel routes to make the result deterministic.
            serverFields.appPathRoutes = Object.fromEntries(Object.entries(appPaths).map(([k, v])=>[
                    k,
                    v.sort()
                ]));
            await propagateServerField("appPathRoutes", serverFields.appPathRoutes);
            // TODO: pass this to fsChecker/next-dev-server?
            serverFields.middleware = middlewareMatchers ? {
                match: null,
                page: "/",
                matchers: middlewareMatchers
            } : undefined;
            await propagateServerField("middleware", serverFields.middleware);
            serverFields.hasAppNotFound = hasRootAppNotFound;
            opts.fsChecker.middlewareMatcher = ((_serverFields_middleware = serverFields.middleware) == null ? void 0 : _serverFields_middleware.matchers) ? (0, _middlewareroutematcher.getMiddlewareRouteMatcher)((_serverFields_middleware1 = serverFields.middleware) == null ? void 0 : _serverFields_middleware1.matchers) : undefined;
            opts.fsChecker.interceptionRoutes = ((_generateInterceptionRoutesRewrites = (0, _generateinterceptionroutesrewrites.generateInterceptionRoutesRewrites)(Object.keys(appPaths))) == null ? void 0 : _generateInterceptionRoutesRewrites.map((item)=>(0, _filesystem.buildCustomRoute)("before_files_rewrite", item, opts.nextConfig.basePath, opts.nextConfig.experimental.caseSensitiveRoutes))) || [];
            const exportPathMap = typeof nextConfig.exportPathMap === "function" && await (nextConfig.exportPathMap == null ? void 0 : nextConfig.exportPathMap.call(nextConfig, {}, {
                dev: true,
                dir: opts.dir,
                outDir: null,
                distDir: distDir,
                buildId: "development"
            })) || {};
            for (const [key, value] of Object.entries(exportPathMap || {})){
                opts.fsChecker.interceptionRoutes.push((0, _filesystem.buildCustomRoute)("before_files_rewrite", {
                    source: key,
                    destination: `${value.page}${value.query ? "?" : ""}${_querystring.default.stringify(value.query)}`
                }, opts.nextConfig.basePath, opts.nextConfig.experimental.caseSensitiveRoutes));
            }
            try {
                // we serve a separate manifest with all pages for the client in
                // dev mode so that we can match a page after a rewrite on the client
                // before it has been built and is populated in the _buildManifest
                const sortedRoutes = (0, _utils.getSortedRoutes)(routedPages);
                opts.fsChecker.dynamicRoutes = sortedRoutes.map((page)=>{
                    const regex = (0, _routeregex.getRouteRegex)(page);
                    return {
                        regex: regex.re.toString(),
                        match: (0, _routematcher.getRouteMatcher)(regex),
                        page
                    };
                });
                const dataRoutes = [];
                for (const page of sortedRoutes){
                    const route = (0, _builddataroute.buildDataRoute)(page, "development");
                    const routeRegex = (0, _routeregex.getRouteRegex)(route.page);
                    dataRoutes.push({
                        ...route,
                        regex: routeRegex.re.toString(),
                        match: (0, _routematcher.getRouteMatcher)({
                            // TODO: fix this in the manifest itself, must also be fixed in
                            // upstream builder that relies on this
                            re: opts.nextConfig.i18n ? new RegExp(route.dataRouteRegex.replace(`/development/`, `/development/(?<nextLocale>[^/]+?)/`)) : new RegExp(route.dataRouteRegex),
                            groups: routeRegex.groups
                        })
                    });
                }
                opts.fsChecker.dynamicRoutes.unshift(...dataRoutes);
                if (!(prevSortedRoutes == null ? void 0 : prevSortedRoutes.every((val, idx)=>val === sortedRoutes[idx]))) {
                    const addedRoutes = sortedRoutes.filter((route)=>!prevSortedRoutes.includes(route));
                    const removedRoutes = prevSortedRoutes.filter((route)=>!sortedRoutes.includes(route));
                    // emit the change so clients fetch the update
                    hotReloader.send({
                        action: _hotreloadertypes.HMR_ACTIONS_SENT_TO_BROWSER.DEV_PAGES_MANIFEST_UPDATE,
                        data: [
                            {
                                devPagesManifest: true
                            }
                        ]
                    });
                    addedRoutes.forEach((route)=>{
                        hotReloader.send({
                            action: _hotreloadertypes.HMR_ACTIONS_SENT_TO_BROWSER.ADDED_PAGE,
                            data: [
                                route
                            ]
                        });
                    });
                    removedRoutes.forEach((route)=>{
                        hotReloader.send({
                            action: _hotreloadertypes.HMR_ACTIONS_SENT_TO_BROWSER.REMOVED_PAGE,
                            data: [
                                route
                            ]
                        });
                    });
                }
                prevSortedRoutes = sortedRoutes;
                if (!resolved) {
                    resolve();
                    resolved = true;
                }
            } catch (e) {
                if (!resolved) {
                    reject(e);
                    resolved = true;
                } else {
                    _log.warn("Failed to reload dynamic routes:", e);
                }
            } finally{
                // Reload the matchers. The filesystem would have been written to,
                // and the matchers need to re-scan it to update the router.
                await propagateServerField("reloadMatchers", undefined);
            }
        });
        wp.watch({
            directories: [
                dir
            ],
            startTime: 0
        });
    });
    const clientPagesManifestPath = `/_next/${_constants.CLIENT_STATIC_FILES_PATH}/development/${_constants.DEV_CLIENT_PAGES_MANIFEST}`;
    opts.fsChecker.devVirtualFsItems.add(clientPagesManifestPath);
    const devMiddlewareManifestPath = `/_next/${_constants.CLIENT_STATIC_FILES_PATH}/development/${_constants.DEV_MIDDLEWARE_MANIFEST}`;
    opts.fsChecker.devVirtualFsItems.add(devMiddlewareManifestPath);
    async function requestHandler(req, res) {
        var _parsedUrl_pathname, _parsedUrl_pathname1;
        const parsedUrl = _url.default.parse(req.url || "/");
        if ((_parsedUrl_pathname = parsedUrl.pathname) == null ? void 0 : _parsedUrl_pathname.includes(clientPagesManifestPath)) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({
                pages: prevSortedRoutes.filter((route)=>!opts.fsChecker.appFiles.has(route))
            }));
            return {
                finished: true
            };
        }
        if ((_parsedUrl_pathname1 = parsedUrl.pathname) == null ? void 0 : _parsedUrl_pathname1.includes(devMiddlewareManifestPath)) {
            var _serverFields_middleware;
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify(((_serverFields_middleware = serverFields.middleware) == null ? void 0 : _serverFields_middleware.matchers) || []));
            return {
                finished: true
            };
        }
        return {
            finished: false
        };
    }
    async function logErrorWithOriginalStack(err, type) {
        let usedOriginalStack = false;
        if ((0, _iserror.default)(err) && err.stack) {
            try {
                const frames = (0, _middleware.parseStack)(err.stack);
                // Filter out internal edge related runtime stack
                const frame = frames.find(({ file })=>!(file == null ? void 0 : file.startsWith("eval")) && !(file == null ? void 0 : file.includes("web/adapter")) && !(file == null ? void 0 : file.includes("web/globals")) && !(file == null ? void 0 : file.includes("sandbox/context")) && !(file == null ? void 0 : file.includes("<anonymous>")));
                let originalFrame, isEdgeCompiler;
                const frameFile = frame == null ? void 0 : frame.file;
                if ((frame == null ? void 0 : frame.lineNumber) && frameFile) {
                    if (opts.turbo) {
                        try {
                            originalFrame = await (0, _middlewareturbopack.createOriginalStackFrame)(project, {
                                file: frameFile,
                                methodName: frame.methodName,
                                line: frame.lineNumber ?? 0,
                                column: frame.column,
                                isServer: true
                            });
                        } catch  {}
                    } else {
                        var _hotReloader_edgeServerStats, _hotReloader_serverStats, _frame_file, _frame_file1;
                        const moduleId = frameFile.replace(/^(webpack-internal:\/\/\/|file:\/\/)/, "");
                        const modulePath = frameFile.replace(/^(webpack-internal:\/\/\/|file:\/\/)(\(.*\)\/)?/, "");
                        const src = (0, _middleware.getErrorSource)(err);
                        isEdgeCompiler = src === _constants.COMPILER_NAMES.edgeServer;
                        const compilation = isEdgeCompiler ? (_hotReloader_edgeServerStats = hotReloader.edgeServerStats) == null ? void 0 : _hotReloader_edgeServerStats.compilation : (_hotReloader_serverStats = hotReloader.serverStats) == null ? void 0 : _hotReloader_serverStats.compilation;
                        const source = await (0, _middleware.getSourceById)(!!((_frame_file = frame.file) == null ? void 0 : _frame_file.startsWith(_path.default.sep)) || !!((_frame_file1 = frame.file) == null ? void 0 : _frame_file1.startsWith("file:")), moduleId, compilation);
                        try {
                            var _hotReloader_serverStats1, _hotReloader_edgeServerStats1;
                            originalFrame = await (0, _middleware.createOriginalStackFrame)({
                                line: frame.lineNumber,
                                column: frame.column,
                                source,
                                frame,
                                moduleId,
                                modulePath,
                                rootDirectory: opts.dir,
                                errorMessage: err.message,
                                serverCompilation: isEdgeCompiler ? undefined : (_hotReloader_serverStats1 = hotReloader.serverStats) == null ? void 0 : _hotReloader_serverStats1.compilation,
                                edgeCompilation: isEdgeCompiler ? (_hotReloader_edgeServerStats1 = hotReloader.edgeServerStats) == null ? void 0 : _hotReloader_edgeServerStats1.compilation : undefined
                            });
                        } catch  {}
                    }
                    if (originalFrame) {
                        const { originalCodeFrame, originalStackFrame } = originalFrame;
                        const { file, lineNumber, column, methodName } = originalStackFrame;
                        _log[type === "warning" ? "warn" : "error"](`${file} (${lineNumber}:${column}) @ ${methodName}`);
                        if (isEdgeCompiler) {
                            err = err.message;
                        }
                        if (type === "warning") {
                            _log.warn(err);
                        } else if (type === "app-dir") {
                            (0, _logappdirerror.logAppDirError)(err);
                        } else if (type) {
                            _log.error(`${type}:`, err);
                        } else {
                            _log.error(err);
                        }
                        console[type === "warning" ? "warn" : "error"](originalCodeFrame);
                        usedOriginalStack = true;
                    }
                }
            } catch (_) {
            // failed to load original stack using source maps
            // this un-actionable by users so we don't show the
            // internal error and only show the provided stack
            }
        }
        if (!usedOriginalStack) {
            if (err instanceof ModuleBuildError) {
                _log.error(err.message);
            } else if (type === "warning") {
                _log.warn(err);
            } else if (type === "app-dir") {
                (0, _logappdirerror.logAppDirError)(err);
            } else if (type) {
                _log.error(`${type}:`, err);
            } else {
                _log.error(err);
            }
        }
    }
    return {
        serverFields,
        hotReloader,
        requestHandler,
        logErrorWithOriginalStack,
        async ensureMiddleware (requestUrl) {
            if (!serverFields.actualMiddlewareFile) return;
            return hotReloader.ensurePage({
                page: serverFields.actualMiddlewareFile,
                clientOnly: false,
                definition: undefined,
                url: requestUrl
            });
        }
    };
}
async function setupDevBundler(opts) {
    const isSrcDir = _path.default.relative(opts.dir, opts.pagesDir || opts.appDir || "").startsWith("src");
    const result = await startWatcher(opts);
    opts.telemetry.record((0, _events.eventCliSession)(_path.default.join(opts.dir, opts.nextConfig.distDir), opts.nextConfig, {
        webpackVersion: 5,
        isSrcDir,
        turboFlag: !!opts.turbo,
        cliCommand: "dev",
        appDir: !!opts.appDir,
        pagesDir: !!opts.pagesDir,
        isCustomServer: !!opts.isCustomServer,
        hasNowJson: !!await (0, _findup.default)("now.json", {
            cwd: opts.dir
        })
    }));
    return result;
}
function renderStyledStringToErrorAnsi(string) {
    switch(string.type){
        case "text":
            return string.value;
        case "strong":
            return (0, _picocolors.bold)((0, _picocolors.red)(string.value));
        case "code":
            return (0, _picocolors.green)(string.value);
        case "line":
            return string.value.map(renderStyledStringToErrorAnsi).join("");
        case "stack":
            return string.value.map(renderStyledStringToErrorAnsi).join("\n");
        default:
            throw new Error("Unknown StyledString type", string);
    }
}

//# sourceMappingURL=setup-dev-bundler.js.map