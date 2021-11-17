"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIsAuth = void 0;
var auth_1 = __importDefault(require("../config/auth"));
var utils_1 = require("../controlers/utils");
function userIsAuth(req, res, next) {
    if (!req.user)
        utils_1.respondErr(res, 401, 'User is unauthenticated, please login and try again', null, null);
    else {
        auth_1.default.authenticate('local', function (err, user, info) {
            if (user)
                return utils_1.respondWell(res, 200, null, 'User created successfully', { user: user, info: info });
            else
                return utils_1.respondErr(res, null, err, 'Something went wrong, try again later.', { info: info });
        })(req, res, next);
    }
}
exports.userIsAuth = userIsAuth;
//# sourceMappingURL=userIsAuth.js.map