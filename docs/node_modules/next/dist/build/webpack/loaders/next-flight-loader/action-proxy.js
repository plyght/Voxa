/* eslint-disable import/no-extraneous-dependencies */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createActionProxy", {
    enumerable: true,
    get: function() {
        return createActionProxy;
    }
});
const _serveredge = require("react-server-dom-webpack/server.edge");
function createActionProxy(id, action) {
    return (0, _serveredge.registerServerReference)(action, id, null);
}

//# sourceMappingURL=action-proxy.js.map