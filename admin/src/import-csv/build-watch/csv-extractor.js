"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCsvData = exports.getCsvData = exports.processCsvFile = void 0;
var papaparse_1 = require("papaparse");
var lensPath_1 = __importDefault(require("ramda/src/lensPath"));
var over_1 = __importDefault(require("ramda/src/over"));
var setObjectValue = function (object, path, value) {
    var lensPathFunction = lensPath_1.default(path.split("."));
    return over_1.default(lensPathFunction, function () { return value; }, object || {});
};
function processCsvFile(file, parseConfig) {
    if (parseConfig === void 0) { parseConfig = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var csvData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!file) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, getCsvData(file, parseConfig)];
                case 1:
                    csvData = _a.sent();
                    return [2 /*return*/, processCsvData(csvData)];
            }
        });
    });
}
exports.processCsvFile = processCsvFile;
function getCsvData(file, inputConfig) {
    if (inputConfig === void 0) { inputConfig = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var config, isObject;
        return __generator(this, function (_a) {
            config = {};
            isObject = !!inputConfig && typeof inputConfig === "object";
            if (isObject) {
                config = inputConfig;
            }
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    return papaparse_1.parse(file, __assign(__assign({ 
                        // Defaults
                        delimiter: ",", skipEmptyLines: true }, config), { 
                        // Callbacks
                        complete: function (result) { return resolve(result.data); }, error: function (error) { return reject(error); } }));
                })];
        });
    });
}
exports.getCsvData = getCsvData;
function processCsvData(data) {
    if (Array.isArray(data[0])) {
        var topRowKeys_1 = data[0];
        var dataRows = data.slice(1).map(function (row) {
            var value = {};
            topRowKeys_1.forEach(function (key, index) {
                value = setObjectValue(value, key, row[index]);
            });
            return value;
        });
        return dataRows;
    }
    else {
        var dataRows_1 = [];
        data.forEach(function (obj) {
            var value = {};
            for (var key in obj)
                value = setObjectValue(value, key, obj[key]);
            dataRows_1.push(value);
        });
        return dataRows_1;
    }
}
exports.processCsvData = processCsvData;
//# sourceMappingURL=csv-extractor.js.map