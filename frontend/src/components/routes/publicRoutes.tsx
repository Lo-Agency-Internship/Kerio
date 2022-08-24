import { Outlet, Navigate } from 'react-router-dom';
import { useApiContext } from '../../context/api';

const PublicRoutes = () => {
	const { checkToken } = useApiContext();

	const token = localStorage.getItem('access_token');
	const isValidToken = checkToken(token);

	return isValidToken ? <Outlet /> : <Navigate to="/dashboard" />;
};
export default PublicRoutes;
