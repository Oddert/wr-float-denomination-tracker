
import { Request, Response } from 'express'

import {
	sanitiseNumberQuery,
	respondWell,
	respondBadRequest,
	respondErr,
} from './utils'

import User from '../models/User'

const createId = () => {
	const one = () => {
		const lower = () => String.fromCharCode(Math.floor((Math.random() * 26) + 97))
		const upper = () => String.fromCharCode(Math.floor((Math.random() * 26) + 65))
		const num = () => String.fromCharCode(Math.floor((Math.random() * 10) + 48))
		const options = [lower, upper, num]
		return options[Math.floor(Math.random() * 3)]()
	}
	let str = ''
	for (let i=0; i<21; i++) {str += one()}
	return str
}

const users = [
	{
		id: createId(),
		shortUid: '1023',
		firstName: 'Robyn',
		middleNames: 'F H',
		lastName: 'Veitch',
		access: 10,
		created: 1616684709029,
		updated: 1616684932308,
	},
	{
		id: createId(),
		shortUid: '1064',
		firstName: 'Jhony',
		middleNames: null,
		lastName: 'No Privelege',
		access: 1,
		created: 1616684709029,
		updated: 1616684932308,
	},
	{
		id: createId(),
		shortUid: '1067',
		firstName: 'Manager',
		middleNames: null,
		lastName: null,
		access: 2,
		created: 1616684709029,
		updated: 1616684932308,
	},
]

export const getUsers = async (req: Request, res: Response) => {
	try {
		const limit: number = sanitiseNumberQuery(req.query.limit, 500)
		const offset: number = sanitiseNumberQuery(req.query.offset, 0)

		const users = await User.query()
			.limit(limit)
			.offset(offset)

		return respondWell(res, 200, null, 'List of all users.', { users })

	} catch (error) {
		console.log(error)
		return respondErr(res, 500, 'There was an issue processing your request.', null, { error })
	}
}

export const addUser = (req: Request, res: Response): void => {
  res.json('addUser route not implamented yet')
}

export const getUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const multiUser: any = req.query.user
		if (!id) return respondBadRequest(res, 400, 'Not id provided or invalid id. Unable to process request.', null, null)

		if (id === 'details' && multiUser) {

			if (!multiUser || typeof multiUser === undefined) {
				return respondBadRequest(res, 400, 'Please provide a valid id or list of ids as a url query, for example "?user=2,3,4"', null, null)
			}

			if (Array.isArray(multiUser)) {

				const users = await User.query()
					.whereIn('users.id', multiUser)

				return respondWell(res, 200, null, 'Details for provided id.', { users })

			} else if (/,/gi.test(multiUser) || /[0-9]/gi.test(multiUser)) {

				const splitMultiUser = multiUser.split(',')
				const users = await User.query()
					.whereIn('users.id', splitMultiUser)

				return respondWell(res, 200, null, 'Details for provided id.', { users })

			} else {

				return respondBadRequest(res, 400, 'Please provide a valid id or list of ids as a url query, for example "?user=2,3,4"', null, null)

			}
		} else {

			const user = await User.query()
				.where('users.id', Number(id))

			return respondWell(res, 200, null, 'Details for provided id.', { user })

		}
	} catch (error) {
		return respondErr(res, 500, 'There was an issue processing your request.', null, { error })
	}
}

export const updateUser = (req: Request, res: Response): void => {
  res.json('updateUser route not implamented yet')
}

export const deleteUser = (req: Request, res: Response): void => {
  res.json('deleteUser route not implamented yet')
}

