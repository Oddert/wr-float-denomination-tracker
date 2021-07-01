
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
	// validateCount,
	PartnerServerType,
	sanitiseNumberQuery,
	validateFloat,
} from './utils'


// Higher-order mixins to query builders

// @ts-ignore
function deleteFilterActive (query: any) {
	// console.log('deleteFilterActive')
	return () => query.andWhere('deleted', false)
		// .andWhere('deleted', null)
	// .orWhere('deleted', 0)
}

// @ts-ignore
function deleteFilterInactive (query: any) {
	// console.log('deleteFilterInactive')
	return () => query.andWhere('deleted', true)
}

// @ts-ignore
function noFilter (query: any) {
	return () => query
}

function repoFilter (query: any, repoId: number) {
	// console.log(repoId, typeof repoId)
	return () => query.andWhere('repositoryId', repoId)
}

function floatFilter (query: any) {
	return () => query.withGraphJoined('float')
}

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
	// 	-by page
	// 	-by index range
	// 	-by date range
	// 	-as array

	// ?page=3
	// ?fromdate=?????
	// ?todate=???
	// ?limit=10
	// ?offset=20

	// deleted === 'undefined' || deleted === 'false' || deleted === '0'
	// 		- where Not deleted = 1

	// deleted === 'true' || deleted === '1'
	// 		- where deleted = 1

	// deleted === 'include'
	// 		- (no extra command)

	try {

		const page: number = Number(req.query.page)
		const deleted: string = String(req.query.deleted)
		let repo: string | number = String(req.query.repository)
		const includeFloat: any = req.query.float

		let applyDeleteFilter = deleteFilterActive
		let applyRepoFilter: any = noFilter
		let applyFloatFilter = noFilter

		if (deleted === 'undefined' || deleted === '0' || deleted === 'false') {
			applyDeleteFilter = deleteFilterActive
		}
		if (deleted === 'true' || deleted === '1') {
			applyDeleteFilter = deleteFilterInactive
		}
		if (deleted === 'include') {
			applyDeleteFilter = noFilter
		}

		if (repo !== 'undefined' && repo !== 'all') {
			repo = Number(repo)
			applyRepoFilter = repoFilter
		}

		if (includeFloat) {
			applyFloatFilter = floatFilter
		}

		if (!isNaN(page)) {

			const pagelength: number = sanitiseNumberQuery(req.query.pagelength, 10)

			const q = applyDeleteFilter(
				applyFloatFilter(
					applyRepoFilter(
						Count.query()
							.offset(page * pagelength)
							.limit(pagelength)
							.orderBy('timestamp', 'DESC')
						, repo
						)()
					)()
				)

			const counts = await q()

			return respondWell(res, null, null, 'List of all counts.', { counts: counts.map((e: any) => ({
				...e,
				readableTimestamp: new Date(e.timestamp)
			})) })

		} else {
			const fromdate: number = sanitiseNumberQuery(req.query.fromdate, 0)
			const todate: number = sanitiseNumberQuery(req.query.todate, Date.now())
			const limit: number = sanitiseNumberQuery(req.query.limit, 100)
			const offset: number = sanitiseNumberQuery(req.query.offset, 0)
			console.log('C:')
			console.log(applyRepoFilter)
			console.log(applyDeleteFilter)
			console.log(applyFloatFilter)

			const q = applyRepoFilter(
				applyDeleteFilter(
					applyFloatFilter(
						Count.query()
							.andWhere('timestamp', '>=', fromdate)
							.andWhere('timestamp', '<=', todate)
							.limit(limit)
							.offset(offset)
					)()
				)()
				, repo
			)

			const counts = await q()

			return respondWell(res, null, null, 'List of all counts.',
				{
					counts: counts.map((e: any) => ({
						...e,
						readableTimestamp: new Date(e.timestamp)
					}))
				}
			)
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

		console.log({ repositoryId })

		if (typeof repositoryId !== 'number' || isNaN(repositoryId)) {
			return respondBadRequest(
				res,
				400,
				'[NaN check]: Bad request. The count provided was invalid. Repository ID provided was missing or could not be matched to an existing repository.',
				null,
				{ repositoryId }
			)
		}

		const repository = await Repository.query()
			// .select('id')
			.skipUndefined()
			.where('id', repositoryId)

		console.log({ repository })

		if (repository === null || repository === undefined || repository.length === 0) {
			return respondBadRequest(
				res,
				400,
				'[Repository DB Query 404]: Bad request. The count provided was invalid. Repository ID provided was missing or could not be matched to an existing repository.',
				null,
				{ repository, repositoryId }
			)
		}

		console.log('Repository checks done, moving on to validation')

		const validation = validateFloat(req.body.count.float)

		if (validation.code === 'invalid') {
			return respondBadRequest(res, 400, 'Bad request. The count provided was invalid.', null, { validation })
		}

		console.log('Validation Pass.')

		let counterId = req.body.count.counterId
		// could be 2, "2", null

		const counter = req.body.count.counter
		// could be "Ben sisko", "", null

		const counterQuery: any = await Partner.query()
			.select('id')
			.skipUndefined()
			.where('id', counterId)

		if (!counterId || isNaN(Number(counterId)) || !counterQuery || counterQuery.length === 0) {
			if (counter && /[a-zA-Z]+/gi.test(counter) && counter !== undefined && counter !== null) {
				console.log('joing to make a new user')

				// NOTE: tslint rule no-shadowed-variable turned off due to this pattern (defining timestamp close to actual save)
				// considder refactoring and re-enabling rule later
				const now = Date.now()
				const preferredName: string = (/[a-zA-Z]+/gi.test(counter) && counter !== undefined && counter !== null) ? counter : 'Unknown Partner'

				const createCounter: Omit<PartnerServerType, 'id'> = {
					preferredName,
					firstName: '',
					middleNames: '',
					lastName: '',
					pending: true,
					createdOn: now,
					updatedOn: now,
					tillNumber: '',
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


		let supervisorId = req.body.count.supervisorId
		const supervisor = req.body.count.supervisor

		const supervisorQuery: any = await Partner.query()
			.select('id')
			.skipUndefined()
			.where('id', supervisorId)

		if (!supervisorId || isNaN(Number(supervisorId)) || !supervisorQuery || supervisorQuery.length === 0) {
			if (supervisor && /[a-zA-Z]+/gi.test(supervisor) && supervisor !== undefined && supervisor !== null) {
				console.log('joing to make a new user')

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
		console.log('Partner check done')



		/// here
		const f = req.body.count.float

		const flattenCountData = (division: any[]) => {
			return division.reduce((acc, each) => {
				if (each) return acc + each
				else return acc
			}, 0)
		}

		const bagTotal = flattenCountData([f.bagPence1, f.bagPence2, f.bagPence5, f.bagPence10, f.bagPence20, f.bagPence50, f.bagPound1, f.bagPound2, f.bagNote5])
		const looseTotal = flattenCountData([f.loosePence1, f.loosePence2, f.loosePence5, f.loosePence10, f.loosePence20, f.loosePence50, f.loosePound1, f.loosePound2, f.looseOther])
		const noteTotal = flattenCountData([f.note1, f.note5, f.note10, f.note20, f.note50])

		const createFloat = {
			...f,
			bagTotal,
			looseTotal,
			noteTotal,
			floatTotal: bagTotal + looseTotal + noteTotal
		}

		console.log({ f, createFloat })

		// @ts-ignore
		const createdFloat: any = await Float.query().insert(createFloat)

		console.log('...float created')
		const now = Date.now()

		const createCount = {
			floatId: createdFloat.id,
			repositoryId,
			completionStatus: validation.code,
			createdOn: now,
			updatedOn: now,
			verified: true,
			authenticatorId: 0,
			counterId,
			supervisorId,
			timestamp: new Date(req.body.count.timestamp).getTime(),
			comment: req.body.count.comment || null,
		}

		// @ts-ignore
		const createdCount: any = await Count.query().insert(createCount)
		console.log('...count created', createdCount)
		const count: any = await Count.query().where('id', createdCount.id)
		console.log('..count queried..responding')

		return respondWell(res, 200, null, 'Count successfully created, see response for validation status.', { validation, count: count[0] })

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
				.withGraphJoined('counter')
				.withGraphJoined('supervisor')
				.whereIn('counts.id', multiCount)

			return respondWell(res, 200, null, 'Details for provided id including float amount.', { count })

		} else if (/,/gi.test(multiCount) || /[0-9]/gi.test(multiCount)) {

			const splitMultiCount = multiCount.split(',')
			const count = await Count.query()
				.withGraphJoined('float')
				.withGraphJoined('counter')
				.withGraphJoined('supervisor')
				.whereIn('counts.id', splitMultiCount)

			return respondWell(res, 200, null, 'Details for provided id including float amount.', { count })

		} else {

			return respondBadRequest(res, 400, 'Please provide a valid id or list of ids as a url query, for example "?count=2,3,4"', null, null)

		}

	} else {

		const count = await Count.query()
			.skipUndefined()
			.withGraphJoined('float')
			.withGraphJoined('counter')
			.withGraphJoined('supervisor')
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

		// Validate the validity of the repository ID if provided (all attrs are optional, saving as 'incomplete')
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

		//
		const oldCount: any = await Count.query().findById(req.params.id)
		const oldFloat: any = await Float.query().findById(oldCount.floatId)

		// float attr is used on update, optionally overwritten later
		let float = { ...oldFloat }

		let comment = oldCount.comment

		if (req.body.count.comment && typeof req.body.count.comment === 'string') comment = req.body.count.comment

		// Default behavour is to use old counter and supervisor (inheriting null if not set)
		let counterId = oldCount.counterId
		let supervisorId = oldCount.supervisorId

		// Validate the counter or create new partner if self delcleration option is used
		if (req.body.counterId || req.body.counter) {
			counterId = req.body.count.counterId
			// could be 2, "2", null
			const counter = req.body.count.counter
			// could be "Ben sisko", "", null

			const counterQuery: any = await Partner.query()
				.select('id')
				.skipUndefined()
				.where('id', counterId)

			// No counterId or counterId is not found in partners table
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

		// Validate the supervisor or create new partner if self delcleration option is used
		if (req.body.supervisorId || req.body.supervisor) {
			supervisorId = req.body.count.supervisorId
			const supervisor = req.body.count.supervisor

			const supervisorQuery: any = await Partner.query()
				.select('id')
				.skipUndefined()
				.where('id', supervisorId)

			// No supervisorId or supervisorId is not found in partners table
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

		// Nullify the supervisor signature if the user has signed their own name twice
		if (counterId === supervisorId) supervisorId = null


		// Client has provided 'float', process and update. Skip if not provided (client wants metadata update only, for instance)
		if (req.body.count.float) {
			console.log(`float attr found, will update float: ${float.id}`)

			const f = req.body.count.float

			const createFloat: any = {}

			if (f.hasOwnProperty('bagPence1')) createFloat.bagPence1 = f.bagPence1
			if (f.hasOwnProperty('bagPence2')) createFloat.bagPence2 = f.bagPence2
			if (f.hasOwnProperty('bagPence5')) createFloat.bagPence5 = f.bagPence5
			if (f.hasOwnProperty('bagPence10')) createFloat.bagPence10 = f.bagPence10
			if (f.hasOwnProperty('bagPence20')) createFloat.bagPence20 = f.bagPence20
			if (f.hasOwnProperty('bagPence50')) createFloat.bagPence50 = f.bagPence50
			if (f.hasOwnProperty('bagPound1')) createFloat.bagPound1 = f.bagPound1
			if (f.hasOwnProperty('bagPound2')) createFloat.bagPound2 = f.bagPound2
			if (f.hasOwnProperty('bagNote5')) createFloat.bagNote5 = f.bagNote5
			if (f.hasOwnProperty('bagTotal')) createFloat.bagTotal = f.bagTotal

			if (f.hasOwnProperty('loosePence1')) createFloat.loosePence1 = f.loosePence1
			if (f.hasOwnProperty('loosePence2')) createFloat.loosePence2 = f.loosePence2
			if (f.hasOwnProperty('loosePence5')) createFloat.loosePence5 = f.loosePence5
			if (f.hasOwnProperty('loosePence10')) createFloat.loosePence10 = f.loosePence10
			if (f.hasOwnProperty('loosePence20')) createFloat.loosePence20 = f.loosePence20
			if (f.hasOwnProperty('loosePence50')) createFloat.loosePence50 = f.loosePence50
			if (f.hasOwnProperty('loosePound1')) createFloat.loosePound1 = f.loosePound1
			if (f.hasOwnProperty('loosePound2')) createFloat.loosePound2 = f.loosePound2
			if (f.hasOwnProperty('looseOther')) createFloat.looseOther = f.looseOther
			if (f.hasOwnProperty('looseTotal')) createFloat.looseTotal = f.looseTotal

			if (f.hasOwnProperty('note1')) createFloat.note1 = f.note1
			if (f.hasOwnProperty('note5')) createFloat.note5 = f.note5
			if (f.hasOwnProperty('note10')) createFloat.note10 = f.note10
			if (f.hasOwnProperty('note20')) createFloat.note20 = f.note20
			if (f.hasOwnProperty('note50')) createFloat.note50 = f.note50
			if (f.hasOwnProperty('noteTotal')) createFloat.noteTotal = f.noteTotal

			const flattenCountData = (division: any) => {
				const keys = Object.keys(division)
				const total = keys.reduce((acc, each) => {
					if (division[each]) return acc + division[each]
					else return acc
				}, 0)
				return total
			}

			float = {
				...float,
				...createFloat
			}

			const bagTotal = flattenCountData({
				bagPence1: f.bagPence1,
				bagPence2: f.bagPence2,
				bagPence5: f.bagPence5,
				bagPence10: f.bagPence10,
				bagPence20: f.bagPence20,
				bagPence50: f.bagPence50,
				bagPound1: f.bagPound1,
				bagPound2: f.bagPound2,
				bagNote5: f.bagNote5,
			})
			const looseTotal = flattenCountData({
				loosePence1: f.loosePence1,
				loosePence2: f.loosePence2,
				loosePence5: f.loosePence5,
				loosePence10: f.loosePence10,
				loosePence20: f.loosePence20,
				loosePence50: f.loosePence50,
				loosePound1: f.loosePound1,
				loosePound2: f.loosePound2,
				looseOther: f.looseOther,
			})
			const noteTotal = flattenCountData({
				note1: f.note1,
				note5: f.note5,
				note10: f.note10,
				note20: f.note20,
				note50: f.note50,
			})

			float.bagTotal = bagTotal
			float.looseTotal = looseTotal
			float.noteTotal = noteTotal

			// console.log({ f, createFloat, float })
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
			timestamp: req.body.count.timestamp || oldCount.timestamp
		})
		// console.log({ float })
		// return res.json({ plarb: 'ok' })

		delete float.id
		// @ts-ignore
		const updatedFloat = await Float.query()
			.patchAndFetchById(oldFloat.id, float)

		const updateCount: any = {
			// repositoryId,
			updatedOn: now,
			// verified: true,
			// authenticatorId: 0,
			counterId,
			supervisorId,
			comment,
		}

		// Update the counts table before moving on to floats
		// @ts-ignore
		const updatedCount: any = await Count.query()
			.patchAndFetchById(oldCount.id, updateCount)

		// HERE NEEDS REWRITTEN
		const validation = validateFloat(updatedFloat)

		if (validation.code === 'invalid') {
			return respondBadRequest(res, 400, 'Bad request. The count provided was invalid.', null, { validation })
		}

		const count: any = await Count.query()
			.patchAndFetchById(updatedCount.id, {
				// @ts-ignore
				completionStatus: validation.code,
			})

		count.float = updatedFloat
		return respondWell(res, 200, null, 'Count successfully updated, see response for validation status.', { validation, count })

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
			.patchAndFetchById(req.params.id, {
				// @ts-ignore
				deleted: true,
				deletedOn: Date.now(),
				deletedBy: 0
			})
		if (!count) {
			return respondErr(res, 500, 'There was an issue deleting the count.', null, { count })
		}
		return respondWell(res, 200, null, 'Count deleted successfully.', { count })
	} catch (error) {
		return respondErr(res, 500, 'There was an issue deleting the count.', null, { error })
	}
}

export const countTotals = async (req: Request, res: Response) => {
	try {
		const total = await Count.query()
			.where('deleted', null)
			.orWhere('deleted', 0)
			.orWhere('deleted', false)
			.count()

		return respondWell(res, 200, 'Number of total counts in the database.', null, { total: total[0] })
	} catch (error) {
		return respondErr(res, 500, 'There was an issue processing your request.', null, { error })
	}
}