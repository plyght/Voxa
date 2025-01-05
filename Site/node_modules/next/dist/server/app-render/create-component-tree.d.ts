import type { CacheNodeSeedData } from './types';
import React, { type ReactNode } from 'react';
import type { LoaderTree } from '../lib/app-dir-module';
import type { CreateSegmentPath, AppRenderContext } from './app-render';
type ComponentTree = {
    seedData: CacheNodeSeedData;
    styles: ReactNode;
};
/**
 * This component will call `React.postpone` that throws the postponed error.
 */
export declare const Postpone: ({ postpone, }: {
    postpone: (reason: string) => never;
}) => never;
/**
 * Use the provided loader tree to create the React Component tree.
 */
export declare function createComponentTree({ createSegmentPath, loaderTree: tree, parentParams, firstItem, rootLayoutIncluded, injectedCSS, injectedJS, injectedFontPreloadTags, asNotFound, metadataOutlet, ctx, }: {
    createSegmentPath: CreateSegmentPath;
    loaderTree: LoaderTree;
    parentParams: {
        [key: string]: any;
    };
    rootLayoutIncluded: boolean;
    firstItem?: boolean;
    injectedCSS: Set<string>;
    injectedJS: Set<string>;
    injectedFontPreloadTags: Set<string>;
    asNotFound?: boolean;
    metadataOutlet?: React.ReactNode;
    ctx: AppRenderContext;
}): Promise<ComponentTree>;
export {};
