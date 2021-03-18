import { CountActions } from './API'
import {
	StateType,
	ActionType
} from './types'

const countReducer = (state: StateType, action: ActionType) => {
	// console.log(action)
	switch(action.type) {
		case CountActions.WRITE_ALL:
			return {
				...action.payload,
				ready: true,
			}
		case CountActions.SET_READY:
			return {
				...state,
				ready: true,
			}
		case CountActions.UPDATE_REPO:
			return {
				...state,
				repository: action.payload
			}
		case CountActions.UPDATE_COUTNER:
			return {
				...state,
				counter: action.payload
			}
		case CountActions.UPDATE_SUPERVISOR:
			return {
				...state,
				supervisor: action.payload
			}
		case CountActions.UPDATE_TIME:
			return {
				...state,
				timestamp: action.payload
			}
		case CountActions.UPDATE_BAG:
			return updateBag(state, action)
		case CountActions.UPDATE_LOOSE:
			return updateLoose(state, action)
		case CountActions.UPDATE_NOTES:
			return updateNotes(state, action)
		default: return state
	}
}

function updateBag (state: StateType, action: ActionType): StateType {
	const bagged = {
		...state.data.bagged,
		...action.payload,
	}
	const total: number = Object.keys(bagged)
		.filter(e => e !== 'total')
		.reduce((acc, each) => acc + bagged[each], 0)

	return {
		...state,
		data: {
			...state.data,
			bagged: {
				...bagged,
				total,
			}
		}
	}
}

function updateLoose (state: StateType, action: ActionType): StateType {
	const loose = {
		...state.data.loose,
		...action.payload,
	}
	const total: number = Object.keys(loose)
		.filter(e => e !== 'total')
		.reduce((acc, each) => acc + loose[each], 0)

	return {
		...state,
		data: {
			...state.data,
			loose: {
				...loose,
				total,
			}
		}
	}
}

function updateNotes (state: StateType, action: ActionType): StateType {
	const notes = {
		...state.data.notes,
		...action.payload,
	}
	const total: number = Object.keys(notes)
		.filter(e => e !== 'total')
		.reduce((acc, each) => acc + notes[each], 0)

	return {
		...state,
		data: {
			...state.data,
			notes: {
				...notes,
				total,
			}
		}
	}
}

export default countReducer