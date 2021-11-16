
import { Response } from 'express'

import {
	BagTypes,
	LooseTypes,
	CountClientStateType,
	ValidateFloatReponseType,
} from './types'

/**
 * Standardised response wrapper for generating uniform reposnse ojects for a successfull request (200 range)
 *
 * @param {Response} res Express response object to be resolved
 * @param {number | null} status Override the default 200 http status code
 * @param {string | null} errorMessage A description of an error
 * @param {string | null} responseMessage A success message or additional info
 * @param {...any} other Any other payload to send
 * @returns {Response}
 */
export const respondWell = (
	res: Response,
	status: number | null,
	errorMessage: string | null,
	responseMessage: string | null,
	other: any,
): Response => {
		console.log('Respond Well: ', {
			status: status || 200,
			errorMessage,
			responseMessage: responseMessage || 'Request processed successfully.',
			...other,
		})
		return res
		.status(status || 200)
		.json({
			status: status || 200,
			errorMessage,
			responseMessage: responseMessage || 'Request processed successfully.',
			...other
		})
}

/**
 * Standardised response wrapper for generating uniform reposnse ojects for an input or formating error (400  range)
 *
 * @param {Response} res Express response object to be resolved
 * @param {number | null} status Override the default 400 http status code
 * @param {string | null} errorMessage A description of an error
 * @param {string | null} responseMessage A success message or additional info
 * @param {...any} other Any other payload to send
 * @returns {Response}
 */
 export const respondBadRequest = (
	res: Response,
	status: number | null,
	errorMessage: string | null,
	responseMessage: string | null,
	other: any
): Response => {
	console.log('Bad Request: ', {
		status: status || 400,
		errorMessage: errorMessage || 'There was an error in your request, no content was found.',
		responseMessage,
		...other
	})
	return res
		.status(status || 400)
		.json({
			status: status || 400,
			errorMessage: errorMessage || 'There was an error in your request, no content was found.',
			responseMessage,
			...other
		})
}

/**
 * Standardised response wrapper for generating uniform reposnse ojects for a server issue (500  range)
 *
 * @param {Response} res Express response object to be resolved
 * @param {number | null} status Override the default 500 http status code
 * @param {string | null} errorMessage A description of an error
 * @param {string | null} responseMessage A success message or additional info
 * @param {...any} other Any other payload to send
 * @returns {Response}
 */
export const respondErr = (
	res: Response,
	status: number | null,
	errorMessage: string | null,
	responseMessage: string | null,
	other: any
): Response => {
	console.log('Server Error', {
		status: status || 500,
		errorMessage: errorMessage || 'There was a error processing your reponse.',
		responseMessage,
		...other
	})
	return res
		.status(status || 500)
		.json({
			status: status || 500,
			errorMessage: errorMessage || 'There was a error processing your reponse.',
			responseMessage,
			...other
		})
}


/**
 * Parses a query or body parameter intended to be used as a number to a number or a given default
 *
 * @param {any} param The query parameter you want to sanitise
 * @param {number} fallback A value to use if the parameter is undefined or an unexpected type
 * @returns {nummber} The query parameter converted to a number or the fallback if NaN
 */
export function sanitiseNumberQuery (param: any, fallback: number): number {
	const paramCoerced = Number(param)
	if (typeof paramCoerced !== 'number' || isNaN(paramCoerced)) return fallback
	else return paramCoerced
}

