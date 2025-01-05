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
    "--profile": Boolean,
    "--debug": Boolean,
    "--no-lint": Boolean,
    "--no-mangling": Boolean,
    "--experimental-app-only": Boolean,
    "--experimental-turbo": Boolean,
    "--experimental-turbo-root": String,
    "--build-mode": String,
    // Aliases
    "-h": "--help",
    "-d": "--debug"
};

//# sourceMappingURL=next-build-args.js.map