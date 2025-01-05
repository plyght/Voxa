// This has to be a shared module which is shared between client component error boundary and dynamic component
export const NEXT_DYNAMIC_NO_SSR_CODE = "NEXT_DYNAMIC_NO_SSR_CODE";
export function throwWithNoSSR() {
    const error = new Error(NEXT_DYNAMIC_NO_SSR_CODE);
    error.digest = NEXT_DYNAMIC_NO_SSR_CODE;
    throw error;
}

//# sourceMappingURL=no-ssr-error.js.map