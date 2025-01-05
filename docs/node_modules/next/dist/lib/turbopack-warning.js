"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateTurboNextConfig", {
    enumerable: true,
    get: function() {
        return validateTurboNextConfig;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _config = /*#__PURE__*/ _interop_require_default(require("../server/config"));
const _log = /*#__PURE__*/ _interop_require_wildcard(require("../build/output/log"));
const _constants = require("../shared/lib/constants");
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
const supportedTurbopackNextConfigOptions = [
    // Options that affect compilation
    "output",
    "crossOrigin",
    "configFileName",
    "env",
    "basePath",
    "modularizeImports",
    "compiler.emotion",
    "compiler.relay",
    "compiler.styledComponents",
    "images",
    "pageExtensions",
    "onDemandEntries",
    "rewrites",
    "redirects",
    "headers",
    "reactStrictMode",
    "swcMinify",
    "transpilePackages",
    "trailingSlash",
    "i18n.defaultLocale",
    "i18n.domains",
    "i18n.localeDetection",
    "i18n.locales",
    "sassOptions",
    "configOrigin",
    "httpAgentOptions",
    "useFileSystemPublicRoutes",
    "generateEtags",
    "assetPrefix",
    "distDir",
    "skipMiddlewareUrlNormalize",
    "skipTrailingSlashRedirect",
    "amp",
    "devIndicators",
    "analyticsId",
    // Options that are ignored as they don't affect Turbopack
    "webpack",
    "onDemandEntries",
    "experimental.cpus",
    "serverRuntimeConfig",
    "publicRuntimeConfig",
    "exportPathMap",
    // Experimental options that affect compilation
    "experimental.swcPlugins",
    "experimental.strictNextHead",
    "experimental.manualClientBasePath",
    "experimental.middlewarePrefetch",
    "experimental.optimizeCss",
    "experimental.nextScriptWorkers",
    "experimental.optimisticClientCache",
    "experimental.webVitalsAttribution",
    "experimental.externalMiddlewareRewritesResolve",
    "experimental.serverComponentsExternalPackages",
    "experimental.mdxRs",
    "experimental.turbo",
    "experimental.useDeploymentId",
    "experimental.useDeploymentIdServerActions",
    "experimental.deploymentId",
    "experimental.useLightningcss",
    "experimental.windowHistorySupport",
    "experimental.instrumentationHook",
    "experimental.externalDir",
    // Experimental options that don't affect compilation
    "experimental.ppr",
    "experimental.taint",
    "experimental.proxyTimeout",
    "experimental.caseSensitiveRoutes",
    "experimental.workerThreads",
    "experimental.isrFlushToDisk",
    "experimental.logging.level",
    "experimental.logging.fullUrl",
    "logging.fetches.fullUrl",
    "experimental.scrollRestoration",
    "experimental.forceSwcTransforms",
    "experimental.serverActions.bodySizeLimit",
    "experimental.serverActions.allowedOrigins",
    "experimental.memoryBasedWorkersCount",
    "experimental.clientRouterFilterRedirects",
    "experimental.webpackBuildWorker",
    "experimental.appDocumentPreloading",
    "experimental.incrementalCacheHandlerPath",
    "experimental.amp",
    "experimental.disableOptimizedLoading",
    "experimental.isrMemoryCacheSize",
    "experimental.largePageDataBytes",
    "experimental.gzipSize",
    "experimental.trustHostHeader",
    // Left to be implemented (priority)
    // 'experimental.ppr', // Checked in `needs-experimental-react.ts`
    // clientRouterFilter is `true` by default currently in config-shared.ts,
    // might be removed as an option altogether.
    "experimental.clientRouterFilter",
    "experimental.optimizePackageImports",
    // 'compiler.emotion',
    // 'compiler.reactRemoveProperties',
    // 'compiler.relay',
    // 'compiler.removeConsole',
    // 'compiler.styledComponents',
    // 'experimental.fetchCacheKeyPrefix',
    // Left to be implemented
    "excludeDefaultMomentLocales",
    "experimental.optimizeServerReact",
    // 'experimental.clientRouterFilterAllowedRate',
    "experimental.serverMinification",
    "experimental.serverSourceMaps"
];
// The following will need to be supported by `next build --turbo`
const prodSpecificTurboNextConfigOptions = [
    "eslint",
    "typescript",
    "staticPageGenerationTimeout",
    "outputFileTracing",
    "generateBuildId",
    "compress",
    "productionBrowserSourceMaps",
    "optimizeFonts",
    "poweredByHeader",
    "staticPageGenerationTimeout",
    "reactProductionProfiling",
    "cleanDistDir",
    "experimental.turbotrace",
    "experimental.outputFileTracingRoot",
    "experimental.outputFileTracingExcludes",
    "experimental.outputFileTracingIgnores",
    "experimental.outputFileTracingIncludes"
];
async function validateTurboNextConfig({ dir, isDev }) {
    const { getPkgManager } = require("../lib/helpers/get-pkg-manager");
    const { getBabelConfigFile } = require("../build/get-babel-config-file");
    const { defaultConfig } = require("../server/config-shared");
    const { bold, cyan, red, underline } = require("../lib/picocolors");
    const { interopDefault } = require("../lib/interop-default");
    let unsupportedParts = "";
    let babelrc = await getBabelConfigFile(dir);
    if (babelrc) babelrc = _path.default.basename(babelrc);
    let hasWebpack = false;
    let hasTurbo = !!process.env.TURBOPACK;
    let unsupportedConfig = [];
    let rawNextConfig = {};
    try {
        rawNextConfig = interopDefault(await (0, _config.default)(_constants.PHASE_DEVELOPMENT_SERVER, dir, {
            rawConfig: true
        }));
        if (typeof rawNextConfig === "function") {
            rawNextConfig = rawNextConfig(_constants.PHASE_DEVELOPMENT_SERVER, {
                defaultConfig
            });
        }
        const flattenKeys = (obj, prefix = "")=>{
            let keys = [];
            for(const key in obj){
                if (typeof (obj == null ? void 0 : obj[key]) === "undefined") {
                    continue;
                }
                const pre = prefix.length ? `${prefix}.` : "";
                if (typeof obj[key] === "object" && !Array.isArray(obj[key]) && obj[key] !== null) {
                    keys = keys.concat(flattenKeys(obj[key], pre + key));
                } else {
                    keys.push(pre + key);
                }
            }
            return keys;
        };
        const getDeepValue = (obj, keys)=>{
            if (typeof keys === "string") {
                keys = keys.split(".");
            }
            if (keys.length === 1) {
                return obj == null ? void 0 : obj[keys == null ? void 0 : keys[0]];
            }
            return getDeepValue(obj == null ? void 0 : obj[keys == null ? void 0 : keys[0]], keys.slice(1));
        };
        const customKeys = flattenKeys(rawNextConfig);
        let supportedKeys = isDev ? [
            ...supportedTurbopackNextConfigOptions,
            ...prodSpecificTurboNextConfigOptions
        ] : supportedTurbopackNextConfigOptions;
        for (const key of customKeys){
            if (key.startsWith("webpack")) {
                hasWebpack = true;
            }
            if (key.startsWith("experimental.turbo")) {
                hasTurbo = true;
            }
            let isSupported = supportedKeys.some((supportedKey)=>// Either the key matches (or is a more specific subkey) of
                // supportedKey, or the key is the path to a specific subkey.
                // | key     | supportedKey |
                // |---------|--------------|
                // | foo     | foo          |
                // | foo.bar | foo          |
                // | foo     | foo.bar      |
                key.startsWith(supportedKey) || supportedKey.startsWith(`${key}.`)) || getDeepValue(rawNextConfig, key) === getDeepValue(defaultConfig, key);
            if (!isSupported) {
                unsupportedConfig.push(key);
            }
        }
    } catch (e) {
        _log.error("Unexpected error occurred while checking config", e);
    }
    const feedbackMessage = `Learn more about Next.js and Turbopack: ${underline("https://nextjs.link/with-turbopack")}\n`;
    if (hasWebpack && !hasTurbo) {
        _log.warn(`Webpack is configured while Turbopack is not, which may cause problems.`);
        _log.warn(`See instructions if you need to configure Turbopack:\n  https://turbo.build/pack/docs/features/customizing-turbopack\n`);
    }
    if (babelrc) {
        unsupportedParts += `Babel detected (${cyan(babelrc)})\n  Babel is not yet supported. To use Turbopack at the moment,\n  you'll need to remove your usage of Babel.`;
    }
    if (unsupportedConfig.length === 1 && unsupportedConfig[0] === "experimental.optimizePackageImports") {
        _log.warn(`'experimental.optimizePackageImports' is not yet supported by Turbopack and will be ignored.`);
    } else if (unsupportedConfig.length) {
        unsupportedParts += `\n\n- Unsupported Next.js configuration option(s) (${cyan("next.config.js")})\n  To use Turbopack, remove the following configuration options:\n${unsupportedConfig.map((name)=>`    - ${red(name)}\n`).join("")}`;
    }
    if (unsupportedParts) {
        const pkgManager = getPkgManager(dir);
        _log.error(`You are using configuration and/or tools that are not yet\nsupported by Next.js with Turbopack:\n${unsupportedParts}\n
If you cannot make the changes above, but still want to try out\nNext.js with Turbopack, create the Next.js playground app\nby running the following commands:

  ${bold(cyan(`${pkgManager === "npm" ? "npx create-next-app" : `${pkgManager} create next-app`} --example with-turbopack with-turbopack-app`))}\n  cd with-turbopack-app\n  ${pkgManager} run dev
        `);
        _log.warn(feedbackMessage);
        process.exit(1);
    }
    return rawNextConfig;
}

//# sourceMappingURL=turbopack-warning.js.map