
import { Request, Response } from 'express'

import Partner from '../models/Partner'
import { 
	respondErr, 
	respondWell, 
	respondBadRequest, 
	sanitiseNumberQuery
} from './utils'

export const getPartners = async (req: Request, res: Response) => {
	try {
		let fromdate: number = sanitiseNumberQuery(req.query.fromdate, 0)
		let todate: number = sanitiseNumberQuery(req.query.todate, Date.now())
		let limit: number = sanitiseNumberQuery(req.query.limit, 500)
		let offset: number = sanitiseNumberQuery(req.query.offset, 0)
			
		const partners = await Partner.query()
			// .withGraphJoined('float')
			.where('createdOn', '>=', fromdate)
			.andWhere('createdOn', '<=', todate)
			.limit(limit)
			.offset(offset)
	
		return respondWell(res, 200, null, 'List of all partners.', { partners })
	}  catch (error) {
		return respondErr(res, 500, 'There was an issue processing your request.', null, { error })
	}
}

export const addPartner = async (req: Request, res: Response) => {
	try {
		const b = req.body
		const now = Date.now()
		const createPartner = {
			preferredName: b.preferredName || null,
			firstName: b.firstName || 'Unknown Partner',
			middleNames: b.middleNames || null,
			lastName: b.lastName || null,
			pending: b.hasOwnProperty('pending') ? b.pending : true,
			createdOn: now,
			updatedOn: now,
			tillNumber: b.tillNumber || null,
		}
		if (!b.firstName) createPartner.pending = true

		// @ts-ignore
		const partner = await Partner.query().insert(createPartner)

		return respondWell(res, 200, null, 'Partner created successfully.', { partner })

	} catch (error) {
		return respondErr(res, 500, 'There was an issue processing your request.', null, { error })
	}
}

export const getPartner = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const multiPartner: any = req.query.partner
		console.log({ id, multiPartner })
		if (!id) return respondBadRequest(res, 400, 'Not id provided or invalid id. Unable to process request.', null, null)

		if (id === 'details' && multiPartner) {

			if (!multiPartner || typeof multiPartner === undefined) {
				console.log('1')
				return respondBadRequest(res, 400, 'Please provide a valid id or list of ids as a url query, for example "?partner=2,3,4"', null, null)
			}
			console.log('2')
			
			if (Array.isArray(multiPartner)) {
				console.log('3')
				
				const partner = await Partner.query()
				// .withGraphJoined('float')
				.whereIn('partners.id', multiPartner)
				return respondWell(res, 200, null, 'Details for provided id including float amount.', { partner })
				
			} else if (/,/gi.test(multiPartner) || /[0-9]/gi.test(multiPartner)) {
				console.log('4')
				
				const splitMultiPartner = multiPartner.split(',')
				const partner = await Partner.query()
				// .withGraphJoined('float')
				.whereIn('partners.id', splitMultiPartner)
				return respondWell(res, 200, null, 'Details for provided id including float amount.', { partner })
				
			} else {
				console.log('5')

				return respondBadRequest(res, 400, 'Please provide a valid id or list of ids as a url query, for example "?partner=2,3,4"', null, null)

			}

		} else {

			const partner = await Partner.query()
				// .withGraphJoined('float')
				.where('partners.id', Number(id))

			return respondWell(res, 200, null, 'Details for provided id including float amount.', { partner })
		
		}
	} catch (error) {
		return respondErr(res, 500, 'There was an issue processing your request.', null, { error })
	}
}

export const updatePartner = async (req: Request, res: Response) => {
	try {
		const oldPartner: any = await Partner.query().findById(req.params.id)
	
		if (!oldPartner) return respondBadRequest(res, null, 'No Partner was found for the ID provided.', null, { id: req.params.id })
	
		const b = req.body
	
		const updateDetails = {
			preferredName: b.preferredName || oldPartner.preferredName || null,
			firstName: b.firstName || oldPartner.firstName || 'Unknown Partner',
			middleNames: b.middleNames || oldPartner.middleNames || null,
			lastName: b.lastName || oldPartner.lastName || null,
			pending: b.hasOwnProperty('pending') ? b.pending : oldPartner.pending,
			updatedOn: Date.now(),
			tillNumber: b.tillNumber || oldPartner.tillNumber || 'No Till Number'
		}
	
		const partner = await Partner
		// @ts-ignore
			.patchAndFetchById(req.body.id, updateDetails)
	
		return respondWell(res, 200, null, 'Partner updated successfully.', { partner })
	} catch (error) {
		return respondErr(res, 500, 'There was an issue processing your request.', null, { error })
	}
	
}

export const deletePartner = (req: Request, res: Response) => {
	try {
		const partner: any = Partner
		// @ts-ignore
			.patchAndFetchById(req.body.id, {
				deleted: true,
				deletedById: 1,
				updated: Date.now()
			})
		return respondWell(res, 200, null, 'Partner deleted successfully.', { partner })
	} catch (error) {
		return respondErr(res, 500, 'There was an issue processing your request.', null, { error })
	}
}

