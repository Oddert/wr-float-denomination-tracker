import { Router } from 'express'

import {
  getCounts,
  addCount,
  getCount,
  updateCount,
  deleteCount
} from '../controlers/countRoutes'

const router: Router = Router()

router
  .route('/')
  .get(getCounts)
  .post(addCount)

router
  .route('/:id')
  .get(getCount)
  .put(updateCount)
  .delete(deleteCount)

// get /count

// get /count/new  --render form
// post /count

// get /count/:id --render specific
// get /count/:id/edit --render specific form
// put /count/:id

// delete /count/:id

export default router