import { Router } from 'express'

import {
  getPartners,
  addPartner,
  getPartner,
  updatePartner,
  deletePartner
} from '../controlers/partnerRoutes'

const router: Router = Router()

router
  .route('/')
  .get(getPartners)
  .post(addPartner)

router
  .route('/:id')
  .get(getPartner)
  .put(updatePartner)
  .delete(deletePartner)

// get /count

// get /count/new  --render form
// post /count

// get /count/:id --render specific
// get /count/:id/edit --render specific form
// put /count/:id

// delete /count/:id

export default router