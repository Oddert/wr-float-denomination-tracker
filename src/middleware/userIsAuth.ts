
import { 
	Request, 
	Response, 
	NextFunction 
} from 'express'
import passport from '../config/auth'

import { 
	respondErr,
	respondWell,
} from '../controlers/utils'

export function userIsAuth (
	req: Request,
	res: Response,
	next: NextFunction,
) {
	if (!req.user) respondErr(res, 401, 'User is unauthenticated, please login and try again', null, null)
	else {
		passport.authenticate('local', (err, user, info) => {
			if (user) return respondWell(res, 200, null, 'User created successfully', { user, info })
			else return respondErr(res, null, err, 'Something went wrong, try again later.', { info })
		})(req, res, next)
	}
}