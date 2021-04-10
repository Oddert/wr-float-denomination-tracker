const { Model } = require('objection')
const knex = require('../db/knex')

Model.knex(knex)

class Repository extends Model {
	
	static get tableName () {
		return 'repositories'
	}

	static get jsonSchema () {
		return {
			type: 'object',
			required: ['name'],
			properties: {
				id: { type: 'integer' },
				name: { type: 'string' },
				description: { type: 'string' },
				updatedOn: { type: 'date' },
				activated: { type: 'boolean' },
				activatedOn: { type: 'date' },
				deactivatedOn: { type: 'date' },
				activatedById: { type: ['integer', 'null'] },
				deactivatedById: { type: ['integer', 'null'] },
			}
		}
	}
	
	static get relationMappings () {
		const Count = __dirname + './Count' //require('./Count')
		const Partner = __dirname + './Partner' //require('./Partner')
		
		return {

			counts: {
				relation: Model.HasManyRelation,
				modelClass: Count,
				join: {
					from: 'counts.repositoryId',
					to: 'repositories.id'
				}
			},

			activatedBy: {
				relation: Model.BelongsToOneRelation,
				modelClass: Partner,
				join: {
					from: 'repositories.activatedById',
					to: 'partners.id'
				}
			},

			deactivatedBy: {
				relation: Model.BelongsToOneRelation,
				modelClass: Partner,
				join: {
					from: 'repositories.deactivatedById',
					to: 'partners.id'
				}
			},

		}
	}

}

module.exports = Repository