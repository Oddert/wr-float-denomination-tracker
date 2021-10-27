import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

import User from '../models/User'

import passport from '../config/auth'
import { createUser } from '../utils/auth'

import { respondBadRequest, respondErr, respondWell } from './utils'

// GET /
export const getAuth = async (req: Request, res: Response) => {
	return res.json({
		message: 'authRoutes is not implamented yet'
	})
}

// POST /register
export const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const createdUser = await createUser(req, res)

		if (!createdUser) {
			return respondBadRequest(res, null, `Cannot read username of ${req.body?.username}, please ensure you supplied a valid username and password`, null, null)
		}
		else {
			passport.authenticate('local', (err, user, info) => {
				if (user) return respondWell(res, 200, null, 'User created successfully', null)
				else return respondErr(res, null, err, 'Something went wrong, try again later.', null)
			})(req, res, next)
		}

	} catch (error) {
		return respondErr(res, null, 'Something went wrong, try again later.', null, null)
	}
}