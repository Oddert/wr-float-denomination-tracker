"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePwd = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
function comparePwd(inputPassword, actualPassword) {
    return bcrypt_1.default.compareSync(inputPassword, actualPassword);
}
exports.comparePwd = comparePwd;
//# sourceMappingURL=authMethods.js.map