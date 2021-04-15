
import { Request, Response } from 'express'

import Float from '../models/Float'
import { respondErr, respondWell } from './utils'

export const getFloats = async (req: Request, res: Response) => {
	try {
		const floats = await Float.query().limit(50)
		return respondWell(res, 200, null, 'List of all Floats.', { floats })
	} catch (error) {
		return respondErr(res, 500, 'Something went wrong.', null, { error })
	}
}

export const addFloat = (req: Request, res: Response) => {
  res.json('addFloat route not implamented yet')
}

export const getFloat = (req: Request, res: Response) => {
	res.json({
		message: 'not implamented yet'
	})
}

export const updateFloat = (req: Request, res: Response) => {
  res.json('updateFloat route not implamented yet')
}

export const deleteFloat = (req: Request, res: Response) => {
  res.json('deleteFloat route not implamented yet')
}

