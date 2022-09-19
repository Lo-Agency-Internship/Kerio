import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../atoms/button';
const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();

	function handleSignOut() {
		localStorage.removeItem('access_token');
		navigate('/');
	}

	return (
		<>
			{/* header start here */}
			<nav
				className="
				flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
				<div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
					<div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent"></div>

					<div className="flex items-center relative">
						<div className="dropdown relative"></div>
						<div className="dropdown relative">
							{location.pathname !== '/dashboard' && (
								<Button
									style="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
									label={'Home'}
									onClick={() => navigate(`/dashboard`)}
								/>
							)}
							{/* sign out button  */}
							<Button
								style="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
								label={'Sign out'}
								onClick={() => handleSignOut()}
							/>
						</div>
					</div>
				</div>
			</nav>
			{/* end header */}
		</>
	);
};
export default Header;
