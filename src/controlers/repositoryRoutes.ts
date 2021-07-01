
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
		const limit: number = sanitiseNumberQuery(req.query.limit, 500)
		const offset: number = sanitiseNumberQuery(req.query.offset, 0)
		// let activated: any = req.query.hasOwnProperty('activated') ? req.query.activated : null

		const repositories = await Repository.query()
			// .withGraphJoined('float')
			// .limit(limit)
			// .offset(offset)

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

export const getRepository = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const multiRepository: any = req.query.repository || req.query.repo
		if (!id) return respondBadRequest(res, 400, 'Not id provided or invalid id. Unable to process request.', null, null)

		if (id === 'details' && multiRepository) {

			if (!multiRepository || typeof multiRepository === undefined) {
				return respondBadRequest(res, 400, 'Please provide a valid id or list of ids as a url query, for example "?partner=2,3,4"', null, null)
			}

			if (Array.isArray(multiRepository)) {

				const repositories = await Repository.query()
					.whereIn('repositories.id', multiRepository)
				return respondWell(res, 200, null, 'Details for provided id.', { repositories })

			} else if (/,/gi.test(multiRepository) || /[0-9]/gi.test(multiRepository)) {

				const splitMultiRepository = multiRepository.split(',')
				const repositories = await Repository.query()
					.whereIn('repositories.id', splitMultiRepository)

				return respondWell(res, 200, null, 'Details for provided id.', { repositories })

			} else {

				return respondBadRequest(res, 400, 'Please provide a valid id or list of ids as a url query, for example "?partner=2,3,4"', null, null)

			}
		} else {

			const repository = await Repository.query()
				.where('repositories.id', Number(id))

			return respondWell(res, 200, null, 'Details for provided id.', { repository })

		}
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

export const deleteRepository = async (req: Request, res: Response) => {
	try {
		const repository = await Repository.query()
			.patchAndFetchById(req.params.id, {
				// @ts-ignore
				deleted: true,
				deletedOn: Date.now(),
				deletedById: 1,
			})
		if (!repository) {
			return respondErr(res, 500, 'There was an issue deleting the repository.', null, { repository })
		}
		return respondWell(res, 200, null, 'Repository deleted successfully.', { repository })
	} catch (error) {
		return respondErr(res, 500, 'There was an issue processing your request.', null, { error })
	}
}

