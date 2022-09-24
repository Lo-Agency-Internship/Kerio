import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/auth';

const PrivateRoute = ({ children, role }: { children: JSX.Element; role: any }) => {
	const { isTokenValid, userMetadata } = useAuthContext();
	const location = useLocation();

	const userHasRequiredRole = !!(userMetadata() && role.includes('owner'));
	if (isTokenValid()) {
		return <Navigate to="/auth" state={{ from: location }} />;
	}

	if (isTokenValid() && !userHasRequiredRole) {
		return <Navigate to="/auth" state={{ from: location }} />;
	}

	return children;
};

export default PrivateRoute;
