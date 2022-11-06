import { useState } from 'react';
import { useApiContext } from '../../context/api';
import { Button } from '../atoms/button';
import { editUserValidation } from '../../validation/editUserValidation';
import { InputFormControl } from '../molecules/formControls/inputFormControl';
import { useAuthContext } from '../../context/auth';

export default function AccountPanelUser() {
	const [inputsShow, setInputsShow] = useState(false);
	const [inputDisabled, setInputDisabled] = useState(true);
	const [background, setBackground] = useState('bg-transparent');
	const { userMetadata } = useAuthContext();
	const { name: usersName, email: usersEmail, sub } = userMetadata();
	const { updateUserInfo } = useApiContext();
	const [userName, setUserName] = useState(usersName);
	const [userEmail, setUserEmail] = useState(usersEmail);
	const [error, setError] = useState<string | null | boolean>(null);

	// after ckick it we can see 2 new buttons ( yes & no)
	const editHandler = () => {
		setInputDisabled(false);
		setInputsShow(true);
		setBackground('bg-gray-200');
	};

	const cancelHandler = () => {
		setInputDisabled(true);
		setInputsShow(false);
		// setUser(user);
		setBackground('bg-transparent');
		setUserName(usersName);
		setUserEmail(usersEmail);
	};

	const submitHandler = async (e: any) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const name = formData.get('name')?.toString().toLowerCase();
		const email = formData.get('email')?.toString().toLowerCase();

		const body = { name, email };

		const isValid = await editUserValidation.isValid(body);

		if (isValid) {
			updateUserInfo(sub, body);
			setError(!error);
		} else {
			editUserValidation.validate(body).catch((event) => {
				setError(event.message);
			});
		}

		setInputDisabled(true);
		setInputsShow(false);
		setBackground('bg-transparent');
	};

	return (
		<div className="grow">
			{/* Panel body */}
			<div className="p-6 space-y-6">
				<h2 className="text-2xl text-slate-800 font-bold mb-5">{usersName}</h2>
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
									// disabled: inputDisabled,
									disabled: true,
									onChange: (e) => setUserName(e.target.value),
									value: userName,
									defaultValue: usersName,
									className: background,
									name: 'name',
								}}
							/>
						</div>
						<div className="sm:w-1/3">
							<InputFormControl
								label={'Email'}
								inputProps={{
									type: 'text',
									placeholder: 'Email',
									// disabled: inputDisabled,
									disabled: true,
									onChange: (e) => setUserEmail(e.target.value),
									value: userEmail,
									defaultValue: usersEmail,
									className: background,
									name: 'email',
								}}
							/>
						</div>
						<div className="sm:w-1/3"></div>
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
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
// }
