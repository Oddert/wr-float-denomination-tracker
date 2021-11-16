import { Request, Response, NextFunction } from 'express'


import passport from '../config/auth'
import { createUser } from '../utils/auth'

import {
	respondBadRequest,
	respondErr,
	respondWell
} from './utils'

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
				if (user) return respondWell(res, 200, null, 'User created successfully', { user, info })
				else return respondErr(res, null, err, 'Something went wrong, try again later.', { info })
			})(req, res, next)
		}

	} catch (error) {
		return respondErr(res, null, 'Something went wrong, try again later.', null, null)
	}
}

export const loginUser = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return respondErr(res, 500, err, 'There was something wrong with your request, please check and try again.', null)
		}
		else if (!user) {
			return respondBadRequest(res, 404, err, info, null)
		}
		else if (user) {
			req.logIn(user, error => {
				if (error) {
					return respondErr(res, 500, error, 'There was something wrong with your request, please check and try again.', null)
				}
				else {
					return respondWell(res, 200, null, 'Success, user logged in.', null)
				}
			})
		}
		else {
			return respondErr(res, 500, info, 'Something went wrong', null)
		}
	})(req, res, next)
}

export const logoutUser = (
	req: Request,
	res: Response,
) => {
	console.log({ logout: req.logout })
	req.logout()
	return respondWell(res, 200, null, 'User successfully logged out.', null)
}