const { Model } = require('objection')
const knex = require('../db/knex')

Model.knex(knex)

class User extends Model {

	static get TableName () {
		return 'users'
	}

	static get jsonSchema () {
		return {
			type: 'object',
			required: ['username', 'password', 'readableName'],
			properties: {
				id: { type: 'integer' },				
				privilegeId: { type: ['integer', 'null'] },
				username: { type: 'string' },
				password: { type: 'string' },
				readableName: { type: 'string' },
				createOn: { type: 'date' },
				updatedOn: { type: 'date' },
				deleted: { type: 'boolean' },
				deletedOn: { type: 'date' },
			}
		}
	}

	static get relationMappings () {
		const Privilege = __dirname + './Privilege' //require('./Privilege')
		const Count = __dirname + './Count' //require('./Count')

		return {

			privileges: {
				relation: Model.BelongsToOneRelation,
				modelClass: Privilege,
				join: {
					from: 'users.privilegeId',
					to: 'privileges.id'
				}
			},

			counts: {
				relation: Model.HasManyRelation,
				modelClass: Count,
				join: {
					from: 'users.id',
					to: 'counts.authenticatorId',
				}
			},

		}
	}

}

module.exports = User