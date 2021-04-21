import { Action, Reducer } from 'redux'

import initialState from '../constants/initialState'
import ActionTypes from '../constants/actionTypes'

const repositories: Reducer = (state = initialState.repositories, action: Action) => {
	switch (action.type) {
		case ActionTypes.REPOSITORIES_WRITE_ALL: 
			return repositoriesWriteAll(state, action)
		default:
			return state
	}
}

function repositoriesWriteAll (state: any, action: any) {
	return {
		...state,
		repositoryList: action.payload,
		repositoryListUpdated: Date.now(),
	}
}

export default repositories