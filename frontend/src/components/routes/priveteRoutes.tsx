import { Outlet, Navigate } from 'react-router-dom';
import { useApiContext } from '../../context/api';

const PriveteRoutes = () => {
	const { checkToken } = useApiContext();
	const token = localStorage.getItem('access_token');
	const isValidToken = checkToken(token);
	return isValidToken ? <Navigate to="/" /> : <Outlet />;
};

export default PriveteRoutes;
