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

describe ('routes : count', () => {

	beforeEach(() => {
		return knex.migrate.rollback(migrateOpts)
			.then(() => knex.migrate.latest(migrateOpts))
			.then(() => knex.seed.run(seedOpts))
	})

	afterEach(() => {
		return knex.migrate.rollback(migrateOpts)
	})


	describe(`POST ${API_PREFIX}/count/verify`, () => {
		it('should return with success an object of verification type: invalid when given no data', done => {
			const count = null
			chai.request(server)
				.post(`${API_PREFIX}/count/verify`)
				.send({ count })
				.end((err, res) => {
					console.log(res.body)
					done()
				})
				.finally(() => {
					console.log('something went wrong')
					done()
				})
		})
	})

})