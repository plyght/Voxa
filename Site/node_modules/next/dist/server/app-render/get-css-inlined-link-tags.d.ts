import type { ClientReferenceManifest } from '../../build/webpack/plugins/flight-manifest-plugin';
/**
 * Get external stylesheet link hrefs based on server CSS manifest.
 */
export declare function getLinkAndScriptTags(clientReferenceManifest: ClientReferenceManifest, filePath: string, injectedCSS: Set<string>, injectedScripts: Set<string>, collectNewImports?: boolean): {
    styles: string[];
    scripts: string[];
};
