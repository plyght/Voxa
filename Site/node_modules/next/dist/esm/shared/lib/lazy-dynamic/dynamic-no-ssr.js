"use client";

import { throwWithNoSSR } from "./no-ssr-error";
export function NoSSR(param) {
    let { children } = param;
    if (typeof window === "undefined") {
        throwWithNoSSR();
    }
    return children;
}

//# sourceMappingURL=dynamic-no-ssr.js.map