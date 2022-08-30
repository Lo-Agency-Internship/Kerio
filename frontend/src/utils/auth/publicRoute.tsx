import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/auth';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
	const { isTokenValid } = useAuthContext();
	const location = useLocation();
	if (!isTokenValid()) {
		return <Navigate to="/dashboard" state={{ from: location }} />;
	}
	return children;
};
export default PublicRoute;
