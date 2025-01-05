/// <reference types="react" />
import type { ClientReferenceManifest } from '../../build/webpack/plugins/flight-manifest-plugin';
import type { FlightResponseRef } from './flight-response-ref';
/**
 * Render Flight stream.
 * This is only used for renderToHTML, the Flight response does not need additional wrappers.
 */
export declare function useFlightResponse(writable: WritableStream<Uint8Array>, flightStream: ReadableStream<Uint8Array>, clientReferenceManifest: ClientReferenceManifest, flightResponseRef: FlightResponseRef, formState: null | any, nonce?: string): Promise<JSX.Element>;
