const { Model } = require('objection')
const knex = require('../db/knex')

Model.knex(knex)

class Privilege extends Model {
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
		const User = requrie('./User')
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

module.exports = Privilege