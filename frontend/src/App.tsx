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
import NotFoundPage from './pages/notFoundPage';
import ContactPage from './pages/contacts/_id';
import ContactsPage from './pages/contacts';
import Activation from './pages/activation';
import ProfileUser from './pages/profileUser';
import { EmployeesPage } from './pages/employees';
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
			<Route path="/active" element={<Activation />} />

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
				<Route path="profile" element={<ProfileUser />} />

				{role === 'owner' && <Route path="employees" element={<EmployeesPage />} />}
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
