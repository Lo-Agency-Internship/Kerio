// import React from 'react'
import './App.css';
import { Route, Routes, BrowserRouter, Outlet } from 'react-router-dom';
import Contact from './pages/contact';
import Layout from './layout/layout';
import Dashboard from './pages/dashboard';
import Index from './pages';
import { ApiProvider } from './context/api';
import PrivateRoutes from './components/routes/privateRoutes';
import PublicRoutes from './components/routes/publicRoutes';

function App() {
	return (
		<BrowserRouter>
			<ApiProvider>
				<Routes>
					<Route element={<PublicRoutes />}>
						<Route path="/" element={<Index />} />
					</Route>

					<Route element={<PrivateRoutes />}>
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
			</ApiProvider>
		</BrowserRouter>
	);
}

export default App;
