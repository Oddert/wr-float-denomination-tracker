
import { Request, Response } from 'express'


const createId = () => {
	const one = () => {
		const lower = () => String.fromCharCode(Math.floor((Math.random() * 26) + 97))
		const upper = () => String.fromCharCode(Math.floor((Math.random() * 26) + 65))
		const num = () => String.fromCharCode(Math.floor((Math.random() * 10) + 48))
		const options = [lower, upper, num]
		return options[Math.floor(Math.random() * 3)]()
	}
	let str = ''
	for (let i=0; i<21; i++) {str += one()}
	return str
}

const users = [
	{
		id: createId(),
		shortUid: '1023',
		firstName: 'Robyn',
		middleNames: 'F H',
		lastName: 'Veitch',
		access: 10,
		created: 1616684709029,
		updated: 1616684932308,
	},
	{
		id: createId(),
		shortUid: '1064',
		firstName: 'Jhony',
		middleNames: null,
		lastName: 'No Privelege',
		access: 1,
		created: 1616684709029,
		updated: 1616684932308,
	},
	{
		id: createId(),
		shortUid: '1067',
		firstName: 'Manager',
		middleNames: null,
		lastName: null,
		access: 2,
		created: 1616684709029,
		updated: 1616684932308,
	},
]

export const getUsers = (req: Request, res: Response): void => {
  res.json({
		users,
	})
}

export const addUser = (req: Request, res: Response): void => {
  res.json('addUser route not implamented yet')
}

export const getUser = (req: Request, res: Response): void => {
  const user = users.reduce((acc: any, each: any) => {
		if (each.id === req.params.id) return each
		else return acc
	}, null)
	if (user) {
		res.status(200).json({
			user
		})
	} else {
		res.status(200).json({
			message: 'No such user found'
		})
	}
}

export const updateUser = (req: Request, res: Response): void => {
  res.json('updateUser route not implamented yet')
}

export const deleteUser = (req: Request, res: Response): void => {
  res.json('deleteUser route not implamented yet')
}

