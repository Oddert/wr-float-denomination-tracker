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
exports.deleteCount = exports.updateCount = exports.getCount = exports.addCount = exports.getCounts = void 0;
var Count_1 = __importDefault(require("../models/Count"));
var utils_1 = require("./utils");
// const completeCount = {"bagged":{"pence_one":500,"pence_two":300,"pence_five":2000,"pence_ten":1000,"pence_twenty":7000,"pence_fifty":3000,"pound_one":18000,"pound_two":10000,"note_five":1000,"total":42800},"loose":{"pence_one":164,"pence_two":200,"pence_five":1425,"pence_ten":1370,"pence_twenty":600,"pence_fifty":2450,"pound_one":6100,"pound_two":400,"other":0,"total":12709},"notes":{"note_one":0,"note_five":7500,"note_ten":24000,"note_twenty":12000,"note_fifty":5000,"total":48500},"total":0}
// const partialCount = {"bagged":{"pence_one":800,"pence_two":300,"pence_five":3500,"pence_ten":4500,"pence_twenty":1000,"pence_fifty":1000,"pound_one":12000,"pound_two":4000,"note_five":0,"total":27100},"loose":{"pence_one":0,"pence_two":0,"pence_five":0,"pence_ten":0,"pence_twenty":0,"pence_fifty":0,"pound_one":0,"pound_two":0,"other":0,"total":0},"notes":{"note_one":0,"note_five":0,"note_ten":0,"note_twenty":0,"note_fifty":5000,"total":5000},"total":0}
// const incompleteCount = {"bagged":{"pence_one":0,"pence_two":300,"pence_five":3500,"pence_ten":0,"pence_twenty":0,"pence_fifty":1000,"pound_one":12000,"pound_two":4000,"note_five":0,"total":20800},"loose":{"pence_one":0,"pence_two":0,"pence_five":0,"pence_ten":0,"pence_twenty":0,"pence_fifty":0,"pound_one":0,"pound_two":0,"other":0,"total":0},"notes":{"note_one":0,"note_five":0,"note_ten":0,"note_twenty":0,"note_fifty":5000,"total":5000},"total":0}
// const unverifiedCount = {"bagged":{"pence_one":400,"pence_two":200,"pence_five":4000,"pence_ten":1000,"pence_twenty":2000,"pence_fifty":9000,"pound_one":8000,"pound_two":12000,"note_five":0,"total":36600},"loose":{"pence_one":0,"pence_two":0,"pence_five":0,"pence_ten":0,"pence_twenty":0,"pence_fifty":0,"pound_one":0,"pound_two":0,"other":0,"total":0},"notes":{"note_one":0,"note_five":0,"note_ten":0,"note_twenty":0,"note_fifty":5000,"total":5000},"total":0}
// const counts: any[] = [
// 	{ repository: '403', status: 'complete', timestamp: 1616094172738, _id: 'fen3fuh43f8hf2h2fh87h', data: completeCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// 	{ repository: '401', status: 'complete', timestamp: 1616094172738, _id: 'xm3rgm439x8ug9348cg98', data: completeCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// 	{ repository: '403', status: 'incomplete', timestamp: 1616094172738 - 14863542, _id: 'oiweiowenfbnowg093893', data: partialCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// 	{ repository: '401', status: 'unverified', timestamp: 1616094172738 - 248635424, _id: 'aldpqwomcpm2f2309j0jv', data: incompleteCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// 	{ repository: 'lotto', status: 'incomplete', timestamp: 1616094172738 - 348635424, _id: 'p0kd209xxf3349c3094gj', data: completeCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// 	{ repository: '403', status: 'partial', timestamp: 1616094172738 - 442635424, _id: '02j3f092j3fj8r9232222', data: partialCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// 	{ repository: '401', status: 'partial', timestamp: 1616094172738 - 442635424, _id: '09jf92ehfn9hfpe38hhf3', data: partialCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// 	{ repository: '403', status: 'complete', timestamp: 1616094172738 - 493685464, _id: 'f32ojf093jtx0k4ugx384', data: completeCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// 	{ repository: '403', status: 'complete', timestamp: 1616094172738 - 492685464, _id: '3ncty3oky4toy3ohc8234', data: completeCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// 	{ repository: 'lotto', status: 'complete', timestamp: 1616094172738 - 552635424, _id: '3rx394w5xh34xt43g34gq', data: completeCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// 	{ repository: 'lotto', status: 'unverified', timestamp: 1616094172738 - 862635424, _id: 'eg9crw1g8rw6tb24r9t84', data: unverifiedCount, counter: "", supervisor: "", verified: true },
// 	{ repository: '403', status: 'complete', timestamp: 1616094172738 - 89234245, _id: 'fj9839g34tmc0h4thcg03', data: incompleteCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// ]  
// const createId = () => {
// 	const one = () => {
// 		const lower = () => String.fromCharCode(Math.floor((Math.random() * 26) + 97))
// 		const upper = () => String.fromCharCode(Math.floor((Math.random() * 26) + 65))
// 		const num = () => String.fromCharCode(Math.floor((Math.random() * 10) + 48))
// 		const options = [lower, upper, num]
// 		return options[Math.floor(Math.random() * 3)]()
// 	}
// 	let str = ''
// 	for (let i=0; i<21; i++) {str += one()}
// 	return str
// }
function sanitiseNumberQuery(param, fallback) {
    var paramCoerced = Number(param);
    if (typeof paramCoerced !== 'number' || isNaN(paramCoerced))
        return fallback;
    else
        return paramCoerced;
}
// Redux : true
// Action : countsDataWriteAll
// Logic : /Counts
var getCounts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, pagelength, counts, fromdate, todate, limit, offset, counts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                page = Number(req.query.page);
                if (!(typeof page === 'number' || !isNaN(page))) return [3 /*break*/, 2];
                pagelength = sanitiseNumberQuery(req.query.pagelength, 20);
                return [4 /*yield*/, Count_1.default.query()
                        .offset(page * pagelength)
                        .limit(pagelength)];
            case 1:
                counts = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, null, null, 'noice', { counts: counts })];
            case 2:
                fromdate = sanitiseNumberQuery(req.query.fromdate, 0);
                todate = sanitiseNumberQuery(req.query.todate, Date.now());
                limit = sanitiseNumberQuery(req.query.limit, 500);
                offset = sanitiseNumberQuery(req.query.offset, 0);
                return [4 /*yield*/, Count_1.default.query()
                        // .withGraphJoined('float')
                        .where('createdOn', '>=', fromdate)
                        .andWhere('createdOn', '<=', todate)
                        .limit(limit)
                        .offset(offset)];
            case 3:
                counts = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, null, null, 'noice', { counts: counts })];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                return [2 /*return*/, utils_1.respondErr(res, 500, 'There was a server error, please try again.', null, { error: error_1 })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getCounts = getCounts;
// Redux : false
// Action : countsDataWriteSingle
// Logic : false
var addCount = function (req, res) {
    // const _id = createId()
    // const { repository, status, date, data } = req.body
    // const count: any = { repository, status, date, data, _id }
    // counts.push(count)
    // res.json({
    // 	counts,
    // })
};
exports.addCount = addCount;
// Redux : n/a
// Action : n/a
// Logic : /Count/index
var getCount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, multiCount, count, splitMultiCount, count, count;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                multiCount = req.query.count;
                console.log({ id: id, multiCount: multiCount });
                if (!id)
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Not id provided or invalid id. Unable to process request.', null, null)];
                if (!(id === 'details' && multiCount)) return [3 /*break*/, 6];
                if (!multiCount || typeof multiCount === undefined) {
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Please provide a valid id or list of ids as a url query, for example "?count=2,3,4"', null, null)];
                }
                if (!Array.isArray(multiCount)) return [3 /*break*/, 2];
                return [4 /*yield*/, Count_1.default.query()
                        .withGraphJoined('float')
                        .whereIn('counts.id', multiCount)];
            case 1:
                count = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Details for provided id including float amount.', { count: count })];
            case 2:
                if (!/,/gi.test(multiCount)) return [3 /*break*/, 4];
                splitMultiCount = multiCount.split(',');
                return [4 /*yield*/, Count_1.default.query()
                        .withGraphJoined('float')
                        .whereIn('counts.id', splitMultiCount)];
            case 3:
                count = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Details for provided id including float amount.', { count: count })];
            case 4: return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Please provide a valid id or list of ids as a url query, for example "?count=2,3,4"', null, null)];
            case 5: return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, Count_1.default.query()
                    .withGraphJoined('float')
                    .where('counts.id', Number(id))];
            case 7:
                count = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Details for provided id including float amount.', { count: count })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.getCount = getCount;
// Redux : false
// Action : countsDataUpdateSingle
// Logic : false
var updateCount = function (req, res) {
    console.log("[updateCount]: Pretend that i'm updating: " + req.body._id);
    // res.json({ counts })
};
exports.updateCount = updateCount;
// Redux : false
// Action : false
// Logic : false
var deleteCount = function (req, res) {
    console.log("[updateCount]: Pretend that i'm deleting: " + req.body._id);
    // res.json({ counts })
};
exports.deleteCount = deleteCount;
//# sourceMappingURL=countRoutes.js.map