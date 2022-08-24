import { Outlet, Navigate } from 'react-router-dom';
import { useApiContext } from '../../context/api';

const PriveteRoutes = () => {
	// const { checkToken } = useApiContext();
	let expired = false;
	const token = localStorage.getItem('access_token');
	if (!token) {
		expired = true;
	}
	return expired ? <Navigate to="/" /> : <Outlet />;
};

export default PriveteRoutes;
