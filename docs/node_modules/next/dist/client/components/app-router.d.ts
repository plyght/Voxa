import type { ReactNode } from 'react';
import React from 'react';
import { CacheStates } from '../../shared/lib/app-router-context.shared-runtime';
import type { ErrorComponent } from './error-boundary';
import type { ServerActionDispatcher } from './router-reducer/router-reducer-types';
import type { InitialRouterStateParameters } from './router-reducer/create-initial-router-state';
export declare function getServerActionDispatcher(): ServerActionDispatcher | null;
export declare function urlToUrlWithoutFlightMarker(url: string): URL;
type AppRouterProps = Omit<Omit<InitialRouterStateParameters, 'isServer' | 'location'>, 'initialParallelRoutes'> & {
    buildId: string;
    initialHead: ReactNode;
    assetPrefix: string;
};
export declare const createEmptyCacheNode: () => {
    status: CacheStates;
    data: null;
    subTreeData: null;
    parallelRoutes: Map<any, any>;
};
export default function AppRouter(props: AppRouterProps & {
    globalErrorComponent: ErrorComponent;
}): React.JSX.Element;
export {};
