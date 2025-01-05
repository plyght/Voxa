/// <reference types="react" />
import type { Options as RenderToReadableStreamOptions, ResumeOptions } from 'react-dom/server.edge';
import type { Options as PrerenderOptions } from 'react-dom/static.edge';
type RenderResult = {
    stream: ReadableStream<Uint8Array>;
    postponed?: object | null;
};
export interface Renderer {
    render(children: JSX.Element): Promise<RenderResult>;
}
export declare class ServerRenderer implements Renderer {
    private readonly options;
    private readonly renderToReadableStream;
    constructor(options: RenderToReadableStreamOptions);
    render(children: JSX.Element): Promise<RenderResult>;
}
/**
 * This represents all the possible configuration options for each of the
 * available renderers. We pick the specific options we need for each renderer
 * to help the `createStaticRenderer` function. If more options are added to
 * this type they should be added to the `createStaticRenderer` function as
 * well.
 */
type StreamOptions = Pick<ResumeOptions & RenderToReadableStreamOptions & PrerenderOptions, 'onError' | 'onHeaders' | 'maxHeadersLength' | 'nonce' | 'bootstrapScripts' | 'formState'>;
type Options = {
    /**
     * Whether or not PPR is enabled. This is used to determine which renderer to
     * use.
     */
    ppr: boolean;
    /**
     * Whether or not this is a static generation render. This is used to
     * determine which renderer to use.
     */
    isStaticGeneration: boolean;
    /**
     * The postponed state for the render. This is only used when resuming a
     * prerender that has postponed.
     */
    postponed: object | null;
    /**
     * The options for any of the renderers. This is a union of all the possible
     * options for each renderer. If additional configuration options are required
     * for a renderer, they should be added to the `StreamOptions` type and then
     * added via the `createStaticRenderer` function.
     */
    streamOptions: StreamOptions;
};
export declare function createStaticRenderer({ ppr, isStaticGeneration, postponed, streamOptions: { onError, onHeaders, maxHeadersLength, nonce, bootstrapScripts, formState, }, }: Options): Renderer;
export {};
