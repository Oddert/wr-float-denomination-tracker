const { Model } = require('objection')
const knex = require('../db/knex')

Model.knex(knex)

class Count extends Model {
	
	static get tableName () {
		return 'counts'
	}

	static get jsonSchema () {
		return {
			type: 'object',
			required: ['floatId', 'repositoryId', 'verified', 'completionStatus', 'timestamp'],
			properties: {
				id: { type: 'integer' },
				floatId: { type: 'integer' },
				comment: { type: ['string', 'null'] },
				repositoryId: { type: ['integer', 'null'] },
				deletedById: { type: ['integer', 'null'] },
				counterId: { type: ['integer', 'null'] },
				supervisorId: { type: ['integer', 'null'] },
				authenticatorId: { type: ['integer', 'null'] },
				completionStatus: { type: 'string' },
				createdOn: { type: 'date' },
				verified: { type: 'boolean' },
				deleted: { type: 'boolean' },
				deletedOn: { type: 'date' },
				updatedOn: { type: 'date' },
				timestamp: { type: 'date' },
			}
		}
	}

	// static modifiers = {
	// 	readableTimestamp (query) {

	// 	}
	// }
	
	static get relationMappings () {
		const Float = __dirname + '/Float.js' //require('./Float')
		const Repository = __dirname + '/Repository.js' //require('./Repository')
		const Partner = __dirname + '/Partner.js' //require('./Partner')
		const User = __dirname + '/User.js' //require('./User')

		return {

			float: {
				relation: Model.BelongsToOneRelation,
				modelClass: Float,
				join: {
					from: 'counts.floatId',
					to: 'floats.id'
				}
			},

			repository: {
				relation: Model.BelongsToOneRelation,
				modelClass: Repository,
				join: {
					from: 'counts.repositoryId',
					to: 'repositories.id'
				}
			},

			deletedBy: {
				relation: Model.BelongsToOneRelation,
				modelClass: Partner,
				join: {
					from: 'counts.deletedById',
					to: 'partners.id'
				}
			},

			counter: {
				relation: Model.BelongsToOneRelation,
				modelClass: Partner,
				join: {
					from: 'counts.counterId',
					to: 'partners.id'
				}
			},

			supervisor: {
				relation: Model.BelongsToOneRelation,
				modelClass: Partner,
				join: {
					from: 'counts.supervisorId',
					to: 'partners.id'
				}
			},

			authenticator: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'counts.authenticatorId',
					to: 'users.id'
				}
			},

		}
	}
}

module.exports = Count