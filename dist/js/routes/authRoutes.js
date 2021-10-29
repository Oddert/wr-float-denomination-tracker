"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authRoutes_1 = require("../controlers/authRoutes");
var router = (0, express_1.Router)();
router
    .route('/')
    .get(authRoutes_1.getAuth);
router
    .route('/register')
    .post(authRoutes_1.registerUser);
router
    .route('/login')
    .post(authRoutes_1.loginUser);
router
    .route('/logout')
    .get(authRoutes_1.logoutUser);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map