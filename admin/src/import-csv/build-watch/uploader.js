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
exports.update = exports.create = void 0;
var SimpleLogger_1 = require("./SimpleLogger");
var logger = new SimpleLogger_1.SimpleLogger("uploader", false);
function create(logging, dataProvider, resource, values, preCommitCallback, postCommitCallback) {
    return __awaiter(this, void 0, void 0, function () {
        var parsedValues, reportItems, shouldReject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parsedValues = preCommitCallback
                        ? preCommitCallback("create", values)
                        : values;
                    return [4 /*yield*/, createInDataProvider(logging, dataProvider, resource, parsedValues)];
                case 1:
                    reportItems = _a.sent();
                    if (postCommitCallback) {
                        postCommitCallback(reportItems);
                    }
                    shouldReject = !postCommitCallback && reportItems.some(function (r) { return !r.success; });
                    if (shouldReject) {
                        return [2 /*return*/, Promise.reject(reportItems.map(function (r) { return r.response; }))];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.create = create;
function update(logging, dataProvider, resource, values, preCommitCallback, postCommitCallback) {
    return __awaiter(this, void 0, void 0, function () {
        var parsedValues, reportItems, shouldReject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parsedValues = preCommitCallback
                        ? preCommitCallback("create", values)
                        : values;
                    return [4 /*yield*/, updateInDataProvider(logging, dataProvider, resource, parsedValues)];
                case 1:
                    reportItems = _a.sent();
                    if (postCommitCallback) {
                        postCommitCallback(reportItems);
                    }
                    shouldReject = !postCommitCallback && reportItems.some(function (r) { return !r.success; });
                    if (shouldReject) {
                        return [2 /*return*/, Promise.reject(reportItems.map(function (r) { return r.response; }))];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.update = update;
function createInDataProvider(logging, dataProvider, resource, values) {
    return __awaiter(this, void 0, void 0, function () {
        var reportItems, error_1, shouldUseFallback, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger.setEnabled(logging);
                    logger.log("addInDataProvider", { dataProvider: dataProvider, resource: resource, values: values });
                    reportItems = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 8]);
                    return [4 /*yield*/, dataProvider.createMany(resource, { data: values })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 3:
                    error_1 = _a.sent();
                    shouldUseFallback = error_1.toString().includes("Unknown dataProvider");
                    if (!shouldUseFallback) return [3 /*break*/, 7];
                    logger.log("addInDataProvider", "createMany not found on provider: using fallback");
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, createInDataProviderFallback(dataProvider, resource, values)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    error_2 = _a.sent();
                    logger.error("addInDataProvider", error_2);
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 8];
                case 8: return [2 /*return*/, reportItems];
            }
        });
    });
}
function createInDataProviderFallback(dataProvider, resource, values) {
    return __awaiter(this, void 0, void 0, function () {
        var reportItems;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reportItems = [];
                    return [4 /*yield*/, Promise.all(values.map(function (value) {
                            return dataProvider
                                .create(resource, { data: value })
                                .then(function (res) {
                                return reportItems.push({ value: value, success: true, response: res });
                            })
                                .catch(function (err) { return reportItems.push({ value: value, success: false, err: err }); });
                        }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, reportItems];
            }
        });
    });
}
function updateInDataProvider(logging, dataProvider, resource, values) {
    return __awaiter(this, void 0, void 0, function () {
        var ids, reportItems;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ids = values.map(function (v) { return v.id; });
                    logger.setEnabled(logging);
                    logger.log("updateInDataProvider", {
                        dataProvider: dataProvider,
                        resource: resource,
                        values: values,
                        logging: logging,
                        ids: ids,
                    });
                    reportItems = [];
                    return [4 /*yield*/, dataProvider
                            .updateMany(resource, { ids: ids, data: values })
                            .then(function (res) {
                            return reportItems.push({ value: values, success: true, response: res });
                        })
                            .catch(function (err) { return reportItems.push({ value: values, success: false, err: err }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, reportItems];
            }
        });
    });
}
//# sourceMappingURL=uploader.js.map