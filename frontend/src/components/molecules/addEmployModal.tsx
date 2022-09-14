import React, { FC, useState } from 'react';
import { addEmployeModalValidation } from '../../validation/addEmployModalValidation';
import { Button } from '../atoms/button';
import { useApiContext } from '../../context/api';

interface IContactModal {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEmployModal: FC<IContactModal> = ({ setOpen }) => {
	const { postInviteEmployee } = useApiContext();
	const [error, setError] = useState<string | null>(null);
	const [employees, setEmployees] = useState<any>([]);
	const [nameValue, setNameValue] = useState<string>('');
	const [emailValue, setEmailValue] = useState<string>('');
	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const name = formData.getAll('name')?.toString().toLowerCase();
		const email = formData.getAll('email')?.toString().toLowerCase();
		const names = name.split(',');
		const emails = email.split(',');
		const data = names.map((item, index) => {
			return {
				name: item,
				email: emails[index],
			};
		});

		await postInviteEmployee({ invites: data }).then(() => {
			setOpen(false);
		});
	};
	const handleRemoveClick = (index: number) => {
		const list = [...employees];
		list.splice(index, 1);

		setEmployees(list);
	};
	const handleAddClick = async (event: any) => {
		event.preventDefault();

		const body = {
			name: nameValue,
			email: emailValue,
		};
		const isValid = await addEmployeModalValidation.isValid(body);
		const exists = employees.find((employee: { email: string }) => employee.email === body.email);
		if (isValid && !exists) {
			setEmployees([...employees, body]);
			setNameValue('');
			setEmailValue('');
		} else {
			if (exists) {
				setError('This email is already exists');
			}
			addEmployeModalValidation.validate(body).catch((e) => {
				setError(e.message);
			});
		}
	};
	return (
		<>
			<div
				className="py-12 backdrop-blur-sm transition duration-150 ease-in-out z-50 fixed top-0 right-0 bottom-0 left-0"
				id="modal">
				<div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-xl">
					<div className="relative inline-block text-left w-full">
						<div>
							<div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
								<h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
									Invite employee form
								</h1>

								{error && <p className="text-red-700">{error}</p>}
								<div className="flex gap-1">
									<div>
										<label htmlFor="title" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
											Name
										</label>
										<input
											onChange={(e) => setNameValue(e.target.value)}
											value={nameValue}
											name="newName"
											id="title"
											className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border
                     focus:border-indigo-700 font-normal w-full h-10 flex items-center 
                     pl-3 text-sm border-gray-300 rounded border"
											placeholder="Name"
										/>
									</div>
									<div>
										<label htmlFor="e-mail" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
											Email
										</label>
										<input
											onChange={(e) => setEmailValue(e.target.value)}
											value={emailValue}
											name="newEmail"
											id="email"
											className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border
                     focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 
                     text-sm border-gray-300 rounded border"
											placeholder="X@gmail.com"
										/>
									</div>

									<button
										type="button"
										onClick={handleAddClick}
										className="inline-block mb-5 mt-8 p-4 h-10 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">
										Add
									</button>
								</div>
								<form onSubmit={handleSubmit}>
									{employees.map((employee: any, index: number) => {
										return (
											<React.Fragment key={index}>
												<div className="flex gap-1">
													<div>
														<label
															htmlFor="title"
															className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
															Name
														</label>
														<input
															value={employee.name}
															name="name"
															id="title"
															className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border
                     focus:border-indigo-700 font-normal w-full h-10 flex items-center 
                     pl-3 text-sm border-gray-300 rounded border"
															placeholder="Name"
														/>
													</div>
													<div>
														<label
															htmlFor="e-mail"
															className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
															Email
														</label>
														<input
															value={employee.email}
															name="email"
															id="email"
															className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border
                     focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 
                     text-sm border-gray-300 rounded border"
															placeholder="X@gmail.com"
														/>
													</div>

													<Button
														type="button"
														onClick={() => handleRemoveClick(index)}
														style="inline-block mb-5 mt-8 p-1 py-2 h-10 bg-red-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-900 hover:shadow-lg focus:bg-red-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-out"
														label="Remove"
													/>
												</div>
											</React.Fragment>
										);
									})}

									<Button
										type="submit"
										style="inline-block mb-5 mt-8 p-4 h-10 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
										label="invite"
									/>
									<button
										type="button"
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
		</>
	);
};
export default AddEmployModal;
