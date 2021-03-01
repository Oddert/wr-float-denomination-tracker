
import { combineReducers, Reducer, Action } from 'redux'
import initialState from '../constants/initialState'

const main: Reducer = (state = initialState.main, action: Action) => state

const rootReducer = combineReducers({
  main
})

export default rootReducer