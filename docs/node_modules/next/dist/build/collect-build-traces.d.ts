import { Span } from '../trace';
import type { NextConfigComplete } from '../server/config-shared';
import { type BuildTraceContext } from './webpack/plugins/next-trace-entrypoints-plugin';
import type { PageInfo } from './utils';
export declare function collectBuildTraces({ dir, config, distDir, pageInfos, staticPages, nextBuildSpan, hasSsrAmpPages, buildTraceContext, outputFileTracingRoot, }: {
    dir: string;
    distDir: string;
    staticPages: string[];
    hasSsrAmpPages: boolean;
    outputFileTracingRoot: string;
    pageInfos: [string, PageInfo][];
    nextBuildSpan?: Span;
    config: NextConfigComplete;
    buildTraceContext?: BuildTraceContext;
}): Promise<void>;
