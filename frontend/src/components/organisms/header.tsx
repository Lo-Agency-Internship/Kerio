import { Button } from '../atoms/button';
const Header = () => {
	return (
		<>
			{/* header start here */}
			<nav
				className="
  right-0
  flex flex-wrap
  items-center
  justify-between
  py-6
  bg-[#000000]
  text-gray-500
  hover:text-gray-700
  focus:text-gray-700
  shadow-lg
  navbar navbar-expand-lg navbar-light
  ">
				<div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
					<div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent"></div>

					<div className="flex items-center relative">
						<div className="dropdown relative"></div>
						<div className="dropdown relative">
							{/* sign out button  */}
							<Button
								style="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
								label={'Sign out'}
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
