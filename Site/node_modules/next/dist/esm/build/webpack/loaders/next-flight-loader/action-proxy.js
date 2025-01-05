/* eslint-disable import/no-extraneous-dependencies */ import { registerServerReference } from "react-server-dom-webpack/server.edge";
export function createActionProxy(id, action) {
    return registerServerReference(action, id, null);
}

//# sourceMappingURL=action-proxy.js.map