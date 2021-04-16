
import { Request, Response } from 'express'
// import { PartialModelObject } from 'objection'

import Repository from '../models/Repository'
import Count from '../models/Count'
import Partner from '../models/Partner'
import Float from '../models/Float'

import { 
	respondErr, 
	respondWell, 
	// CountType, 
	respondBadRequest, 
	validateCount, 
	PartnerServerType,
	sanitiseNumberQuery,
} from './utils'

// const completeCount = {"bagged":{"pence_one":500,"pence_two":300,"pence_five":2000,"pence_ten":1000,"pence_twenty":7000,"pence_fifty":3000,"pound_one":18000,"pound_two":10000,"note_five":1000,"total":42800},"loose":{"pence_one":164,"pence_two":200,"pence_five":1425,"pence_ten":1370,"pence_twenty":600,"pence_fifty":2450,"pound_one":6100,"pound_two":400,"other":0,"total":12709},"notes":{"note_one":0,"note_five":7500,"note_ten":24000,"note_twenty":12000,"note_fifty":5000,"total":48500},"total":0}
// const partialCount = {"bagged":{"pence_one":800,"pence_two":300,"pence_five":3500,"pence_ten":4500,"pence_twenty":1000,"pence_fifty":1000,"pound_one":12000,"pound_two":4000,"note_five":0,"total":27100},"loose":{"pence_one":0,"pence_two":0,"pence_five":0,"pence_ten":0,"pence_twenty":0,"pence_fifty":0,"pound_one":0,"pound_two":0,"other":0,"total":0},"notes":{"note_one":0,"note_five":0,"note_ten":0,"note_twenty":0,"note_fifty":5000,"total":5000},"total":0}
// const incompleteCount = {"bagged":{"pence_one":0,"pence_two":300,"pence_five":3500,"pence_ten":0,"pence_twenty":0,"pence_fifty":1000,"pound_one":12000,"pound_two":4000,"note_five":0,"total":20800},"loose":{"pence_one":0,"pence_two":0,"pence_five":0,"pence_ten":0,"pence_twenty":0,"pence_fifty":0,"pound_one":0,"pound_two":0,"other":0,"total":0},"notes":{"note_one":0,"note_five":0,"note_ten":0,"note_twenty":0,"note_fifty":5000,"total":5000},"total":0}
// const unverifiedCount = {"bagged":{"pence_one":400,"pence_two":200,"pence_five":4000,"pence_ten":1000,"pence_twenty":2000,"pence_fifty":9000,"pound_one":8000,"pound_two":12000,"note_five":0,"total":36600},"loose":{"pence_one":0,"pence_two":0,"pence_five":0,"pence_ten":0,"pence_twenty":0,"pence_fifty":0,"pound_one":0,"pound_two":0,"other":0,"total":0},"notes":{"note_one":0,"note_five":0,"note_ten":0,"note_twenty":0,"note_fifty":5000,"total":5000},"total":0}

// const counts: any[] = [
// 	{ repository: '403', status: 'complete', timestamp: 1616094172738, _id: 'fen3fuh43f8hf2h2fh87h', data: completeCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// 	{ repository: '401', status: 'complete', timestamp: 1616094172738, _id: 'xm3rgm439x8ug9348cg98', data: completeCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// 	{ repository: '403', status: 'incomplete', timestamp: 1616094172738 - 14863542, _id: 'oiweiowenfbnowg093893', data: partialCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// 	{ repository: '401', status: 'unverified', timestamp: 1616094172738 - 248635424, _id: 'aldpqwomcpm2f2309j0jv', data: incompleteCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// 	{ repository: 'lotto', status: 'incomplete', timestamp: 1616094172738 - 348635424, _id: 'p0kd209xxf3349c3094gj', data: completeCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// 	{ repository: '403', status: 'partial', timestamp: 1616094172738 - 442635424, _id: '02j3f092j3fj8r9232222', data: partialCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// 	{ repository: '401', status: 'partial', timestamp: 1616094172738 - 442635424, _id: '09jf92ehfn9hfpe38hhf3', data: partialCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// 	{ repository: '403', status: 'complete', timestamp: 1616094172738 - 493685464, _id: 'f32ojf093jtx0k4ugx384', data: completeCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// 	{ repository: '403', status: 'complete', timestamp: 1616094172738 - 492685464, _id: '3ncty3oky4toy3ohc8234', data: completeCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// 	{ repository: 'lotto', status: 'complete', timestamp: 1616094172738 - 552635424, _id: '3rx394w5xh34xt43g34gq', data: completeCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// 	{ repository: 'lotto', status: 'unverified', timestamp: 1616094172738 - 862635424, _id: 'eg9crw1g8rw6tb24r9t84', data: unverifiedCount, counter: "", supervisor: "", verified: true },
// 	{ repository: '403', status: 'complete', timestamp: 1616094172738 - 89234245, _id: 'fj9839g34tmc0h4thcg03', data: incompleteCount, counter: "Robyn F H Veitch", supervisor: "Mr Robot", verified: false },
// ]  

