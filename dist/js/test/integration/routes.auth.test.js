"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var chai_http_1 = __importDefault(require("chai-http"));
var path_1 = __importDefault(require("path"));
// import passportStub from 'passport-stub'
var knex_1 = __importDefault(require("../../db/knex"));
var index_1 = __importDefault(require("../../index"));
process.env.MODE_ENV = 'test';
chai_1.default.use(chai_http_1.default);
// passportStub.install(server)
var should = chai_1.default.should();
var API_PREFIX = '/api/v1';
var migrateOpts = {
    directory: path_1.default.join(__dirname, '../../db/migrations')
};
var seedOpts = {
    directory: path_1.default.join(__dirname, '../../db/seeds')
};
describe('routes : auth', function () {
    beforeEach(function () {
        // return knex.migrate.rollback(migrateOpts)
        // 	.then(() => knex.migrate.forceFreeMigrationsLock(migrateOpts))
        // 	.then(() => knex.migrate.latest(migrateOpts))
        // 	.then(() => knex.seed.run(seedOpts))
        return knex_1.default.migrate.rollback(migrateOpts)
            .then(function () { return knex_1.default.migrate.latest(migrateOpts); })
            .then(function () { return knex_1.default.seed.run(seedOpts); });
    });
    afterEach(function () {
        // passportStub.logout()
        return knex_1.default.migrate.rollback(migrateOpts);
    });
    describe("POST " + API_PREFIX + "/auth/register", function () {
        it('should register a new user', function (done) {
            chai_1.default.request(index_1.default)
                .post(API_PREFIX + "/auth/register")
                .send({
                username: 'michael',
                password: 'burnham',
            })
                .end(function (err, res) {
                should.not.exist(err);
                res.redirects.length.should.eql(0);
                res.status.should.eql(200);
                res.type.should.eql('application/json');
                res.body.status.should.eql(200);
                done();
            });
        });
    });
    describe("POST " + API_PREFIX + "/auth/login", function () {
        it('should login a user', function (done) {
            chai_1.default.request(index_1.default)
                .post(API_PREFIX + "/auth/login")
                .send({
                username: 'cash_partner',
                password: 'Password1',
            })
                .end(function (err, res) {
                should.not.exist(err);
                res.redirects.length.should.eql(0);
                res.status.should.eql(200);
                res.type.should.eql('application/json');
                res.body.status.should.eql(200);
                done();
            });
        });
    });
    describe("GET " + API_PREFIX + "/auth/logout", function () {
        it('should logout a user', function (done) {
            // passportStub.login({
            // 	username: 'cash_partner',
            // 	password: 'Password1',
            // })
            chai_1.default.request(index_1.default)
                .get(API_PREFIX + "/auth/logout")
                .end(function (err, res) {
                console.log(err);
                should.not.exist(err);
                res.redirects.length.should.eql(0);
                res.status.should.eql(200);
                res.type.should.eql('application/json');
                res.body.status.should.eql(200);
                done();
            });
        });
        // it('should throw an error if a user is not logged in', done => {
        // 	chai.request(server)
        // 		.get(`${API_PREFIX}/auth/logout`)
        // 		.end((err, res) => {
        // 			should.not.exist(err)
        // 			res.redirects.length.should.eql(0)
        // 			res.status.should.eql(200)
        // 			res.type.should.eql('application/json')
        // 			res.body.status.should.eql(200)
        // 			done()
        // 		})
        // })
    });
});
//# sourceMappingURL=routes.auth.test.js.map