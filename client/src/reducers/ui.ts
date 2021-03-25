import { Action, Reducer } from 'redux'

import initialState from '../constants/initialState'
import ActionTypes from '../constants/actionTypes'

const ui: Reducer = (state = initialState.ui, action: Action) => {
	switch (action.type) {
		case ActionTypes.UI_FLASH_WRITE_ONE: 
			return flashWriteOne(state, action)
		case ActionTypes.UI_FLASH_REMOVE_ONE:
			return flashRemoveOne(state, action)
		default:
			return state
	}
}

function flashWriteOne(state: any, action: any) {
	const randomSixDigit = () => {
		const one = () => Math.floor(Math.random() * 10)
		let out = ''
		for (let i=0; i< 6; i++) out += one()
		return out
	}
	return {
		...state,
		flash: [
			{
				...action.payload,
				createdAt: Date.now(),
				id: Date.now() + randomSixDigit()
			},
			...state.flash,
		]
	}
}

function flashRemoveOne(state: any, action: any) {
	const flash = state.flash.filter((each: any) => each.id !== action.payload)
	return {
		...state,
		flash,
	}
}

export default ui