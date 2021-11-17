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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePartner = exports.updatePartner = exports.getPartner = exports.addPartner = exports.getPartners = void 0;
var Partner_1 = __importDefault(require("../models/Partner"));
var utils_1 = require("./utils");
var getPartners = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fromdate, todate, limit, offset, partners, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                fromdate = utils_1.sanitiseNumberQuery(req.query.fromdate, 0);
                todate = utils_1.sanitiseNumberQuery(req.query.todate, Date.now());
                limit = utils_1.sanitiseNumberQuery(req.query.limit, 500);
                offset = utils_1.sanitiseNumberQuery(req.query.offset, 0);
                return [4 /*yield*/, Partner_1.default.query()
                        // .withGraphJoined('float')
                        .where('createdOn', '>=', fromdate)
                        .andWhere('createdOn', '<=', todate)
                        .limit(limit)
                        .offset(offset)];
            case 1:
                partners = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'List of all partners.', { partners: partners })];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, utils_1.respondErr(res, 500, 'There was an issue processing your request.', null, { error: error_1 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPartners = getPartners;
var addPartner = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var b, now, createPartner, partner, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                b = req.body;
                now = Date.now();
                createPartner = {
                    preferredName: b.preferredName || null,
                    firstName: b.firstName || 'Unknown Partner',
                    middleNames: b.middleNames || null,
                    lastName: b.lastName || null,
                    pending: b.hasOwnProperty('pending') ? b.pending : true,
                    createdOn: now,
                    updatedOn: now,
                    tillNumber: b.tillNumber || null,
                };
                if (!b.firstName)
                    createPartner.pending = true;
                return [4 /*yield*/, Partner_1.default.query().insert(createPartner)];
            case 1:
                partner = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Partner created successfully.', { partner: partner })];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, utils_1.respondErr(res, 500, 'There was an issue processing your request.', null, { error: error_2 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addPartner = addPartner;
var getPartner = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, multiPartner, partner, splitMultiPartner, partner, partner, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                id = req.params.id;
                multiPartner = req.query.partner;
                console.log({ id: id, multiPartner: multiPartner });
                if (!id)
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Not id provided or invalid id. Unable to process request.', null, null)];
                if (!(id === 'details' && multiPartner)) return [3 /*break*/, 6];
                if (!multiPartner || typeof multiPartner === undefined) {
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Please provide a valid id or list of ids as a url query, for example "?partner=2,3,4"', null, null)];
                }
                if (!Array.isArray(multiPartner)) return [3 /*break*/, 2];
                return [4 /*yield*/, Partner_1.default.query()
                        // .withGraphJoined('float')
                        .whereIn('partners.id', multiPartner)];
            case 1:
                partner = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Details for provided id including float amount.', { partner: partner })];
            case 2:
                if (!(/,/gi.test(multiPartner) || /[0-9]/gi.test(multiPartner))) return [3 /*break*/, 4];
                splitMultiPartner = multiPartner.split(',');
                return [4 /*yield*/, Partner_1.default.query()
                        // .withGraphJoined('float')
                        .whereIn('partners.id', splitMultiPartner)];
            case 3:
                partner = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Details for provided id including float amount.', { partner: partner })];
            case 4: return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Please provide a valid id or list of ids as a url query, for example "?partner=2,3,4"', null, null)];
            case 5: return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, Partner_1.default.query()
                    // .withGraphJoined('float')
                    .where('partners.id', Number(id))];
            case 7:
                partner = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Details for provided id including float amount.', { partner: partner })];
            case 8: return [3 /*break*/, 10];
            case 9:
                error_3 = _a.sent();
                return [2 /*return*/, utils_1.respondErr(res, 500, 'There was an issue processing your request.', null, { error: error_3 })];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.getPartner = getPartner;
var updatePartner = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var oldPartner, b, updateDetails, partner, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Partner_1.default.query().findById(req.params.id)];
            case 1:
                oldPartner = _a.sent();
                if (!oldPartner)
                    return [2 /*return*/, utils_1.respondBadRequest(res, null, 'No Partner was found for the ID provided.', null, { id: req.params.id })];
                b = req.body;
                updateDetails = {
                    preferredName: b.preferredName || oldPartner.preferredName || null,
                    firstName: b.firstName || oldPartner.firstName || 'Unknown Partner',
                    middleNames: b.middleNames || oldPartner.middleNames || null,
                    lastName: b.lastName || oldPartner.lastName || null,
                    pending: b.hasOwnProperty('pending') ? b.pending : oldPartner.pending,
                    updatedOn: Date.now(),
                    tillNumber: b.tillNumber || oldPartner.tillNumber || 'No Till Number'
                };
                return [4 /*yield*/, Partner_1.default
                        // @ts-ignore
                        .patchAndFetchById(req.body.id, updateDetails)];
            case 2:
                partner = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Partner updated successfully.', { partner: partner })];
            case 3:
                error_4 = _a.sent();
                return [2 /*return*/, utils_1.respondErr(res, 500, 'There was an issue processing your request.', null, { error: error_4 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updatePartner = updatePartner;
var deletePartner = function (req, res) {
    try {
        var partner = Partner_1.default
            // @ts-ignore
            .patchAndFetchById(req.params.id, {
            deleted: true,
            deletedById: 1,
            updated: Date.now()
        });
        if (!partner) {
            return utils_1.respondErr(res, 500, 'There was an issue deleting the partner.', null, { partner: partner });
        }
        return utils_1.respondWell(res, 200, null, 'Partner deleted successfully.', { partner: partner });
    }
    catch (error) {
        return utils_1.respondErr(res, 500, 'There was an issue processing your request.', null, { error: error });
    }
};
exports.deletePartner = deletePartner;
//# sourceMappingURL=partnerRoutes.js.map