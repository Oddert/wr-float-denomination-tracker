import { Model } from 'objection'
import knex from '../db/knex'

Model.knex(knex)

class Partner extends Model {
	id?: number
	preferredName?: string
	firstName!: string
	middleNames?: string
	lastName?: string
	pending?: boolean
	createdOn?: number
	updatedOn?: number
	deleted?: boolean
	deletedOn?: number
	tillNumber!: string

	static get tableName () {
		return 'partners'
	}

	static get jsonSchema () {
		return {
			type: 'object',
			required: ['firstName', 'tillNumber'],
			properties: {
				id: { type: 'integer' },
				preferredName: { type: 'string' },
				firstName: { type: 'string' },
				middleNames: { type: 'string' },
				lastName: { type: 'string' },
				pending: { type: 'boolean' },
				createdOn: { type: 'date' },
				updatedOn: { type: 'date' },
				deleted: { type: 'boolean' },
				deletedOn: { type: 'date' },
				tillNumber: { type: 'string' },
			}
		}
	}

	static get relationMappings () {
		const Repository = __dirname + './Repository' // require('./Repository')
		const Count = __dirname + './Count' // require('./Count')

		return {

			repositoriesActivated: {
				relation: Model.HasManyRelation,
				modelClass: Repository,
				join: {
					from: 'partners.id',
					to: 'repositories.activatedById',
				}
			},

			repositoriesDeactivated: {
				relation: Model.HasManyRelation,
				modelClass: Repository,
				join: {
					from: 'partners.id',
					to: 'repositories.deactivatedById',
				}
			},

			countsDeleted: {
				relation: Model.HasManyRelation,
				modelClass: Count,
				join: {
					from: 'partners.id',
					to: 'count.deletedById',
				}
			},

			countsPerformed: {
				relation: Model.HasManyRelation,
				modelClass: Count,
				join: {
					from: 'partners.id',
					to: 'count.deletedById',
				}
			},

			countsChecked: {
				relation: Model.HasManyRelation,
				modelClass: Count,
				join: {
					from: 'partners.id',
					to: 'count.deletedById',
				}
			},

		}
	}

}

export default Partner