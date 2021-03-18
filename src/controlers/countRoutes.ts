
import { Request, Response } from 'express'

const completeCount = {"repository":"401","counter":"Robyn F H Veitch","supervisor":"Mr Robot","data":{"bagged":{"pence_one":500,"pence_two":300,"pence_five":2000,"pence_ten":1000,"pence_twenty":7000,"pence_fifty":3000,"pound_one":18000,"pound_two":10000,"note_five":1000,"total":42800},"loose":{"pence_one":164,"pence_two":200,"pence_five":1425,"pence_ten":1370,"pence_twenty":600,"pence_fifty":2450,"pound_one":6100,"pound_two":400,"other":0,"total":12709},"notes":{"note_one":0,"note_five":7500,"note_ten":24000,"note_twenty":12000,"note_fifty":5000,"total":48500},"total":0},"timestamp":1615942525576}
const partialCount = {"repository":"401","counter":"Robyn F H Veitch","supervisor":"Mr Robot","data":{"bagged":{"pence_one":800,"pence_two":300,"pence_five":3500,"pence_ten":4500,"pence_twenty":1000,"pence_fifty":1000,"pound_one":12000,"pound_two":4000,"note_five":0,"total":27100},"loose":{"pence_one":0,"pence_two":0,"pence_five":0,"pence_ten":0,"pence_twenty":0,"pence_fifty":0,"pound_one":0,"pound_two":0,"other":0,"total":0},"notes":{"note_one":0,"note_five":0,"note_ten":0,"note_twenty":0,"note_fifty":5000,"total":5000},"total":0},"timestamp":1615946317189}
const incompleteCount = {"repository":"401","counter":"Robyn F H Veitch","supervisor":"Mr Robot","data":{"bagged":{"pence_one":0,"pence_two":300,"pence_five":3500,"pence_ten":0,"pence_twenty":0,"pence_fifty":1000,"pound_one":12000,"pound_two":4000,"note_five":0,"total":20800},"loose":{"pence_one":0,"pence_two":0,"pence_five":0,"pence_ten":0,"pence_twenty":0,"pence_fifty":0,"pound_one":0,"pound_two":0,"other":0,"total":0},"notes":{"note_one":0,"note_five":0,"note_ten":0,"note_twenty":0,"note_fifty":5000,"total":5000},"total":0},"timestamp":1615946382795}
const unverifiedCount = {"repository":"401","counter":"","supervisor":"","data":{"bagged":{"pence_one":400,"pence_two":200,"pence_five":4000,"pence_ten":1000,"pence_twenty":2000,"pence_fifty":9000,"pound_one":8000,"pound_two":12000,"note_five":0,"total":36600},"loose":{"pence_one":0,"pence_two":0,"pence_five":0,"pence_ten":0,"pence_twenty":0,"pence_fifty":0,"pound_one":0,"pound_two":0,"other":0,"total":0},"notes":{"note_one":0,"note_five":0,"note_ten":0,"note_twenty":0,"note_fifty":5000,"total":5000},"total":0},"timestamp":1615946422558}

const countData = (id: string): any => {
	const d: any = {
		'fen3fuh43f8hf2h2fh87h': { ...completeCount, _id: 'fen3fuh43f8hf2h2fh87h' },
		'xm3rgm439x8ug9348cg98': { ...completeCount, _id: 'xm3rgm439x8ug9348cg98' },
		'oiweiowenfbnowg093893': { ...incompleteCount, _id: 'oiweiowenfbnowg093893' },
		'aldpqwomcpm2f2309j0jv': { ...unverifiedCount, _id: 'aldpqwomcpm2f2309j0jv' },
		'p0kd209xxf3349c3094gj': { ...incompleteCount, _id: 'p0kd209xxf3349c3094gj' },
		'02j3f092j3fj8r9232222': { ...partialCount, _id: '02j3f092j3fj8r9232222' },
		'09jf92ehfn9hfpe38hhf3': { ...partialCount, _id: '09jf92ehfn9hfpe38hhf3' },
		'f32ojf093jtx0k4ugx384': { ...completeCount, _id: 'f32ojf093jtx0k4ugx384' },
		'3ncty3oky4toy3ohc8234': { ...completeCount, _id: '3ncty3oky4toy3ohc8234' },
		'3rx394w5xh34xt43g34gq': { ...completeCount, _id: '3rx394w5xh34xt43g34gq' },
		'eg9crw1g8rw6tb24r9t84': { ...unverifiedCount, _id: 'eg9crw1g8rw6tb24r9t84' },
		'fj9839g34tmc0h4thcg03': { ...completeCount, _id: 'fj9839g34tmc0h4thcg03' },
	}
	return d[id]
}

const counts = [
	{ repository: '403', status: 'complete', date: Date.now(), _id: 'fen3fuh43f8hf2h2fh87h' },
	{ repository: '401', status: 'complete', date: Date.now(), _id: 'xm3rgm439x8ug9348cg98' },
	{ repository: '403', status: 'incomplete', date: Date.now() - 14863542, _id: 'oiweiowenfbnowg093893' },
	{ repository: '401', status: 'unverified', date: Date.now() - 248635424, _id: 'aldpqwomcpm2f2309j0jv' },
	{ repository: 'lotto', status: 'incomplete', date: Date.now() - 348635424, _id: 'p0kd209xxf3349c3094gj' },
	{ repository: '403', status: 'partial', date: Date.now() - 442635424, _id: '02j3f092j3fj8r9232222' },
	{ repository: '401', status: 'partial', date: Date.now() - 442635424, _id: '09jf92ehfn9hfpe38hhf3' },
	{ repository: '403', status: 'complete', date: Date.now() - 493685464, _id: 'f32ojf093jtx0k4ugx384' },
	{ repository: '403', status: 'complete', date: Date.now() - 492685464, _id: '3ncty3oky4toy3ohc8234' },
	{ repository: 'lotto', status: 'complete', date: Date.now() - 552635424, _id: '3rx394w5xh34xt43g34gq' },
	{ repository: 'lotto', status: 'unverified', date: Date.now() - 862635424, _id: 'eg9crw1g8rw6tb24r9t84' },
	{ repository: '403', status: 'complete', date: Date.now() - 89234245, _id: 'fj9839g34tmc0h4thcg03' },
]  

export const getCounts = (req: Request, res: Response): void => {
  res.json({ counts })
}

export const addCount = (req: Request, res: Response): void => {
  res.json('addCount route not implamented yet')
}

export const getCount = (req: Request, res: Response): void => {
	const id: string = req.params.id
	function queryCount () {
		const count = counts.filter(each => each._id === id)[0]
		const data: any = countData(id)
		return {
			...count,
			...data,
		}
	}
	res.json({
		count: queryCount()
	})
  // res.json('getCount route not implamented yet')
}

export const updateCount = (req: Request, res: Response): void => {
  res.json('updateCount route not implamented yet')
}

export const deleteCount = (req: Request, res: Response): void => {
  res.json('deleteCount route not implamented yet')
}

