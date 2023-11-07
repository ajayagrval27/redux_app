import React from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const TableCrud = () => {
	const state = useSelector((state) => state.crud)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const editData = (editId) => {
		navigate('/form/' + editId)
	}

	const deleteData = (id) => {
		dispatch({ type: 'DELETE', id: id })
	}

	const clearData = () => {}
	return (
		<div>
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
							{/* <th>Image</th> */}
							<th>Id</th>
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
									<td style={{ padding: '20px 0' }}>
										{x.id}
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
										{x.hobbies?.join(', ')}
									</td>
									<td style={{ padding: '20px 0' }}>
										{x.city}
									</td>
									<td
										className="d-flex justify-content-evenly"
										style={{ padding: '15px 0' }}
									>
										<Button
											variant="contained"
											color="secondary"
											onClick={() => {
												editData(x.id, x)
											}}
										>
											Edit
										</Button>
										<Button
											variant="contained"
											color="error"
											onClick={() => {
												deleteData(x.id)
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
		</div>
	)
}

export default TableCrud
