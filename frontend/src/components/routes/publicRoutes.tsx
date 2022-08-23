import { Outlet, Navigate } from 'react-router-dom';

const PublicRoutes = () => {
	let expired = true;
	const token = localStorage.getItem('access_token');
	if (token) {
		expired = false;
	}
	return expired ? <Outlet /> : <Navigate to="/dashboard" />;
};
export default PublicRoutes;
