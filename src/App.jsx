import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getApiData } from './Redux/action/apiAction'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
// import FormApiCrud from './Components/FormApiCrud'
// import TableApiCrud from './Components/TableApiCrud'
import FormCrud from './Components/FormCrud'
import TableCrud from './Components/TableCrud'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getApiData())
	}, [dispatch])

	return (
		<>
			<BrowserRouter>
				{/* API CRUD */}
				{/* <Routes>
					<Route path="/" element={<Navigate to="/form" />} />
					<Route path="/form" element={<FormApiCrud />}>
						<Route path=":id" />
					</Route>
					<Route path="/table" element={<TableApiCrud />} />
				</Routes> */}
				{/* CRUD */}
				<Routes>
					<Route path="/" element={<Navigate to="/form" />} />
					<Route path="/form" element={<FormCrud />}>
						<Route path=":editId" />
					</Route>
					<Route path="/table" element={<TableCrud />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
