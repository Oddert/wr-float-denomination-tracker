
import { Request, Response } from 'express'
import hashPwd from '../common/hashPwd'
import { respondBadRequest } from '../controlers/utils'
import User from '../models/User'

export async function createUser (req: Request, res: Response) {
	const hash = hashPwd(req.body.password)

	const username: string = req.body?.username
	const readableName: string = req.body?.readableName || username

	if (!username) return null

	const user = await User.query()
		.insert({
			username,
			readableName,
			password: hash,
		})
		// .returning('*')
	return user
}