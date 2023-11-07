import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	FormLabel,
	Radio,
	TextField,
} from '@mui/material'
import { purple } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { FormGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addApiData, editApiData } from '../Redux/action/apiAction'
import { motion } from 'framer-motion'
import Swal from 'sweetalert2'
import validation from './Validation.json'

const FormApiCrud = () => {
	let [userObj, setUserObj] = useState({})
	let [blankObj, setBlankObj] = useState({})
	let [errorObj, setErrorObj] = useState({})
	const state = useSelector((state) => state.api)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const params = useParams()

	useEffect(() => {
		if (params.id) {
			let editObj = state.find((x) => x._id === params?.id)
			if (editObj) {
				editObj.id = editObj?._id
				setUserObj({ ...editObj })
			}
		}
	}, [state, params.id])

	const saveData = (e) => {
		if (e.target.type === 'checkbox') {
			userObj[e.target.name] = userObj[e.target.name] ?? []
			blankObj[e.target.name] = []
			if (e.target.checked) {
				userObj[e.target.name] = [
					...userObj[e.target.name],
					e.target.value,
				]
			} else if (e.target.type === 'file') {
				userObj[e.target.name] = e.target.files[0]
				blankObj[e.target.name] = ''
			} else {
				userObj[e.target.name] = userObj[e.target.name]?.filter(
					(x) => x !== e.target.value
				)
			}
		} else {
			userObj[e.target.name] = e.target.value
			blankObj[e.target.name] = ''
		}
		setUserObj({ ...userObj })
		setBlankObj({ ...blankObj })
		validationForm(e.target.name)
	}

	const validationForm = (name) => {
		let validationObj = validation.find((x) => x.name === name)
		let validObj = validationObj?.conditions?.find((x) => eval(x.condition))
		if (validObj) {
			errorObj[name] = validObj.error
		} else {
			delete errorObj[name]
		}
		setErrorObj({ ...errorObj })
	}

	const submitData = (e) => {
		Object.keys(userObj).forEach((x) => {
			validationForm(x)
		})
		if (Object.keys(errorObj).length === 0 && userObj.length !== 0) {
			if (userObj.id) {
				dispatch(editApiData(userObj))
				navigate('/table')
			} else {
				dispatch(addApiData(userObj))
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Data Submitted Successfully',
					showConfirmButton: false,
					timer: 1500,
					toast: true,
					timerProgressBar: true,
				})
			}
			userObj = { ...blankObj }
			setUserObj({ ...userObj })
		} else {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'Please Fill All The Fields',
				showConfirmButton: false,
				timer: 1500,
				toast: true,
			})
		}
	}

	return (
		<>
			<motion.div
				className="mx-auto shadow p-2 mt-4 border"
				style={{ width: '55%' }}
				initial={{ opacity: 0, x: -100 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{
					spring: { duration: 1 },
					delay: 0.1,
					type: 'spring',
					bounce: 0.5,
				}}
			>
				<motion.h1
					className="text-center mb-3 mt-2"
					initial={{ opacity: 0, x: -100 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{
						spring: { duration: 1 },
						delay: 0.2,
						type: 'spring',
						bounce: 0.5,
					}}
				>
					REDUX API CRUD
				</motion.h1>
				<Box
					sx={{
						'& .MuiTextField-root': {
							m: 1,
							marginLeft: 4.3,
							width: '18rem',
						},
						display: 'flex',
						justifyContent: 'start',
						flexWrap: 'wrap',
						alignItems: 'center',
					}}
				>
					<div>
						<TextField
							type="text"
							name="firstName"
							onChange={saveData}
							value={userObj.firstName ?? ''}
							label="First Name"
							variant="standard"
							color="secondary"
						/>
						{errorObj.firstName && (
							<p className="text-danger m-0 ms-4">
								{errorObj.firstName}
							</p>
						)}
					</div>
					<div>
						<TextField
							type="text"
							name="lastName"
							onChange={saveData}
							value={userObj.lastName ?? ''}
							label="Last Name"
							variant="standard"
							color="secondary"
						/>
						{errorObj.lastName && (
							<p className="text-danger m-0 ms-4">
								{errorObj.lastName}
							</p>
						)}
					</div>
					<div>
						<TextField
							type="number"
							name="age"
							onChange={saveData}
							value={userObj.age ?? ''}
							label="Age"
							variant="standard"
							color="secondary"
						/>
						{errorObj.age && (
							<p className="text-danger m-0 ms-4">
								{errorObj.age}
							</p>
						)}
					</div>
					<div>
						<TextField
							type="text"
							name="city"
							onChange={saveData}
							value={userObj.city ?? ''}
							label="City"
							variant="standard"
							color="secondary"
						/>
						{errorObj.city && (
							<p className="text-danger m-0 ms-4">
								{errorObj.city}
							</p>
						)}
					</div>
					<FormLabel
						className="mt-3 mb-1"
						style={{ marginLeft: '2rem', width: '85%' }}
					>
						Gender
					</FormLabel>
					<FormGroup style={{ marginLeft: '2rem', width: '85%' }}>
						<FormControlLabel
							control={
								<Radio
									name="gender"
									onChange={saveData}
									checked={userObj.gender === 'male'}
									value={'male'}
									sx={{
										color: purple[800],
										'&.Mui-checked': {
											color: purple[600],
										},
									}}
								/>
							}
							label="Male"
						/>
						<FormControlLabel
							control={
								<Radio
									name="gender"
									onChange={saveData}
									checked={userObj.gender === 'female'}
									value={'female'}
									sx={{
										color: purple[800],
										'&.Mui-checked': {
											color: purple[600],
										},
									}}
								/>
							}
							label="Female"
						/>
						{errorObj.gender && (
							<p className="text-danger m-0 m-1">
								{errorObj.gender}
							</p>
						)}
					</FormGroup>
					<FormLabel
						className="mt-2 mb-1"
						style={{ marginLeft: '2rem', width: '85%' }}
					>
						Hobbies
					</FormLabel>
					<FormGroup style={{ marginLeft: '2rem', width: '85%' }}>
						<FormControlLabel
							control={
								<Checkbox
									name="hobbies"
									type="checkbox"
									onChange={saveData}
									checked={
										userObj.hobbies?.includes('Reading') ===
										true
									}
									value="Reading"
									sx={{
										color: purple[800],
										'&.Mui-checked': {
											color: purple[600],
										},
									}}
								/>
							}
							label="Reading"
						/>
						<FormControlLabel
							control={
								<Checkbox
									name="hobbies"
									type="checkbox"
									onChange={saveData}
									checked={
										userObj.hobbies?.includes('Coding') ===
										true
									}
									value="Coding"
									sx={{
										color: purple[800],
										'&.Mui-checked': {
											color: purple[600],
										},
									}}
								/>
							}
							label="Coding"
						/>
						<FormControlLabel
							control={
								<Checkbox
									name="hobbies"
									type="checkbox"
									onChange={saveData}
									checked={
										userObj.hobbies?.includes('Gaming') ===
										true
									}
									value="Gaming"
									sx={{
										color: purple[800],
										'&.Mui-checked': {
											color: purple[600],
										},
									}}
								/>
							}
							label="Gaming"
						/>
						{errorObj.hobbies && (
							<p className="text-danger m-0 ms-1">
								{errorObj.hobbies}
							</p>
						)}
					</FormGroup>
					<FormLabel
						className="mt-2 mb-1"
						style={{ marginLeft: '2rem', width: '85%' }}
					>
						Profile Image
					</FormLabel>
					<TextField
						type="file"
						name="userImage"
						onChange={saveData}
						value={userObj.userImage ?? ''}
						variant="standard"
						color="secondary"
						style={{ marginLeft: '2rem' }}
					/>
				</Box>
				<Button
					className="my-3 me-4"
					variant="contained"
					color="secondary"
					onClick={submitData}
					style={{ marginLeft: '2.5rem' }}
				>
					Submit
				</Button>
				<Link to="/table">
					<Button variant="contained" color="success">
						Table Data
					</Button>
				</Link>
			</motion.div>
		</>
	)
}

export default FormApiCrud
