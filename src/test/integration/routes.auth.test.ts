import chai from 'chai'
import chaiHttp from 'chai-http'
import path from 'path'
// import passportStub from 'passport-stub'

import knex from '../../db/knex'
import server from '../../index'

process.env.MODE_ENV = 'test'

chai.use(chaiHttp)
// passportStub.install(server)

const should = chai.should()

const API_PREFIX = '/api/v1'

const migrateOpts = {
	directory: path.join(__dirname, '../../db/migrations')
}

const seedOpts = {
	directory: path.join(__dirname, '../../db/seeds')
}

describe('routes : auth', () => {

	beforeEach(() => {
		// return knex.migrate.rollback(migrateOpts)
		// 	.then(() => knex.migrate.forceFreeMigrationsLock(migrateOpts))
		// 	.then(() => knex.migrate.latest(migrateOpts))
		// 	.then(() => knex.seed.run(seedOpts))
		return knex.migrate.rollback(migrateOpts)
			.then(() => knex.migrate.latest(migrateOpts))
			.then(() => knex.seed.run(seedOpts))
	})

	afterEach(() => {
		// passportStub.logout()
		return knex.migrate.rollback(migrateOpts)
	})

	describe(`POST ${API_PREFIX}/auth/register`, () => {
		it('should register a new user', done => {
			chai.request(server)
				.post(`${API_PREFIX}/auth/register`)
				.send({
					username: 'michael',
					password: 'burnham',
				})
				.end((err, res) => {
					should.not.exist(err)
					res.redirects.length.should.eql(0)
					res.status.should.eql(200)
					res.type.should.eql('application/json')
					res.body.status.should.eql(200)
					done()
				})
		})
	})

	describe(`POST ${API_PREFIX}/auth/login`, () => {
		it('should login a user', done => {
			chai.request(server)
				.post(`${API_PREFIX}/auth/login`)
				.send({
					username: 'cash_partner',
					password: 'Password1',
				})
				.end((err, res) => {
					should.not.exist(err)
					res.redirects.length.should.eql(0)
					res.status.should.eql(200)
					res.type.should.eql('application/json')
					res.body.status.should.eql(200)
					done()
				})
		})
	})

	describe(`GET ${API_PREFIX}/auth/logout`, () => {
		it('should logout a user', done => {
			// passportStub.login({
			// 	username: 'cash_partner',
			// 	password: 'Password1',
			// })
			chai.request(server)
				.get(`${API_PREFIX}/auth/logout`)
				.end((err, res) => {
					console.log(err)
					should.not.exist(err)
					res.redirects.length.should.eql(0)
					res.status.should.eql(200)
					res.type.should.eql('application/json')
					res.body.status.should.eql(200)
					done()
				})
		})
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
	})

})