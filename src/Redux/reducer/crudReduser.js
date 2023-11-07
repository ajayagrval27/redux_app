import { ADD, DELETE } from "../type/type"

export const crudReducer = (state = [], action) => {
	// console.log(state)
	switch (action.type) {
		case ADD: {
			if (action.userObj.id) {
				let index = state.findIndex((x) => x.id === action.userObj.id)
				state.splice(index, 1, action.userObj)
				console.log(index)
			} else {
				action.countId++
				action.setCountId(action.countId)
				action.userObj.id = action.countId
				state.push(action.userObj)
			}
			return [...state]
		}
		case DELETE: {
			return state.filter((x) => x.id !== action.id)
		}

		default: {
			return [...state]
		}
	}
}
