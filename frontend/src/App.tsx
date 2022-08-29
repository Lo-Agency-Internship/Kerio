// import React from 'react'
import './App.css';
import { Route, Routes, Outlet } from 'react-router-dom';
import Contact from './pages/contact';
import Layout from './layout/layout';
import Dashboard from './pages/dashboard';
import Index from './pages';
import PrivateRoute from './utils/auth/privateRoute';
import PublicRoute from './utils/auth/publicRoute';
import Invite from './pages/invite';
import {useAuthContext} from "./context/auth";

function App() {
	const {userMetadata} = useAuthContext()

	const meta = userMetadata()

	return (
		<Routes>
			<Route element={<PublicRoute />}>
				<Route path="/" element={<Index />} />
			</Route>
			<Route element={<PrivateRoute />}>
				<Route path="/invite" element={<Invite />} />
			</Route>
			<Route element={<PrivateRoute />}>
				{
					meta && <p>{meta.email}</p>
				}
				<Route
					path="/dashboard"
					element={
						<Layout>
							<Outlet />
						</Layout>
					}>
					<Route index element={<Dashboard />} />
					<Route path="contacts/:id" element={<Contact />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
