"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var floatRoutes_1 = require("../controlers/floatRoutes");
var router = (0, express_1.Router)();
router
    .route('/')
    .get(floatRoutes_1.getFloats)
    .post(floatRoutes_1.addFloat);
router
    .route('/:id')
    .get(floatRoutes_1.getFloat)
    .put(floatRoutes_1.updateFloat)
    .delete(floatRoutes_1.deleteFloat);
// get /count
// get /count/new  --render form
// post /count
// get /count/:id --render specific
// get /count/:id/edit --render specific form
// put /count/:id
// delete /count/:id
exports.default = router;
//# sourceMappingURL=floatRoutes.js.map