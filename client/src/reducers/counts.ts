import { Action, Reducer } from 'redux'
import initialState from '../constants/initialState'
import ActionTypes from '../constants/actionTypes'

const counts: Reducer = (state = initialState.main, action: Action) => {
	switch(action.type) {
		case ActionTypes.COUNTS_DATA_WRITE_ALL: return dataWriteAll(state, action)
		case ActionTypes.COUNTS_DATA_WRITE_MULTIPLE: return dataWriteMultiple(state, action)
		case ActionTypes.COUNTS_SERVER_TOTAL_WRITE: return serverTotalWrite(state, action)
		default: return state
	}
}

function dataWriteAll (state: any, action: any) {
	return {
		...state,
		updated: Date.now(),
		data: action.payload
	}
}

function dataWriteMultiple (state: any, action: any) {
	return {
		...state,
		updated: Date.now(),
		data: [
			...state.data,
			...action.payload,
		]
	}
}

function serverTotalWrite (state: any, action: any) {
	return {
		...state,
		countsServerTotal: action.payload
	}
}

export default counts