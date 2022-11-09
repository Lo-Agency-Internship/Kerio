import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiContext } from '../../context/api';
import { Button } from '../atoms/button';
import { editContactValidation } from '../../validation/editContactValidation';
import { IUser } from '../../utils/interfaces/user';
import DeleteModal from '../molecules/deleteModal';
import { InputFormControl } from '../molecules/formControls/inputFormControl';
export interface AccountPanelProps {
	user?: IUser;
	setUser?: (value: IUser) => void;
}
export const AccountPanel: React.FC<AccountPanelProps> = ({ user, setUser }: any) => {
	const [inputsShow, setInputsShow] = useState(false);
	const [inputDisabled, setInputDisabled] = useState(true);
	const [background, setBackground] = useState('bg-transparent');
	const { updateContactInfo, deleteContact } = useApiContext();
	const [contactName, setContactName] = useState(user?.name);
	const [contactEmail, setContactEmail] = useState(user?.email);
	const [contactPhone, setContactPhone] = useState(user?.phone);
	const [error, setError] = useState<string | null | boolean>(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setUser(user);
	}, [user]);
	// after ckick it we can see 2 new buttons ( yes & no)
	const editHandler = () => {
		setInputDisabled(false);
		setInputsShow(true);
		setBackground('bg-gray-200');
	};

	const cancelHandler = () => {
		setInputDisabled(true);
		setInputsShow(false);
		setUser(user);
		setBackground('bg-transparent');
		setContactName(user?.name);
		setContactEmail(user?.email);
		setContactPhone(user?.phone);
	};

	const submitHandler = async (e: any) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const name = formData.get('name')?.toString().toLowerCase();
		const email = formData.get('email')?.toString().toLowerCase();
		const phone = formData.get('phone')?.toString();
		const body = { name, email, phone };
		const isValid = await editContactValidation.isValid(body);
		if (isValid) {
			updateContactInfo({ email: body.email, name: body.name, phone: body.phone, id: user.id });
			setError(!error);
		} else {
			editContactValidation.validate(body).catch((event) => {
				setError(event.message);
			});
		}
		setUser({ ...body, id: user.id });
		setInputDisabled(true);
		setInputsShow(false);
		setBackground('bg-transparent');
	};

	const submitDelete = async () => {
		await deleteContact({ id: user.id });
		setShowDeleteModal(false);
		setInputsShow(false);
		navigate('/contacts');
	};

	return (
		<div className="grow">
			{/* Panel body */}
			<div className="p-6 space-y-6">
				<h2 className="text-2xl text-slate-800 font-bold mb-5">{user?.name}</h2>
				{/* Picture */}
				<section>
					<div className="flex items-center">
						<div className="mr-4">
							<img
								className="w-16 h-16 rounded-full"
								src={'https://unsplash.it/70/71'}
								width="80"
								height="80"
								alt="User"
							/>
						</div>
						<button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Change</button>
					</div>
				</section>
				{/* Business Profile */}
				<form onSubmit={submitHandler} className="flex flex-col w-full">
					<h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Business Profile</h2>
					<div className="text-sm">{error && <p className="text-red-700">{error}</p>}</div>
					<div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
						<div className="sm:w-1/3">
							<InputFormControl
								label={'Name'}
								inputProps={{
									type: 'text',
									placeholder: 'Name',
									disabled: inputDisabled,
									onChange: (e) => setContactName(e.target.value),
									value: contactName,
									defaultValue: user?.name,
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
									onChange: (e) => setContactEmail(e.target.value),
									value: contactEmail,
									defaultValue: user?.email,
									className: background,
								}}
							/>
						</div>
						<div className="sm:w-1/3">
							<InputFormControl
								label={'Phone'}
								inputProps={{
									type: 'text',
									placeholder: 'Phone',
									disabled: inputDisabled,
									onChange: (e) => setContactPhone(e.target.value),
									value: contactPhone,
									defaultValue: user?.phone,
									className: background,
								}}
							/>
						</div>
					</div>
					<div className="flex flex-col px-6 py-5 border-t mt-4 border-slate-200">
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
			</div>
		</div>
	);
};
