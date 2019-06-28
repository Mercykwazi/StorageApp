import { createStore } from 'redux'
import combineReducers from '../reducers/index'

const store = createStore(combineReducers, window.devToolsExtension())
export default store;