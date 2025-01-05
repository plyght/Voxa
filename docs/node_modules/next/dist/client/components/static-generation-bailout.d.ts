import type { AppConfigDynamic } from '../../build/utils';
type BailoutOpts = {
    dynamic?: AppConfigDynamic;
    link?: string;
};
export type StaticGenerationBailout = (reason: string, opts?: BailoutOpts) => boolean | never;
export declare const staticGenerationBailout: StaticGenerationBailout;
export {};
