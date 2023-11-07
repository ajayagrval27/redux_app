import { GAPIDATA } from '../type/type'

export const apiReducer = (state = [], action) => {
	switch (action.type) {
		case GAPIDATA: {
			return action.data
		}

		default: {
			return state
		}
	}
}
