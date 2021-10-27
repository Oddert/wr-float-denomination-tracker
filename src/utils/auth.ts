
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { respondBadRequest } from '../controlers/utils'
import User from '../models/User'

export async function createUser (req: Request, res: Response) {
	const salt = bcrypt.genSaltSync(12, "b")

	const hash = bcrypt.hashSync(req.body.password, salt)

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