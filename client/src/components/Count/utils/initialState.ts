import { repositories } from './API'
import {
	StateType
} from './types'

const initialState: StateType = {
	repository: repositories[0],
	counter: '',
	supervisor: '',
	data: {
		bagged: {
			pence_one: 0,
			pence_two: 0,
			pence_five: 0,
			pence_ten: 0,
			pence_twenty: 0,
			pence_fifty: 0,
			pound_one: 0,
			pound_two: 0,
			note_five: 0,
			total: 0,
		},
		loose: {
			pence_one: 0,
			pence_two: 0,
			pence_five: 0,
			pence_ten: 0,
			pence_twenty: 0,
			pence_fifty: 0,
			pound_one: 0,
			pound_two: 0,
			other: 0,
			total: 0,
		},
		notes: {
			note_one: 0,
			note_five: 0,
			note_ten: 0,
			note_twenty: 0,
			note_fifty: 0,
		},
		total: 0,
	},
	timestamp: Date.now(),
	ready: false,
	verified: false,
}

export default initialState