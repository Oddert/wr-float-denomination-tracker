import { applyMiddleware, createStore, compose, StoreEnhancer } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'
import initialState from './initialState'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any
  }
}

const middleware: any[] = [thunk]

const enhancerList: any[] = [applyMiddleware(...middleware)]

if (window.hasOwnProperty('__REDUX_DEVTOOLS_EXTENSION__')) {
  enhancerList.push(window.__REDUX_DEVTOOLS_EXTENSION__())
}

const enhancers: StoreEnhancer = compose(...enhancerList)

const store = createStore(rootReducer, initialState, enhancers)

export default store