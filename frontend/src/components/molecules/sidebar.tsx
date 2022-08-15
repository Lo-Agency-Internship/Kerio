import React, { useState } from 'react';
import { Button } from '../atoms/button';
import Images from '../../assets/images/logo.png';
const Sidebar = () => {
	const [showModal, setshowModal] = useState(false);
	return (
		<>
			<div className="w-1/6 h-full shadow-md bg-[#212121] px-1 absolute" id="sidenavExample">
				<img className="h-8 w-auto my-4 sm:h-20" src={Images} alt="Img" />
				<ul className="relative top-6">
					<li className="relative">
						<Button
							style="border-black hover:text-gray-500 font-bold text-center text-white mx-3 my-5"
							label={'Add contact'}
							onClick={() => {
								setshowModal(true);
							}}
						/>
						<hr />
					</li>
					<li className="relative">
						<Button
							style="border-black  hover:text-gray-500 font-bold text-center text-white px-2 mx-5 my-2"
							label={'Leads'}
						/>
					</li>
					<li className="relative">
						<Button
							style="  border-black  hover:text-gray-500 font-bold text-center text-white px-2 mx-5 my-1"
							label={'Customers'}
						/>
					</li>
					<li className="relative">
						<Button
							style="  border-black  hover:text-gray-500 font-bold text-center text-white px-2 mx-5 my-1"
							label={'VIP'}
						/>
					</li>
				</ul>
			</div>
		</>
	);
};

export default Sidebar;
