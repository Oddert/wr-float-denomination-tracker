import { Router } from 'express'

import {
  getFloats,
  addFloat,
  getFloat,
  updateFloat,
  deleteFloat
} from '../controlers/floatRoutes'

const router: Router = Router()

router
  .route('/')
  .get(getFloats)
  .post(addFloat)

router
  .route('/:id')
  .get(getFloat)
  .put(updateFloat)
  .delete(deleteFloat)

// get /count

// get /count/new  --render form
// post /count

// get /count/:id --render specific
// get /count/:id/edit --render specific form
// put /count/:id

// delete /count/:id

export default router