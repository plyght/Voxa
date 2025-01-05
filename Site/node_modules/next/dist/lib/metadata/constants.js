"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    ViewportMetaKeys: null,
    IconKeys: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ViewportMetaKeys: function() {
        return ViewportMetaKeys;
    },
    IconKeys: function() {
        return IconKeys;
    }
});
const ViewportMetaKeys = {
    width: "width",
    height: "height",
    initialScale: "initial-scale",
    minimumScale: "minimum-scale",
    maximumScale: "maximum-scale",
    viewportFit: "viewport-fit",
    userScalable: "user-scalable",
    interactiveWidget: "interactive-widget"
};
const IconKeys = [
    "icon",
    "shortcut",
    "apple",
    "other"
];

//# sourceMappingURL=constants.js.map