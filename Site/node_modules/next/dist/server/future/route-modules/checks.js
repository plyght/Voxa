"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    isAppRouteRouteModule: null,
    isAppPageRouteModule: null,
    isPagesRouteModule: null,
    isPagesAPIRouteModule: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isAppRouteRouteModule: function() {
        return isAppRouteRouteModule;
    },
    isAppPageRouteModule: function() {
        return isAppPageRouteModule;
    },
    isPagesRouteModule: function() {
        return isPagesRouteModule;
    },
    isPagesAPIRouteModule: function() {
        return isPagesAPIRouteModule;
    }
});
const _routekind = require("../route-kind");
function isAppRouteRouteModule(routeModule) {
    return routeModule.definition.kind === _routekind.RouteKind.APP_ROUTE;
}
function isAppPageRouteModule(routeModule) {
    return routeModule.definition.kind === _routekind.RouteKind.APP_PAGE;
}
function isPagesRouteModule(routeModule) {
    return routeModule.definition.kind === _routekind.RouteKind.PAGES;
}
function isPagesAPIRouteModule(routeModule) {
    return routeModule.definition.kind === _routekind.RouteKind.PAGES_API;
}

//# sourceMappingURL=checks.js.map