import type { FlightSegmentPath } from '../../server/app-render/types';
import type { ErrorComponent } from './error-boundary';
import React from 'react';
/**
 * OuterLayoutRouter handles the current segment as well as <Offscreen> rendering of other segments.
 * It can be rendered next to each other with a different `parallelRouterKey`, allowing for Parallel routes.
 */
export default function OuterLayoutRouter({ parallelRouterKey, segmentPath, error, errorStyles, errorScripts, templateStyles, templateScripts, loading, loadingStyles, loadingScripts, hasLoading, template, notFound, notFoundStyles, styles, }: {
    parallelRouterKey: string;
    segmentPath: FlightSegmentPath;
    error: ErrorComponent;
    errorStyles: React.ReactNode | undefined;
    errorScripts: React.ReactNode | undefined;
    templateStyles: React.ReactNode | undefined;
    templateScripts: React.ReactNode | undefined;
    template: React.ReactNode;
    loading: React.ReactNode | undefined;
    loadingStyles: React.ReactNode | undefined;
    loadingScripts: React.ReactNode | undefined;
    hasLoading: boolean;
    notFound: React.ReactNode | undefined;
    notFoundStyles: React.ReactNode | undefined;
    styles?: React.ReactNode;
}): React.JSX.Element;
