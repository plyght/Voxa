"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "normalizeCatchAllRoutes", {
    enumerable: true,
    get: function() {
        return normalizeCatchAllRoutes;
    }
});
const _apppathnamenormalizer = require("../server/future/normalizers/built/app/app-pathname-normalizer");
function normalizeCatchAllRoutes(appPaths, normalizer = new _apppathnamenormalizer.AppPathnameNormalizer()) {
    const catchAllRoutes = [
        ...new Set(Object.values(appPaths).flat().filter(isCatchAllRoute)// Sorting is important because we want to match the most specific path.
        .sort((a, b)=>b.split("/").length - a.split("/").length))
    ];
    for (const appPath of Object.keys(appPaths)){
        for (const catchAllRoute of catchAllRoutes){
            const normalizedCatchAllRoute = normalizer.normalize(catchAllRoute);
            const normalizedCatchAllRouteBasePath = normalizedCatchAllRoute.slice(0, normalizedCatchAllRoute.search(catchAllRouteRegex));
            if (// first check if the appPath could match the catch-all
            appPath.startsWith(normalizedCatchAllRouteBasePath) && // then check if there's not already a slot value that could match the catch-all
            !appPaths[appPath].some((path)=>hasMatchedSlots(path, catchAllRoute))) {
                appPaths[appPath].push(catchAllRoute);
            }
        }
    }
}
function hasMatchedSlots(path1, path2) {
    const slots1 = path1.split("/").filter((segment)=>segment.startsWith("@"));
    const slots2 = path2.split("/").filter((segment)=>segment.startsWith("@"));
    if (slots1.length !== slots2.length) return false;
    for(let i = 0; i < slots1.length; i++){
        if (slots1[i] !== slots2[i]) return false;
    }
    return true;
}
const catchAllRouteRegex = /\[?\[\.\.\./;
function isCatchAllRoute(pathname) {
    return pathname.includes("[...") || pathname.includes("[[...");
}

//# sourceMappingURL=normalize-catchall-routes.js.map