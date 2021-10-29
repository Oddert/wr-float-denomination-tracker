import chai from 'chai'
import chaiHttp from 'chai-http'
import path from 'path'

import knex from '../../db/knex'
import server from '../../index'

process.env.MODE_ENV = 'test'

chai.use(chaiHttp)

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
		return knex.migrate.rollback()
			.then(() => knex.migrate.latest(migrateOpts))
			.then(() => knex.seed.run(seedOpts))
	})

	afterEach(() => {
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

	// describe(`GET ${API_PREFIX}/auth/logout`, () => {
	// 	it('should logout a user', done => {

	// 	})
	// })

})