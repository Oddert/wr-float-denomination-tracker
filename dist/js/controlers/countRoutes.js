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
exports.verifyCount = exports.countTotals = exports.deleteCount = exports.updateCount = exports.getCount = exports.addCount = exports.getCounts = void 0;
// import { PartialModelObject } from 'objection'
var Repository_1 = __importDefault(require("../models/Repository"));
var Count_1 = __importDefault(require("../models/Count"));
var Partner_1 = __importDefault(require("../models/Partner"));
var Float_1 = __importDefault(require("../models/Float"));
var utils_1 = require("./utils");
// Higher-order mixins to query builders
// @ts-ignore
function deleteFilterActive(query) {
    // console.log('deleteFilterActive')
    return function () { return query.andWhere('deleted', false); };
    // .andWhere('deleted', null)
    // .orWhere('deleted', 0)
}
// @ts-ignore
function deleteFilterInactive(query) {
    // console.log('deleteFilterInactive')
    return function () { return query.andWhere('deleted', true); };
}
// @ts-ignore
function noFilter(query) {
    return function () { return query; };
}
function repoFilter(query, repoId) {
    // console.log(repoId, typeof repoId)
    return function () { return query.andWhere('repositoryId', repoId); };
}
function floatFilter(query) {
    return function () { return query.withGraphJoined('float'); };
}
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
// Redux : true
// Action : countsDataWriteAll
// Logic : /Counts
var getCounts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, deleted, repo, includeFloat, applyDeleteFilter, applyRepoFilter, applyFloatFilter, pagelength, q, counts, fromdate, todate, limit, offset, q, counts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                page = Number(req.query.page);
                deleted = String(req.query.deleted);
                repo = String(req.query.repository);
                includeFloat = Boolean(req.query.float);
                applyDeleteFilter = deleteFilterActive;
                applyRepoFilter = noFilter;
                applyFloatFilter = noFilter;
                if (deleted === 'undefined' || deleted === '0' || deleted === 'false') {
                    applyDeleteFilter = deleteFilterActive;
                }
                if (deleted === 'true' || deleted === '1') {
                    applyDeleteFilter = deleteFilterInactive;
                }
                if (deleted === 'include') {
                    applyDeleteFilter = noFilter;
                }
                if (repo !== 'undefined' && repo !== 'all') {
                    repo = Number(repo);
                    applyRepoFilter = repoFilter;
                }
                if (includeFloat) {
                    applyFloatFilter = floatFilter;
                }
                if (!!isNaN(page)) return [3 /*break*/, 2];
                pagelength = utils_1.sanitiseNumberQuery(req.query.pagelength, 10);
                q = applyDeleteFilter(applyFloatFilter(applyRepoFilter(Count_1.default.query()
                    .offset(page * pagelength)
                    .limit(pagelength)
                    .orderBy('timestamp', 'DESC'), repo)())());
                return [4 /*yield*/, q()];
            case 1:
                counts = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, null, null, 'List of all counts.', {
                        counts: counts.map(function (count) { return (__assign(__assign({}, count), { readableTimestamp: new Date(count.timestamp) })); })
                    })];
            case 2:
                fromdate = utils_1.sanitiseNumberQuery(req.query.fromdate, 0);
                todate = utils_1.sanitiseNumberQuery(req.query.todate, Date.now());
                limit = utils_1.sanitiseNumberQuery(req.query.limit, 100);
                offset = utils_1.sanitiseNumberQuery(req.query.offset, 0);
                console.log('C:');
                console.log(applyRepoFilter);
                console.log(applyDeleteFilter);
                console.log(applyFloatFilter);
                q = applyRepoFilter(applyDeleteFilter(applyFloatFilter(Count_1.default.query()
                    .andWhere('timestamp', '>=', fromdate)
                    .andWhere('timestamp', '<=', todate)
                    .limit(limit)
                    .offset(offset))())(), repo);
                return [4 /*yield*/, q()];
            case 3:
                counts = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, null, null, 'List of all counts.', {
                        counts: counts.map(function (e) { return (__assign(__assign({}, e), { readableTimestamp: new Date(e.timestamp) })); })
                    })];
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
    var repositoryId, repository, validation, counterId, counter, counterQuery, now_1, preferredName, createCounter, createdCounter, supervisorId, supervisor, supervisorQuery, now_2, preferredName, createSupervisor, createdSupervisor, f, flattenCountData, bagTotal, looseTotal, noteTotal, createFloat, createdFloat, now, createCount, createdCount, count, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 12, , 13]);
                if (!req.body || !req.body.count)
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Error: no count provided?? What were you expecting? ??', null, { requestBody: req.body })];
                if (!req.body.count.repositoryId)
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Error: Invalid repository ID provided', null, { repositoryId: req.body.count.repositoryId })];
                repositoryId = Number(req.body.count.repositoryId);
                console.log({ repositoryId: repositoryId });
                if (typeof repositoryId !== 'number' || isNaN(repositoryId)) {
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, '[NaN check]: Bad request. The count provided was invalid. Repository ID provided was missing or could not be matched to an existing repository.', null, { repositoryId: repositoryId })];
                }
                return [4 /*yield*/, Repository_1.default.query()
                        // .select('id')
                        .skipUndefined()
                        .where('id', repositoryId)];
            case 1:
                repository = _a.sent();
                console.log({ repository: repository });
                if (repository === null || repository === undefined || repository.length === 0) {
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, '[Repository DB Query 404]: Bad request. The count provided was invalid. Repository ID provided was missing or could not be matched to an existing repository.', null, { repository: repository, repositoryId: repositoryId })];
                }
                console.log('Repository checks done, moving on to validation');
                validation = utils_1.validateFloat(req.body.count.float);
                if (validation.code === 'invalid') {
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Bad request. The count provided was invalid.', null, { validation: validation })];
                }
                console.log('Validation Pass.');
                counterId = req.body.count.counterId;
                counter = req.body.count.counter;
                return [4 /*yield*/, Partner_1.default.query()
                        .select('id')
                        .skipUndefined()
                        .where('id', counterId)];
            case 2:
                counterQuery = _a.sent();
                if (!(!counterId || isNaN(Number(counterId)) || !counterQuery || counterQuery.length === 0)) return [3 /*break*/, 4];
                if (!(counter && /[a-zA-Z]+/gi.test(counter) && counter !== undefined && counter !== null)) return [3 /*break*/, 4];
                console.log('joing to make a new user');
                now_1 = Date.now();
                preferredName = (/[a-zA-Z]+/gi.test(counter) && counter !== undefined && counter !== null) ? counter : 'Unknown Partner';
                createCounter = {
                    preferredName: preferredName,
                    firstName: '',
                    middleNames: '',
                    lastName: '',
                    pending: true,
                    createdOn: now_1,
                    updatedOn: now_1,
                    tillNumber: '',
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
                if (!(supervisor && /[a-zA-Z]+/gi.test(supervisor) && supervisor !== undefined && supervisor !== null)) return [3 /*break*/, 7];
                console.log('joing to make a new user');
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
                console.log('Partner check done');
                f = req.body.count.float;
                flattenCountData = function (division) {
                    return division.reduce(function (acc, each) {
                        if (each)
                            return acc + each;
                        else
                            return acc;
                    }, 0);
                };
                bagTotal = flattenCountData([f.bagPence1, f.bagPence2, f.bagPence5, f.bagPence10, f.bagPence20, f.bagPence50, f.bagPound1, f.bagPound2, f.bagNote5]);
                looseTotal = flattenCountData([f.loosePence1, f.loosePence2, f.loosePence5, f.loosePence10, f.loosePence20, f.loosePence50, f.loosePound1, f.loosePound2, f.looseOther]);
                noteTotal = flattenCountData([f.note1, f.note5, f.note10, f.note20, f.note50]);
                createFloat = __assign(__assign({}, f), { bagTotal: bagTotal,
                    looseTotal: looseTotal,
                    noteTotal: noteTotal, floatTotal: bagTotal + looseTotal + noteTotal });
                console.log({ f: f, createFloat: createFloat });
                return [4 /*yield*/, Float_1.default.query().insert(createFloat)];
            case 9:
                createdFloat = _a.sent();
                console.log('...float created');
                now = Date.now();
                createCount = {
                    floatId: createdFloat.id,
                    repositoryId: repositoryId,
                    completionStatus: validation.code,
                    createdOn: now,
                    updatedOn: now,
                    verified: true,
                    authenticatorId: 0,
                    counterId: counterId,
                    supervisorId: supervisorId,
                    timestamp: new Date(req.body.count.timestamp).getTime(),
                    comment: req.body.count.comment || null,
                };
                return [4 /*yield*/, Count_1.default.query().insert(createCount)];
            case 10:
                createdCount = _a.sent();
                console.log('...count created', createdCount);
                return [4 /*yield*/, Count_1.default.query().where('id', createdCount.id)];
            case 11:
                count = _a.sent();
                console.log('..count queried..responding');
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Count successfully created, see response for validation status.', { validation: validation, count: count[0] })
                    // -lookup the counter and return its id is valid /
                    // -lookup the supervisor and return its id is valid /
                    // -check supervisor and counter are diffirent /
                    // -validate the count /
                    // -create a float, return id
                    // insert count
                ];
            case 12:
                error_2 = _a.sent();
                // console.error(error)
                return [2 /*return*/, utils_1.respondErr(res, 500, 'Something went wrong, please try again.', null, { error: error_2 })];
            case 13: return [2 /*return*/];
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
                        .withGraphJoined('counter')
                        .withGraphJoined('supervisor')
                        .whereIn('counts.id', multiCount)];
            case 1:
                count = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Details for provided id including float amount.', { count: count })];
            case 2:
                if (!(/,/gi.test(multiCount) || /[0-9]/gi.test(multiCount))) return [3 /*break*/, 4];
                splitMultiCount = multiCount.split(',');
                return [4 /*yield*/, Count_1.default.query()
                        .withGraphJoined('float')
                        .withGraphJoined('counter')
                        .withGraphJoined('supervisor')
                        .whereIn('counts.id', splitMultiCount)];
            case 3:
                count = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Details for provided id including float amount.', { count: count })];
            case 4: return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Please provide a valid id or list of ids as a url query, for example "?count=2,3,4"', null, null)];
            case 5: return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, Count_1.default.query()
                    .skipUndefined()
                    .withGraphJoined('float')
                    .withGraphJoined('counter')
                    .withGraphJoined('supervisor')
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
    var repositoryId, repository, oldCount, oldFloat, float, comment, counterId, supervisorId, counter, counterQuery, now_3, preferredName, createCounter, createdCounter, supervisor, supervisorQuery, now_4, preferredName, createSupervisor, createdSupervisor, f, createFloat, flattenCountData, bagTotal, looseTotal, noteTotal, now, updatedFloat, updateCount_1, updatedCount, validation, count, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('### Welcome to the cool zone ###');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 16, , 17]);
                if (!req.body || !req.body.count)
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Error: no count provided?? What were you expecting? ??', null, { requestBody: req.body })
                        // Validate the validity of the repository ID if provided (all attrs are optional, saving as 'incomplete')
                    ];
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
                return [4 /*yield*/, Float_1.default.query().findById(oldCount.floatId)
                    // float attr is used on update, optionally overwritten later
                ];
            case 5:
                oldFloat = _a.sent();
                float = __assign({}, oldFloat);
                comment = oldCount.comment;
                if (req.body.count.comment && typeof req.body.count.comment === 'string')
                    comment = req.body.count.comment;
                counterId = oldCount.counterId;
                supervisorId = oldCount.supervisorId;
                if (!(req.body.counterId || req.body.counter)) return [3 /*break*/, 8];
                counterId = req.body.count.counterId;
                counter = req.body.count.counter;
                return [4 /*yield*/, Partner_1.default.query()
                        .select('id')
                        .skipUndefined()
                        .where('id', counterId)
                    // No counterId or counterId is not found in partners table
                ];
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
                        .where('id', supervisorId)
                    // No supervisorId or supervisorId is not found in partners table
                ];
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
                // Nullify the supervisor signature if the user has signed their own name twice
                if (counterId === supervisorId)
                    supervisorId = null;
                // Client has provided 'float', process and update. Skip if not provided (client wants metadata update only, for instance)
                if (req.body.count.float) {
                    console.log("float attr found, will update float: " + float.id);
                    f = req.body.count.float;
                    createFloat = {};
                    if (f.hasOwnProperty('bagPence1'))
                        createFloat.bagPence1 = f.bagPence1;
                    if (f.hasOwnProperty('bagPence2'))
                        createFloat.bagPence2 = f.bagPence2;
                    if (f.hasOwnProperty('bagPence5'))
                        createFloat.bagPence5 = f.bagPence5;
                    if (f.hasOwnProperty('bagPence10'))
                        createFloat.bagPence10 = f.bagPence10;
                    if (f.hasOwnProperty('bagPence20'))
                        createFloat.bagPence20 = f.bagPence20;
                    if (f.hasOwnProperty('bagPence50'))
                        createFloat.bagPence50 = f.bagPence50;
                    if (f.hasOwnProperty('bagPound1'))
                        createFloat.bagPound1 = f.bagPound1;
                    if (f.hasOwnProperty('bagPound2'))
                        createFloat.bagPound2 = f.bagPound2;
                    if (f.hasOwnProperty('bagNote5'))
                        createFloat.bagNote5 = f.bagNote5;
                    if (f.hasOwnProperty('bagTotal'))
                        createFloat.bagTotal = f.bagTotal;
                    if (f.hasOwnProperty('loosePence1'))
                        createFloat.loosePence1 = f.loosePence1;
                    if (f.hasOwnProperty('loosePence2'))
                        createFloat.loosePence2 = f.loosePence2;
                    if (f.hasOwnProperty('loosePence5'))
                        createFloat.loosePence5 = f.loosePence5;
                    if (f.hasOwnProperty('loosePence10'))
                        createFloat.loosePence10 = f.loosePence10;
                    if (f.hasOwnProperty('loosePence20'))
                        createFloat.loosePence20 = f.loosePence20;
                    if (f.hasOwnProperty('loosePence50'))
                        createFloat.loosePence50 = f.loosePence50;
                    if (f.hasOwnProperty('loosePound1'))
                        createFloat.loosePound1 = f.loosePound1;
                    if (f.hasOwnProperty('loosePound2'))
                        createFloat.loosePound2 = f.loosePound2;
                    if (f.hasOwnProperty('looseOther'))
                        createFloat.looseOther = f.looseOther;
                    if (f.hasOwnProperty('looseTotal'))
                        createFloat.looseTotal = f.looseTotal;
                    if (f.hasOwnProperty('note1'))
                        createFloat.note1 = f.note1;
                    if (f.hasOwnProperty('note5'))
                        createFloat.note5 = f.note5;
                    if (f.hasOwnProperty('note10'))
                        createFloat.note10 = f.note10;
                    if (f.hasOwnProperty('note20'))
                        createFloat.note20 = f.note20;
                    if (f.hasOwnProperty('note50'))
                        createFloat.note50 = f.note50;
                    if (f.hasOwnProperty('noteTotal'))
                        createFloat.noteTotal = f.noteTotal;
                    flattenCountData = function (division) {
                        var keys = Object.keys(division);
                        var total = keys.reduce(function (acc, each) {
                            if (division[each])
                                return acc + division[each];
                            else
                                return acc;
                        }, 0);
                        return total;
                    };
                    float = __assign(__assign({}, float), createFloat);
                    bagTotal = flattenCountData({
                        bagPence1: f.bagPence1,
                        bagPence2: f.bagPence2,
                        bagPence5: f.bagPence5,
                        bagPence10: f.bagPence10,
                        bagPence20: f.bagPence20,
                        bagPence50: f.bagPence50,
                        bagPound1: f.bagPound1,
                        bagPound2: f.bagPound2,
                        bagNote5: f.bagNote5,
                    });
                    looseTotal = flattenCountData({
                        loosePence1: f.loosePence1,
                        loosePence2: f.loosePence2,
                        loosePence5: f.loosePence5,
                        loosePence10: f.loosePence10,
                        loosePence20: f.loosePence20,
                        loosePence50: f.loosePence50,
                        loosePound1: f.loosePound1,
                        loosePound2: f.loosePound2,
                        looseOther: f.looseOther,
                    });
                    noteTotal = flattenCountData({
                        note1: f.note1,
                        note5: f.note5,
                        note10: f.note10,
                        note20: f.note20,
                        note50: f.note50,
                    });
                    float.bagTotal = bagTotal;
                    float.looseTotal = looseTotal;
                    float.noteTotal = noteTotal;
                    // console.log({ f, createFloat, float })
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
                    timestamp: req.body.count.timestamp || oldCount.timestamp
                });
                // console.log({ float })
                // return res.json({ plarb: 'ok' })
                delete float.id;
                return [4 /*yield*/, Float_1.default.query()
                        .patchAndFetchById(oldFloat.id, float)];
            case 13:
                updatedFloat = _a.sent();
                updateCount_1 = {
                    // repositoryId,
                    updatedOn: now,
                    // verified: true,
                    // authenticatorId: 0,
                    counterId: counterId,
                    supervisorId: supervisorId,
                    comment: comment,
                };
                return [4 /*yield*/, Count_1.default.query()
                        .patchAndFetchById(oldCount.id, updateCount_1)
                    // HERE NEEDS REWRITTEN
                ];
            case 14:
                updatedCount = _a.sent();
                validation = utils_1.validateFloat(updatedFloat);
                if (validation.code === 'invalid') {
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Bad request. The count provided was invalid.', null, { validation: validation })];
                }
                return [4 /*yield*/, Count_1.default.query()
                        .patchAndFetchById(updatedCount.id, {
                        // @ts-ignore
                        completionStatus: validation.code,
                    })];
            case 15:
                count = _a.sent();
                count.float = updatedFloat;
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Count successfully updated, see response for validation status.', { validation: validation, count: count })
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
                        .patchAndFetchById(req.params.id, {
                        // @ts-ignore
                        deleted: true,
                        deletedOn: Date.now(),
                        deletedById: 0
                    })];
            case 1:
                count = _a.sent();
                if (!count) {
                    return [2 /*return*/, utils_1.respondErr(res, 500, 'There was an issue deleting the count.', null, { count: count })];
                }
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Count deleted successfully.', { count: count })];
            case 2:
                error_4 = _a.sent();
                return [2 /*return*/, utils_1.respondErr(res, 500, 'There was an issue deleting the count.', null, { error: error_4 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteCount = deleteCount;
var countTotals = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var total, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Count_1.default.query()
                        .where('deleted', null)
                        .orWhere('deleted', 0)
                        .orWhere('deleted', false)
                        .count()];
            case 1:
                total = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, 200, 'Number of total counts in the database.', null, { total: total[0] })];
            case 2:
                error_5 = _a.sent();
                return [2 /*return*/, utils_1.respondErr(res, 500, 'There was an issue processing your request.', null, { error: error_5 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.countTotals = countTotals;
var verifyCount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validation;
    return __generator(this, function (_a) {
        try {
            validation = utils_1.validateCount(req.body.count);
            console.log({ validation: validation });
            return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Count valiation complete.', { validation: validation })];
        }
        catch (error) {
            return [2 /*return*/, utils_1.respondErr(res, 500, 'There was an issue processing your request.', null, { error: error })];
        }
        return [2 /*return*/];
    });
}); };
exports.verifyCount = verifyCount;
//# sourceMappingURL=countRoutes.js.map