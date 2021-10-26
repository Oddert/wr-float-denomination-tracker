"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controlers_1 = require("../controlers/");
var router = (0, express_1.Router)();
router
    .route('/')
    .get(controlers_1.homePage);
exports.default = router;
//# sourceMappingURL=coreRoutes.js.map