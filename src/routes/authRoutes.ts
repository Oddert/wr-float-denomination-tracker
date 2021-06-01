import { Router, Request, Response } from 'express'

import { getAuth, registerUser } from '../controlers/authRoutes'

const router: Router = Router()

router
  .route('/')
  .get(getAuth)

router
	.route('/register')
	.post(registerUser)

export default router