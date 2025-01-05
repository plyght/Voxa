import type arg from 'next/dist/compiled/arg/index.js';
export declare function printAndExit(message: string, code?: number): void;
export declare const getDebugPort: () => number;
export declare function getNodeOptionsWithoutInspect(): string;
export declare function getPort(args: arg.Result<arg.Spec>): number;
export declare const RESTART_EXIT_CODE = 77;
export declare function checkNodeDebugType(): string | undefined;
export declare function getMaxOldSpaceSize(): number | undefined;
