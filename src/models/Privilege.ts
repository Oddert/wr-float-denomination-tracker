import { Model } from 'objection'
import knex from '../db/knex'

Model.knex(knex)

class Privilege extends Model {
	userId?: number
	description?: string
	createdOn?: number
	countReadList?: boolean
	countReadIndividual?: boolean
	countDeclare?: boolean
	countCreate?: boolean
	countUpdate?: boolean
	countDestroy?: boolean
	repositoryReadList?: boolean
	repositoryReadIndividual?: boolean
	repositoryActivate?: boolean
	repositoryCreate?: boolean
	repositoryUpdate?: boolean
	repositoryDestroy?: boolean
	partnerReadList?: boolean
	partnerReadIndividual?: boolean
	partnerRequest?: boolean
	partnerCreate?: boolean
	partnerUpdateBasic?: boolean
	partnerUpdateDetails?: boolean
	partnerUpdatePrivileges?: boolean
	partnerDelete?: boolean
	partnerDeletePermanent?: boolean

	static get tableName () {
		return 'privileges'
	}

	static get jsonSchema () {
		return {
			type: 'object',
			required: [
				'countReadList',
				'countReadIndividual',
				'countDeclare',
				'countCreate',
				'countUpdate',
				'countDestroy',
				'repositoryReadList',
				'repositoryReadIndividual',
				'repositoryActivate',
				'repositoryCreate',
				'repositoryUpdate',
				'repositoryDestroy',
				'partnerReadList',
				'partnerReadIndividual',
				'partnerRequest',
				'partnerCreate',
				'partnerUpdateBasic',
				'partnerUpdateDetails',
				'partnerUpdatePrivileges',
				'partnerDelete',
				'partnerDeletePermanent',
			],
			properties: {
				userId: { type: 'integer' },
				description: { type: 'string' },
				createdOn: { type: 'date' },
				countReadList: { type: 'boolean' },
				countReadIndividual: { type: 'boolean' },
				countDeclare: { type: 'boolean' },
				countCreate: { type: 'boolean' },
				countUpdate: { type: 'boolean' },
				countDestroy: { type: 'boolean' },
				repositoryReadList: { type: 'boolean' },
				repositoryReadIndividual: { type: 'boolean' },
				repositoryActivate: { type: 'boolean' },
				repositoryCreate: { type: 'boolean' },
				repositoryUpdate: { type: 'boolean' },
				repositoryDestroy: { type: 'boolean' },
				partnerReadList: { type: 'boolean' },
				partnerReadIndividual: { type: 'boolean' },
				partnerRequest: { type: 'boolean' },
				partnerCreate: { type: 'boolean' },
				partnerUpdateBasic: { type: 'boolean' },
				partnerUpdateDetails: { type: 'boolean' },
				partnerUpdatePrivileges: { type: 'boolean' },
				partnerDelete: { type: 'boolean' },
				partnerDeletePermanent: { type: 'boolean' },
			}
		}
	}

	static get relationMappings () {
		const User = __dirname + './User' //requrie('./User')
		return {

			// user: {
			// 	relation: Model.BelongsToOneRelation,
			// 	modelClass: User,
			// 	join: {
			// 		from: 'privileges.userId',
			// 		to: 'users.id'
			// 	}
			// },

			owner: {
				relation: Model.HasOneRelation,
				modelClass: User,
				join: {
					from: 'users.privilegeId',
					to: 'privileges.id'
				}
			}

		}
	}
}

export default Privilege