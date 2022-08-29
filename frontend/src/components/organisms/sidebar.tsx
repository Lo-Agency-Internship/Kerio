import { useState } from 'react';
import { Button } from '../atoms/button';
import ContactModal from '../molecules/contactModal';
import AddEmployModal from '../molecules/addEmployModal';
import Images from '../../assets/images/logo.png';
const Sidebar = () => {
	const [showContactModal, setShowContactModal] = useState<boolean>(false);
	const [showAddEmployModal, setAddEmployModal] = useState<boolean>(false);
	return (
		<>
			{showAddEmployModal && <AddEmployModal setOpen={setAddEmployModal} />}
			{showContactModal && <ContactModal setOpen={setShowContactModal} />}
			<div className="w-64 shadow-md bg-[#212121] px-1 h-screen fixed" id="sidenavExample">
				<img className="h-8 w-auto my-4 sm:h-20" src={Images} alt="Img" />
				<ul className="relative top-6">
					<li className="relative">
						<Button
							style="border-black hover:text-gray-500 font-bold text-center text-white px-2 mx-2 my-3"
							label={'Add contact'}
							onClick={() => {
								setShowContactModal(true);
							}}
						/>
					</li>

					{/* this button show only for leader */}
					<li className="relative">
						<Button
							style="border-black hover:text-gray-500 font-bold text-center text-white px-2 mx-2 mb-3"
							label={'Add Employee'}
							onClick={() => {
								setAddEmployModal(true);
							}}
						/>
						<hr />
					</li>
					<li className="relative">
						<Button
							style="border-black  hover:text-gray-500 font-bold text-center text-white px-2 mx-2 mt-6"
							label={'Leads'}
						/>
					</li>
					<li className="relative">
						<Button
							style=" border-black  hover:text-gray-500 font-bold text-center text-white px-2 m-2"
							label={'Lost Loyal'}
						/>
					</li>
					<li className="relative">
						<Button
							style="  border-black  hover:text-gray-500 font-bold text-center text-white px-2 m-2"
							label={'Potential Customer'}
						/>
					</li>
					<li className="relative">
						<Button
							style="border-black  hover:text-gray-500 font-bold text-center text-white px-2 m-2"
							label={'Lost Potential Customer'}
						/>
					</li>
					<li className="relative">
						<Button
							style="border-black  hover:text-gray-500 font-bold text-center text-white px-2 m-2"
							label={'Loyal Customer'}
						/>
					</li>
					<li className="relative">
						<Button
							style="border-black  hover:text-gray-500 font-bold text-center text-white px-2 m-2"
							label={'Lost Loyal Customer'}
						/>
					</li>
				</ul>
			</div>
		</>
	);
};

export default Sidebar;
