import { Model } from 'objection'
import knex from '../db/knex'

Model.knex(knex)

class Repository extends Model {
	id?: number
	name!: string
	description?: string
	createdOn?: number
	updatedOn?: number
	activated?: boolean
	activatedOn?: number
	deactivatedOn?: number
	activatedById?: number
	deactivatedById?: number
	deleted?: boolean
	deletedOn?: number
	deletedById?: number

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
				createdOn: { type: 'date' },
				updatedOn: { type: 'date' },
				activated: { type: 'boolean' },
				activatedOn: { type: 'date' },
				deactivatedOn: { type: 'date' },
				activatedById: { type: ['integer', 'null'] },
				deactivatedById: { type: ['integer', 'null'] },
				deleted: { type: 'boolean' },
				deletedOn: { type: 'date' },
				deletedById: { type: ['integer', 'null'] },
			}
		}
	}

	static get relationMappings () {
		const Count = __dirname + './Count' // require('./Count')
		const Partner = __dirname + './Partner' // require('./Partner')

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

export default Repository