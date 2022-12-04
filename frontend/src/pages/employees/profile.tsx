import { useEffect, useState } from 'react';
import Images from '../../assets/images/user.png';
import { Button } from '../../components/atoms/button';
import DeleteModal from '../../components/molecules/deleteModal';
import { InputFormControl } from '../../components/molecules/formControls/inputFormControl';
import { useApiContext } from '../../context/api';
import { IEmployee } from '../../utils/interfaces/api/employeeData.interface';

import { editEmployeeValidation } from '../../validation/editEmployeeValidation';

export interface EmployeeAccountProps {
	employee: IEmployee;
	setEmployee: (value: IEmployee | null) => void;
	setEmployees: any;
}
export const EmployeesProfile: React.FC<EmployeeAccountProps> = ({
	employee,
	setEmployee,
	setEmployees,
}: EmployeeAccountProps) => {
	const [inputsShow, setInputsShow] = useState(false);
	const [inputDisabled, setInputDisabled] = useState(true);
	const [background, setBackground] = useState('bg-transparent');
	const { updateEmployeeInfo, deleteEmployee, getAllEmployees } = useApiContext();
	const [employeeName, setEmployeeName] = useState(employee?.name);
	const [employeeEmail, setEmployeeEmail] = useState(employee?.email);
	const [error, setError] = useState<string | null | boolean>(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	useEffect(() => {
		setEmployeeName(employee?.name);
		setEmployeeEmail(employee?.email);
	}, [employee]);
	// // after ckick it we can see 2 new buttons ( yes & no)
	const editHandler = () => {
		setInputDisabled(false);
		setInputsShow(true);
		setBackground('bg-gray-200');
	};

	const cancelHandler = () => {
		setInputDisabled(true);
		setInputsShow(false);
		setEmployee(employee);
		setBackground('bg-transparent');
		setEmployeeName(employee?.name);
		setEmployeeEmail(employee?.email);
	};

	const submitHandler = async (e: any) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const name = formData.get('name')?.toString().toLowerCase();
		const email = formData.get('email')?.toString().toLowerCase();
		const body = { name, email };
		const isValid = await editEmployeeValidation.isValid(body);
		if (isValid) {
			updateEmployeeInfo({ id: employee.id, email: body.email, name: body.name });
			setError(!error);
		} else {
			editEmployeeValidation.validate(body).catch((event) => {
				setError(event.message);
			});
		}
		setEmployee({ ...body, id: employee.id });
		setInputDisabled(true);
		setInputsShow(false);
		setBackground('bg-transparent');
	};

	const submitDelete = async () => {
		try {
			await deleteEmployee({ id: employee.id });
			const data = await getAllEmployees();
			setEmployees(data.users);
			setEmployee(null);
			setShowDeleteModal(false);
			setInputsShow(false);
		} catch (err: any) {
			setError(err.response.data.message);
		}
		setShowDeleteModal(false);
	};

	return (
		<div className={`grow flex flex-col md:translate-x-0'}`}>
			{/* Profile background */}
			<div className="relative h-56 bg-slate-200">
				<button
					className="md:hidden absolute top-4 left-4 sm:left-6 text-white opacity-80 hover:opacity-100"
					aria-controls="profile-sidebar">
					<span className="sr-only">Close sidebar</span>
					<svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
					</svg>
				</button>
			</div>

			{/* Content */}
			<div className="relative px-4 sm:px-6 pb-8">
				{/* Pre-header */}
				<div className="-mt-16 mb-6 sm:mb-3">
					<div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-end">
						{/* Avatar */}
						<div className="inline-flex -ml-1 -mt-1 mb-4 sm:mb-0">
							<img className="rounded-full border-4 border-white" src={Images} width="128" height="128" alt="Avatar" />
						</div>
					</div>
				</div>

				{/* Profile content */}
				<div className="flex flex-col xl:flex-row xl:space-x-16">
					{/* Main content */}
					<div className="space-y-5 mb-8 xl:mb-0">
						<section>
							<form onSubmit={submitHandler} className="flex flex-col w-full">
								<h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">{employee.name}</h2>
								{error && <p className="text-red-500">{error}</p>}
								<div className="text-sm"></div>
								<div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5 pb-4">
									<div className="sm:w-1/3">
										<InputFormControl
											label={'Name'}
											inputProps={{
												type: 'text',
												placeholder: 'Name',
												disabled: inputDisabled,
												onChange: (e) => setEmployeeName(e.target.value),
												value: employeeName,
												defaultValue: employee?.name,
												className: background,
											}}
										/>
									</div>
									<div className="sm:w-1/3">
										<InputFormControl
											label={'Email'}
											inputProps={{
												type: 'text',
												placeholder: 'Email',
												disabled: inputDisabled,
												onChange: (e) => setEmployeeEmail(e.target.value),
												value: employeeEmail,
												defaultValue: employee?.email,
												className: background,
											}}
										/>
									</div>
								</div>
								<hr />
								<div className="flex flex-col px-6 py-5 border-t border-slate-200">
									<div className="flex self-end">
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
										{showDeleteModal ? (
											<>
												<DeleteModal
													open={showDeleteModal}
													setOpen={setShowDeleteModal}
													title={'Delete Modal'}
													handleDelete={submitDelete}>
													<p>Do you want to delete this contact?</p>
												</DeleteModal>
											</>
										) : (
											<Button
												label="Delete"
												style="focus:outline-none mx-3 text-black  border-solid border-2 border-red-500 hover:border-red-400 hover:bg-red-500 hover:text-white focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-red-900"
												type="button"
												onClick={() => setShowDeleteModal(true)}
											/>
										)}
									</div>
								</div>
							</form>
						</section>
						{/* Work History */}
						<div>
							<h2 className="text-slate-800 font-semibold mb-2">Work History</h2>
							<div className="bg-white p-4 border border-slate-200 rounded-sm shadow-sm">
								<ul className="space-y-3">
									{/* Item */}
									<li className="sm:flex sm:items-center sm:justify-between">
										<div className="sm:grow flex items-center text-sm">
											{/* Icon */}
											<div className="w-8 h-8 rounded-full shrink-0 bg-amber-500 my-2 mr-3">
												<svg className="w-8 h-8 fill-current text-amber-50" viewBox="0 0 32 32">
													<path d="M21 14a.75.75 0 0 1-.75-.75 1.5 1.5 0 0 0-1.5-1.5.75.75 0 1 1 0-1.5 1.5 1.5 0 0 0 1.5-1.5.75.75 0 1 1 1.5 0 1.5 1.5 0 0 0 1.5 1.5.75.75 0 1 1 0 1.5 1.5 1.5 0 0 0-1.5 1.5.75.75 0 0 1-.75.75Zm-7 10a1 1 0 0 1-1-1 4 4 0 0 0-4-4 1 1 0 0 1 0-2 4 4 0 0 0 4-4 1 1 0 0 1 2 0 4 4 0 0 0 4 4 1 1 0 0 1 0 2 4 4 0 0 0-4 4 1 1 0 0 1-1 1Z" />
												</svg>
											</div>
											{/* Position */}
											<div>
												<div className="font-medium text-slate-800">Senior Product Designer</div>
												<div className="flex flex-nowrap items-center space-x-2 whitespace-nowrap">
													<div>Remote</div>
													<div className="text-slate-400">·</div>
													<div>April, 2020 - Today</div>
												</div>
											</div>
										</div>
										{/* Tags */}
										<div className="sm:ml-2 mt-2 sm:mt-0">
											<ul className="flex flex-wrap sm:justify-end -m-1">
												<li className="m-1">
													<button className="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
														Marketing
													</button>
												</li>
												<li className="m-1">
													<button className="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
														+4
													</button>
												</li>
											</ul>
										</div>
									</li>

									{/* Item */}
									<li className="sm:flex sm:items-center sm:justify-between">
										<div className="sm:grow flex items-center text-sm">
											{/* Icon */}
											<div className="w-8 h-8 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
												<svg className="w-8 h-8 fill-current text-indigo-50" viewBox="0 0 32 32">
													<path d="M8.994 20.006a1 1 0 0 1-.707-1.707l4.5-4.5a1 1 0 0 1 1.414 0l3.293 3.293 4.793-4.793a1 1 0 1 1 1.414 1.414l-5.5 5.5a1 1 0 0 1-1.414 0l-3.293-3.293L9.7 19.713a1 1 0 0 1-.707.293Z" />
												</svg>
											</div>
											{/* Position */}
											<div>
												<div className="font-medium text-slate-800">Product Designer</div>
												<div className="flex flex-nowrap items-center space-x-2 whitespace-nowrap">
													<div>Milan, IT</div>
													<div className="text-slate-400">·</div>
													<div>April, 2018 - April 2020</div>
												</div>
											</div>
										</div>
										{/* Tags */}
										<div className="sm:ml-2 mt-2 sm:mt-0">
											<ul className="flex flex-wrap sm:justify-end -m-1">
												<li className="m-1">
													<button className="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
														Marketing
													</button>
												</li>
												<li className="m-1">
													<button className="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
														+4
													</button>
												</li>
											</ul>
										</div>
									</li>

									{/* Item */}
									<li className="sm:flex sm:items-center sm:justify-between">
										<div className="sm:grow flex items-center text-sm">
											{/* Icon */}
											<div className="w-8 h-8 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
												<svg className="w-8 h-8 fill-current text-indigo-50" viewBox="0 0 32 32">
													<path d="M8.994 20.006a1 1 0 0 1-.707-1.707l4.5-4.5a1 1 0 0 1 1.414 0l3.293 3.293 4.793-4.793a1 1 0 1 1 1.414 1.414l-5.5 5.5a1 1 0 0 1-1.414 0l-3.293-3.293L9.7 19.713a1 1 0 0 1-.707.293Z" />
												</svg>
											</div>
											{/* Position */}
											<div>
												<div className="font-medium text-slate-800">Product Designer</div>
												<div className="flex flex-nowrap items-center space-x-2 whitespace-nowrap">
													<div>Milan, IT</div>
													<div className="text-slate-400">·</div>
													<div>April, 2018 - April 2020</div>
												</div>
											</div>
										</div>
										{/* Tags */}
										<div className="sm:ml-2 mt-2 sm:mt-0">
											<ul className="flex flex-wrap sm:justify-end -m-1">
												<li className="m-1">
													<button className="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
														Marketing
													</button>
												</li>
												<li className="m-1">
													<button className="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-slate-200 hover:border-slate-300 shadow-sm bg-white text-slate-500 duration-150 ease-in-out">
														+4
													</button>
												</li>
											</ul>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
					{/* Sidebar */}
					<aside className="xl:min-w-56 xl:w-56 space-y-3">
						<div className="text-sm">
							<h3 className="font-medium text-slate-800">Title</h3>
							<div>Senior Product Designer</div>
						</div>
						<div className="text-sm">
							<h3 className="font-medium text-slate-800">Location</h3>
							<div>Milan, IT - Remote</div>
						</div>
						<div className="text-sm">
							<h3 className="font-medium text-slate-800">Joined Acme</h3>
							<div>7 April, 2017</div>
						</div>
					</aside>
				</div>
			</div>
		</div>
	);
};
