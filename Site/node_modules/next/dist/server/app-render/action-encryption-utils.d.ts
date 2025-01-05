import type { ActionManifest } from '../../build/webpack/plugins/flight-client-entry-plugin';
import type { ClientReferenceManifest } from '../../build/webpack/plugins/flight-manifest-plugin';
export declare function arrayBufferToString(buffer: ArrayBuffer): string;
export declare function stringToUint8Array(binary: string): Uint8Array;
export declare function encrypt(key: CryptoKey, iv: Uint8Array, data: Uint8Array): Promise<ArrayBuffer>;
export declare function decrypt(key: CryptoKey, iv: Uint8Array, data: Uint8Array): Promise<ArrayBuffer>;
export declare function generateRandomActionKeyRaw(dev?: boolean): Promise<string>;
export declare function setReferenceManifestsSingleton({ clientReferenceManifest, serverActionsManifest, serverModuleMap, }: {
    clientReferenceManifest: ClientReferenceManifest;
    serverActionsManifest: ActionManifest;
    serverModuleMap: {
        [id: string]: {
            id: string;
            chunks: string[];
            name: string;
        };
    };
}): void;
export declare function getServerModuleMap(): {
    [id: string]: {
        id: string;
        chunks: string[];
        name: string;
    };
};
export declare function getClientReferenceManifestSingleton(): ClientReferenceManifest;
export declare function getActionEncryptionKey(): Promise<CryptoKey>;
