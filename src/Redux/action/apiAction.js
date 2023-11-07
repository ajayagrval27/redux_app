import axios from 'axios'

export const getApiData = () => {
	return (dispatch) => {
		axios
			.get('https://student-api.mycodelibraries.com/api/user/get')
			.then((res) => {
				dispatch({
					type: 'GAPIDATA',
					data: res.data.data,
				})
			})
	}
}

export const addApiData = (obj) => {
	let formData = new FormData()

	formData.append('firstName', obj.firstName)
	formData.append('lastName', obj.lastName)
	formData.append('age', obj.age)
	formData.append('gender', obj.gender)
	formData.append('hobbies', obj.hobbies)
	formData.append('city', obj.city)
	formData.append('userImage', obj.userImage)
	
	console.log(formData);

	return (dispatch) => {
		axios
			.post('https://student-api.mycodelibraries.com/api/user/add', formData)
			.then((res) => {
				dispatch(getApiData())
			})
	}
}

export const editApiData = (obj) => {
	return (dispatch) => {
		axios
			.post(
				'https://student-api.mycodelibraries.com/api/user/update',
				obj
			)
			.then((res) => {
				dispatch(getApiData())
			})
	}
}

export const deleteApiData = (id) => {
	return (dispatch) => {
		axios
			.delete(
				'https://student-api.mycodelibraries.com/api/user/delete?id=' +
					id
			)
			.then((res) => {
				dispatch(getApiData())
			})
	}
}

export const clearApiData = () => {
	return (dispatch) => {
		axios
			.get('https://student-api.mycodelibraries.com/api/user/get')
			.then((res) => {
				res.data.data.map((x) => {
					axios
						.delete(
							'https://student-api.mycodelibraries.com/api/user/delete?id=' +
								x._id
						)
						.then((res) => {
							dispatch(getApiData())
						})
					return null
				})
			})
	}
}
