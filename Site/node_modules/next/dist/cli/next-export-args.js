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
    "--silent": Boolean,
    "--outdir": String,
    "--threads": Number,
    // Aliases
    "-h": "--help",
    "-o": "--outdir",
    "-s": "--silent"
};

//# sourceMappingURL=next-export-args.js.map