/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import type { NextConfigComplete } from '../config-shared';
import type { CustomRoutes } from '../../lib/load-custom-routes';
import type { Duplex } from 'stream';
import type { Telemetry } from '../../telemetry/storage';
import type { IncomingMessage, ServerResponse } from 'http';
import type { UrlObject } from 'url';
import type { RouteDefinition } from '../future/route-definitions/route-definition';
import { webpack } from 'next/dist/compiled/webpack/webpack';
import getBaseWebpackConfig from '../../build/webpack-config';
import type { __ApiPreviewProps } from '../api-utils';
import type { UnwrapPromise } from '../../lib/coalesced-function';
import { type NextJsHotReloaderInterface } from './hot-reloader-types';
import type { HMR_ACTION_TYPES } from './hot-reloader-types';
export declare function renderScriptError(res: ServerResponse, error: Error, { verbose }?: {
    verbose?: boolean | undefined;
}): Promise<{
    finished: true | undefined;
}>;
export declare const matchNextPageBundleRequest: import("../../shared/lib/router/utils/path-match").PatchMatcher;
export default class HotReloader implements NextJsHotReloaderInterface {
    private hasAmpEntrypoints;
    private hasAppRouterEntrypoints;
    private hasPagesRouterEntrypoints;
    private dir;
    private buildId;
    private interceptors;
    private pagesDir?;
    private distDir;
    private webpackHotMiddleware?;
    private config;
    private clientStats;
    private clientError;
    private serverError;
    private hmrServerError;
    private serverPrevDocumentHash;
    private serverChunkNames?;
    private prevChunkNames?;
    private onDemandEntries?;
    private previewProps;
    private watcher;
    private rewrites;
    private fallbackWatcher;
    private hotReloaderSpan;
    private pagesMapping;
    private appDir?;
    private telemetry;
    private versionInfo;
    private reloadAfterInvalidation;
    serverStats: webpack.Stats | null;
    edgeServerStats: webpack.Stats | null;
    multiCompiler?: webpack.MultiCompiler;
    activeWebpackConfigs?: Array<UnwrapPromise<ReturnType<typeof getBaseWebpackConfig>>>;
    constructor(dir: string, { config, pagesDir, distDir, buildId, previewProps, rewrites, appDir, telemetry, }: {
        config: NextConfigComplete;
        pagesDir?: string;
        distDir: string;
        buildId: string;
        previewProps: __ApiPreviewProps;
        rewrites: CustomRoutes['rewrites'];
        appDir?: string;
        telemetry: Telemetry;
    });
    run(req: IncomingMessage, res: ServerResponse, parsedUrl: UrlObject): Promise<{
        finished?: true;
    }>;
    setHmrServerError(error: Error | null): void;
    clearHmrServerError(): void;
    protected refreshServerComponents(): Promise<void>;
    onHMR(req: IncomingMessage, _socket: Duplex, head: Buffer): void;
    private clean;
    private getVersionInfo;
    private getWebpackConfig;
    buildFallbackError(): Promise<void>;
    start(): Promise<void>;
    invalidate({ reloadAfterInvalidation }?: {
        reloadAfterInvalidation: boolean;
    }): void | "" | undefined;
    stop(): Promise<void>;
    getCompilationErrors(page: string): Promise<any[]>;
    send(action: HMR_ACTION_TYPES): void;
    ensurePage({ page, clientOnly, appPaths, definition, isApp, url, }: {
        page: string;
        clientOnly: boolean;
        appPaths?: ReadonlyArray<string> | null;
        isApp?: boolean;
        definition?: RouteDefinition;
        url?: string;
    }): Promise<void>;
}
