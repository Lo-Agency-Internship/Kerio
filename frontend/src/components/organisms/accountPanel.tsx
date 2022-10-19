import Images from '../../assets/images/user.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiContext } from '../../context/api';
import { Button } from '../atoms/button';
import { Input } from '../atoms/input';
import { editContactValidation } from '../../validation/editContactValidation';
import { IUser } from '../../utils/interfaces/user';
import DeleteModal from '../molecules/deleteModal';
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
		setBackground('bg-gray-300');
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
		const phone = formData.get('phone');

		const body = { name, email, phone };
		const isValid = await editContactValidation.isValid(body);
		if (isValid) {
			updateContactInfo(user.id, body);
			setError(!error);
		} else {
			editContactValidation.validate(body).catch((event) => {
				setError(event.message);
			});
		}
		await updateContactInfo(user.id, body);
		setUser({ ...body, id: user.id });
		setInputDisabled(true);
		setInputsShow(false);
		setBackground('bg-transparent');
	};

	const submitDelete = async () => {
		await deleteContact(user.id);
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
							<img className="w-20 h-20 rounded-full" src={Images} width="80" height="80" alt="User upload" />
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
							<label className="block text-sm font-medium mb-1" htmlFor="name">
								Name
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
						<div className="sm:w-1/3">
							<label className="block text-sm font-medium mb-1" htmlFor="email">
								Email
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
						<div className="sm:w-1/3">
							<label className="block text-sm font-medium mb-1" htmlFor="phone">
								Phone
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