// const createId = () => {
// 	const one = () => {
// 		const lower = () => String.fromCharCode(Math.floor((Math.random() * 26) + 97))
// 		const upper = () => String.fromCharCode(Math.floor((Math.random() * 26) + 65))
// 		const num = () => String.fromCharCode(Math.floor((Math.random() * 10) + 48))
// 		const options = [lower, upper, num]
// 		return options[Math.floor(Math.random() * 3)]()
// 	}
// 	let str = ''
// 	for (let i=0; i<21; i++) {str += one()}
// 	return str
// }


// Redux : true
// Action : countsDataWriteAll
// Logic : /Counts
export const getCounts = async (req: Request, res: Response) => {

	// PAGINATION:
	//	-by page
	//	-by index range
	// 	-by date range
	//	-as array

	// ?page=3
	// ?fromdate=?????
	// ?todate=???
	// ?limit=10
	// ?offset=20
	try {
		let page: number = Number(req.query.page)
		if (typeof page === 'number' || !isNaN(page)) {
	
			let pagelength: number = sanitiseNumberQuery(req.query.pagelength, 20)
	
			const counts: Count[] = await Count.query()
				.offset(page * pagelength)
				.limit(pagelength)
	
			return respondWell(res, null, null, 'List of all counts.', { counts })
	
		} else {
			let fromdate: number = sanitiseNumberQuery(req.query.fromdate, 0)
			let todate: number = sanitiseNumberQuery(req.query.todate, Date.now())
			let limit: number = sanitiseNumberQuery(req.query.limit, 500)
			let offset: number = sanitiseNumberQuery(req.query.offset, 0)
				
			const counts: Count[] = await Count.query()
				// .withGraphJoined('float')
				.where('createdOn', '>=', fromdate)
				.andWhere('createdOn', '<=', todate)
				.limit(limit)
				.offset(offset)
		
			return respondWell(res, null, null, 'noice', { counts })
		}
	} catch (error) {
		return respondErr(res, 500, 'There was a server error, please try again.', null, { error })
	}
}

