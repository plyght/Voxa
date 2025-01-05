import type { NextConfig, NextConfigComplete } from '../server/config-shared';
import type { AppBuildManifest } from './webpack/plugins/app-build-manifest-plugin';
import type { GetStaticPaths, GetStaticPathsResult, ServerRuntime } from 'next/types';
import type { BuildManifest } from '../server/get-page-files';
import type { CustomRoutes } from '../lib/load-custom-routes';
import type { MiddlewareManifest } from './webpack/plugins/middleware-plugin';
import type { WebpackLayerName } from '../lib/constants';
import type { AppPageModule } from '../server/future/route-modules/app-page/module';
import '../server/require-hook';
import '../server/node-polyfill-crypto';
import '../server/node-environment';
import { IncrementalCache } from '../server/lib/incremental-cache';
export type ROUTER_TYPE = 'pages' | 'app';
export declare function unique<T>(main: ReadonlyArray<T>, sub: ReadonlyArray<T>): T[];
export declare function difference<T>(main: ReadonlyArray<T> | ReadonlySet<T>, sub: ReadonlyArray<T> | ReadonlySet<T>): T[];
type ComputeFilesGroup = {
    files: ReadonlyArray<string>;
    size: {
        total: number;
    };
};
type ComputeFilesManifest = {
    unique: ComputeFilesGroup;
    common: ComputeFilesGroup;
};
type ComputeFilesManifestResult = {
    router: {
        pages: ComputeFilesManifest;
        app?: ComputeFilesManifest;
    };
    sizes: Map<string, number>;
};
export declare function computeFromManifest(manifests: {
    build: BuildManifest;
    app?: AppBuildManifest;
}, distPath: string, gzipSize?: boolean, pageInfos?: Map<string, PageInfo>): Promise<ComputeFilesManifestResult>;
export declare function isMiddlewareFilename(file?: string): boolean;
export declare function isInstrumentationHookFilename(file?: string): boolean;
export interface PageInfo {
    isHybridAmp?: boolean;
    size: number;
    totalSize: number;
    isStatic: boolean;
    isSSG: boolean;
    isPPR: boolean;
    ssgPageRoutes: string[] | null;
    initialRevalidateSeconds: number | false;
    pageDuration: number | undefined;
    ssgPageDurations: number[] | undefined;
    runtime: ServerRuntime;
    hasEmptyPrelude?: boolean;
    hasPostponed?: boolean;
    isDynamicAppRoute?: boolean;
}
export declare function printTreeView(lists: {
    pages: ReadonlyArray<string>;
    app: ReadonlyArray<string> | undefined;
}, pageInfos: Map<string, PageInfo>, { distPath, buildId, pagesDir, pageExtensions, buildManifest, appBuildManifest, middlewareManifest, useStaticPages404, gzipSize, }: {
    distPath: string;
    buildId: string;
    pagesDir?: string;
    pageExtensions: string[];
    buildManifest: BuildManifest;
    appBuildManifest?: AppBuildManifest;
    middlewareManifest: MiddlewareManifest;
    useStaticPages404: boolean;
    gzipSize?: boolean;
}): Promise<void>;
export declare function printCustomRoutes({ redirects, rewrites, headers, }: CustomRoutes): void;
export declare function getJsPageSizeInKb(routerType: ROUTER_TYPE, page: string, distPath: string, buildManifest: BuildManifest, appBuildManifest?: AppBuildManifest, gzipSize?: boolean, cachedStats?: ComputeFilesManifestResult): Promise<[number, number]>;
export declare function buildStaticPaths({ page, getStaticPaths, staticPathsResult, configFileName, locales, defaultLocale, appDir, }: {
    page: string;
    getStaticPaths?: GetStaticPaths;
    staticPathsResult?: GetStaticPathsResult;
    configFileName: string;
    locales?: string[];
    defaultLocale?: string;
    appDir?: boolean;
}): Promise<Omit<GetStaticPathsResult, 'paths'> & {
    paths: string[];
    encodedPaths: string[];
}>;
export type AppConfigDynamic = 'auto' | 'error' | 'force-static' | 'force-dynamic';
export type AppConfig = {
    revalidate?: number | false;
    dynamicParams?: true | false;
    dynamic?: AppConfigDynamic;
    fetchCache?: 'force-cache' | 'only-cache';
    preferredRegion?: string;
};
export type GenerateParams = Array<{
    config?: AppConfig;
    isDynamicSegment?: boolean;
    segmentPath: string;
    getStaticPaths?: GetStaticPaths;
    generateStaticParams?: any;
    isLayout?: boolean;
}>;
export declare const collectAppConfig: (mod: any) => AppConfig | undefined;
export declare const collectGenerateParams: (segment: any, parentSegments?: string[], generateParams?: GenerateParams) => Promise<GenerateParams>;
export declare function buildAppStaticPaths({ dir, page, distDir, configFileName, generateParams, isrFlushToDisk, incrementalCacheHandlerPath, requestHeaders, maxMemoryCacheSize, fetchCacheKeyPrefix, ppr, ComponentMod, }: {
    dir: string;
    page: string;
    configFileName: string;
    generateParams: GenerateParams;
    incrementalCacheHandlerPath?: string;
    distDir: string;
    isrFlushToDisk?: boolean;
    fetchCacheKeyPrefix?: string;
    maxMemoryCacheSize?: number;
    requestHeaders: IncrementalCache['requestHeaders'];
    ppr: boolean;
    ComponentMod: AppPageModule;
}): Promise<(Omit<GetStaticPathsResult, "paths"> & {
    paths: string[];
    encodedPaths: string[];
}) | {
    paths: undefined;
    fallback: boolean | undefined;
    encodedPaths: undefined;
}>;
export declare function isPageStatic({ dir, page, distDir, configFileName, runtimeEnvConfig, httpAgentOptions, locales, defaultLocale, parentId, pageRuntime, edgeInfo, pageType, originalAppPath, isrFlushToDisk, maxMemoryCacheSize, incrementalCacheHandlerPath, ppr, }: {
    dir: string;
    page: string;
    distDir: string;
    configFileName: string;
    runtimeEnvConfig: any;
    httpAgentOptions: NextConfigComplete['httpAgentOptions'];
    locales?: string[];
    defaultLocale?: string;
    parentId?: any;
    edgeInfo?: any;
    pageType?: 'pages' | 'app';
    pageRuntime?: ServerRuntime;
    originalAppPath?: string;
    isrFlushToDisk?: boolean;
    maxMemoryCacheSize?: number;
    incrementalCacheHandlerPath?: string;
    nextConfigOutput: 'standalone' | 'export';
    ppr: boolean;
}): Promise<{
    isPPR?: boolean;
    isStatic?: boolean;
    isAmpOnly?: boolean;
    isHybridAmp?: boolean;
    hasServerProps?: boolean;
    hasStaticProps?: boolean;
    prerenderRoutes?: string[];
    encodedPrerenderRoutes?: string[];
    prerenderFallback?: boolean | 'blocking';
    isNextImageImported?: boolean;
    traceIncludes?: string[];
    traceExcludes?: string[];
    appConfig?: AppConfig;
}>;
export declare function hasCustomGetInitialProps(page: string, distDir: string, runtimeEnvConfig: any, checkingApp: boolean): Promise<boolean>;
export declare function getDefinedNamedExports(page: string, distDir: string, runtimeEnvConfig: any): Promise<ReadonlyArray<string>>;
export declare function detectConflictingPaths(combinedPages: string[], ssgPages: Set<string>, additionalSsgPaths: Map<string, string[]>): void;
export declare function copyTracedFiles(dir: string, distDir: string, pageKeys: readonly string[], appPageKeys: readonly string[] | undefined, tracingRoot: string, serverConfig: NextConfig, middlewareManifest: MiddlewareManifest, hasInstrumentationHook: boolean, staticPages: Set<string>): Promise<void>;
export declare function isReservedPage(page: string): boolean;
export declare function isAppBuiltinNotFoundPage(page: string): boolean;
export declare function isCustomErrorPage(page: string): boolean;
export declare function isMiddlewareFile(file: string): boolean;
export declare function isInstrumentationHookFile(file: string): boolean;
export declare function getPossibleInstrumentationHookFilenames(folder: string, extensions: string[]): string[];
export declare function getPossibleMiddlewareFilenames(folder: string, extensions: string[]): string[];
export declare class NestedMiddlewareError extends Error {
    constructor(nestedFileNames: string[], mainDir: string, pagesOrAppDir: string);
}
export declare function getSupportedBrowsers(dir: string, isDevelopment: boolean): string[] | undefined;
export declare function isWebpackServerLayer(layer: WebpackLayerName | null | undefined): boolean;
export declare function isWebpackDefaultLayer(layer: WebpackLayerName | null | undefined): boolean;
export declare function isWebpackAppLayer(layer: WebpackLayerName | null | undefined): boolean;
export {};
