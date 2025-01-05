import React from 'react';
export declare function makeGetServerInsertedHTML({ polyfills, renderServerInsertedHTML, hasPostponed, }: {
    polyfills: JSX.IntrinsicElements['script'][];
    renderServerInsertedHTML: () => React.ReactNode;
    hasPostponed: boolean;
}): (serverCapturedErrors: Error[]) => Promise<string>;
