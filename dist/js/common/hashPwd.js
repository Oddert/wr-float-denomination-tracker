"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
function hashPwd(password) {
    var salt = bcrypt_1.default.genSaltSync();
    var hash = bcrypt_1.default.hashSync(password, salt);
    return hash;
}
exports.default = hashPwd;
//# sourceMappingURL=hashPwd.js.map