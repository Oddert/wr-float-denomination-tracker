import chai from 'chai'
import chaitHttp from 'chai-http'

import knex from '../../db/knex' 
import server from '../../index'

process.env.MODE_ENV = 'test'

chai.use(chaitHttp)

const { should } = chai

const apiPrefix = '/api/v1'

describe('routes : auth', () => {

	beforeEach(() => {
		return knex.migrate.rollback()
			.then(() => knex.migrate.latest())
	})

	afterEach(() => {
		return knex.migrate.rollback()
	})

	describe(`POST ${apiPrefix}/auth/register`, () =>{
		it('should register a new user', done => {
			chai.request(server)
				.post(`${apiPrefix}/auth/register`)
				.send({
					username: 'micheal',
					password: 'burnham',
				})
				.end((err, res) => {
					should().not.exist(err)
					res.redirects.length.should.eql(0)
					res.status.should.eql(200)
					res.type.should.eql('application/json')
					res.body.status.should.eql(200)
					done()
				})
		})
	})

})