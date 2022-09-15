import { useState } from 'react';
import { Button } from '../atoms/button';
import ContactModal from '../molecules/contactModal';
import AddEmployModal from '../molecules/addEmployModal';
import Images from '../../assets/images/logo.png';
import { uri } from '../../utils';
import axios from 'axios';
import { useApiContext } from '../../context/api';
const Sidebar = () => {
	const [showContactModal, setShowContactModal] = useState<boolean>(false);
	const [showAddEmployModal, setAddEmployModal] = useState<boolean>(false);
	const { setContacts } = useApiContext();

	const allContacts = async () => {
		const leads = await axios.get(uri(`contacts`), {
			headers: {
				Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
			},
		});
		setContacts(leads.data);
	};
	const filterLead = async () => {
		const leads = await axios.get(uri(`contacts?status=Lead`), {
			headers: {
				Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
			},
		});
		setContacts(leads.data);
	};
	const filterLostLoyal = async () => {
		const leads = await axios.get(uri(`contacts?status=Lostloyal`), {
			headers: {
				Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
			},
		});
		setContacts(leads.data);
	};

	const potentialCustomer = async () => {
		const leads = await axios.get(uri(`contacts?status=PotentialCustomer`), {
			headers: {
				Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
			},
		});
		setContacts(leads.data);
	};

	const lostPotentialCustomer = async () => {
		const leads = await axios.get(uri(`contacts?status=LostPotentialCustomer`), {
			headers: {
				Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
			},
		});
		setContacts(leads.data);
	};
	const loyalCustomer = async () => {
		const leads = await axios.get(uri(`contacts?status=LoyalCustomer`), {
			headers: {
				Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
			},
		});
		setContacts(leads.data);
	};
	const lostLoyalCustomer = async () => {
		const leads = await axios.get(uri(`contacts?status=LostLoyalCustomer`), {
			headers: {
				Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
			},
		});
		setContacts(leads.data);
	};
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
							label={'All Contacts'}
							onClick={allContacts}
							type="button"
						/>
					</li>
					<li className="relative">
						<Button
							style="border-black  hover:text-gray-500 font-bold text-center text-white px-2 mx-2 mt-6"
							label={'Leads'}
							onClick={filterLead}
							type="button"
						/>
					</li>
					<li className="relative">
						<Button
							style=" border-black  hover:text-gray-500 font-bold text-center text-white px-2 m-2"
							label={'Lost Loyal'}
							onClick={filterLostLoyal}
							type="button"
						/>
					</li>
					<li className="relative">
						<Button
							style="  border-black  hover:text-gray-500 font-bold text-center text-white px-2 m-2"
							label={'Potential Customer'}
							onClick={potentialCustomer}
							type="button"
						/>
					</li>
					<li className="relative">
						<Button
							style="border-black  hover:text-gray-500 font-bold text-center text-white px-2 m-2"
							label={'Lost Potential Customer'}
							onClick={lostPotentialCustomer}
							type="button"
						/>
					</li>
					<li className="relative">
						<Button
							style="border-black  hover:text-gray-500 font-bold text-center text-white px-2 m-2"
							label={'Loyal Customer'}
							onClick={loyalCustomer}
							type="button"
						/>
					</li>
					<li className="relative">
						<Button
							style="border-black  hover:text-gray-500 font-bold text-center text-white px-2 m-2"
							label={'Lost Loyal Customer'}
							onClick={lostLoyalCustomer}
							type="button"
						/>
					</li>
				</ul>
			</div>
		</>
	);
};

export default Sidebar;
