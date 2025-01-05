/// <reference types="node" />
import type { NextConfigComplete } from '../../config-shared';
import type { UnwrapPromise } from '../../../lib/coalesced-function';
import type { MiddlewareMatcher } from '../../../build/analysis/get-page-static-info';
import type { MiddlewareRouteMatch } from '../../../shared/lib/router/utils/middleware-route-matcher';
import type { NextJsHotReloaderInterface } from '../../dev/hot-reloader-types';
import type { Telemetry } from '../../../telemetry/storage';
import type { IncomingMessage, ServerResponse } from 'http';
import type { LazyRenderServerInstance } from '../router-server';
type SetupOpts = {
    renderServer: LazyRenderServerInstance;
    dir: string;
    turbo?: boolean;
    appDir?: string;
    pagesDir?: string;
    telemetry: Telemetry;
    isCustomServer?: boolean;
    fsChecker: UnwrapPromise<ReturnType<typeof import('./filesystem').setupFsCheck>>;
    nextConfig: NextConfigComplete;
    port: number;
};
export declare function setupDevBundler(opts: SetupOpts): Promise<{
    serverFields: {
        actualMiddlewareFile?: string | undefined;
        actualInstrumentationHookFile?: string | undefined;
        appPathRoutes?: Record<string, string | string[]> | undefined;
        middleware?: {
            page: string;
            match: MiddlewareRouteMatch;
            matchers?: MiddlewareMatcher[] | undefined;
        } | undefined;
        hasAppNotFound?: boolean | undefined;
        interceptionRoutes?: {
            match: import("../../../shared/lib/router/utils/path-match").PatchMatcher;
            check?: boolean | undefined;
        }[] | undefined;
    };
    hotReloader: NextJsHotReloaderInterface;
    requestHandler: (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => Promise<{
        finished: boolean;
    }>;
    logErrorWithOriginalStack: (err: unknown, type?: "warning" | "uncaughtException" | "unhandledRejection" | "app-dir" | undefined) => Promise<void>;
    ensureMiddleware(requestUrl?: string | undefined): Promise<void>;
}>;
export type DevBundler = Awaited<ReturnType<typeof setupDevBundler>>;
export {};
