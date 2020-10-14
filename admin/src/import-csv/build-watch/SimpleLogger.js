"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleLogger = void 0;
var SimpleLogger = /** @class */ (function () {
    function SimpleLogger(prefix, debug) {
        this.prefix = prefix;
        this.debug = debug;
        this.loggerID = Math.random()
            .toString(32)
            .slice(2, 6);
    }
    SimpleLogger.prototype.getLogString = function () {
        return "\uD83C\uDF1F react-admin-import-csv:: " + this.prefix + " [" + this.loggerID + "] ";
    };
    Object.defineProperty(SimpleLogger.prototype, "log", {
        get: function () {
            if (!this.debug) {
                return function () {
                    var any = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        any[_i] = arguments[_i];
                    }
                };
            }
            var boundLogFn = console.log.bind(console, this.getLogString());
            return boundLogFn;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SimpleLogger.prototype, "warn", {
        get: function () {
            if (!this.debug) {
                return function () {
                    var any = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        any[_i] = arguments[_i];
                    }
                };
            }
            var boundLogFn = console.warn.bind(console, this.getLogString());
            return boundLogFn;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SimpleLogger.prototype, "error", {
        get: function () {
            if (!this.debug) {
                return function () {
                    var any = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        any[_i] = arguments[_i];
                    }
                };
            }
            var boundLogFn = console.error.bind(console, this.getLogString());
            return boundLogFn;
        },
        enumerable: false,
        configurable: true
    });
    SimpleLogger.prototype.setEnabled = function (logging) {
        this.debug = logging;
    };
    return SimpleLogger;
}());
exports.SimpleLogger = SimpleLogger;
//# sourceMappingURL=SimpleLogger.js.map