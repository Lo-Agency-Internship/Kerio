import { Link } from 'react-router-dom';

const Sidebar = () => {
	const owner = true;
	return (
		<aside className=" h-screen flex fixed" aria-label="Sidebar">
			<div className="overflow-y-auto w-52 py-4 px-3 bg-gray-50 h-full">
				<ul className="space-y-2">
					<li>
						<Link
							to="/"
							className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
							<span className="ml-3">Dashboard</span>
						</Link>
					</li>
					<li>
						<Link
							to="/contacts"
							className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
							<span className="ml-3">Contacts</span>
						</Link>
					</li>
					{owner === true && (
						<li>
							<Link
								to="/employees"
								className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
								<span className="ml-3">Employees</span>
							</Link>
						</li>
					)}
				</ul>
			</div>
		</aside>
	);
};

export default Sidebar;
