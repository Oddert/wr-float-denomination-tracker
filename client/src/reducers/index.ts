
import { combineReducers, Reducer, Action } from 'redux'
import initialState from '../constants/initialState'

import counts from './counts'
import ui from './ui'
import auth from './auth'
import repositories from './repositories'

const main: Reducer = (state = initialState.main, action: Action) => state

const rootReducer = combineReducers({
  main,
	counts,
	ui,
	auth,
	repositories,
})

export default rootReducer