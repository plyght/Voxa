"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    createWebpackAliases: null,
    createServerOnlyClientOnlyAliases: null,
    createRSCAliases: null,
    getOptimizedModuleAliases: null,
    createServerComponentsNoopAliases: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createWebpackAliases: function() {
        return createWebpackAliases;
    },
    createServerOnlyClientOnlyAliases: function() {
        return createServerOnlyClientOnlyAliases;
    },
    createRSCAliases: function() {
        return createRSCAliases;
    },
    getOptimizedModuleAliases: function() {
        return getOptimizedModuleAliases;
    },
    createServerComponentsNoopAliases: function() {
        return createServerComponentsNoopAliases;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _constants = require("../lib/constants");
const _requirehook = require("../server/require-hook");
const _webpackconfig = require("./webpack-config");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function createWebpackAliases({ distDir, isClient, isEdgeServer, isNodeServer, dev, config, pagesDir, appDir, dir, reactProductionProfiling, hasRewrites }) {
    const pageExtensions = config.pageExtensions;
    const clientResolveRewrites = require.resolve("../shared/lib/router/utils/resolve-rewrites");
    const customAppAliases = {};
    const customDocumentAliases = {};
    // tell webpack where to look for _app and _document
    // using aliases to allow falling back to the default
    // version when removed or not present
    if (dev) {
        const nextDistPath = "next/dist/" + (isEdgeServer ? "esm/" : "");
        customAppAliases[`${_constants.PAGES_DIR_ALIAS}/_app`] = [
            ...pagesDir ? pageExtensions.reduce((prev, ext)=>{
                prev.push(_path.default.join(pagesDir, `_app.${ext}`));
                return prev;
            }, []) : [],
            `${nextDistPath}pages/_app.js`
        ];
        customAppAliases[`${_constants.PAGES_DIR_ALIAS}/_error`] = [
            ...pagesDir ? pageExtensions.reduce((prev, ext)=>{
                prev.push(_path.default.join(pagesDir, `_error.${ext}`));
                return prev;
            }, []) : [],
            `${nextDistPath}pages/_error.js`
        ];
        customDocumentAliases[`${_constants.PAGES_DIR_ALIAS}/_document`] = [
            ...pagesDir ? pageExtensions.reduce((prev, ext)=>{
                prev.push(_path.default.join(pagesDir, `_document.${ext}`));
                return prev;
            }, []) : [],
            `${nextDistPath}pages/_document.js`
        ];
    }
    return {
        "@vercel/og": "next/dist/server/og/image-response",
        // Alias next/dist imports to next/dist/esm assets,
        // let this alias hit before `next` alias.
        ...isEdgeServer ? {
            "next/dist/build": "next/dist/esm/build",
            "next/dist/client": "next/dist/esm/client",
            "next/dist/shared": "next/dist/esm/shared",
            "next/dist/pages": "next/dist/esm/pages",
            "next/dist/lib": "next/dist/esm/lib",
            "next/dist/server": "next/dist/esm/server",
            // Alias the usage of next public APIs
            [_path.default.join(_webpackconfig.NEXT_PROJECT_ROOT, "server")]: "next/dist/esm/server/web/exports/index",
            [_path.default.join(_webpackconfig.NEXT_PROJECT_ROOT, "og")]: "next/dist/esm/server/og/image-response",
            [_path.default.join(_webpackconfig.NEXT_PROJECT_ROOT_DIST, "client", "link")]: "next/dist/esm/client/link",
            [_path.default.join(_webpackconfig.NEXT_PROJECT_ROOT, "dist", "shared", "lib", "image-external")]: "next/dist/esm/shared/lib/image-external",
            [_path.default.join(_webpackconfig.NEXT_PROJECT_ROOT_DIST, "client", "script")]: "next/dist/esm/client/script",
            [_path.default.join(_webpackconfig.NEXT_PROJECT_ROOT_DIST, "client", "router")]: "next/dist/esm/client/router",
            [_path.default.join(_webpackconfig.NEXT_PROJECT_ROOT_DIST, "shared", "lib", "head")]: "next/dist/esm/shared/lib/head",
            [_path.default.join(_webpackconfig.NEXT_PROJECT_ROOT_DIST, "shared", "lib", "dynamic")]: "next/dist/esm/shared/lib/dynamic",
            [_path.default.join(_webpackconfig.NEXT_PROJECT_ROOT_DIST, "pages", "_document")]: "next/dist/esm/pages/_document",
            [_path.default.join(_webpackconfig.NEXT_PROJECT_ROOT_DIST, "pages", "_app")]: "next/dist/esm/pages/_app",
            [_path.default.join(_webpackconfig.NEXT_PROJECT_ROOT_DIST, "client", "components", "navigation")]: "next/dist/esm/client/components/navigation",
            [_path.default.join(_webpackconfig.NEXT_PROJECT_ROOT_DIST, "client", "components", "headers")]: "next/dist/esm/client/components/headers"
        } : undefined,
        // For RSC server bundle
        ...!(0, _webpackconfig.hasExternalOtelApiPackage)() && {
            "@opentelemetry/api": "next/dist/compiled/@opentelemetry/api"
        },
        ...config.images.loaderFile ? {
            "next/dist/shared/lib/image-loader": config.images.loaderFile,
            ...isEdgeServer && {
                "next/dist/esm/shared/lib/image-loader": config.images.loaderFile
            }
        } : undefined,
        next: _webpackconfig.NEXT_PROJECT_ROOT,
        "styled-jsx/style$": _requirehook.defaultOverrides["styled-jsx/style"],
        "styled-jsx$": _requirehook.defaultOverrides["styled-jsx"],
        ...customAppAliases,
        ...customDocumentAliases,
        ...pagesDir ? {
            [_constants.PAGES_DIR_ALIAS]: pagesDir
        } : {},
        ...appDir ? {
            [_constants.APP_DIR_ALIAS]: appDir
        } : {},
        [_constants.ROOT_DIR_ALIAS]: dir,
        [_constants.DOT_NEXT_ALIAS]: distDir,
        ...isClient || isEdgeServer ? getOptimizedModuleAliases() : {},
        ...reactProductionProfiling ? getReactProfilingInProduction() : {},
        // For Node server, we need to re-alias the package imports to prefer to
        // resolve to the ESM export.
        ...isNodeServer ? getBarrelOptimizationAliases(config.experimental.optimizePackageImports || []) : {},
        [_constants.RSC_ACTION_VALIDATE_ALIAS]: "next/dist/build/webpack/loaders/next-flight-loader/action-validate",
        [_constants.RSC_ACTION_CLIENT_WRAPPER_ALIAS]: "next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper",
        [_constants.RSC_ACTION_PROXY_ALIAS]: "next/dist/build/webpack/loaders/next-flight-loader/action-proxy",
        [_constants.RSC_ACTION_ENCRYPTION_ALIAS]: "next/dist/server/app-render/action-encryption",
        ...isClient || isEdgeServer ? {
            [clientResolveRewrites]: hasRewrites ? clientResolveRewrites : false
        } : {},
        "@swc/helpers/_": _path.default.join(_path.default.dirname(require.resolve("@swc/helpers/package.json")), "_"),
        setimmediate: "next/dist/compiled/setimmediate"
    };
}
function createServerOnlyClientOnlyAliases(isServer) {
    return isServer ? {
        "server-only$": "next/dist/compiled/server-only/empty",
        "client-only$": "next/dist/compiled/client-only/error",
        "next/dist/compiled/server-only$": "next/dist/compiled/server-only/empty",
        "next/dist/compiled/client-only$": "next/dist/compiled/client-only/error"
    } : {
        "server-only$": "next/dist/compiled/server-only/index",
        "client-only$": "next/dist/compiled/client-only/index",
        "next/dist/compiled/client-only$": "next/dist/compiled/client-only/index",
        "next/dist/compiled/server-only": "next/dist/compiled/server-only/index"
    };
}
function createRSCAliases(bundledReactChannel, { layer, isEdgeServer, reactProductionProfiling }) {
    let alias = {
        react$: `next/dist/compiled/react${bundledReactChannel}`,
        "react-dom$": `next/dist/compiled/react-dom${bundledReactChannel}`,
        "react/jsx-runtime$": `next/dist/compiled/react${bundledReactChannel}/jsx-runtime`,
        "react/jsx-dev-runtime$": `next/dist/compiled/react${bundledReactChannel}/jsx-dev-runtime`,
        "react-dom/client$": `next/dist/compiled/react-dom${bundledReactChannel}/client`,
        "react-dom/server$": `next/dist/compiled/react-dom${bundledReactChannel}/server`,
        "react-dom/static$": `next/dist/compiled/react-dom-experimental/static`,
        "react-dom/static.edge$": `next/dist/compiled/react-dom-experimental/static.edge`,
        "react-dom/static.browser$": `next/dist/compiled/react-dom-experimental/static.browser`,
        "react-dom/server.edge$": `next/dist/compiled/react-dom${bundledReactChannel}/server.edge`,
        "react-dom/server.browser$": `next/dist/compiled/react-dom${bundledReactChannel}/server.browser`,
        "react-server-dom-webpack/client$": `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/client`,
        "react-server-dom-webpack/client.edge$": `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/client.edge`,
        "react-server-dom-webpack/server.edge$": `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/server.edge`,
        "react-server-dom-webpack/server.node$": `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/server.node`,
        // optimisations to ignore the legacy build of react-dom/server
        "./cjs/react-dom-server-legacy.browser.production.min.js": `next/dist/build/noop-react-dom-server-legacy`,
        "./cjs/react-dom-server-legacy.browser.development.js": `next/dist/build/noop-react-dom-server-legacy`
    };
    if (!isEdgeServer) {
        if (layer === _constants.WEBPACK_LAYERS.serverSideRendering) {
            alias = Object.assign(alias, {
                "react/jsx-runtime$": `next/dist/server/future/route-modules/app-page/vendored/${layer}/react-jsx-runtime`,
                "react/jsx-dev-runtime$": `next/dist/server/future/route-modules/app-page/vendored/${layer}/react-jsx-dev-runtime`,
                react$: `next/dist/server/future/route-modules/app-page/vendored/${layer}/react`,
                "react-dom$": `next/dist/server/future/route-modules/app-page/vendored/${layer}/react-dom`,
                "react-server-dom-webpack/client.edge$": `next/dist/server/future/route-modules/app-page/vendored/${layer}/react-server-dom-webpack-client-edge`
            });
        } else if (layer === _constants.WEBPACK_LAYERS.reactServerComponents) {
            alias = Object.assign(alias, {
                "react/jsx-runtime$": `next/dist/server/future/route-modules/app-page/vendored/${layer}/react-jsx-runtime`,
                "react/jsx-dev-runtime$": `next/dist/server/future/route-modules/app-page/vendored/${layer}/react-jsx-dev-runtime`,
                react$: `next/dist/server/future/route-modules/app-page/vendored/${layer}/react`,
                "react-dom$": `next/dist/server/future/route-modules/app-page/vendored/${layer}/react-dom`,
                "react-server-dom-webpack/server.edge$": `next/dist/server/future/route-modules/app-page/vendored/${layer}/react-server-dom-webpack-server-edge`,
                "react-server-dom-webpack/server.node$": `next/dist/server/future/route-modules/app-page/vendored/${layer}/react-server-dom-webpack-server-node`
            });
        }
    }
    if (isEdgeServer) {
        if (layer === _constants.WEBPACK_LAYERS.reactServerComponents) {
            alias["react$"] = `next/dist/compiled/react${bundledReactChannel}/react.shared-subset`;
        }
        // Use server rendering stub for RSC and SSR
        // x-ref: https://github.com/facebook/react/pull/25436
        alias["react-dom$"] = `next/dist/compiled/react-dom${bundledReactChannel}/server-rendering-stub`;
    }
    if (reactProductionProfiling) {
        alias["react-dom$"] = `next/dist/compiled/react-dom${bundledReactChannel}/profiling`;
    }
    alias["@vercel/turbopack-ecmascript-runtime/dev/client/hmr-client.ts"] = `next/dist/client/dev/noop-turbopack-hmr`;
    return alias;
}
function getOptimizedModuleAliases() {
    return {
        unfetch: require.resolve("next/dist/build/polyfills/fetch/index.js"),
        "isomorphic-unfetch": require.resolve("next/dist/build/polyfills/fetch/index.js"),
        "whatwg-fetch": require.resolve("next/dist/build/polyfills/fetch/whatwg-fetch.js"),
        "object-assign": require.resolve("next/dist/build/polyfills/object-assign.js"),
        "object.assign/auto": require.resolve("next/dist/build/polyfills/object.assign/auto.js"),
        "object.assign/implementation": require.resolve("next/dist/build/polyfills/object.assign/implementation.js"),
        "object.assign/polyfill": require.resolve("next/dist/build/polyfills/object.assign/polyfill.js"),
        "object.assign/shim": require.resolve("next/dist/build/polyfills/object.assign/shim.js"),
        url: require.resolve("next/dist/compiled/native-url")
    };
}
// Alias these modules to be resolved with "module" if possible.
function getBarrelOptimizationAliases(packages) {
    const aliases = {};
    const mainFields = [
        "module",
        "main"
    ];
    for (const pkg of packages){
        try {
            const descriptionFileData = require(`${pkg}/package.json`);
            const descriptionFilePath = require.resolve(`${pkg}/package.json`);
            for (const field of mainFields){
                if (descriptionFileData.hasOwnProperty(field)) {
                    aliases[pkg + "$"] = _path.default.join(_path.default.dirname(descriptionFilePath), descriptionFileData[field]);
                    break;
                }
            }
        } catch  {}
    }
    return aliases;
}
function getReactProfilingInProduction() {
    return {
        "react-dom$": "react-dom/profiling"
    };
}
function createServerComponentsNoopAliases() {
    return {
        [require.resolve("next/head")]: require.resolve("next/dist/client/components/noop-head"),
        // Alias next/dynamic
        [require.resolve("next/dynamic")]: require.resolve("next/dist/shared/lib/app-dynamic")
    };
}

//# sourceMappingURL=create-compiler-aliases.js.map