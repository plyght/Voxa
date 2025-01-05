import type { getValidatedArgs } from './get-validated-args';
export type CliCommand = (args: ReturnType<typeof getValidatedArgs>) => void;
export declare const commandArgs: {
    [command: string]: () => Parameters<typeof getValidatedArgs>[0];
};
