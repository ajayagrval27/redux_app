import { Button } from '@mui/material'
import React from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearApiData, deleteApiData } from '../Redux/action/apiAction'
import { motion } from 'framer-motion'
import Swal from 'sweetalert2'

const TableApiCrud = () => {
	const state = useSelector((state) => state.api)
	const dispatch = useDispatch()

	console.log(state);

	const deleteData = (id) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: ' #d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, delete it!',
			toast: true,
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(deleteApiData(id))
				Swal.fire({
					title: 'Deleted!',
					text: 'Your Data has been deleted',
					icon: 'success',
					toast: true,
				})
			}
		})
	}

	const clearData = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: ' #d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, delete it!',
			toast: true,
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(clearApiData())
				Swal.fire({
					title: 'Deleted!',
					text: 'Your Data has been deleted',
					icon: 'success',
					toast: true,
				})
			}
		})
	}

	return (
		<>
			<motion.div
				className="d-flex w-100 justify-content-center my-3"
				initial={{ opacity: 0, x: -100 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{
					spring: { duration: 1 },
					delay: 0.3,
					type: 'spring',
					bounce: 0.5,
				}}
			>
				<Link to="/form">
					<Button
						className="me-4"
						variant="contained"
						color="success"
					>
						Add User
					</Button>
				</Link>
				<Button variant="contained" color="error" onClick={clearData}>
					Clear Data
				</Button>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: -100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					spring: { duration: 1 },
					delay: 0.1,
					type: 'spring',
					bounce: 0.5,
				}}
			>
				<Table
					className="mt-4 text-center shadow border-dark-subtle"
					striped
					bordered
					hover
				>
					<thead>
						<tr>
							<th>Image</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Age</th>
							<th>Gender</th>
							<th>Hobbies</th>
							<th>City</th>
							<th colSpan={2}>Action</th>
						</tr>
					</thead>
					<tbody>
						{state?.map((x, i) => {
							return (
								<tr key={i}>
									<td>
										<img
											className="rounded-circle"
											src={x.image}
											alt=""
											width={50}
											height={50}
										/>
									</td>
									<td style={{ padding: '20px 0' }}>
										{x.firstName}
									</td>
									<td style={{ padding: '20px 0' }}>
										{x.lastName}
									</td>
									<td style={{ padding: '20px 0' }}>
										{x.age}
									</td>
									<td style={{ padding: '20px 0' }}>
										{x.gender}
									</td>
									<td style={{ padding: '20px 0' }}>
										{x.hobbies}
									</td>
									<td style={{ padding: '20px 0' }}>
										{x.city}
									</td>
									<td
										className="d-flex justify-content-evenly"
										style={{ padding: '15px 0' }}
									>
										<Link to={`/form/${x._id}`}>
											<Button
												variant="contained"
												color="secondary"
											>
												Edit
											</Button>
										</Link>
										<Button
											variant="contained"
											color="error"
											onClick={() => {
												deleteData(x._id)
											}}
										>
											Delete
										</Button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</motion.div>
		</>
	)
}

export default TableApiCrud
