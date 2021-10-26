"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passportLocal = __importStar(require("passport-local"));
var User_1 = __importDefault(require("../models/User"));
var passport_2 = __importDefault(require("./passport"));
var authMethods_1 = require("./authMethods");
var LocalStrategy = passportLocal.Strategy;
var options = {};
(0, passport_2.default)();
passport_1.default.use(new LocalStrategy(options, function (username, password, done) {
    User_1.default.query()
        .where({ username: username })
        .first()
        .then(function (user) {
        if (!user)
            return done(null, false);
        // @ts-ignore
        if ((0, authMethods_1.comparePwd)(password, user.password)) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    })
        .catch(function (err) { return done(err); });
}));
exports.default = passport_1.default;
//# sourceMappingURL=auth.js.map