import { Action, Reducer } from 'redux'

import initialState from '../constants/initialState'
import ActionTypes from '../constants/actionTypes'

const auth: Reducer = (state = initialState.auth, action: Action) => {
	switch (action.type) {
		case ActionTypes.AUTH_USERS_WRITE_ALL: 
			return authUsersWriteAll(state, action)
		case ActionTypes.AUTH_PARTNER_WRITE_ALL:
			return authPartnersWriteAll(state, action)
		default:
			return state
	}
}

function authUsersWriteAll(state: any, action: any) {
	return {
		...state,
		userList: action.payload,
		userListUpdated: Date.now(),
	}
}

function authPartnersWriteAll (state: any, action: any) {
	return {
		...state,
		partnerList: action.payload,
		partnerListUpdate: Date.now()
	}	
}

export default auth