"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var partnerRoutes_1 = require("../controlers/partnerRoutes");
var router = (0, express_1.Router)();
router
    .route('/')
    .get(partnerRoutes_1.getPartners)
    .post(partnerRoutes_1.addPartner);
router
    .route('/:id')
    .get(partnerRoutes_1.getPartner)
    .put(partnerRoutes_1.updatePartner)
    .delete(partnerRoutes_1.deletePartner);
// get /count
// get /count/new  --render form
// post /count
// get /count/:id --render specific
// get /count/:id/edit --render specific form
// put /count/:id
// delete /count/:id
exports.default = router;
//# sourceMappingURL=partnerRoutes.js.map