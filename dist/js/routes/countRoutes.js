"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var countRoutes_1 = require("../controlers/countRoutes");
var router = (0, express_1.Router)();
router
    .route('/')
    .get(countRoutes_1.getCounts)
    .post(countRoutes_1.addCount);
router.route('/total')
    .get(countRoutes_1.countTotals);
router
    .route('/:id')
    .get(countRoutes_1.getCount)
    .put(countRoutes_1.updateCount)
    .delete(countRoutes_1.deleteCount);
// get /count
// get /count/new  --render form
// post /count
// get /count/:id --render specific
// get /count/:id/edit --render specific form
// put /count/:id
// delete /count/:id
exports.default = router;
//# sourceMappingURL=countRoutes.js.map