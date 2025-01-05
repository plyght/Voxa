// TODO: Remove use of `any` type.
import { initialize, version, router, emitter } from "./";
import initHMR from "./dev/hot-middleware-client";
import "./setup-hydration-warning";
import { pageBootrap } from "./page-bootstrap";
import { addMessageListener, sendMessage } from "./dev/error-overlay/websocket";
//@ts-expect-error requires "moduleResolution": "node16" in tsconfig.json and not .ts extension
import { connect } from "@vercel/turbopack-ecmascript-runtime/dev/client/hmr-client.ts";
window.next = {
    version: "" + version + "-turbo",
    // router is initialized later so it has to be live-binded
    get router () {
        return router;
    },
    emitter
};
self.__next_set_public_path__ = ()=>{};
self.__webpack_hash__ = "";
const devClient = initHMR("turbopack");
initialize({
    devClient
}).then((param)=>{
    let { assetPrefix } = param;
    self.__turbopack_load_page_chunks__ = (page, chunksData)=>{
        const chunkPromises = chunksData.map(__turbopack_load__);
        Promise.all(chunkPromises).catch((err)=>console.error("failed to load chunks for page " + page, err));
    };
    connect({
        addMessageListener (cb) {
            addMessageListener((msg)=>{
                var _msg_type;
                if (!("type" in msg)) {
                    return;
                }
                // Only call Turbopack's message listener for turbopack messages
                if ((_msg_type = msg.type) == null ? void 0 : _msg_type.startsWith("turbopack-")) {
                    cb(msg);
                }
            });
        },
        sendMessage
    });
    return pageBootrap(assetPrefix);
}).catch((err)=>{
    console.error("Error was not caught", err);
});

//# sourceMappingURL=next-dev-turbopack.js.map