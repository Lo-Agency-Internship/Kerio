import { modalContactValidation } from '../../validation/addContactValidaion';
import axios from 'axios';
import { FC, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { uri } from '../../utils/index';
import { useApiContext } from '../../context/api';
interface IContactModal {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ContactModal: FC<IContactModal> = ({ setOpen }) => {
	// const navigate = useNavigate();
	const { change, setChange } = useApiContext();
	const [error, setError] = useState<string | null>(null);
	const handleSubmit = async (event: any) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const name = formData.get('name')?.toString().toLowerCase();
		const phone = formData.get('phone');
		const email = formData.get('email')?.toString().toLowerCase();
		const status = formData.get('status');
		const body = {
			name,
			phone,
			email,
			status,
		};
		const isValid = await modalContactValidation.isValid(body);
		if (isValid) {
			await axios.post(uri('contacts'), body).then((response) => {
				const user = response.data;

				setOpen(false);
				setChange(!change);
				// navigate(`/dashboard/contacts/${user.id}`);
			});
		} else {
			modalContactValidation.validate(body).catch((e) => {
				setError(e.message);
			});
		}
	};
	return (
		// // modal starts here
		<div className="py-12 transition duration-150 ease-in-out z-50 fixed left-0 right-0 top-0 bottom-0" id="modal">
			<div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
				<div className="relative inline-block text-left w-full">
					<div>
						<div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
							<h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Contact Form</h1>
							{/* // form starts here */}
							{error && <p>{error}</p>}
							<form onSubmit={handleSubmit}>
								<label htmlFor="title" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
									Name
								</label>
								<input
									name="name"
									id="title"
									className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border
                         focus:border-indigo-700 font-normal w-full h-10 flex items-center 
                         pl-3 text-sm border-gray-300 rounded border"
									placeholder="Farzaneh"
								/>
								<label htmlFor="phone" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
									Phone Number
								</label>
								<input
									name="phone"
									id="number"
									className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border
                         focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 
                         text-sm border-gray-300 rounded border"
									placeholder="09120000000"
								/>
								<label htmlFor="e-mail" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
									Email
								</label>
								<input
									name="email"
									id="email"
									className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border
                         focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 
                         text-sm border-gray-300 rounded border"
									placeholder="X@gmail.com"
								/>
								<label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Customer Status</label>
								<div className="mb-5 mt-2">
									{/* // dropDown starts here */}
									<select
										name="status"
										id="customerStatus"
										className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border">
										<option value="lead">lead</option>
										<option value="lost-loyal">lost-loyal</option>
										<option value="potentialCustomer">potentialCustomer</option>
										<option value="lostPotentialCustomer">lostPotentialCustomer</option>
										<option value="lostLoyalCustomer">lostLoyalCustomer</option>
										<option value="loyalCustomer">loyalCustomer</option>
									</select>
								</div>
								{/* button of add */}
								<button
									type="submit"
									className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">
									Add
								</button>
								<button
									className="cursor-pointer absolute top-0 right-0 mt-4 mr-5
                         text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out 
                         rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
									aria-label="close modal"
									onClick={() => setOpen(false)}
									role="button">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-x"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										strokeWidth="2.5"
										stroke="currentColor"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" />
										<line x1="18" y1="6" x2="6" y2="18" />
										<line x1="6" y1="6" x2="18" y2="18" />
									</svg>
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactModal;
