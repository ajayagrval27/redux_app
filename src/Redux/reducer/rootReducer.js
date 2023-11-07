import { combineReducers } from 'redux'
import { apiReducer } from './apiReducer'
import { crudReducer } from './crudReduser'

export const rootReducer = combineReducers({
	api: apiReducer,
	crud: crudReducer,
})
