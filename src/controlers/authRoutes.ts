import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import User from '../models/User'

import passport from '../config/auth'

import { respondErr, respondWell } from './utils'

// GET /
export const getAuth = async (req: Request, res: Response) => {
	return res.json({
		message: 'authRoutes is not implamented yet'
	})
}

// POST /register
export const registerUser = async (req: Request, res: Response) => {
	try {
		const salt = bcrypt.genSaltSync()
		const hash = bcrypt.hashSync(req.body.password, salt)

		const user = await User.query().insert()

		return respondWell(res, 200, null, 'ok.', null)
	} catch (error) {
		return respondErr(res, null, 'Something went wrong, try again later.', null, null)
	}
}