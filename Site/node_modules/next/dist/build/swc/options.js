"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getParserOptions: null,
    getJestSWCOptions: null,
    getLoaderSWCOptions: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getParserOptions: function() {
        return getParserOptions;
    },
    getJestSWCOptions: function() {
        return getJestSWCOptions;
    },
    getLoaderSWCOptions: function() {
        return getLoaderSWCOptions;
    }
});
const nextDistPath = /(next[\\/]dist[\\/]shared[\\/]lib)|(next[\\/]dist[\\/]client)|(next[\\/]dist[\\/]pages)/;
const regeneratorRuntimePath = require.resolve("next/dist/compiled/regenerator-runtime");
function getParserOptions({ filename, jsConfig, ...rest }) {
    var _jsConfig_compilerOptions;
    const isTSFile = filename.endsWith(".ts");
    const isTypeScript = isTSFile || filename.endsWith(".tsx");
    const enableDecorators = Boolean(jsConfig == null ? void 0 : (_jsConfig_compilerOptions = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions.experimentalDecorators);
    return {
        ...rest,
        syntax: isTypeScript ? "typescript" : "ecmascript",
        dynamicImport: true,
        decorators: enableDecorators,
        // Exclude regular TypeScript files from React transformation to prevent e.g. generic parameters and angle-bracket type assertion from being interpreted as JSX tags.
        [isTypeScript ? "tsx" : "jsx"]: !isTSFile,
        importAssertions: true
    };
}
function getBaseSWCOptions({ filename, jest, development, hasReactRefresh, globalWindow, esm, modularizeImports, swcPlugins, compilerOptions, resolvedBaseUrl, jsConfig, swcCacheDir, serverComponents, isReactServerLayer }) {
    var _jsConfig_compilerOptions, _jsConfig_compilerOptions1, _jsConfig_compilerOptions2, _jsConfig_compilerOptions3, _jsConfig_compilerOptions4;
    const parserConfig = getParserOptions({
        filename,
        jsConfig
    });
    const paths = jsConfig == null ? void 0 : (_jsConfig_compilerOptions = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions.paths;
    const enableDecorators = Boolean(jsConfig == null ? void 0 : (_jsConfig_compilerOptions1 = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions1.experimentalDecorators);
    const emitDecoratorMetadata = Boolean(jsConfig == null ? void 0 : (_jsConfig_compilerOptions2 = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions2.emitDecoratorMetadata);
    const useDefineForClassFields = Boolean(jsConfig == null ? void 0 : (_jsConfig_compilerOptions3 = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions3.useDefineForClassFields);
    const plugins = (swcPlugins ?? []).filter(Array.isArray).map(([name, options])=>[
            require.resolve(name),
            options
        ]);
    return {
        jsc: {
            ...resolvedBaseUrl && paths ? {
                baseUrl: resolvedBaseUrl.baseUrl,
                paths
            } : {},
            externalHelpers: !process.versions.pnp && !jest,
            parser: parserConfig,
            experimental: {
                keepImportAttributes: true,
                emitAssertForImportAttributes: true,
                plugins,
                cacheRoot: swcCacheDir
            },
            transform: {
                // Enables https://github.com/swc-project/swc/blob/0359deb4841be743d73db4536d4a22ac797d7f65/crates/swc_ecma_ext_transforms/src/jest.rs
                ...jest ? {
                    hidden: {
                        jest: true
                    }
                } : {},
                legacyDecorator: enableDecorators,
                decoratorMetadata: emitDecoratorMetadata,
                useDefineForClassFields: useDefineForClassFields,
                react: {
                    importSource: (jsConfig == null ? void 0 : (_jsConfig_compilerOptions4 = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions4.jsxImportSource) ?? ((compilerOptions == null ? void 0 : compilerOptions.emotion) && !isReactServerLayer ? "@emotion/react" : "react"),
                    runtime: "automatic",
                    pragma: "React.createElement",
                    pragmaFrag: "React.Fragment",
                    throwIfNamespace: true,
                    development: !!development,
                    useBuiltins: true,
                    refresh: !!hasReactRefresh
                },
                optimizer: {
                    simplify: false,
                    globals: jest ? null : {
                        typeofs: {
                            window: globalWindow ? "object" : "undefined"
                        },
                        envs: {
                            NODE_ENV: development ? '"development"' : '"production"'
                        }
                    }
                },
                regenerator: {
                    importPath: regeneratorRuntimePath
                }
            }
        },
        sourceMaps: jest ? "inline" : undefined,
        removeConsole: compilerOptions == null ? void 0 : compilerOptions.removeConsole,
        // disable "reactRemoveProperties" when "jest" is true
        // otherwise the setting from next.config.js will be used
        reactRemoveProperties: jest ? false : compilerOptions == null ? void 0 : compilerOptions.reactRemoveProperties,
        // Map the k-v map to an array of pairs.
        modularizeImports: modularizeImports ? Object.fromEntries(Object.entries(modularizeImports).map(([mod, config])=>[
                mod,
                {
                    ...config,
                    transform: typeof config.transform === "string" ? config.transform : Object.entries(config.transform).map(([key, value])=>[
                            key,
                            value
                        ])
                }
            ])) : undefined,
        relay: compilerOptions == null ? void 0 : compilerOptions.relay,
        // Always transform styled-jsx and error when `client-only` condition is triggered
        styledJsx: {},
        // Disable css-in-js libs (without client-only integration) transform on server layer for server components
        ...!isReactServerLayer && {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            emotion: getEmotionOptions(compilerOptions == null ? void 0 : compilerOptions.emotion, development),
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            styledComponents: getStyledComponentsOptions(compilerOptions == null ? void 0 : compilerOptions.styledComponents, development)
        },
        serverComponents: serverComponents && !jest ? {
            isReactServerLayer: !!isReactServerLayer
        } : undefined,
        serverActions: serverComponents && !jest ? {
            // always enable server actions
            // TODO: remove this option
            enabled: true,
            isReactServerLayer: !!isReactServerLayer
        } : undefined,
        // For app router we prefer to bundle ESM,
        // On server side of pages router we prefer CJS.
        preferEsm: esm
    };
}
function getStyledComponentsOptions(styledComponentsConfig, development) {
    if (!styledComponentsConfig) {
        return null;
    } else if (typeof styledComponentsConfig === "object") {
        return {
            ...styledComponentsConfig,
            displayName: styledComponentsConfig.displayName ?? Boolean(development)
        };
    } else {
        return {
            displayName: Boolean(development)
        };
    }
}
/*
Output module type

For app router where server components is enabled, we prefer to bundle es6 modules,
Use output module es6 to make sure:
- the esm module is present
- if the module is mixed syntax, the esm + cjs code are both present

For pages router will remain untouched
*/ function getModuleOptions(esm = false) {
    return esm ? {
        module: {
            type: "es6"
        }
    } : {};
}
function getEmotionOptions(emotionConfig, development) {
    if (!emotionConfig) {
        return null;
    }
    let autoLabel = !!development;
    switch(typeof emotionConfig === "object" && emotionConfig.autoLabel){
        case "never":
            autoLabel = false;
            break;
        case "always":
            autoLabel = true;
            break;
        case "dev-only":
        default:
            break;
    }
    return {
        enabled: true,
        autoLabel,
        sourcemap: development,
        ...typeof emotionConfig === "object" && {
            importMap: emotionConfig.importMap,
            labelFormat: emotionConfig.labelFormat,
            sourcemap: development && emotionConfig.sourceMap
        }
    };
}
function getJestSWCOptions({ isServer, filename, esm, modularizeImports, swcPlugins, compilerOptions, jsConfig, resolvedBaseUrl, pagesDir }) {
    let baseOptions = getBaseSWCOptions({
        filename,
        jest: true,
        development: false,
        hasReactRefresh: false,
        globalWindow: !isServer,
        modularizeImports,
        swcPlugins,
        compilerOptions,
        jsConfig,
        resolvedBaseUrl,
        esm,
        // Don't apply server layer transformations for Jest
        isReactServerLayer: false,
        // Disable server / client graph assertions for Jest
        serverComponents: false
    });
    const isNextDist = nextDistPath.test(filename);
    return {
        ...baseOptions,
        env: {
            targets: {
                // Targets the current version of Node.js
                node: process.versions.node
            }
        },
        module: {
            type: esm && !isNextDist ? "es6" : "commonjs"
        },
        disableNextSsg: true,
        disablePageConfig: true,
        pagesDir
    };
}
function getLoaderSWCOptions({ // This is not passed yet as "paths" resolving is handled by webpack currently.
// resolvedBaseUrl,
filename, development, isServer, pagesDir, appDir, isPageFile, hasReactRefresh, modularizeImports, optimizeServerReact, optimizePackageImports, swcPlugins, compilerOptions, jsConfig, supportedBrowsers, swcCacheDir, relativeFilePathFromRoot, serverComponents, isReactServerLayer, esm }) {
    let baseOptions = getBaseSWCOptions({
        filename,
        development,
        globalWindow: !isServer,
        hasReactRefresh,
        modularizeImports,
        swcPlugins,
        compilerOptions,
        jsConfig,
        // resolvedBaseUrl,
        swcCacheDir,
        isReactServerLayer,
        serverComponents,
        esm: !!esm
    });
    baseOptions.fontLoaders = {
        fontLoaders: [
            "next/font/local",
            "next/font/google",
            // TODO: remove this in the next major version
            "@next/font/local",
            "@next/font/google"
        ],
        relativeFilePathFromRoot
    };
    baseOptions.cjsRequireOptimizer = {
        packages: {
            "next/server": {
                transforms: {
                    NextRequest: "next/dist/server/web/spec-extension/request",
                    NextResponse: "next/dist/server/web/spec-extension/response",
                    ImageResponse: "next/dist/server/web/spec-extension/image-response",
                    userAgentFromString: "next/dist/server/web/spec-extension/user-agent",
                    userAgent: "next/dist/server/web/spec-extension/user-agent"
                }
            }
        }
    };
    if (optimizeServerReact && isServer && !development) {
        baseOptions.optimizeServerReact = {
            optimize_use_state: true
        };
    }
    // Modularize import optimization for barrel files
    if (optimizePackageImports) {
        baseOptions.autoModularizeImports = {
            packages: optimizePackageImports
        };
    }
    const isNextDist = nextDistPath.test(filename);
    if (isServer) {
        return {
            ...baseOptions,
            // Disables getStaticProps/getServerSideProps tree shaking on the server compilation for pages
            disableNextSsg: true,
            disablePageConfig: true,
            isDevelopment: development,
            isServerCompiler: isServer,
            pagesDir,
            appDir,
            preferEsm: !!esm,
            isPageFile,
            env: {
                targets: {
                    // Targets the current version of Node.js
                    node: process.versions.node
                }
            },
            ...getModuleOptions(esm)
        };
    } else {
        const options = {
            ...baseOptions,
            // Ensure Next.js internals are output as commonjs modules
            ...isNextDist ? {
                module: {
                    type: "commonjs"
                }
            } : getModuleOptions(esm),
            disableNextSsg: !isPageFile,
            isDevelopment: development,
            isServerCompiler: isServer,
            pagesDir,
            appDir,
            isPageFile,
            ...supportedBrowsers && supportedBrowsers.length > 0 ? {
                env: {
                    targets: supportedBrowsers
                }
            } : {}
        };
        if (!options.env) {
            // Matches default @babel/preset-env behavior
            options.jsc.target = "es5";
        }
        return options;
    }
}

//# sourceMappingURL=options.js.map