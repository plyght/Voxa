"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    printAndExit: null,
    getDebugPort: null,
    getNodeOptionsWithoutInspect: null,
    getPort: null,
    RESTART_EXIT_CODE: null,
    checkNodeDebugType: null,
    getMaxOldSpaceSize: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    printAndExit: function() {
        return printAndExit;
    },
    getDebugPort: function() {
        return getDebugPort;
    },
    getNodeOptionsWithoutInspect: function() {
        return getNodeOptionsWithoutInspect;
    },
    getPort: function() {
        return getPort;
    },
    RESTART_EXIT_CODE: function() {
        return RESTART_EXIT_CODE;
    },
    checkNodeDebugType: function() {
        return checkNodeDebugType;
    },
    getMaxOldSpaceSize: function() {
        return getMaxOldSpaceSize;
    }
});
function printAndExit(message, code = 1) {
    if (code === 0) {
        console.log(message);
    } else {
        console.error(message);
    }
    process.exit(code);
}
const getDebugPort = ()=>{
    var _process_execArgv_find, _process_env_NODE_OPTIONS_match, _process_env_NODE_OPTIONS_match1, _process_env_NODE_OPTIONS;
    const debugPortStr = ((_process_execArgv_find = process.execArgv.find((localArg)=>localArg.startsWith("--inspect") || localArg.startsWith("--inspect-brk"))) == null ? void 0 : _process_execArgv_find.split("=", 2)[1]) ?? ((_process_env_NODE_OPTIONS = process.env.NODE_OPTIONS) == null ? void 0 : (_process_env_NODE_OPTIONS_match1 = _process_env_NODE_OPTIONS.match) == null ? void 0 : (_process_env_NODE_OPTIONS_match = _process_env_NODE_OPTIONS_match1.call(_process_env_NODE_OPTIONS, /--inspect(-brk)?(=(\S+))?( |$)/)) == null ? void 0 : _process_env_NODE_OPTIONS_match[3]);
    return debugPortStr ? parseInt(debugPortStr, 10) : 9229;
};
const NODE_INSPECT_RE = /--inspect(-brk)?(=\S+)?( |$)/;
function getNodeOptionsWithoutInspect() {
    return (process.env.NODE_OPTIONS || "").replace(NODE_INSPECT_RE, "");
}
function getPort(args) {
    if (typeof args["--port"] === "number") {
        return args["--port"];
    }
    const parsed = process.env.PORT && parseInt(process.env.PORT, 10);
    if (typeof parsed === "number" && !Number.isNaN(parsed)) {
        return parsed;
    }
    return 3000;
}
const RESTART_EXIT_CODE = 77;
function checkNodeDebugType() {
    var _process_env_NODE_OPTIONS_match, _process_env_NODE_OPTIONS, _process_env_NODE_OPTIONS_match1, _process_env_NODE_OPTIONS1;
    let nodeDebugType = undefined;
    if (process.execArgv.some((localArg)=>localArg.startsWith("--inspect")) || ((_process_env_NODE_OPTIONS = process.env.NODE_OPTIONS) == null ? void 0 : (_process_env_NODE_OPTIONS_match = _process_env_NODE_OPTIONS.match) == null ? void 0 : _process_env_NODE_OPTIONS_match.call(_process_env_NODE_OPTIONS, /--inspect(=\S+)?( |$)/))) {
        nodeDebugType = "inspect";
    }
    if (process.execArgv.some((localArg)=>localArg.startsWith("--inspect-brk")) || ((_process_env_NODE_OPTIONS1 = process.env.NODE_OPTIONS) == null ? void 0 : (_process_env_NODE_OPTIONS_match1 = _process_env_NODE_OPTIONS1.match) == null ? void 0 : _process_env_NODE_OPTIONS_match1.call(_process_env_NODE_OPTIONS1, /--inspect-brk(=\S+)?( |$)/))) {
        nodeDebugType = "inspect-brk";
    }
    return nodeDebugType;
}
function getMaxOldSpaceSize() {
    var _process_env_NODE_OPTIONS_match, _process_env_NODE_OPTIONS;
    const maxOldSpaceSize = (_process_env_NODE_OPTIONS = process.env.NODE_OPTIONS) == null ? void 0 : (_process_env_NODE_OPTIONS_match = _process_env_NODE_OPTIONS.match(/--max-old-space-size=(\d+)/)) == null ? void 0 : _process_env_NODE_OPTIONS_match[1];
    return maxOldSpaceSize ? parseInt(maxOldSpaceSize, 10) : undefined;
}

//# sourceMappingURL=utils.js.map