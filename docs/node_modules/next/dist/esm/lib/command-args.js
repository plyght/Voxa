export const commandArgs = {
    build: ()=>require("../cli/next-build-args").validArgs,
    start: ()=>require("../cli/next-start-args").validArgs,
    export: ()=>require("../cli/next-export-args").validArgs,
    dev: ()=>require("../cli/next-dev-args").validArgs,
    lint: ()=>require("../cli/next-lint-args").validArgs,
    telemetry: ()=>require("../cli/next-telemetry-args").validArgs,
    info: ()=>require("../cli/next-info-args").validArgs,
    "experimental-compile": ()=>require("../cli/next-build-args").validArgs,
    "experimental-generate": ()=>require("../cli/next-build-args").validArgs
};

//# sourceMappingURL=command-args.js.map