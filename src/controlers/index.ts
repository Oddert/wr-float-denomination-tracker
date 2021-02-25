
import { Request, Response } from 'express'
import path from 'path'

export const homePage = (req: Request, res: Response): void => {
  res.sendFile(path.join(__dirname, '../../build/index.html'))
}