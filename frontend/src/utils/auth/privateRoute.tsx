import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/auth';

const PrivateRoute = ({ children, role }: { children: JSX.Element; role: any }) => {
	const { isTokenValid, userMetadata } = useAuthContext();
	const location = useLocation();
	// we must change this part when our token will has role
	const userHasRequiredRole = !!(userMetadata() && role.includes('owner'));
	if (isTokenValid()) {
		return <Navigate to="/" state={{ from: location }} />;
	}

	if (isTokenValid() && !userHasRequiredRole) {
		return <Navigate to="/" state={{ from: location }} />; // build your won access denied page (sth like 404)
	}

	return children;
};

export default PrivateRoute;
