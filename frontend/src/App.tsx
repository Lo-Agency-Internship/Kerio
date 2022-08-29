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
import { useState } from 'react';

function App() {
	const [role] = useState<string>('employee');
	return (
		<Routes>
			<Route
				path="/"
				element={
					<PublicRoute>
						<Index />
					</PublicRoute>
				}
			/>
			<Route path="/invite" element={<Invite />} />

			<Route
				path="/dashboard"
				element={
					<PrivateRoute role={role}>
						<Layout>
							<Outlet />
						</Layout>
					</PrivateRoute>
				}>
				<Route index element={<Dashboard />} />
				<Route path="contacts/:id" element={<Contact />} />
				{/* {role === 'owner' && <Route path="employees" element={<Employees />} />} */}
			</Route>
			<Route path="*" element={<Contact />} />
		</Routes>
	);
}

export default App;
