"use client";

import React from "react";
import { createSearchParamsBailoutProxy } from "./searchparams-bailout-proxy";
export default function StaticGenerationSearchParamsBailoutProvider(param) {
    let { Component, propsForComponent, isStaticGeneration } = param;
    if (isStaticGeneration) {
        const searchParams = createSearchParamsBailoutProxy();
        return /*#__PURE__*/ React.createElement(Component, {
            searchParams: searchParams,
            ...propsForComponent
        });
    }
    return /*#__PURE__*/ React.createElement(Component, propsForComponent);
}

//# sourceMappingURL=static-generation-searchparams-bailout-provider.js.map