"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var User_1 = __importDefault(require("../models/User"));
function default_1() {
    passport_1.default.serializeUser(function (user, done) {
        //@ts-ignore
        done(null, user.id);
    });
    passport_1.default.deserializeUser(function (id, done) {
        User_1.default.query().where({ id: id }).first()
            .then(function (user) {
            done(null, user);
        })
            .catch(function (err) {
            done(err, null);
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=passport.js.map