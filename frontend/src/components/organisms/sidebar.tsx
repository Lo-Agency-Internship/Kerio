import { useState } from 'react';
import { Button } from '../atoms/button';
import ContactModal from '../molecules/contactModal';
import AddEmployModal from '../molecules/addEmployModal';
import Images from '../../assets/images/logo.png';
import { uri } from '../../utils';
import axios from 'axios';
import { useApiContext } from '../../context/api';
import NoteModal from '../molecules/noteModal';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
	const [showContactModal, setShowContactModal] = useState<boolean>(false);
	const [showAddEmployModal, setAddEmployModal] = useState<boolean>(false);
	const [showNotesModal, setShowNotesModal] = useState<boolean>(false);
	const { setContacts } = useApiContext();
	const navigate = useNavigate();

	const allContacts = async () => {
		const leads = await axios.get(uri(`contacts?pageNumber=1&perPage=10`), {
			headers: {
				Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
			},
		});

		setContacts(leads.data);
		navigate('/dashboard');
	};
	const filterLead = async () => {
		const leads = await axios.get(uri(`contacts?status=Lead&pageNumber=1&perPage=10`), {
			headers: {
				Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
			},
		});

		setContacts(leads.data);
	};

	const potentialCustomer = async () => {
		const leads = await axios.get(uri(`contacts?status=PotentialCustomer&pageNumber=1&perPage=10`), {
			headers: {
				Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
			},
		});
		setContacts(leads.data);
	};

	const loyalCustomer = async () => {
		const leads = await axios.get(uri(`contacts?status=LoyalCustomer&pageNumber=1&perPage=10`), {
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
			{showNotesModal && <NoteModal setOpen={setShowNotesModal} />}
			<div className="w-64 shadow-md px-1 h-screen fixed" id="sidenavExample">
				<img className="h-8 w-auto my-4 mx-4 sm:h-20" src={Images} alt="Img" />
				<ul className="relative top-6">
					<li className="relative">
						<Button
							style="border-black hover:text-gray-500 text-xl text-center text-black px-2 mx-2 my-3"
							label={'Add contact'}
							onClick={() => {
								setShowContactModal(true);
							}}
						/>
					</li>

					{/* this button show only for leader */}
					<li className="relative">
						<Button
							style="border-black hover:text-gray-500 text-xl text-center text-black px-2 mx-2 mb-3"
							label={'Add Employee'}
							onClick={() => {
								setAddEmployModal(true);
							}}
						/>
						<hr />
					</li>

					<li className="relative">
						<Button
							style="border-black  hover:text-gray-500 text-xl text-center text-black px-2 mx-2 mt-6"
							label={'All Contacts'}
							onClick={allContacts}
							type="button"
						/>
					</li>
					{location.pathname === '/dashboard' && (
						<>
							<li className="relative">
								<Button
									style="border-black  hover:text-gray-500 text-xl text-center text-black px-2 mx-2 mt-6"
									label={'Leads'}
									onClick={filterLead}
									type="button"
								/>
							</li>
							<li className="relative">
								<Button
									style="  border-black  hover:text-gray-500 text-xl text-center text-black px-2 m-2"
									label={'Potential Customer'}
									onClick={potentialCustomer}
									type="button"
								/>
							</li>
							<li className="relative">
								<Button
									style="border-black  hover:text-gray-500 text-xl text-center text-black px-2 m-2"
									label={'Loyal Customer'}
									onClick={loyalCustomer}
									type="button"
								/>
							</li>
						</>
					)}
				</ul>
				{location.pathname !== '/dashboard' && (
					<div className="py-12 px-1">
						<button
							onClick={() => setShowNotesModal(true)}
							className="w-32 bg-white tracking-wide text-gray-800 rounded border-b-2 hover:border-gray-400 hover:bg-gray-600 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
							<span className="mx-auto">Add Note</span>
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default Sidebar;
