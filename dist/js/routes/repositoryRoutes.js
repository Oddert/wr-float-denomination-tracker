"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var repositoryRoutes_1 = require("../controlers/repositoryRoutes");
var router = express_1.Router();
router
    .route('/')
    .get(repositoryRoutes_1.getRepositories)
    .post(repositoryRoutes_1.addRepository);
router
    .route('/:id')
    .get(repositoryRoutes_1.getRepository)
    .put(repositoryRoutes_1.updateRepository)
    .delete(repositoryRoutes_1.deleteRepository);
// get /count
// get /count/new  --render form
// post /count
// get /count/:id --render specific
// get /count/:id/edit --render specific form
// put /count/:id
// delete /count/:id
exports.default = router;
//# sourceMappingURL=repositoryRoutes.js.map