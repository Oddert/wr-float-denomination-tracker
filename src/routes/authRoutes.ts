import { Router } from 'express'

import {
	getAuth,
	registerUser,
	loginUser,
	logoutUser,
} from '../controlers/authRoutes'

const router: Router = Router()

router
  .route('/')
  .get(getAuth)

router
	.route('/register')
	.post(registerUser)

router
	.route('/login')
	.post(loginUser)

router
	.route('/logout')
	.get(logoutUser)

export default router