// Redux : false
// Action : countsDataWriteSingle
// Logic : false
export const addCount = async (req: Request, res: Response) => {
	try {
		if (!req.body || !req.body.count) return respondBadRequest(res, 400, 'Error: no count provided?? What were you expecting? ??', null, { requestBody: req.body })

		if (!req.body.count.repositoryId) return respondBadRequest(res, 400, 'Error: Invalid repository ID provided', null, { repositoryId: req.body.count.repositoryId })

		const repositoryId = Number(req.body.count.repositoryId)

		if (typeof repositoryId !== 'number' || isNaN(repositoryId)) {
			return respondBadRequest(
				res, 
				400, 
				'Bad request. The count provided was invalid. Repository ID provided was missing or could not be matched to an existing repository.', 
				null, 
				{ repositoryId }
			)
		}

		const repository = await Repository.query()
			.select('id')
			.skipUndefined()
			.where('id', req.body.count.repositoryId)

		if (repository === null || repository === undefined || repository.length === 0) {
			return respondBadRequest(
				res, 
				400, 
				'Bad request. The count provided was invalid. Repository ID provided was missing or could not be matched to an existing repository.', 
				null, 
				{ repository, repositoryId }
			)
		}

		const validation = validateCount(req.body.count)

		if (validation.code === 'invalid') {
			return respondBadRequest(res, 400, 'Bad request. The count provided was invalid.', null, { validation })
		}



		let counterId = req.body.count.counterId
		// "2", null
		const counter = req.body.count.counter
		// "Ben sisko", ""

		const counterQuery: any = await Partner.query()
			.select('id')
			.skipUndefined()
			.where('id', counterId)

		if (!counterId || isNaN(Number(counterId)) || !counterQuery || counterQuery.length === 0) {
			res.json('joing to make a new user')

			const now = Date.now()
			const preferredName: string = (/[a-zA-Z]+/gi.test(counter) && counter !== undefined) ? counter : 'Unknown Partner'

			const createCounter: Omit<PartnerServerType, 'id'> = {
				preferredName, 
				firstName: '', 
				middleNames: '', 
				lastName: '', 
				pending: true, 
				createdOn: now, 
				updatedOn: now, 
				tillNumber: ''
			}
			// @ts-ignore
			const createdCounter = await Partner.query().insert(createCounter)
			// @ts-ignore
			console.log({ createdCounter }, createdCounter.id)
			// @ts-ignore
			if (createdCounter && createdCounter.id) {
				// @ts-ignore			
				counterId = createdCounter.id
			}
		}


		let supervisorId = req.body.count.supervisorId
		const supervisor = req.body.count.supervisor

		const supervisorQuery: any = await Partner.query()
			.select('id')
			.skipUndefined()
			.where('id', supervisorId)

		if (!supervisorId || isNaN(Number(supervisorId)) || !supervisorQuery || supervisorQuery.length === 0) {
			if (supervisor && /[a-zA-Z]+/gi.test(supervisor) && supervisor !== undefined) {
				res.json('joing to make a new user')

				const now = Date.now()
				const preferredName: string = supervisor

				const createSupervisor: Omit<PartnerServerType, 'id'> = {
					preferredName, 
					firstName: '', 
					middleNames: '', 
					lastName: '', 
					pending: true, 
					createdOn: now, 
					updatedOn: now, 
					tillNumber: ''
				}
				// @ts-ignore
				const createdSupervisor = await Partner.query().insert(createSupervisor)
				// @ts-ignore
				console.log({ createdSupervisor }, createdSupervisor.id)
				// @ts-ignore
				if (createdSupervisor && createdSupervisor.id) {
					// @ts-ignore			
					supervisorId = createdSupervisor.id
				}
			} else {
				supervisorId = null
			}
		}
		
		if (counterId === supervisorId) supervisorId = null

		const d = req.body.count.data

		const flattenCountData = (division: any) => {
			const keys = Object.keys(division)
			const total = keys.reduce((acc, each) => {
				return acc + division[each]
			}, 0)
			return total
		}

		const bagTotal = flattenCountData(d.bagged) 
		const looseTotal = flattenCountData(d.loose) 
		const noteTotal = flattenCountData(d.notes)

		const createFloat = {
			bagPence1: d.bagged.pence_one,
			bagPence2: d.bagged.pence_two,
			bagPence5: d.bagged.pence_five,
			bagPence10: d.bagged.pence_ten,
			bagPence20: d.bagged.pence_twenty,
			bagPence50: d.bagged.pence_fifty,
			bagPound1: d.bagged.pound_one,
			bagPound2: d.bagged.pound_two,
			bagNote5: d.bagged.note_five,
			bagTotal, 
			loosePence1: d.loose.pence_one,
			loosePence2: d.loose.pence_two,
			loosePence5: d.loose.pence_five,
			loosePence10: d.loose.pence_ten,
			loosePence20: d.loose.pence_twenty,
			loosePence50: d.loose.pence_fifty,
			loosePound1: d.loose.pound_one,
			loosePound2: d.loose.pound_two,
			looseOther: d.loose.other,
			looseTotal, 
			note1: d.notes.note_one,
			note5: d.notes.note_five,
			note10: d.notes.note_ten,
			note20: d.notes.note_twenty,
			note50: d.notes.note_fifty,
			noteTotal,
			floatTotal: bagTotal + looseTotal + noteTotal
		}

		console.log({ d, createFloat })
			
		// @ts-ignore
		const floatId = await Float.query().insert(createFloat)

		const now = Date.now()

		const createCount = {
			floatId, 
			repositoryId, 
			completionStatus: validation.code, 
			createdOn: now, 
			updatedOn: now, 
			verified: true, 
			authenticatorId: 0, 
			counterId,
			supervisorId,
		}

		// @ts-ignore
		const count = Count.query().insert(createCount)

		return respondWell(res, 200, null, 'Count successfully created, see response for validation status.', { validation, count })

		// -lookup the counter and return its id is valid /
		// -lookup the supervisor and return its id is valid /
		// -check supervisor and counter are diffirent /
		// -validate the count /
		// -create a float, return id
		// insert count
	} catch (error) {
		// console.error(error)
		return respondErr(res, 500, 'Something went wrong, please try again.', null, { error })
	}
}

