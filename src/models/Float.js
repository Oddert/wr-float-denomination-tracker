const { Model } = require('objection')
const knex = require('../db/knex')

Model.knex(knex)

class Float extends Model {

	static get tableName () {
		return 'floats'
	}

	static get jsonSchema () {
		return {
			type: 'object',
			required: [
				'bagNote5',
				'bagPound2',
				'bagPound1',
				'bagPence50',
				'bagPence20',
				'bagPence10',
				'bagPence5',
				'bagPence2',
				'bagPence1',
				'bagTotal',
				'noteTotal',
				'looseTotal',
				'floatTotal',
			],
			properties: {
				id: { type: 'integer' },

				countId: { type: 'integer' },
		
				note50: { type: ['integer', 'null'] },
				note20: { type: ['integer', 'null'] },
				note10: { type: ['integer', 'null'] },
				note5: { type: ['integer', 'null'] },
				note1: { type: ['integer', 'null'] },
				noteTotal: { type: 'integer' }, 
		
				bagNote5: { type: 'integer' },
				bagPound2: { type: 'integer' },
				bagPound1: { type: 'integer' },
				bagPence50: { type: 'integer' },
				bagPence20: { type: 'integer' },
				bagPence10: { type: 'integer' },
				bagPence5: { type: 'integer' },
				bagPence2: { type: 'integer' },
				bagPence1: { type: 'integer' },
				bagTotal: { type: 'integer' },
		
				loosePound2: { type: ['integer', 'null'] },
				loosePound1: { type: ['integer', 'null'] },
				loosePence50: { type: ['float', 'null'] },
				loosePence20: { type: ['float', 'null'] },
				loosePence10: { type: ['float', 'null'] },
				loosePence5: { type: ['float', 'null'] },
				loosePence2: { type: ['float', 'null'] },
				loosePence1: { type: ['float', 'null'] },
				looseOther: { type: ['float', 'null'] },
				looseTotal: { type: 'float' },
		
				floatTotal: { type: 'float' },
			}
		}
	}
	
	static get relationMappings () {
		const Count = require('./Count') 
		
		return {
			
			count: {
				relation: Model.HasOneRelation,
				modelClass: Count,
				join: {
					from: 'counts.floatId',
					to: 'floats.id'
				}
			}

		}
	}

}

export default Float