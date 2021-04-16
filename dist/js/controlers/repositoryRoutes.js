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
exports.deleteRepository = exports.updateRepository = exports.getRepository = exports.addRepository = exports.getRepositories = void 0;
var utils_1 = require("./utils");
var Repository_1 = __importDefault(require("../models/Repository"));
var getRepositories = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var limit, offset, repositories, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                limit = utils_1.sanitiseNumberQuery(req.query.limit, 500);
                offset = utils_1.sanitiseNumberQuery(req.query.offset, 0);
                return [4 /*yield*/, Repository_1.default.query()
                        // .withGraphJoined('float')
                        .limit(limit)
                        .offset(offset)];
            case 1:
                repositories = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'List of all repositories.', { repositories: repositories })];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, utils_1.respondErr(res, 500, 'There was an issue processing your request.', null, { error: error_1 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getRepositories = getRepositories;
var addRepository = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var b, now, createRepo, repository, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                b = req.body;
                if (!b.name || !/[a-zA-Z]/gi.test(b.name)) {
                    return [2 /*return*/, utils_1.respondBadRequest(res, null, 'You must provide a name for the new repository.', null, { body: req.body })];
                }
                now = Date.now();
                createRepo = {
                    name: b.name,
                    description: b.description || null,
                    createdOn: now,
                    updatedOn: now,
                };
                if (b.activated) {
                    createRepo.activated = true;
                    createRepo.activatedById = 1;
                    createRepo.activatedOn = now;
                }
                return [4 /*yield*/, Repository_1.default.query().insert(createRepo)];
            case 1:
                repository = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Repositroy added succesfully', { repository: repository })];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, utils_1.respondErr(res, 500, 'There was an issue processing your request.', null, { error: error_2 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addRepository = addRepository;
var getRepository = function (req, res) {
    try {
    }
    catch (error) {
        return utils_1.respondErr(res, 500, 'There was an issue processing your request.', null, { error: error });
    }
};
exports.getRepository = getRepository;
var updateRepository = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var oldRepo, b, now, createRepo, repository, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Repository_1.default.query().findById(req.params.id)];
            case 1:
                oldRepo = _a.sent();
                if (!oldRepo) {
                    return [2 /*return*/, utils_1.respondBadRequest(res, 400, 'No repository was found for the given ID.', null, { id: req.params.id })];
                }
                b = req.body;
                if (!b.name || !/[a-zA-Z]/gi.test(b.name)) {
                    return [2 /*return*/, utils_1.respondBadRequest(res, null, 'You must provide a name for the new repository.', null, { body: req.body })];
                }
                now = Date.now();
                createRepo = {
                    name: b.name || oldRepo.name,
                    description: b.description || oldRepo.description,
                    updatedOn: now,
                };
                if (b.activated) {
                    createRepo.activated = true;
                    createRepo.activatedById = 1;
                    createRepo.activatedOn = now;
                }
                if (b.deactivated || (b.hasOwnProperty('activated') && b.activated === false)) {
                    createRepo.activated = false;
                    createRepo.deactivatedById = 1;
                    createRepo.deactivatedOn = now;
                }
                return [4 /*yield*/, Repository_1.default.query().patchAndFetchById(req.params.id, createRepo)];
            case 2:
                repository = _a.sent();
                return [2 /*return*/, utils_1.respondWell(res, 200, null, 'Repositroy modified succesfully', { repository: repository })];
            case 3:
                error_3 = _a.sent();
                return [2 /*return*/, utils_1.respondErr(res, 500, 'There was an issue processing your request.', null, { error: error_3 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateRepository = updateRepository;
var deleteRepository = function (req, res) {
    try {
    }
    catch (error) {
        return utils_1.respondErr(res, 500, 'There was an issue processing your request.', null, { error: error });
    }
};
exports.deleteRepository = deleteRepository;
//# sourceMappingURL=repositoryRoutes.js.map