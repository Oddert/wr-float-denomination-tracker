"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var chai_http_1 = __importDefault(require("chai-http"));
var knex_1 = __importDefault(require("../../db/knex"));
var index_1 = __importDefault(require("../../index"));
process.env.MODE_ENV = 'test';
chai_1.default.use(chai_http_1.default);
var should = chai_1.default.should;
var apiPrefix = '/api/v1';
describe('routes : auth', function () {
    beforeEach(function () {
        return knex_1.default.migrate.rollback()
            .then(function () { return knex_1.default.migrate.latest(); });
    });
    afterEach(function () {
        return knex_1.default.migrate.rollback();
    });
    describe("POST " + apiPrefix + "/auth/register", function () {
        it('should register a new user', function (done) {
            chai_1.default.request(index_1.default)
                .post(apiPrefix + "/auth/register")
                .send({
                username: 'micheal',
                password: 'burnham',
            })
                .end(function (err, res) {
                should().not.exist(err);
                res.redirects.length.should.eql(0);
                res.status.should.eql(200);
                res.type.should.eql('application/json');
                res.body.status.should.eql(200);
                done();
            });
        });
    });
});
//# sourceMappingURL=routes.auth.test.js.map