import { Router } from 'express'

import {
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser
} from '../controlers/userRoutes'

const router: Router = Router()

router
  .route('/')
  .get(getUsers)
  .post(addUser)

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)

// get /count

// get /count/new  --render form
// post /count

// get /count/:id --render specific
// get /count/:id/edit --render specific form
// put /count/:id

// delete /count/:id

export default router