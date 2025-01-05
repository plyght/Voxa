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
const validEslintArgs = {
    // Types
    "--config": String,
    "--ext": [
        String
    ],
    "--resolve-plugins-relative-to": String,
    "--rulesdir": [
        String
    ],
    "--fix": Boolean,
    "--fix-type": [
        String
    ],
    "--ignore-path": String,
    "--no-ignore": Boolean,
    "--quiet": Boolean,
    "--max-warnings": Number,
    "--no-inline-config": Boolean,
    "--report-unused-disable-directives": String,
    "--cache": Boolean,
    "--no-cache": Boolean,
    "--cache-location": String,
    "--cache-strategy": String,
    "--error-on-unmatched-pattern": Boolean,
    "--format": String,
    "--output-file": String,
    // Aliases
    "-c": "--config",
    "-f": "--format",
    "-o": "--output-file"
};
const validArgs = {
    // Types
    "--help": Boolean,
    "--base-dir": String,
    "--dir": [
        String
    ],
    "--file": [
        String
    ],
    "--strict": Boolean,
    // Aliases
    "-h": "--help",
    "-b": "--base-dir",
    "-d": "--dir",
    ...validEslintArgs
};

//# sourceMappingURL=next-lint-args.js.map