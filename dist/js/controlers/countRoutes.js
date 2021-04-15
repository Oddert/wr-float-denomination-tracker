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
exports.deleteCount = exports.updateCount = exports.getCount = exports.addCount = exports.getCounts = void 0;
// import { PartialModelObject } from 'objection'
var Repository_1 = __importDefault(require("../models/Repository"));
var Count_1 = __importDefault(require("../models/Count"));
var Partner_1 = __importDefault(require("../models/Partner"));
var Float_1 = __importDefault(require("../models/Float"));
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
                return [2 /*return*/, utils_1.respondWell(res, null, null, 'List of all counts.', { counts: counts })];
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
var addCount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var repositoryId, repository, validation, counterId, counter, counterQuery, now_1, preferredName, createCounter, createdCounter, supervisorId, supervisor, supervisorQuery, now_2, preferredName, createSupervisor, createdSupervisor, d, flattenCountData, bagTotal, looseTotal, noteTotal, createFloat, floatId, now, createCount, count, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, , 11]);
                if (!req.body || !req.body.count)
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Error: no count provided?? What were you expecting? ??', null, { requestBody: req.body })];
                if (!req.body.count.repositoryId)
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Error: Invalid repository ID provided', null, { repositoryId: req.body.count.repositoryId })];
                repositoryId = Number(req.body.count.repositoryId);
                if (typeof repositoryId !== 'number' || isNaN(repositoryId)) {
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Bad request. The count provided was invalid. Repository ID provided was missing or could not be matched to an existing repository.', null, { repositoryId: repositoryId })];
                }
                return [4 /*yield*/, Repository_1.default.query()
                        .select('id')
                        .skipUndefined()
                        .where('id', req.body.count.repositoryId)];
            case 1:
                repository = _a.sent();
                if (repository === null || repository === undefined || repository.length === 0) {
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Bad request. The count provided was invalid. Repository ID provided was missing or could not be matched to an existing repository.', null, { repository: repository, repositoryId: repositoryId })];
                }
                validation = utils_1.validateCount(req.body.count);
                if (validation.code === 'invalid') {
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Bad request. The count provided was invalid.', null, { validation: validation })];
                }
                counterId = req.body.count.counterId;
                counter = req.body.count.counter;
                return [4 /*yield*/, Partner_1.default.query()
                        .select('id')
                        .skipUndefined()
                        .where('id', counterId)];
            case 2:
                counterQuery = _a.sent();
                if (!(!counterId || isNaN(Number(counterId)) || !counterQuery || counterQuery.length === 0)) return [3 /*break*/, 4];
                res.json('joing to make a new user');
                now_1 = Date.now();
                preferredName = (/[a-zA-Z]+/gi.test(counter) && counter !== undefined) ? counter : 'Unknown Partner';
                createCounter = {
                    preferredName: preferredName,
                    firstName: '',
                    middleNames: '',
                    lastName: '',
                    pending: true,
                    createdOn: now_1,
                    updatedOn: now_1,
                    tillNumber: ''
                };
                return [4 /*yield*/, Partner_1.default.query().insert(createCounter)
                    // @ts-ignore
                ];
            case 3:
                createdCounter = _a.sent();
                // @ts-ignore
                console.log({ createdCounter: createdCounter }, createdCounter.id);
                // @ts-ignore
                if (createdCounter && createdCounter.id) {
                    // @ts-ignore			
                    counterId = createdCounter.id;
                }
                _a.label = 4;
            case 4:
                supervisorId = req.body.count.supervisorId;
                supervisor = req.body.count.supervisor;
                return [4 /*yield*/, Partner_1.default.query()
                        .select('id')
                        .skipUndefined()
                        .where('id', supervisorId)];
            case 5:
                supervisorQuery = _a.sent();
                if (!(!supervisorId || isNaN(Number(supervisorId)) || !supervisorQuery || supervisorQuery.length === 0)) return [3 /*break*/, 8];
                if (!(supervisor && /[a-zA-Z]+/gi.test(supervisor) && supervisor !== undefined)) return [3 /*break*/, 7];
                res.json('joing to make a new user');
                now_2 = Date.now();
                preferredName = supervisor;
                createSupervisor = {
                    preferredName: preferredName,
                    firstName: '',
                    middleNames: '',
                    lastName: '',
                    pending: true,
                    createdOn: now_2,
                    updatedOn: now_2,
                    tillNumber: ''
                };
                return [4 /*yield*/, Partner_1.default.query().insert(createSupervisor)
                    // @ts-ignore
                ];
            case 6:
                createdSupervisor = _a.sent();
                // @ts-ignore
                console.log({ createdSupervisor: createdSupervisor }, createdSupervisor.id);
                // @ts-ignore
                if (createdSupervisor && createdSupervisor.id) {
                    // @ts-ignore			
                    supervisorId = createdSupervisor.id;
                }
                return [3 /*break*/, 8];
            case 7:
                supervisorId = null;
                _a.label = 8;
            case 8:
                if (counterId === supervisorId)
                    supervisorId = null;
                d = req.body.count.data;
                flattenCountData = function (division) {
                    var keys = Object.keys(division);
                    var total = keys.reduce(function (acc, each) {
                        return acc + division[each];
                    }, 0);
                    return total;
                };
                bagTotal = flattenCountData(d.bagged);
                looseTotal = flattenCountData(d.loose);
                noteTotal = flattenCountData(d.notes);
                createFloat = {
                    bagPence1: d.bagged.pence_one,
                    bagPence2: d.bagged.pence_two,
                    bagPence5: d.bagged.pence_five,
                    bagPence10: d.bagged.pence_ten,
                    bagPence20: d.bagged.pence_twenty,
                    bagPence50: d.bagged.pence_fifty,
                    bagPound1: d.bagged.pound_one,
                    bagPound2: d.bagged.pound_two,
                    bagNote5: d.bagged.note_five,
                    bagTotal: bagTotal,
                    loosePence1: d.loose.pence_one,
                    loosePence2: d.loose.pence_two,
                    loosePence5: d.loose.pence_five,
                    loosePence10: d.loose.pence_ten,
                    loosePence20: d.loose.pence_twenty,
                    loosePence50: d.loose.pence_fifty,
                    loosePound1: d.loose.pound_one,
                    loosePound2: d.loose.pound_two,
                    looseOther: d.loose.other,
                    looseTotal: looseTotal,
                    note1: d.notes.note_one,
                    note5: d.notes.note_five,
                    note10: d.notes.note_ten,
                    note20: d.notes.note_twenty,
                    note50: d.notes.note_fifty,
                    noteTotal: noteTotal,
                    floatTotal: bagTotal + looseTotal + noteTotal
                };
                console.log({ d: d, createFloat: createFloat });
                return [4 /*yield*/, Float_1.default.query().insert(createFloat)];
            case 9:
                floatId = _a.sent();
                now = Date.now();
                createCount = {
                    floatId: floatId,
                    repositoryId: repositoryId,
                    completionStatus: validation.code,
                    createdOn: now,
                    updatedOn: now,
                    verified: true,
                    authenticatorId: 0,
                    counterId: counterId,
                    supervisorId: supervisorId,
                };
                count = Count_1.default.query().insert(createCount);
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Count successfully created, see response for validation status.', { validation: validation, count: count })
                    // -lookup the counter and return its id is valid /
                    // -lookup the supervisor and return its id is valid /
                    // -check supervisor and counter are diffirent /
                    // -validate the count /
                    // -create a float, return id
                    // insert count
                ];
            case 10:
                error_2 = _a.sent();
                // console.error(error)
                return [2 /*return*/, utils_1.respondErr(res, 500, 'Something went wrong, please try again.', null, { error: error_2 })];
            case 11: return [2 /*return*/];
        }
    });
}); };
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
                if (!(/,/gi.test(multiCount) || /[0-9]/gi.test(multiCount))) return [3 /*break*/, 4];
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
var updateCount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var repositoryId, repository, oldCount, oldFloat, float, counterId, supervisorId, counter, counterQuery, now_3, preferredName, createCounter, createdCounter, supervisor, supervisorQuery, now_4, preferredName, createSupervisor, createdSupervisor, data, d, createFloat, bagged_1, loose_1, notes_1, flattenCountData, bagTotal, looseTotal, noteTotal, now, floatId, updatedCount, dataUpdateCount, validation, count, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('### Welcome to the cool zone ###');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 16, , 17]);
                if (!req.body || !req.body.count)
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Error: no count provided?? What were you expecting? ??', null, { requestBody: req.body })];
                if (!req.body.count.repositoryId) return [3 /*break*/, 3];
                repositoryId = Number(req.body.count.repositoryId);
                if (typeof repositoryId !== 'number' || isNaN(repositoryId)) {
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Bad request. The count provided was invalid. Repository ID provided was missing or could not be matched to an existing repository.', null, { repositoryId: repositoryId })];
                }
                return [4 /*yield*/, Repository_1.default.query()
                        .select('id')
                        .skipUndefined()
                        .where('id', req.body.count.repositoryId)];
            case 2:
                repository = _a.sent();
                if (repository === null || repository === undefined || repository.length === 0) {
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Bad request. The count provided was invalid. Repository ID provided was missing or could not be matched to an existing repository.', null, { repository: repository, repositoryId: repositoryId })];
                }
                _a.label = 3;
            case 3: return [4 /*yield*/, Count_1.default.query().findById(req.params.id)];
            case 4:
                oldCount = _a.sent();
                return [4 /*yield*/, Float_1.default.query().findById(oldCount.floatId)];
            case 5:
                oldFloat = _a.sent();
                float = __assign({}, oldFloat);
                counterId = oldCount.counterId;
                supervisorId = oldCount.supervisorId;
                if (!(req.body.counterId || req.body.counter)) return [3 /*break*/, 8];
                counterId = req.body.count.counterId;
                counter = req.body.count.counter;
                return [4 /*yield*/, Partner_1.default.query()
                        .select('id')
                        .skipUndefined()
                        .where('id', counterId)];
            case 6:
                counterQuery = _a.sent();
                if (!(!counterId || isNaN(Number(counterId)) || !counterQuery || counterQuery.length === 0)) return [3 /*break*/, 8];
                res.json('joing to make a new user');
                now_3 = Date.now();
                preferredName = (/[a-zA-Z]+/gi.test(counter) && counter !== undefined) ? counter : 'Unknown Partner';
                createCounter = {
                    preferredName: preferredName,
                    firstName: '',
                    middleNames: '',
                    lastName: '',
                    pending: true,
                    createdOn: now_3,
                    updatedOn: now_3,
                    tillNumber: ''
                };
                return [4 /*yield*/, Partner_1.default.query().insert(createCounter)
                    // @ts-ignore
                ];
            case 7:
                createdCounter = _a.sent();
                // @ts-ignore
                console.log({ createdCounter: createdCounter }, createdCounter.id);
                // @ts-ignore
                if (createdCounter && createdCounter.id) {
                    // @ts-ignore			
                    counterId = createdCounter.id;
                }
                _a.label = 8;
            case 8:
                if (!(req.body.supervisorId || req.body.supervisor)) return [3 /*break*/, 12];
                supervisorId = req.body.count.supervisorId;
                supervisor = req.body.count.supervisor;
                return [4 /*yield*/, Partner_1.default.query()
                        .select('id')
                        .skipUndefined()
                        .where('id', supervisorId)];
            case 9:
                supervisorQuery = _a.sent();
                if (!(!supervisorId || isNaN(Number(supervisorId)) || !supervisorQuery || supervisorQuery.length === 0)) return [3 /*break*/, 12];
                if (!(supervisor && /[a-zA-Z]+/gi.test(supervisor) && supervisor !== undefined)) return [3 /*break*/, 11];
                res.json('joing to make a new user');
                now_4 = Date.now();
                preferredName = supervisor;
                createSupervisor = {
                    preferredName: preferredName,
                    firstName: '',
                    middleNames: '',
                    lastName: '',
                    pending: true,
                    createdOn: now_4,
                    updatedOn: now_4,
                    tillNumber: ''
                };
                return [4 /*yield*/, Partner_1.default.query().insert(createSupervisor)
                    // @ts-ignore
                ];
            case 10:
                createdSupervisor = _a.sent();
                // @ts-ignore
                console.log({ createdSupervisor: createdSupervisor }, createdSupervisor.id);
                // @ts-ignore
                if (createdSupervisor && createdSupervisor.id) {
                    // @ts-ignore			
                    supervisorId = createdSupervisor.id;
                }
                return [3 /*break*/, 12];
            case 11:
                supervisorId = null;
                _a.label = 12;
            case 12:
                if (counterId === supervisorId)
                    supervisorId = null;
                if (req.body.count.data) {
                    console.log("data attr found, will update dloat: " + float.id);
                    data = __assign({}, oldFloat);
                    d = req.body.count.data;
                    createFloat = {};
                    if (d.bagged) {
                        console.log('d.bagged found');
                        bagged_1 = {
                            bagPence1: d.bagged.pence_one || null,
                            bagPence2: d.bagged.pence_two || null,
                            bagPence5: d.bagged.pence_five || null,
                            bagPence10: d.bagged.pence_ten || null,
                            bagPence20: d.bagged.pence_twenty || null,
                            bagPence50: d.bagged.pence_fifty || null,
                            bagPound1: d.bagged.pound_one || null,
                            bagPound2: d.bagged.pound_two || null,
                            bagNote5: d.bagged.note_five || null,
                        };
                        Object.keys(bagged_1).forEach(function (e) {
                            // @ts-ignore
                            if (!bagged_1[e])
                                delete bagged_1[e];
                        });
                        createFloat = __assign(__assign({}, createFloat), bagged_1);
                    }
                    if (d.loose) {
                        console.log('d.loose found');
                        loose_1 = {
                            loosePence1: d.loose.pence_one || null,
                            loosePence2: d.loose.pence_two || null,
                            loosePence5: d.loose.pence_five || null,
                            loosePence10: d.loose.pence_ten || null,
                            loosePence20: d.loose.pence_twenty || null,
                            loosePence50: d.loose.pence_fifty || null,
                            loosePound1: d.loose.pound_one || null,
                            loosePound2: d.loose.pound_two || null,
                            looseOther: d.loose.other || null,
                        };
                        Object.keys(loose_1).forEach(function (e) {
                            // @ts-ignore
                            if (!loose_1[e])
                                delete loose_1[e];
                        });
                        createFloat = __assign(__assign({}, createFloat), loose_1);
                    }
                    if (d.notes) {
                        console.log('d.notes found');
                        notes_1 = {
                            note1: d.notes.note_one,
                            note5: d.notes.note_five,
                            note10: d.notes.note_ten,
                            note20: d.notes.note_twenty,
                            note50: d.notes.note_fifty,
                        };
                        Object.keys(notes_1).forEach(function (e) {
                            // @ts-ignore
                            if (!notes_1[e])
                                delete notes_1[e];
                        });
                        createFloat = __assign(__assign({}, createFloat), notes_1);
                    }
                    flattenCountData = function (division) {
                        var keys = Object.keys(division);
                        var total = keys.reduce(function (acc, each) {
                            return acc + division[each];
                        }, 0);
                        return total;
                    };
                    bagTotal = flattenCountData(d.bagged);
                    looseTotal = flattenCountData(d.loose);
                    noteTotal = flattenCountData(d.notes);
                    createFloat.bagTotal = bagTotal;
                    createFloat.looseTotal = looseTotal;
                    createFloat.noteTotal = noteTotal;
                    console.log({ d: d, createFloat: createFloat });
                    float = __assign(__assign({}, float), createFloat);
                }
                now = Date.now();
                console.log({
                    // repositoryId, 
                    updatedOn: now,
                    // verified: true, 
                    // authenticatorId: 0, 
                    counterId: counterId,
                    supervisorId: supervisorId,
                    float: float,
                });
                // return res.json({ plarb: 'ok' })
                delete float.id;
                return [4 /*yield*/, Float_1.default.query()
                        .patchAndFetchById(oldFloat.id, float)];
            case 13:
                floatId = _a.sent();
                updatedCount = {
                    // repositoryId, 
                    updatedOn: now,
                    // verified: true, 
                    // authenticatorId: 0, 
                    counterId: counterId,
                    supervisorId: supervisorId,
                };
                return [4 /*yield*/, Count_1.default.query()
                        .patchAndFetchById(oldCount.id, updatedCount)];
            case 14:
                dataUpdateCount = _a.sent();
                validation = utils_1.validateCount(req.body.count);
                if (validation.code === 'invalid') {
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Bad request. The count provided was invalid.', null, { validation: validation })];
                }
                return [4 /*yield*/, Count_1.default.query()
                        .patchAndFetchById(dataUpdateCount.id, {
                        // @ts-ignore
                        completionStatus: validation.code,
                    })];
            case 15:
                count = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Count successfully created, see response for validation status.', { validation: validation, count: count })
                    // -lookup the counter and return its id is valid /
                    // -lookup the supervisor and return its id is valid /
                    // -check supervisor and counter are diffirent /
                    // -validate the count /
                    // -create a float, return id
                    // insert count
                ];
            case 16:
                error_3 = _a.sent();
                console.error(error_3);
                return [2 /*return*/, utils_1.respondErr(res, 500, 'Something went wrong, please try again.', null, { error: error_3 })];
            case 17: return [2 /*return*/];
        }
    });
}); };
exports.updateCount = updateCount;
// Redux : false
// Action : false
// Logic : false
var deleteCount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var count, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Count_1.default.query()
                        .patchAndFetchById(req.body.id, {
                        // @ts-ignore
                        deleted: true,
                        deletedOn: Date.now(),
                        deletedBy: 0
                    })];
            case 1:
                count = _a.sent();
                if (!count) {
                    return [2 /*return*/, utils_1.respondErr(res, 500, 'There was an issue deleting the user.', null, { count: count })];
                }
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Count deleted successfully.', { count: count })];
            case 2:
                error_4 = _a.sent();
                return [2 /*return*/, utils_1.respondErr(res, 500, 'There was an issue deleting the user.', null, { error: error_4 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteCount = deleteCount;
//# sourceMappingURL=countRoutes.js.map