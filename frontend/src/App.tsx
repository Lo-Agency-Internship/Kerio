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
import Employees from './pages/employees';
import NotFoundPage from './pages/notFoundPage';
import EmployeeProfile from './pages/employeeProfile';

function App() {
	const [role] = useState<string>('owner');
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
				{role === 'owner' && <Route path="employees" element={<Employees />} />}
				{role === 'owner' && <Route path="employeeProfile" element={<EmployeeProfile />} />}
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
