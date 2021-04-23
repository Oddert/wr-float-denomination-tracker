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
		
				bagNote5: { type: ['integer', 'null'] },
				bagPound2: { type: ['integer', 'null'] },
				bagPound1: { type: ['integer', 'null'] },
				bagPence50: { type: ['integer', 'null'] },
				bagPence20: { type: ['integer', 'null'] },
				bagPence10: { type: ['integer', 'null'] },
				bagPence5: { type: ['integer', 'null'] },
				bagPence2: { type: ['integer', 'null'] },
				bagPence1: { type: ['integer', 'null'] },
				bagTotal: { type: ['integer', 'null'] },
		
				loosePound2: { type: ['integer', 'null'] },
				loosePound1: { type: ['integer', 'null'] },
				loosePence50: { type: ['float', 'integer', 'null'] },
				loosePence20: { type: ['float', 'integer', 'null'] },
				loosePence10: { type: ['float', 'integer', 'null'] },
				loosePence5: { type: ['float', 'integer', 'null'] },
				loosePence2: { type: ['float', 'integer', 'null'] },
				loosePence1: { type: ['float', 'integer', 'null'] },
				looseOther: { type: ['float', 'integer', 'null'] },
				looseTotal: { type: 'float' },
		
				floatTotal: { type: 'float' },
			}
		}
	}
	
	static get relationMappings () {
		const Count = __dirname + './Count' //require('./Count') 
		
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