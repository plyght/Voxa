import type { NextConfig } from '../server/config-shared';
export declare function validateTurboNextConfig({ dir, isDev, }: {
    allowRetry?: boolean;
    dir: string;
    port: number;
    hostname?: string;
    isDev?: boolean;
}): Promise<NextConfig>;
