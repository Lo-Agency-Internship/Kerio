import { useLocation, useNavigate } from 'react-router-dom';
import SearchComponent from '../molecules/searchCompounent';

export interface IHeaderProps {
	actions?: React.FC[];
}
const Header: React.FC<IHeaderProps> = (props) => {
	const navigate = useNavigate();
	const location = useLocation();

	function handleSignOut() {
		localStorage.removeItem('access_token');
		navigate('/');
	}

	return (
		<nav className=" bg-gray-50 items-center flex fixed w-5/6 z-40 right-0 flex-wrap border-b-2 border-gray-300 py-2 md:justify-start md:space-x-10">
			<div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
				<div className="flex items-center justify-center relative">
					{props.actions?.map((C, idx) => (
						<C key={idx} />
					))}
				</div>
				<div className="flex items-center justify-between relative">
					<SearchComponent />
				</div>
				<div className="flex items-center justify-center relative">
					<button
						className="block py-2 px-4 mr-2 text-sm font-medium text-gray-700 focus:outline-none bg-white hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
						onClick={() => handleSignOut()}>
						Sign out
					</button>
				</div>
			</div>
		</nav>
	);
};
export default Header;
