import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiContext } from '../../context/api';
import { Button } from '../atoms/button';
import { Input } from '../atoms/input';
import { modalContactValidation } from '../../validation/addContactValidaion';
export default function Profile({ user, setUser }: any) {
	const [deleteBtn, setDeleteBtn] = useState(false);
	const [inputsShow, setInputsShow] = useState(false);
	const [inputDisabled, setInputDisabled] = useState(true);
	const [selectBoxValue, setSelectBoxValue] = useState<string | null>(null);
	const [background, setBackground] = useState('bg-transparent');
	const { updateContactInfo, deleteContact, change, setChange } = useApiContext();
	const [contactName, setContactName] = useState(user?.name);
	const [contactEmail, setContactEmail] = useState(user?.email);
	const [contactPhone, setContactPhone] = useState(user?.phone);
	const [contactStatus, setContactStatus] = useState(user?.status);
	const [error, setError] = useState<string | null | boolean>(null);
	const navigate = useNavigate();

	useEffect(() => {
		setUser(user);
		if (user) {
			setSelectBoxValue(user.status);
		}
	}, [user]);
	// after ckick it we can see 2 new buttons ( yes & no)
	const editHandler = () => {
		setInputDisabled(false);
		setInputsShow(true);
		setBackground('bg-gray-300');
	};

	// i have bug in this part we will fix it
	const cancelHandler = () => {
		setInputDisabled(true);
		setInputsShow(false);
		setUser(user);
		setBackground('bg-transparent');
		setContactName(user?.name);
		setContactEmail(user?.email);
		setContactPhone(user?.phone);
		setContactStatus(user?.status);
	};

	const submitHandler = async (e: any) => {
		e.preventDefault();
		setSelectBoxValue(null);
		const formData = new FormData(e.currentTarget);
		const name = formData.get('name')?.toString().toLowerCase();
		const email = formData.get('email')?.toString().toLowerCase();
		const phone = formData.get('phone');
		const status = formData.get('status');
		const body = { name, email, phone, status };
		const isValid = await modalContactValidation.isValid(body);
		if (isValid) {
			updateContactInfo(user.id, body);
			setError(!error);
		} else {
			modalContactValidation.validate(body).catch((event) => {
				setError(event.message);
			});
		}
		// await updateContactInfo(user.id, body);
		setSelectBoxValue(status as string);
		setUser({ ...body, id: user.id });
		setInputDisabled(true);
		setInputsShow(false);
		setBackground('bg-transparent');
	};

	const deleteHandler = () => {
		setDeleteBtn(true);
	};

	const cancelDelete = () => {
		setDeleteBtn(false);
	};
	const submitDelete = async () => {
		await deleteContact(user.id);
		setDeleteBtn(false);
		setInputsShow(false);
		navigate('/dashboard');
	};

	return (
		<>
			<div className="flex justify-center justify-items-center my-4  w-full p-10">
				<div className="flex w-full mx-8  p-4 bg-white border-solid border-2 border-gray-300  rounded-lg hover:shadow-xl ">
					<form onSubmit={submitHandler}>
						<div className="flex justify-start  flex-row flex-wrap">
							<div className="m-3 pt-0 hover:shadow-md rounded-lg">
								<label className="mx-2" htmlFor="name">
									Name:
								</label>
								<Input
									disabled={inputDisabled}
									type={'text'}
									id={'name'}
									defaultValue={user?.name}
									name="name"
									className={background}
									onChange={(e) => setContactName(e.target.value)}
									value={contactName}
								/>
							</div>
							<div className="m-3 pt-0 hover:shadow-md rounded-lg">
								<label className="mx-2" htmlFor="email">
									Email:
								</label>
								<Input
									disabled={inputDisabled}
									type={'text'}
									id={'email'}
									defaultValue={user?.email}
									name="email"
									className={background}
									onChange={(e) => setContactEmail(e.target.value)}
									value={contactEmail}
								/>
							</div>

							<div className="m-3 pt-0 hover:shadow-md rounded-lg">
								<label className="mx-2" htmlFor="phone">
									Phone:
								</label>
								<Input
									disabled={inputDisabled}
									type={'text'}
									id={'phone'}
									defaultValue={user?.phone}
									name="phone"
									className={background}
									onChange={(e) => setContactPhone(e.target.value)}
									value={contactPhone}
								/>
							</div>
							{selectBoxValue && (
								<div className="m-3 pt-0 hover:shadow-md rounded-lg">
									<label className="mx-2" htmlFor="status">
										Status :
									</label>
									<select
										disabled={inputDisabled}
										onChange={(e) => setContactStatus(e.target.value)}
										value={contactStatus}
										name="status"
										className={`${background} status px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-transparent rounded text-sm outline-none focus:outline-none focus:shadow-outline`}
										defaultValue={selectBoxValue}
										id="customerStatus">
										<option value="PotentialCustomer" selected={selectBoxValue === 'PotentialCustomer' && true}>
											Potential Customer
										</option>
										<option value="LostPotentialCustomer" selected={selectBoxValue === 'LostPotentialCustomer' && true}>
											Lost Potential Customer
										</option>
										<option value="Lead" selected={selectBoxValue === 'Lead' && true}>
											Lead
										</option>
										<option value="LostLoyalCustomer" selected={selectBoxValue === 'LostLoyalCustomer' && true}>
											Lost Loyal Customer
										</option>
										<option value="LoyalCustomer" selected={selectBoxValue === 'LoyalCustomer' && true}>
											Loyal Customer
										</option>
									</select>
								</div>
							)}
						</div>
						{error && <p className="text-red-700">{error}</p>}
						{/* show and hide buttons */}
						<div className="mt-16">
							{inputsShow ? (
								<>
									<Button
										label="No"
										style="focus:outline-none mx-3 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
										onClick={cancelHandler}
										type="reset"
									/>
									<Button
										label="Yes"
										style="focus:outline-none mx-3 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
										type="submit"
									/>
								</>
							) : (
								<Button
									label="Edit"
									style="focus:outline-none mx-3 text-black border-solid border-2 border-yellow-500 hover:border-yellow-400 hover:bg-yellow-400 hover:text-white shadow-md focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
									onClick={editHandler}
									type="button"
								/>
							)}
							{deleteBtn ? (
								<>
									<div
										className="fixed backdrop-blur-sm
										top-0
										h-full
										w-full right-0 bottom-0 left-0 z-50 py-12 transition duration-150 ease-in-out"
										id="modal">
										<div role="alert" className="container mx-auto w-11/12 max-w-lg md:w-2/3">
											<div className="relative rounded border border-gray-400 bg-white py-8 px-5 shadow-md md:px-10">
												<div className="mb-3 flex w-full justify-start text-gray-600"></div>

												<div className="relative mb-5 mt-2">
													<div className="absolute flex h-full items-center border-r px-4 text-gray-600"></div>
												</div>

												<div className="relative mb-5 mt-2">
													<div className="absolute right-0 flex h-full cursor-pointer items-center pr-3 text-gray-600"></div>
												</div>
												<p>Do you want to delete this contact?</p>
												<div className="relative mb-5 mt-2">
													<div className="absolute right-0 flex h-full cursor-pointer items-center pr-3 text-gray-600"></div>
												</div>
												<div className="flex w-full items-center justify-start">
													<button
														onClick={submitDelete}
														type="button"
														className="focus:outline-none mx-3 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
														Yes
													</button>
													<button
														className="focus:outline-none mx-3 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
														onClick={cancelDelete}
														type="button">
														No
													</button>
												</div>
												<button
													className="absolute top-0 right-0 mt-4 mr-5 cursor-pointer rounded text-gray-400 transition duration-150 ease-in-out hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
													type="button"
													aria-label="close modal"
													role="button"
													onClick={cancelDelete}>
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
											</div>
										</div>
									</div>
								</>
							) : (
								<Button
									label="Delete"
									style="focus:outline-none mx-3 text-black  border-solid border-2 border-red-500 hover:border-red-400 hover:bg-red-500 hover:text-white focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-red-900"
									type="button"
									onClick={deleteHandler}
								/>
							)}
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
