
import { Response } from 'express'

export interface PartnerServerType {
	id: number
	preferredName: string
	firstName: string
	middleNames: string
	lastName: string
	pending: boolean
	createdOn: number
	updatedOn: number
	tillNumber: string
}

export interface BaggedType {
	pence_one: number | null
	pence_two: number | null
	pence_five: number | null
	pence_ten: number | null
	pence_twenty: number | null
	pence_fifty: number | null
	pound_one: number | null
	pound_two: number | null
	note_five: number | null
	total: number | null
}

export interface LooseType {
	pence_one: number | null
	pence_two: number | null
	pence_five: number | null
	pence_ten: number | null
	pence_twenty: number | null
	pence_fifty: number | null
	pound_one: number | null
	pound_two: number | null
	other: number | null
	total: number | null
}

export interface NotesType {
	note_one: number | null
	note_five: number | null
	note_ten: number | null
	note_twenty: number | null
	note_fifty: number | null
	total: number | null
}

export interface DataType {
	bagged: BaggedType
	loose: LooseType
	notes: NotesType
	total: number
}

export interface StateType {
	repository: number
	timestamp: number | Date
	data: DataType
	counter: string
	supervisor: string
	ready: boolean
	verified: boolean
	counterId: string
	supervisorId: string
}


export const respondWell = 
	(res: Response, status: number | null, errorMessage: string | null, responseMessage: string | null, other: any): Response => {
	return res
		.status(status || 200)
		.json({
			status: status || 200,
			errorMessage,
			responseMessage: responseMessage || 'Request processed successfully.',
			...other
		})
}

export const respondBadRequest = 
	(res: Response, status: number | null, errorMessage: string | null, responseMessage: string | null, other: any): Response => {
	return res
		.status(status || 400)
		.json({
			status: status || 400,
			errorMessage: errorMessage || 'There was an error in your request, no content was found.',
			responseMessage,
			...other
		})
}

export const respondErr = 
	(res: Response, status: number | null, errorMessage: string | null, responseMessage: string | null, other: any): Response => {
	return res
		.status(status || 500)
		.json({
			status: status || 500,
			errorMessage: errorMessage || 'There was a error processing your reponse.',
			responseMessage,
			...other
		})
}


export interface CountType {
	floatId: number
	repositoryId: number
	completionStatus: 'complete' | 'incomplete' | 'partial' | 'unverified'
	createdOn: number
	updatedOn?: number
	verified?: boolean
	counterId?: number
	supervisorId?: number
	deletedById?: number
	deleted?: boolean
	deletedOn?: number
}



