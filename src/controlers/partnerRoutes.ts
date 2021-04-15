
import { Request, Response } from 'express'

import Partner from '../models/Partner'
import { respondErr, respondWell } from './utils'

export const getPartners = async (req: Request, res: Response) => {
	try {
		const partners = await Partner.query().limit(10)
		return respondWell(res, 200, null, 'List of all partners.', { partners })
	} catch (error) {
		return respondErr(res, 500, 'Something went wrong.', null, { error })
	}
}

export const addPartner = (req: Request, res: Response) => {
  res.json('addPartner route not implamented yet')
}

export const getPartner = (req: Request, res: Response) => {
	res.json({
		message: 'not implamented yet'
	})
}

export const updatePartner = (req: Request, res: Response) => {
  res.json('updatePartner route not implamented yet')
}

export const deletePartner = (req: Request, res: Response) => {
  res.json('deletePartner route not implamented yet')
}

