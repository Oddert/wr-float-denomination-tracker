import { Router, Request, Response } from 'express'

const router: Router = Router()

router
  .route('/')
  .get((req: Request, res: Response) => {
    res.send('authRoutes is not implamented yet')
  })

export default router