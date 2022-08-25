import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/auth';

const PrivateRoute = () => {
	const { isTokenValid } = useAuthContext();
	return isTokenValid() ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRoute;