// Redux : n/a
// Action : n/a
// Logic : /Count/index
export const getCount = async (req: Request, res: Response) => {
	const { id } = req.params
	const multiCount: any = req.query.count
	console.log({ id, multiCount })
	if (!id) return respondBadRequest(res, 400, 'Not id provided or invalid id. Unable to process request.', null, null)

	if (id === 'details' && multiCount) {

		if (!multiCount || typeof multiCount === undefined) {
			return respondBadRequest(res, 400, 'Please provide a valid id or list of ids as a url query, for example "?count=2,3,4"', null, null)
		}
		
		if (Array.isArray(multiCount)) {

			const count = await Count.query()
				.withGraphJoined('float')
				.whereIn('counts.id', multiCount)
			return respondWell(res, 200, null, 'Details for provided id including float amount.', { count })

		} else if (/,/gi.test(multiCount) || /[0-9]/gi.test(multiCount)) {

			const splitMultiCount = multiCount.split(',')
			const count = await Count.query()
				.withGraphJoined('float')
				.whereIn('counts.id', splitMultiCount)
			return respondWell(res, 200, null, 'Details for provided id including float amount.', { count })

		} else {

			return respondBadRequest(res, 400, 'Please provide a valid id or list of ids as a url query, for example "?count=2,3,4"', null, null)

		}

	} else {

		const count = await Count.query()
			.withGraphJoined('float')
			.where('counts.id', Number(id))

		return respondWell(res, 200, null, 'Details for provided id including float amount.', { count })
	
	}
}

