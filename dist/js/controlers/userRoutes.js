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
exports.deleteUser = exports.updateUser = exports.getUser = exports.addUser = exports.getUsers = void 0;
var utils_1 = require("./utils");
var User_1 = __importDefault(require("../models/User"));
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
// const users = [
// 	{
// 		id: createId(),
// 		shortUid: '1023',
// 		firstName: 'Robyn',
// 		middleNames: 'F H',
// 		lastName: 'Veitch',
// 		access: 10,
// 		created: 1616684709029,
// 		updated: 1616684932308,
// 	},
// 	{
// 		id: createId(),
// 		shortUid: '1064',
// 		firstName: 'Jhony',
// 		middleNames: null,
// 		lastName: 'No Privelege',
// 		access: 1,
// 		created: 1616684709029,
// 		updated: 1616684932308,
// 	},
// 	{
// 		id: createId(),
// 		shortUid: '1067',
// 		firstName: 'Manager',
// 		middleNames: null,
// 		lastName: null,
// 		access: 2,
// 		created: 1616684709029,
// 		updated: 1616684932308,
// 	},
// ]
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var limit, offset, users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                limit = utils_1.sanitiseNumberQuery(req.query.limit, 500);
                offset = utils_1.sanitiseNumberQuery(req.query.offset, 0);
                return [4 /*yield*/, User_1.default.query()
                        .limit(limit)
                        .offset(offset)];
            case 1:
                users = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'List of all users.', { users: users })];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, utils_1.respondErr(res, 500, 'There was an issue processing your request.', null, { error: error_1 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
var addUser = function (req, res) {
    res.json('addUser route not implamented yet');
};
exports.addUser = addUser;
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, multiUser, users, splitMultiUser, users, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                id = req.params.id;
                multiUser = req.query.user;
                if (!id)
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Not id provided or invalid id. Unable to process request.', null, null)];
                if (!(id === 'details' && multiUser)) return [3 /*break*/, 6];
                if (!multiUser || typeof multiUser === undefined) {
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Please provide a valid id or list of ids as a url query, for example "?user=2,3,4"', null, null)];
                }
                if (!Array.isArray(multiUser)) return [3 /*break*/, 2];
                return [4 /*yield*/, User_1.default.query()
                        .whereIn('users.id', multiUser)];
            case 1:
                users = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Details for provided id.', { users: users })];
            case 2:
                if (!(/,/gi.test(multiUser) || /[0-9]/gi.test(multiUser))) return [3 /*break*/, 4];
                splitMultiUser = multiUser.split(',');
                return [4 /*yield*/, User_1.default.query()
                        .whereIn('users.id', splitMultiUser)];
            case 3:
                users = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Details for provided id.', { users: users })];
            case 4: return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'Please provide a valid id or list of ids as a url query, for example "?user=2,3,4"', null, null)];
            case 5: return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, User_1.default.query()
                    .where('users.id', Number(id))];
            case 7:
                user = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Details for provided id.', { user: user })];
            case 8: return [3 /*break*/, 10];
            case 9:
                error_2 = _a.sent();
                return [2 /*return*/, utils_1.respondErr(res, 500, 'There was an issue processing your request.', null, { error: error_2 })];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var updateUser = function (req, res) {
    res.json('updateUser route not implamented yet');
};
exports.updateUser = updateUser;
var deleteUser = function (req, res) {
    res.json('deleteUser route not implamented yet');
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userRoutes.js.map