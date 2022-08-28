import { Outlet, Navigate } from 'react-router-dom';
import { useApiContext } from '../../context/api';

const PrivateRoutes = () => {
	const { checkToken, setUserToken } = useApiContext();
	const token = localStorage.getItem('access_token');
	setUserToken(token);
	const isValidToken = checkToken();
	return isValidToken ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRoutes;