// Redux : false
// Action : countsDataUpdateSingle
// Logic : false
export const updateCount = async (req: Request, res: Response) => {
	console.log('### Welcome to the cool zone ###')
	try {
		if (!req.body || !req.body.count) return respondBadRequest(res, 400, 'Error: no count provided?? What were you expecting? ??', null, { requestBody: req.body })

		if (req.body.count.repositoryId) {
			const repositoryId = Number(req.body.count.repositoryId)

			if (typeof repositoryId !== 'number' || isNaN(repositoryId)) {
				return respondBadRequest(
					res, 
					400, 
					'Bad request. The count provided was invalid. Repository ID provided was missing or could not be matched to an existing repository.', 
					null, 
					{ repositoryId }
				)
			}
			const repository = await Repository.query()
				.select('id')
				.skipUndefined()
				.where('id', req.body.count.repositoryId)
			if (repository === null || repository === undefined || repository.length === 0) {
				return respondBadRequest(
					res, 
					400, 
					'Bad request. The count provided was invalid. Repository ID provided was missing or could not be matched to an existing repository.', 
					null, 
					{ repository, repositoryId }
				)
			}
		}

		const oldCount: any = await Count.query().findById(req.params.id)
		const oldFloat: any = await Float.query().findById(oldCount.floatId)

		let float = { ...oldFloat }

		let counterId = oldCount.counterId
		let supervisorId = oldCount.supervisorId

		if (req.body.counterId || req.body.counter) {
			counterId = req.body.count.counterId
			// "2", null
			const counter = req.body.count.counter
			// "Ben sisko", ""
	
			const counterQuery: any = await Partner.query()
				.select('id')
				.skipUndefined()
				.where('id', counterId)
	
			if (!counterId || isNaN(Number(counterId)) || !counterQuery || counterQuery.length === 0) {
				res.json('joing to make a new user')
	
				const now = Date.now()
				const preferredName: string = (/[a-zA-Z]+/gi.test(counter) && counter !== undefined) ? counter : 'Unknown Partner'
	
				const createCounter: Omit<PartnerServerType, 'id'> = {
					preferredName, 
					firstName: '', 
					middleNames: '', 
					lastName: '', 
					pending: true, 
					createdOn: now, 
					updatedOn: now, 
					tillNumber: ''
				}
				// @ts-ignore
				const createdCounter = await Partner.query().insert(createCounter)
				// @ts-ignore
				console.log({ createdCounter }, createdCounter.id)
				// @ts-ignore
				if (createdCounter && createdCounter.id) {
					// @ts-ignore			
					counterId = createdCounter.id
				}
			}
		}


		if (req.body.supervisorId || req.body.supervisor) {
			supervisorId = req.body.count.supervisorId
			const supervisor = req.body.count.supervisor
	
			const supervisorQuery: any = await Partner.query()
				.select('id')
				.skipUndefined()
				.where('id', supervisorId)
	
			if (!supervisorId || isNaN(Number(supervisorId)) || !supervisorQuery || supervisorQuery.length === 0) {
				if (supervisor && /[a-zA-Z]+/gi.test(supervisor) && supervisor !== undefined) {
					res.json('joing to make a new user')
	
					const now = Date.now()
					const preferredName: string = supervisor
	
					const createSupervisor: Omit<PartnerServerType, 'id'> = {
						preferredName, 
						firstName: '', 
						middleNames: '', 
						lastName: '', 
						pending: true, 
						createdOn: now, 
						updatedOn: now, 
						tillNumber: ''
					}
					// @ts-ignore
					const createdSupervisor = await Partner.query().insert(createSupervisor)
					// @ts-ignore
					console.log({ createdSupervisor }, createdSupervisor.id)
					// @ts-ignore
					if (createdSupervisor && createdSupervisor.id) {
						// @ts-ignore			
						supervisorId = createdSupervisor.id
					}
				} else {
					supervisorId = null
				}
			}
		}
		
		if (counterId === supervisorId) supervisorId = null



		if (req.body.count.data) {
			console.log(`data attr found, will update dloat: ${float.id}`)

			let data = { ...oldFloat }

			const d = req.body.count.data

			let createFloat: any = {
				
			}

			if (d.bagged) {
				console.log('d.bagged found')
				const bagged: {
					bagPence1: number | null,
					bagPence2: number | null,
					bagPence5: number | null,
					bagPence10: number | null,
					bagPence20: number | null,
					bagPence50: number | null,
					bagPound1: number | null,
					bagPound2: number | null,
					bagNote5: number | null,
				} = {
					bagPence1: d.bagged.pence_one || null,
					bagPence2: d.bagged.pence_two || null,
					bagPence5: d.bagged.pence_five || null,
					bagPence10: d.bagged.pence_ten || null,
					bagPence20: d.bagged.pence_twenty || null,
					bagPence50: d.bagged.pence_fifty || null,
					bagPound1: d.bagged.pound_one || null,
					bagPound2: d.bagged.pound_two || null,
					bagNote5: d.bagged.note_five || null,
				}
				Object.keys(bagged).forEach((e: any) => {
					// @ts-ignore
					if (!bagged[e]) delete bagged[e]
				})
				createFloat = { ...createFloat, ...bagged }
			}

			if (d.loose) {
				console.log('d.loose found')
				const loose: {
					loosePence1: number | null
					loosePence2: number | null
					loosePence5: number | null
					loosePence10: number | null
					loosePence20: number | null
					loosePence50: number | null
					loosePound1: number | null
					loosePound2: number | null
					looseOther: number | null
				} = {
					loosePence1: d.loose.pence_one || null,
					loosePence2: d.loose.pence_two || null,
					loosePence5: d.loose.pence_five || null,
					loosePence10: d.loose.pence_ten || null,
					loosePence20: d.loose.pence_twenty || null,
					loosePence50: d.loose.pence_fifty || null,
					loosePound1: d.loose.pound_one || null,
					loosePound2: d.loose.pound_two || null,
					looseOther: d.loose.other || null,
				}
				Object.keys(loose).forEach((e: any) => {
					// @ts-ignore
					if (!loose[e]) delete loose[e]
				})
				createFloat = { ...createFloat, ...loose }
			}

			if (d.notes) {
				console.log('d.notes found')
				const notes: {
					note1: number | null,
					note5: number | null,
					note10: number | null,
					note20: number | null,
					note50: number | null,
				} = {
					note1: d.notes.note_one,
					note5: d.notes.note_five,
					note10: d.notes.note_ten,
					note20: d.notes.note_twenty,
					note50: d.notes.note_fifty,
				}
				Object.keys(notes).forEach((e: any) => {
					// @ts-ignore
					if (!notes[e]) delete notes[e]
				})
				createFloat = {  ...createFloat, ...notes }
			}
	
			const flattenCountData = (division: any) => {
				const keys = Object.keys(division)
				const total = keys.reduce((acc, each) => {
					return acc + division[each]
				}, 0)
				return total
			}
	
			
			
			const bagTotal = flattenCountData(d.bagged) 
			const looseTotal = flattenCountData(d.loose) 
			const noteTotal = flattenCountData(d.notes)

			createFloat.bagTotal = bagTotal
			createFloat.looseTotal = looseTotal
			createFloat.noteTotal = noteTotal

			console.log({ d, createFloat })
			float = {
				...float,
				...createFloat
			}
		}

		const now: number = Date.now()

		console.log({
			// repositoryId, 
			updatedOn: now, 
			// verified: true, 
			// authenticatorId: 0, 
			counterId,
			supervisorId,
			float,
		})
		// return res.json({ plarb: 'ok' })
		
		delete float.id
		// @ts-ignore
		const floatId = await Float.query()
			.patchAndFetchById(oldFloat.id, float)

		const updatedCount: any = {
			// repositoryId, 
			updatedOn: now, 
			// verified: true, 
			// authenticatorId: 0, 
			counterId,
			supervisorId,
		}

		// @ts-ignore
		const dataUpdateCount: any = await Count.query()
			.patchAndFetchById(oldCount.id, updatedCount)


		const validation = validateCount(req.body.count)

		if (validation.code === 'invalid') {
			return respondBadRequest(res, 400, 'Bad request. The count provided was invalid.', null, { validation })
		}

		const count: any = await Count.query()
			.patchAndFetchById(dataUpdateCount.id, {
				// @ts-ignore
				completionStatus: validation.code,
			})

		return respondWell(res, 200, null, 'Count successfully created, see response for validation status.', { validation, count })

		// -lookup the counter and return its id is valid /
		// -lookup the supervisor and return its id is valid /
		// -check supervisor and counter are diffirent /
		// -validate the count /
		// -create a float, return id
		// insert count
	} catch (error) {
		console.error(error)
		return respondErr(res, 500, 'Something went wrong, please try again.', null, { error })
	}
}

// Redux : false
// Action : false
// Logic : false
export const deleteCount = async (req: Request, res: Response) => {
	try {
		const count = await Count.query()
			.patchAndFetchById(req.body.id, {
				// @ts-ignore
				deleted: true,
				deletedOn: Date.now(),
				deletedBy: 0
			})
		if (!count) {
			return respondErr(res, 500, 'There was an issue deleting the user.', null, { count })
		}
		return respondWell(res, 200, null, 'Count deleted successfully.', { count })
	} catch (error) {
		return respondErr(res, 500, 'There was an issue deleting the user.', null, { error })
	}
}

