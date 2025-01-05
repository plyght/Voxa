"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validArgs", {
    enumerable: true,
    get: function() {
        return validArgs;
    }
});
const validArgs = {
    // Types
    "--help": Boolean,
    "--port": Number,
    "--hostname": String,
    "--keepAliveTimeout": Number,
    "--experimental-test-proxy": Boolean,
    // Aliases
    "-h": "--help",
    "-p": "--port",
    "-H": "--hostname"
};

//# sourceMappingURL=next-start-args.js.map