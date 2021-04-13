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
Object.defineProperty(exports, "__esModule", { value: true });
exports.respondErr = exports.respondBadRequest = exports.respondWell = void 0;
var respondWell = function (res, status, errorMessage, responseMessage) {
    var other = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        other[_i - 4] = arguments[_i];
    }
    return res
        .status(status || 200)
        .json(__assign({ status: status || 200, errorMessage: errorMessage, responseMessage: responseMessage || 'Request processed successfully.' }, other));
};
exports.respondWell = respondWell;
var respondBadRequest = function (res, status, errorMessage, responseMessage) {
    var other = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        other[_i - 4] = arguments[_i];
    }
    return res
        .status(status || 400)
        .json(__assign({ status: status || 400, errorMessage: errorMessage || 'There was an error in your request, no content was found.', responseMessage: responseMessage }, other));
};
exports.respondBadRequest = respondBadRequest;
var respondErr = function (res, status, errorMessage, responseMessage) {
    var other = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        other[_i - 4] = arguments[_i];
    }
    return res
        .status(status || 500)
        .json(__assign({ status: status || 500, errorMessage: errorMessage || 'There was a error processing your reponse.', responseMessage: responseMessage }, other));
};
exports.respondErr = respondErr;
//# sourceMappingURL=utils.js.map