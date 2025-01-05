export declare function logStartInfo({ networkUrl, appUrl, envInfo, expFeatureInfo, maxExperimentalFeatures, }: {
    networkUrl: string | null;
    appUrl: string | null;
    envInfo?: string[];
    expFeatureInfo?: string[];
    maxExperimentalFeatures?: number;
}): void;
export declare function getStartServerInfo(dir: string): Promise<{
    envInfo?: string[];
    expFeatureInfo?: string[];
}>;
