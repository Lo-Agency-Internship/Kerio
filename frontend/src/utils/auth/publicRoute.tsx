import { Outlet, Navigate } from 'react-router-dom';
import { useApiContext } from '../../context/api';

const PublicRoute = () => {
	const { checkToken, setUserToken } = useApiContext();
	const token = localStorage.getItem('access_token');
	setUserToken(token);
	const isValidToken = checkToken();
	return isValidToken ? <Outlet /> : <Navigate to="/dashboard" />;
};
export default PublicRoute;
