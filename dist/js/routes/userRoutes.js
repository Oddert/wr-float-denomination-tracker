"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userRoutes_1 = require("../controlers/userRoutes");
var router = express_1.Router();
router
    .route('/')
    .get(userRoutes_1.getUsers)
    .post(userRoutes_1.addUser);
router
    .route('/:id')
    .get(userRoutes_1.getUser)
    .put(userRoutes_1.updateUser)
    .delete(userRoutes_1.deleteUser);
// get /count
// get /count/new  --render form
// post /count
// get /count/:id --render specific
// get /count/:id/edit --render specific form
// put /count/:id
// delete /count/:id
exports.default = router;
//# sourceMappingURL=userRoutes.js.map