// import React from 'react'
import './App.css';
import { Route, Routes, Outlet } from 'react-router-dom';
import Layout from './layout/layout';
import Index from './pages';
import Auth from './pages/auth';
import PrivateRoute from './utils/auth/privateRoute';
import PublicRoute from './utils/auth/publicRoute';
import Invite from './pages/invite';
import { useState } from 'react';
import Employees from './pages/employees';
import NotFoundPage from './pages/notFoundPage';
import EmployeeProfile from './pages/employeeProfile';
import ContactPage from './pages/contacts/_id';
import ContactsPage from './pages/contacts';

function App() {
	const [role] = useState<string>('owner');
	return (
		<Routes>
			<Route
				path="/auth"
				element={
					<PublicRoute>
						<Auth />
					</PublicRoute>
				}
			/>
			<Route path="/invite" element={<Invite />} />

			<Route
				path="/"
				element={
					<PrivateRoute role={role}>
						<Layout>
							<Outlet />
						</Layout>
					</PrivateRoute>
				}>
				<Route index element={<Index />} />
				<Route path="contacts" element={<ContactsPage />} />
				<Route path="contacts/:id" element={<ContactPage />} />
				{role === 'owner' && <Route path="employees" element={<Employees />} />}
				{role === 'owner' && <Route path="employeeProfile" element={<EmployeeProfile />} />}
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