export const validateCount = (count: any) => {
	// LAST CHANGE: 14-04-2021 1220

	console.log('### Begin Count ###')
	console.log(count)

	if (count === undefined) failMissingData('Count is not defined.')

	const sampleState: StateType = {
		repository: 0,
		counter: '',
		counterId: '',
		supervisor: '',
		supervisorId: '',
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
				total: 0,
			},
			total: 0,
		},
		timestamp: Date.now(),
		ready: false,
		verified: true,
	}

	let response: any
	let verified: boolean = true
	let baggedCheckPass: boolean = false
	let looseCheckPass: boolean = false
	let notesCheckPass: boolean = false

	function failMissingData (message: string) {
		// console.log('~call to failMissingData~', {
		// 	code: 'invalid',
		// 	message,
		// 	verified,
		// })
		return {
			code: 'invalid',
			message,
			verified,
		}
	}

	// function isVerifiedCheck () {
	// 	if (count.hasOwnProperty('counterId') && /\w+/gi.test(count.counterId)) {
	// 		const EXT = `/api/v1/user/${count.counterId}`
	// 		const OPTS = {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			}
	// 		}
	// 		fetch(EXT, OPTS)
	// 		.then(res => res.json())
	// 		.then(data => {
	// 			console.log({ data })
	// 			if (data.user) {
	// 				verified = true
	// 			} else {
	// 				verified = false
	// 			}
	// 		})
	// 		.catch(() => {
	// 			verified = false
	// 		})
	// 	} else {
	// 		if (count.verified && count.verified === true) verified = true
	// 		else verified = false
	// 	}
	// }

	function missingDataCheck () {
		if (count === null) {
			return failMissingData('No count provided, recieved null')
		}
		if (count === undefined) {
			return failMissingData('No count provided, recieved undefined')
		}
		if (count === '') {
			return failMissingData('No count provided, recieved an empty string')
		}
	}

	// # Invalid Check
	// check is null data
	// check level 1 properties exist
	// for data.bagged .loose .notes check all attrs exist
	
	// # Partial count Check
	// for each prop in bagged - check has non NaN value

	// # Complete check
	// for loose each value check non NaN value
	// for notes each value check non NaN value

	
	function propsCheck () {
		if (!count.hasOwnProperty('data')) {
			return failMissingData('Object count has no such property "data".')
		}
		const dataKeys: string[] = Object.keys(sampleState.data)
		dataKeys.forEach((key: string) => {
			if (!count.data.hasOwnProperty(key)) {
				return failMissingData(`Object count.data has no such property "${key}"`)
			}
			// @ts-ignore suppressImplicitAnyIndexErrors
			const itemisedKeys = Object.keys(sampleState.data[key])
			itemisedKeys.forEach((item: string) => {
				if (!count.data[key].hasOwnProperty(item)) {
					return failMissingData(`Object count.data[${key}] has no such property "${item}"`)
				}
			})
		})
	}

	// function checkAuthor () {
	// 	if (count && count.hasOwnProperty('counter')) {
	// 		if (typeof count.counter === 'boolean') return failMissingData('counter (author) on count is the wrong data type (number)')
	// 		if (typeof count.counter === 'number') return failMissingData('counter (author) on count is the wrong data type (number)')
	// 		if (typeof count.counter === 'object') return failMissingData('counter (author) on count is the wrong data type (number)')
	// 	} else return failMissingData('No counter (author) found on the count object.')
	// }

	function baggedCompleteCheck () {
		if (!count.data) return failMissingData('No such property "data" on count.')
		if (!count.data.bagged) return failMissingData('No such property "bagged" on "count.data".')
		const baggedKeys = Object.keys(sampleState.data.bagged)
		let error: string | boolean = false
		const result = baggedKeys.reduce((acc, each) => {
			if (error) return acc
			// @ts-ignore
			if (!count.data.bagged.hasOwnProperty(each)) error = each
			// @ts-ignore
			if (typeof count.data.bagged[each] === 'number') return acc
			// @ts-ignore
			if (count.data.bagged[each] === null) return false
			error = each
			return false
		}, true)
		if (error) return failMissingData(`[Bagged Coin Check]: invalid value for property "${error}". Expected null or number but recieved "${count.data.bagged[error]}"`)
		baggedCheckPass = result
	}

	function looseCompleteCheck () {
		if (!count.data) return failMissingData('No such property "data" on count.')
		if (!count.data.loose) return failMissingData('No such property "loose" on "count.data".')
		const looseKeys = Object.keys(sampleState.data.loose)
		let error: string | boolean = false
		const result = looseKeys.reduce((acc, each) => {
			if (error) return acc
			// @ts-ignore
			if (!count.data.loose.hasOwnProperty(each)) error = each
			// @ts-ignore
			if (typeof count.data.loose[each] === 'number') return acc
			// @ts-ignore
			if (count.data.loose[each] === null) return false
			error = each
			return false
		}, true)
		if (error) return failMissingData(`[Loose Coin Check]: invalid value for property "${error}". Expected null or number but recieved "${count.data.loose[error]}"`)
		looseCheckPass = result
	}

	function notesCompleteCheck () {
		if (!count.data) return failMissingData('No such property "data" on count.')
		if (!count.data.notes) return failMissingData('No such property "notes" on "count.data".')
		const notesKeys = Object.keys(sampleState.data.notes)
		let error: string | boolean = false
		const result = notesKeys.reduce((acc, each) => {
			if (error) return acc
			// @ts-ignore
			if (!count.data.notes.hasOwnProperty(each)) error = each
			// @ts-ignore
			if (typeof count.data.notes[each] === 'number') return acc
			// @ts-ignore
			if (count.data.notes[each] === null) return false
			error = each
			return false
		}, true)
		if (error) {
			notesCheckPass = false
			return failMissingData(`[Notes Coin Check]: invalid value for property "${error}". Expected null or number but recieved "${count.data.notes[error]}"`)
		} else {
			notesCheckPass = result
		}
	}

	function assignPartialOrComplete () {
		console.log({ baggedCheckPass, looseCheckPass, notesCheckPass })

		function partial (message: string) {
			return {
				code: 'partial',
				message,
				verified,
			}
		}

		if (baggedCheckPass) {
			if (looseCheckPass && notesCheckPass) {
				return {
					code: 'complete',
					message: 'all values found',
					verified,
				}	
			} else if (looseCheckPass) {
				return partial('notes have missing values')
			} else if (notesCheckPass) {
				return partial('loose coins have missing values')
			} else {
				return partial('notes and loose coins have missing values')
			}
		} else {
			return {
				code: 'incomplete',
				message: 'bagged coin has missing values',
				verified,
			}	
		}
	}

	// # Verified type checks
	// isVerifiedCheck()

	// # Invalid type checks
	// missingDataCheck()
	// propsCheck()
	// checkAuthor()
	
	// # Partial type checks
	// baggedCompleteCheck
	
	// # Complete type checks
	// looseCompleteCheck
	// noteCompleteCheck

	// assignPartialOrComplete
	
	// if complete return complete
	// if partial return partial

	function callChecks () {
		const tests = [
			// isVerifiedCheck, 
			missingDataCheck, 
			propsCheck, 
			// checkAuthor, 
			baggedCompleteCheck, 
			looseCompleteCheck, 
			notesCompleteCheck, 
			assignPartialOrComplete
		]
		tests.forEach((each) => {
			const res: any = each()
			if (res && !response) response = res
		})
	}

	callChecks()
	if (response) return response
	return {
		code: 'incomplete',
		message: '[default] no count provided',
		verified,
	}
}