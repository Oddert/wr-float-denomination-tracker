
import {
	StateType,
	Validation,
} from './types'

export const repositories: ['401', '403', 'lotto'] = ['401', '403', 'lotto']

export enum CountActions {
	WRITE_ALL = 'WRITE_ALL',
	SET_READY = 'SET_READY',
	UPDATE_REPO = 'UPDATE_REPO',
	UPDATE_COUTNER = 'UPDATE_COUTNER',
	UPDATE_SUPERVISOR = 'UPDATE_SUPERVISOR',
	UPDATE_TIME = 'UPDATE_TIME',
	UPDATE_BAG = 'UPDATE_BAG',
	UPDATE_LOOSE = 'UPDATE_LOOSE',
	UPDATE_NOTES = 'UPDATE_NOTES',
}

export const sanitiseNumberInputVal = (
	n: number | string | undefined | null, 
	step: number
): number | undefined => {
	if (typeof n === 'number') return n / step
	else return undefined
}

const sampleState: StateType = {
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
}

export const validateCount = (count: any): Validation => {
	console.log(count)

	function missingDataCheck () {
		if (count === null) {
			return {
				code: 'invalid',
				message: 'No count provided, recieved null',
			}
		}
		if (count === undefined) {
			return {
				code: 'invalid',
				message: 'No count provided, recieved undefined',
			}
		}
		if (count === '') {
			return {
				code: 'invalid',
				message: 'No count provided, recieved an empty string',
			}
		}
	}

	// # Invalid Check
	// check is null data
	// check level 1 properties exist
	// for data.bagged .loose .notes check all attrs exist
	
	// # unverified check
	// has unverified flag or no counter 
	
	// # Partial count Check
	// for each prop in bagged - check has non NaN value

	// # Complete check
	// for loose each value check non NaN value
	// for notes each value check non NaN value

	
	function repoCheck () {

	}

	missingDataCheck()
	return {
		code: 'incomplete',
		message: 'no count provided',
	}
}