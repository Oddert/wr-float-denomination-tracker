"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var chai_http_1 = __importDefault(require("chai-http"));
var path_1 = __importDefault(require("path"));
var knex_1 = __importDefault(require("../../db/knex"));
var index_1 = __importDefault(require("../../index"));
process.env.MODE_ENV = 'test';
chai_1.default.use(chai_http_1.default);
var should = chai_1.default.should();
var API_PREFIX = '/api/v1';
var migrateOpts = {
    directory: path_1.default.join(__dirname, '../../db/migrations')
};
var seedOpts = {
    directory: path_1.default.join(__dirname, '../../db/seeds')
};
describe('routes : count', function () {
    beforeEach(function () {
        return knex_1.default.migrate.rollback(migrateOpts)
            .then(function () { return knex_1.default.migrate.latest(migrateOpts); })
            .then(function () { return knex_1.default.seed.run(seedOpts); });
    });
    afterEach(function () {
        return knex_1.default.migrate.rollback(migrateOpts);
    });
    describe("POST " + API_PREFIX + "/count/verify", function () {
        it('should return with success an object of verification type: invalid when given no data', function (done) {
            var count = null;
            chai_1.default.request(index_1.default)
                .post(API_PREFIX + "/count/verify")
                .send({ count: count })
                .end(function (err, res) {
                console.log(res.body);
                done();
            })
                .finally(function () {
                console.log('something went wrong');
                done();
            });
        });
    });
});
//# sourceMappingURL=routes.count.test.js.map