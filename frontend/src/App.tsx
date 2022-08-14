// import React from 'react'
import './App.css';
import { Route, Routes, BrowserRouter, Outlet } from 'react-router-dom';
import Contact from './pages/contact';
import Layout from './layout/layout';
import Dashboard from './pages/dashboard';
import Index from './pages';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Index />} />
				<Route
					path="/dashboard"
					element={
						<Layout>
							<Outlet />
						</Layout>
					}>
					<Route index element={<Dashboard />} />
					<Route path="contact" element={<Contact />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
