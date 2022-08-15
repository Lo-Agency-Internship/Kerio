import { useState } from 'react';
import { Button } from '../atoms/button';
import ContactModal from '../molecules/contactModal';

const Sidebar = () => {
	const [showContactModal, setshowContactModal] = useState(false);
	return (
		<>
			{showContactModal && <ContactModal />}
			<div className="w-60 h-full shadow-md bg-black px-1 absolute" id="sidenavExample">
				<ul className="relative">
					<li className="relative">
						<Button
							style="border-black  hover:text-gray-500 font-bold text-center text-white mx-3 my-5"
							label={'Add contact'}
							onClick={() => {
								setshowContactModal(true);
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
