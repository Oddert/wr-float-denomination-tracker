import ActionTypes from '../constants/actionTypes'
import {
	ThunkDispatch,
} from 'redux-thunk'

// ThunkAction<R> = (dispatch, getState, extraArgument) => R

// ThunkDispatch<S, E, A extends Action<any>>
// S = Type of root state. The return value from getState()
// E = Type of extra arguments passed to the thunk action
// A = Action type. Should extend action.

const getOptions = () => ({
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	},
})

const postOptions = (body: any) => ({
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body,
})

const putOptions = (body: any) => ({
	method: 'PUT',
	headers: {
		'Content-Type': 'application/json'
	},
	body,
})

export const countsDataWriteAll = () => async (dispatch: ThunkDispatch<any, any, any>) => {
	const EXT = '/api/v1/count'
	const res = await fetch(EXT, getOptions())
	const data = await res.json()
	dispatch({
		type: ActionTypes.COUNTS_DATA_WRITE_ALL,
		payload: data.counts,
	})
}

export const countsDataWriteSingle = (body: any) => async (dispatch: ThunkDispatch<any, any, any>) => {
	const EXT = '/api/v1/count/'
	const res = await fetch(EXT, postOptions(body))
	const data = await res.json()
	dispatch({
		type: ActionTypes.COUNTS_DATA_WRITE_SINGLE,
		payload: data.count
	})
}

export const countsDataUpdateSingle = (count: any) => async (dispatch: ThunkDispatch<any, any, any>) => {
	const EXT = `/api/v1/count/${count._id}`
	const res = await fetch(EXT, putOptions(count))
	const data = await res.json()
	dispatch({
		type: ActionTypes.COUNTS_DATA_UPDATE_SINGLE,
		payload: data.counts
	})
}

// deleteCount




export const uiFlashWriteOne = (title: string, description: string, catt?: string, duration?: string | number) => ({
	type: ActionTypes.UI_FLASH_WRITE_ONE,
	payload: {
		title,
		description,
		catt,
		duration: duration || null
	}
})

export const uiFlashRemoveOne = (id: string) => ({
	type: ActionTypes.UI_FLASH_REMOVE_ONE,
	payload: id
})




export const authUsersWriteAll = () => async (dispatch: ThunkDispatch<any, any, any>) => {
	const EXT = '/api/v1/user'
	const OPTS = getOptions()
	const res = await fetch(EXT, OPTS)
	const data = await res.json()
	console.log(data)
	dispatch({
		type: ActionTypes.AUTH_USERS_WRITE_ALL,
		payload: data.users,
	})
}