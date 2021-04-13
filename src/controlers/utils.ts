
import { Response } from 'express'

export const respondWell = 
	(res: Response, status: number | null, errorMessage: string | null, responseMessage: string | null, ...other: any): Response => {
	return res
		.status(status || 200)
		.json({
			status: status || 200,
			errorMessage,
			responseMessage: responseMessage || 'Request processed successfully.',
			...other
		})
}

export const respondBadRequest = 
	(res: Response, status: number | null, errorMessage: string | null, responseMessage: string | null, ...other: any): Response => {
	return res
		.status(status || 400)
		.json({
			status: status || 400,
			errorMessage: errorMessage || 'There was an error in your request, no content was found.',
			responseMessage,
			...other
		})
}

export const respondErr = 
	(res: Response, status: number | null, errorMessage: string | null, responseMessage: string | null, ...other: any): Response => {
	return res
		.status(status || 500)
		.json({
			status: status || 500,
			errorMessage: errorMessage || 'There was a error processing your reponse.',
			responseMessage,
			...other
		})
}


export interface CountType {
	floatId: number
	repositoryId: number
	completionStatus: 'complete' | 'incomplete' | 'partial' | 'unverified'
	createdOn: number
	updatedOn?: number
	verified?: boolean
	counterId?: number
	supervisorId?: number
	deletedById?: number
	deleted?: boolean
	deletedOn?: number
}