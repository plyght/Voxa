"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    trace: null,
    exportTraceState: null,
    flushAllTraces: null,
    getTraceEvents: null,
    initializeTraceState: null,
    recordTraceEvents: null,
    Span: null,
    setGlobal: null,
    SpanStatus: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    trace: function() {
        return _trace.trace;
    },
    exportTraceState: function() {
        return _trace.exportTraceState;
    },
    flushAllTraces: function() {
        return _trace.flushAllTraces;
    },
    getTraceEvents: function() {
        return _trace.getTraceEvents;
    },
    initializeTraceState: function() {
        return _trace.initializeTraceState;
    },
    recordTraceEvents: function() {
        return _trace.recordTraceEvents;
    },
    Span: function() {
        return _trace.Span;
    },
    setGlobal: function() {
        return _shared.setGlobal;
    },
    SpanStatus: function() {
        return _trace.SpanStatus;
    }
});
const _trace = require("./trace");
const _shared = require("./shared");

//# sourceMappingURL=index.js.map