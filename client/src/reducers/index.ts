
import { combineReducers, Reducer, Action } from 'redux'
import initialState from '../constants/initialState'

import counts from './counts'
import ui from './ui'

const main: Reducer = (state = initialState.main, action: Action) => state

const rootReducer = combineReducers({
  main,
	counts,
	ui,
})

export default rootReducer