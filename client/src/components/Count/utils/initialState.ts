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
			pence_one: null,
			pence_two: null,
			pence_five: null,
			pence_ten: null,
			pence_twenty: null,
			pence_fifty: null,
			pound_one: null,
			pound_two: null,
			note_five: null,
			total: null,
		},
		loose: {
			pence_one: null,
			pence_two: null,
			pence_five: null,
			pence_ten: null,
			pence_twenty: null,
			pence_fifty: null,
			pound_one: null,
			pound_two: null,
			other: null,
			total: null,
		},
		notes: {
			note_one: null,
			note_five: null,
			note_ten: null,
			note_twenty: null,
			note_fifty: null,
			total: null,
		},
		total: 0,
	},
	timestamp: Date.now(),
	ready: false,
	verified: false,
}

export default initialState