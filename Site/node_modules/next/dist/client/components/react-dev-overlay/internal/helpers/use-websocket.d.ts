/// <reference types="react" />
import type { HMR_ACTION_TYPES } from '../../../../../server/dev/hot-reloader-types';
export declare function useWebsocket(assetPrefix: string): import("react").MutableRefObject<WebSocket | undefined>;
export declare function useSendMessage(webSocketRef: ReturnType<typeof useWebsocket>): (data: string) => void;
export declare function useTurbopack(sendMessage: ReturnType<typeof useSendMessage>): (msg: HMR_ACTION_TYPES) => boolean;
export declare function useWebsocketPing(websocketRef: ReturnType<typeof useWebsocket>): void;
