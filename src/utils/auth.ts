
import bcrypt from 'bcrypt'
import { Request } from 'express'
import User from '../models/User'

async function createUser (req: Request) {
	const salt = bcrypt.genSaltSync(12, "b")
	const hash = bcrypt.hashSync(req.body.password, salt)

	const username: string = req.body.username

	const user = await User.query()
	.insert({
		// @ts-ignore
		username,
		password: hash
	})

	return user
}