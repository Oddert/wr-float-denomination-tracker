import { Router } from 'express'

import {
  getRepositories,
  addRepository,
  getRepository,
  updateRepository,
  deleteRepository
} from '../controlers/repositoryRoutes'

const router: Router = Router()

router
  .route('/')
  .get(getRepositories)
  .post(addRepository)

router
  .route('/:id')
  .get(getRepository)
  .put(updateRepository)
  .delete(deleteRepository)

// get /count

// get /count/new  --render form
// post /count

// get /count/:id --render specific
// get /count/:id/edit --render specific form
// put /count/:id

// delete /count/:id

export default router