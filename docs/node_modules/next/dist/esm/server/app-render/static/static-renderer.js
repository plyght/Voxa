class StaticRenderer {
    constructor(options){
        this.options = options;
        this.prerender = process.env.__NEXT_EXPERIMENTAL_REACT ? require("react-dom/static.edge").prerender : null;
    }
    async render(children) {
        const { prelude, postponed } = await this.prerender(children, this.options);
        return {
            stream: prelude,
            postponed
        };
    }
}
class StaticResumeRenderer {
    constructor(postponed, options){
        this.postponed = postponed;
        this.options = options;
        this.resume = require("react-dom/server.edge").resume;
    }
    async render(children) {
        const stream = await this.resume(children, this.postponed, this.options);
        return {
            stream
        };
    }
}
export class ServerRenderer {
    constructor(options){
        this.options = options;
        this.renderToReadableStream = require("react-dom/server.edge").renderToReadableStream;
    }
    async render(children) {
        const stream = await this.renderToReadableStream(children, this.options);
        return {
            stream
        };
    }
}
export function createStaticRenderer({ ppr, isStaticGeneration, postponed, streamOptions: { onError, onHeaders, maxHeadersLength, nonce, bootstrapScripts, formState } }) {
    if (ppr) {
        if (isStaticGeneration) {
            return new StaticRenderer({
                onError,
                onHeaders,
                maxHeadersLength,
                bootstrapScripts
            });
        }
        if (postponed) {
            return new StaticResumeRenderer(postponed, {
                onError,
                nonce
            });
        }
    }
    return new ServerRenderer({
        onError,
        onHeaders,
        maxHeadersLength,
        nonce,
        bootstrapScripts,
        formState
    });
}

//# sourceMappingURL=static-renderer.js.map