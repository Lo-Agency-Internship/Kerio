import { modalEmployeeValidation } from '../../validation/addEmployModalValidation';
import { FC, Fragment, useState } from 'react';
import { useApiContext } from '../../context/api';
import Modal from '../organisms/modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InputFormControl } from '../molecules/formControls/inputFormControl';
import { Button } from '../atoms/button';

interface IProps {
	setOpen: (close: boolean) => void;
	open: boolean;
}

const ADDEMPLOYEE_FORM_ID = 'ADDNOTE_FORM_ID';

const NewEmployeeModal: FC<IProps> = ({ setOpen, open }) => {
	const { postInviteEmployee } = useApiContext();
	const [error, setError] = useState<string[] | null>(null);
	const [employees, setEmployees] = useState<any>([]);
	const [nameValue, setNameValue] = useState<string>('');
	const [emailValue, setEmailValue] = useState<string>('');
	const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

	const handleSubmit = async (event: any) => {
		setIsLoadingSubmit(true);
		event.preventDefault();
		try {
			await postInviteEmployee(employees);
			setOpen(false);
			setEmployees([]);
			toast.success('Here you are! new employee!', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		} catch (err: any) {
			setError(err.message);
			setError(err.response.data.message);
			toast.error('Something went wrong! ', {
				position: 'top-right',
				autoClose: 8000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		}
		setIsLoadingSubmit(false);
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
		try {
			const exists = employees.find((employee: { email: string }) => employee.email === body.email);
			modalEmployeeValidation
				.validate(body)
				.then((response) => {
					console.log(response);
					if (!exists && response) {
						setEmployees([...employees, body]);
						setNameValue('');
						setEmailValue('');
						setError(null);
					} else if (exists) {
						setError(['This email is already exists']);
						setNameValue('');
						setEmailValue('');
					}
				})
				.catch((err) => setError(err.message));
		} catch (err: any) {
			setError(err.response.data.message);
		}
	};
	return (
		<>
			<Modal
				show={open}
				onClose={() => setOpen(false)}
				title={'New Employee'}
				actions={[
					{
						loading: isLoadingSubmit,
						label: 'Invite',
						type: 'submit',
						form: ADDEMPLOYEE_FORM_ID,
					},
				]}>
				{error && <p className="text-red-500">{error}</p>}

				<div className="flex gap-1">
					<InputFormControl
						label={'Name'}
						inputProps={{
							type: 'text',
							value: nameValue,
							onChange: (e) => setNameValue(e.target.value),
						}}
					/>

					<InputFormControl
						label={'Email'}
						inputProps={{
							type: 'email',
							value: emailValue,
							onChange: (e) => setEmailValue(e.target.value),
						}}
					/>

					<Button
						type="button"
						onClick={handleAddClick}
						style="inline-block mt-9 px-4 py-3 h-10 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">
						Add
					</Button>
				</div>
				<form onSubmit={handleSubmit} id={ADDEMPLOYEE_FORM_ID}>
					{employees.map((employee: any, index: number) => {
						return (
							<Fragment key={index}>
								<div className="flex gap-1">
									<InputFormControl
										label={''}
										inputProps={{
											type: 'text',
											value: employee.name,
											onChange: (e) => setNameValue(e.target.value),
											disabled: true,
											className:
												'block w-full px-3 py-2 mt-2 text-base placeholder-gray-400 bg-gray-200 border border-gray-400 rounded-md focus:outline-none focus:border-black',
										}}
									/>
									<InputFormControl
										label={''}
										inputProps={{
											type: 'email',
											value: employee.email,
											onChange: (e) => setEmailValue(e.target.value),
											disabled: true,
											className:
												'block w-full px-3 py-2 mt-2 text-base placeholder-gray-400 bg-gray-200 border border-gray-400 rounded-md focus:outline-none focus:border-black',
										}}
									/>
									<Button
										type="button"
										onClick={() => handleRemoveClick(index)}
										style="inline-block mb-5 mt-9 p-1 py-2 h-10 bg-red-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-900 hover:shadow-lg focus:bg-red-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-outt">
										Remove
									</Button>
								</div>
							</Fragment>
						);
					})}
				</form>
			</Modal>
			<ToastContainer
				position="top-right"
				autoClose={8000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</>
	);
};

export default NewEmployeeModal;
