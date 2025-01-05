/// <reference types="node" />
import type { IncomingHttpHeaders } from 'http';
import type { NextParsedUrlQuery } from './request-meta';
export declare function stripInternalQueries(query: NextParsedUrlQuery): void;
export declare function stripInternalSearchParams<T extends string | URL>(url: T, isEdge: boolean): T;
/**
 * Strip internal headers from the request headers.
 *
 * @param headers the headers to strip of internal headers
 */
export declare function stripInternalHeaders(headers: IncomingHttpHeaders): void;
