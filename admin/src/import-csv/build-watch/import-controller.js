"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCSVItems = exports.CheckCSVValidation = exports.GetIdsColliding = void 0;
var csv_extractor_1 = require("./csv-extractor");
var SimpleLogger_1 = require("./SimpleLogger");
function makeLogger(logging) {
    var logger = new SimpleLogger_1.SimpleLogger("import-controller", true);
    logger.setEnabled(logging);
    return logger;
}
function GetIdsColliding(logging, translate, dataProvider, csvValues, resourceName) {
    return __awaiter(this, void 0, void 0, function () {
        var logger, hasIds, ids, recordsColliding, recordIdsColliding, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger = makeLogger(logging);
                    hasIds = csvValues.some(function (v) { return v.id; });
                    if (!hasIds) {
                        return [2 /*return*/, []];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    ids = csvValues.filter(function (v) { return !!v.id; }).map(function (v) { return v.id + ''; });
                    return [4 /*yield*/, dataProvider.getMany(resourceName, {
                            ids: ids,
                        })];
                case 2:
                    recordsColliding = _a.sent();
                    recordIdsColliding = recordsColliding.data.map(function (r) { return r.id + ''; });
                    return [2 /*return*/, recordIdsColliding];
                case 3:
                    error_1 = _a.sent();
                    logger.error("GetIdsColliding", { csvValues: csvValues }, error_1);
                    throw translate("csv.parsing.collidingIds");
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.GetIdsColliding = GetIdsColliding;
function CheckCSVValidation(logging, translate, csvValues, validateRow) {
    return __awaiter(this, void 0, void 0, function () {
        var logger, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger = makeLogger(logging);
                    if (!validateRow) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.all(csvValues.map(function (v) { return validateRow(v); }))];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    logger.error("onFileAdded", { csvValues: csvValues }, error_2);
                    throw translate("csv.parsing.failedValidateRow");
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.CheckCSVValidation = CheckCSVValidation;
function GetCSVItems(logging, translate, file, parseConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var logger, csvValues, csvValues_1, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger = makeLogger(logging);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, csv_extractor_1.processCsvFile(file, parseConfig)];
                case 2:
                    csvValues_1 = _a.sent();
                    return [2 /*return*/, csvValues_1];
                case 3:
                    error_3 = _a.sent();
                    logger.error("onFileAdded", { csvValues: csvValues }, error_3);
                    throw translate("csv.parsing.invalidCsvDocument");
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.GetCSVItems = GetCSVItems;
//# sourceMappingURL=import-controller.js.map