export const validateCount = (count: any) => {
	// LAST CHANGE: 14-04-2021 1220

	console.log('### Begin Count ###')
	console.log(count)

	if (count === undefined) failMissingData('Count is not defined.')
	if (count === null) failMissingData('Count is null.')
	if (count === '') failMissingData('Recieved an empty string.')

	const sampleState: CountClientStateType = {
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
	const verified: boolean = true
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

/**
 * Tests a given value against required properties of a valid float
 * Will check the structure, required values and value types
 * response.verified signals the float is to be rejected with an error reponse
 *
 * @param float object assumed to be a Float
 * @returns {ValidateFloatReponseType} Represents the result of the validation
 */
export const validateFloat = (float: any): ValidateFloatReponseType => {
	console.log('### Begin float ###')
	console.log(float)

	/**
	 * Generic reponse creator for missing required data (partial or total)
	 *
	 * @param message Description of the data missing
	 * @returns {ValidateFloatReponseType}
	 */
	function failMissingData (message: string) {
		return {
			code: 'invalid',
			message,
			verified: false,
		}
	}

	if (float === undefined) failMissingData('float is not defined.')

	let response: ValidateFloatReponseType | undefined
	const verified: boolean = true
	let baggedCheckPass: boolean = false
	let looseCheckPass: boolean = false
	let notesCheckPass: boolean = false

	function missingDataCheck () {
		if (float === null) {
			return failMissingData('No float provided, recieved null')
		}
		if (float === undefined) {
			return failMissingData('No float provided, recieved undefined')
		}
		if (float === '') {
			return failMissingData('No float provided, recieved an empty string')
		}
	}

	// Half finished, was used to fail on props missing, not suitable for server side updates

	// function propsCheck () {
	// 	if (!count.hasOwnProperty('float')) {
	// 		return failMissingData('Object count has no such property "float".')
	// 	}
	// 	const dataKeys: string[] = ['bagPence1', 'bagPence2', 'bagPence5', 'bagPence10', 'bagPence20', 'bagPence50', 'bagPound1', 'bagPound2', 'bagNote5', 'bagTotal', 'loosePence1', 'loosePence2', 'loosePence5', 'loosePence10', 'loosePence20', 'loosePence50', 'loosePound1', 'loosePound2', 'looseOther', 'looseTotal', 'note1', 'note5', 'note10', 'note20', 'note50', 'noteTotal', 'floatTotal']
	// 	dataKeys.forEach((key: string) => {
	// 		if (!count.float.hasOwnProperty(key)) {
	// 			return failMissingData(`Object count.data has no such property "${key}"`)
	// 		}
	// 		if (count.float[key]) {
	// 			const attr = count.foat
	// 			if (typeof )
	// 		}
	// 		// @ts-ignore suppressImplicitAnyIndexErrors
	// 		// const itemisedKeys = Object.keys(sampleState.float[key])
	// 		// itemisedKeys.forEach((item: string) => {
	// 		// 	if (!count.data[key].hasOwnProperty(item)) {
	// 		// 		return failMissingData(`Object count.data[${key}] has no such property "${item}"`)
	// 		// 	}
	// 		// })
	// 	})
	// }

	// function checkAuthor () {
	// 	if (count && count.hasOwnProperty('counter')) {
	// 		if (typeof count.counter === 'boolean') return failMissingData('counter (author) on count is the wrong data type (number)')
	// 		if (typeof count.counter === 'number') return failMissingData('counter (author) on count is the wrong data type (number)')
	// 		if (typeof count.counter === 'object') return failMissingData('counter (author) on count is the wrong data type (number)')
	// 	} else return failMissingData('No counter (author) found on the count object.')
	// }

	/**
	 * tests the float object to validate that:
	 * -all bagtype keys are present
	 * -all bagtype keys have a value which is number
	 *
	 * Overrites the global baggedCheckPass value
	 */
	function baggedCompleteCheck (): void {
		const baggedKeys: BagTypes[] = ['bagPence1', 'bagPence2', 'bagPence5', 'bagPence10', 'bagPence20', 'bagPence50', 'bagPound1', 'bagPound2', 'bagNote5', 'bagTotal']
		let error: boolean = false
		let errBagType: string | undefined

		const result: boolean = baggedKeys.reduce((acc: boolean, each: BagTypes) => {
			// if (error) return acc
			if (!float.hasOwnProperty(each)) {
				errBagType = each
				error = true
				return false
			}
			if (float[each] === null) return false
			if (typeof float[each] === 'number') return acc

			error = true
			errBagType = each
			console.log({ error, errBagType })
			return false
		}, true)

		// if (error) return failMissingData(`[Bagged Coin Check]: invalid value for property "${error}". Expected null or number but recieved "${count.data.bagged[error]}"`)
		baggedCheckPass = result
		console.log({ baggedCheckPass })
	}

	/**
	 * tests the float object to validate that:
	 * -all loose coin keys are present
	 * -all looe coin keys have a value which is number
	 *
	 * Overrites the global looseCheckPass value
	 */
	function looseCompleteCheck (): void {
		const looseKeys: LooseTypes[] = ['loosePence1', 'loosePence2', 'loosePence5', 'loosePence10', 'loosePence20', 'loosePence50', 'loosePound1', 'loosePound2', 'looseOther', 'looseTotal']
		let error: boolean = false
		let errorMsg: string
		const result = looseKeys.reduce((acc, each) => {
			// if (error) return acc
			if (!float.hasOwnProperty(each)) {
				error = true
				errorMsg = each
				return false
			}
			if (float[each] === null) return false
			if (typeof float[each] === 'number') return acc
			errorMsg = each
			error = true
			console.log({ error, errorMsg })
			return false
		}, true)
		// if (error) return failMissingData(`[Loose Coin Check]: invalid value for property "${error}". Expected null or number but recieved "${count.data.loose[error]}"`)
		looseCheckPass = result
		console.log({ looseCheckPass })
	}

	/**
	 * tests the float object to validate that:
	 * -all coin keys are present
	 * -all coin keys have a value which is number
	 *
	 * Overrites the global notesCheckPass value
	 */
	function notesCompleteCheck (): void {
		const notesKeys = ['note1', 'note5', 'note10', 'note20', 'note50', 'noteTotal']
		let error: boolean = false
		let errorMsg: string
		const result = notesKeys.reduce((acc, each) => {
			// if (error) return acc
			if (!float.hasOwnProperty(each)) {
				error = true
				errorMsg = each
				return false
			}
			if (float[each] === null) return false
			if (typeof float[each] === 'number') return acc
			errorMsg = each
			error = true
			console.log({ error, errorMsg })
			return false
		}, true)
		// if (error) {
		// 	notesCheckPass = false
		// 	// return failMissingData(`[Notes Coin Check]: invalid value for property "${error}". Expected null or number but recieved "${count.data.notes[error]}"`)
		// } else {
			notesCheckPass = result
		// }
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
			// propsCheck,
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