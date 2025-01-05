"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    renderToString: null,
    renderToStaticMarkup: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    renderToString: function() {
        return renderToString;
    },
    renderToStaticMarkup: function() {
        return renderToStaticMarkup;
    }
});
const ERROR_MESSAGE = "Internal Error: do not use legacy react-dom/server APIs. If you encountered this error, please open an issue on the Next.js repo.";
function renderToString() {
    throw new Error(ERROR_MESSAGE);
}
function renderToStaticMarkup() {
    throw new Error(ERROR_MESSAGE);
}

//# sourceMappingURL=noop-react-dom-server-legacy.js.map