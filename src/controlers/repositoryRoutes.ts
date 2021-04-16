
import { Request, Response } from 'express'

import { 
	respondWell,
	respondBadRequest,
	respondErr,
	sanitiseNumberQuery,
} from './utils'

import Repository from '../models/Repository'

export const getRepositories = async (req: Request, res: Response) => {
	try {
		let limit: number = sanitiseNumberQuery(req.query.limit, 500)
		let offset: number = sanitiseNumberQuery(req.query.offset, 0)
		// let activated: any = req.query.hasOwnProperty('activated') ? req.query.activated : null
			
		const repositories = await Repository.query()
			// .withGraphJoined('float')
			.limit(limit)
			.offset(offset)
	
		return respondWell(res, 200, null, 'List of all repositories.', { repositories })

	}  catch (error) {
		return respondErr(res, 500, 'There was an issue processing your request.', null, { error })
	}
}

export const addRepository = async (req: Request, res: Response) => {
	try {
		const b = req.body

		if (!b.name || !/[a-zA-Z]/gi.test(b.name)) {
			return respondBadRequest(res, null, 'You must provide a name for the new repository.', null, { body: req.body })
		}

		const now = Date.now()
		const createRepo: {
			name: string
			description: string | null,
			createdOn: number,
			updatedOn: number,
			activated?: boolean
			activatedById?: number
			activatedOn?: number
			// deactivatedById?: number
			// deactivatedOn?: number
		} = {
			name: b.name,
			description: b.description || null,
			createdOn: now,
			updatedOn: now,
		}
		
		if (b.activated) {
			createRepo.activated = true
			createRepo.activatedById = 1
			createRepo.activatedOn = now
		}

		// if (b.deactivated) {
		// 	createRepo.deactivated = true
		// 	createRepo.deactivatedById = 1
		// 	createRepo.deactivatedOn = now
		// }

		// @ts-ignore
		const repository = await Repository.query().insert(createRepo)

		return respondWell(res, 200, null, 'Repositroy added succesfully', { repository })

	} catch (error) {
		return respondErr(res, 500, 'There was an issue processing your request.', null, { error })
	}
}

export const getRepository = (req: Request, res: Response) => {
	try {

	} catch (error) {
		return respondErr(res, 500, 'There was an issue processing your request.', null, { error })
	}
}

export const updateRepository = async (req: Request, res: Response) => {
	try {
		const oldRepo: any = await Repository.query().findById(req.params.id)

		if (!oldRepo) {
			return respondBadRequest(res, 400, 'No repository was found for the given ID.', null, { id: req.params.id })
		}

		const b = req.body

		if (!b.name || !/[a-zA-Z]/gi.test(b.name)) {
			return respondBadRequest(res, null, 'You must provide a name for the new repository.', null, { body: req.body })
		}

		const now = Date.now()
		
		const createRepo: {
			name: string
			description: string | null,
			updatedOn: number,
			activated?: boolean
			activatedById?: number
			activatedOn?: number
			deactivatedById?: number
			deactivatedOn?: number
		} = {
			name: b.name || oldRepo.name,
			description: b.description || oldRepo.description,
			updatedOn: now,
		}
		
		if (b.activated) {
			createRepo.activated = true
			createRepo.activatedById = 1
			createRepo.activatedOn = now
		}

		if (b.deactivated || (b.hasOwnProperty('activated') && b.activated === false)) {
			createRepo.activated = false
			createRepo.deactivatedById = 1
			createRepo.deactivatedOn = now
		}

		// @ts-ignore
		const repository = await Repository.query().patchAndFetchById(req.params.id, createRepo)

		return respondWell(res, 200, null, 'Repositroy modified succesfully', { repository })

	} catch (error) {
		return respondErr(res, 500, 'There was an issue processing your request.', null, { error })
	}
}

export const deleteRepository = (req: Request, res: Response) => {
	try {

	} catch (error) {
		return respondErr(res, 500, 'There was an issue processing your request.', null, { error })
	}
}

