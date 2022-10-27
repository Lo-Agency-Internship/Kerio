import { modalEmployeeValidation } from '../../validation/addEmployModalValidation';
import { FC, Fragment, useState } from 'react';
import { useApiContext } from '../../context/api';
import Modal from '../organisms/modal';

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
		console.log(data);
		postInviteEmployee(data).then(() => {
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
		try {
			await modalEmployeeValidation.isValid(body);
			const exists = employees.find((employee: { email: string }) => employee.email === body.email);
			if (!exists) {
				setEmployees([...employees, body]);
				setNameValue('');
				setEmailValue('');
			} else {
				setError(['This email is already exists']);
			}
			modalEmployeeValidation.validate(body).catch((e) => {
				setError(e.message);
			});
		} catch (err: any) {
			setError(err.response.data.message);
			console.log(err.response.data.message);
		}
	};
	return (
		<Modal
			show={open}
			onClose={() => setOpen(false)}
			title={'New Employee'}
			actions={[
				{
					label: 'Invite',
					type: 'submit',
					form: ADDEMPLOYEE_FORM_ID,
				},
			]}>
			{error && <p>{error}</p>}

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
			<form onSubmit={handleSubmit} id={ADDEMPLOYEE_FORM_ID}>
				{employees.map((employee: any, index: number) => {
					return (
						<Fragment key={index}>
							<div className="flex gap-1">
								<div>
									<label htmlFor="title" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
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
									<label htmlFor="e-mail" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
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
								<button
									type="button"
									onClick={() => handleRemoveClick(index)}
									className="inline-block mb-5 mt-8 p-1 py-2 h-10 bg-red-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-900 hover:shadow-lg focus:bg-red-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-outt">
									Remove
								</button>
							</div>
						</Fragment>
					);
				})}
			</form>
		</Modal>
	);
};

export default NewEmployeeModal;
