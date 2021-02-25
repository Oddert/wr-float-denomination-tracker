
import { Router } from 'express'

import { homePage } from '../controlers/'

const router: Router = Router()

router
  .route('/')
  .get(homePage)

export default router