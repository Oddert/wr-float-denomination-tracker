import { Router } from 'express'

import {
	getAuth,
	registerUser,
	loginUser,
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

export default router