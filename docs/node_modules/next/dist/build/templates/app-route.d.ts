import { AppRouteRouteModule } from '../../server/future/route-modules/app-route/module.compiled';
declare const routeModule: AppRouteRouteModule;
declare const requestAsyncStorage: import("../../client/components/request-async-storage.external").RequestAsyncStorage, staticGenerationAsyncStorage: import("../../client/components/static-generation-async-storage.external").StaticGenerationAsyncStorage, serverHooks: typeof import("../../client/components/hooks-server-context"), headerHooks: typeof import("../../client/components/headers"), staticGenerationBailout: import("../../client/components/static-generation-bailout").StaticGenerationBailout;
declare const originalPathname = "VAR_ORIGINAL_PATHNAME";
declare function patchFetch(): void;
export { routeModule, requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout, originalPathname, patchFetch, };
