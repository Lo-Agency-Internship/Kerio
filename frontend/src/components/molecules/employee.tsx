import { useEffect, useState } from 'react';
import { useApiContext } from '../../context/api';
import { Button } from '../atoms/button';
import { Input } from '../atoms/input';

export default function Employee({ user, setUser }: any) {
	const [inputsShow, setInputsShow] = useState(false);
	const [inputDisabled, setInputDisabled] = useState(true);
	const [selectBoxValue, setSelectBoxValue] = useState<string | null>(null);
	const [background, setBackground] = useState('bg-transparent');
	const { updateContactInfo } = useApiContext();

	useEffect(() => {
		setUser(user);
		if (user) {
			setSelectBoxValue(user.status);
		}
	}, [user]);
	// after click it we can see 2 new buttons ( yes & no)
	const editHandler = () => {
		setInputDisabled(false);
		setInputsShow(true);
		setBackground('bg-gray-300');
	};

	//	A bug in this part we will fix it later
	const cancelHandler = () => {
		setInputDisabled(true);
		setInputsShow(false);
		setUser(user);
		setBackground('bg-transparent');
	};

	const submitHandler = async (e: any) => {
		e.preventDefault();
		setSelectBoxValue(null);
		const formData = new FormData(e.currentTarget);
		const name = formData.get('name');
		const email = formData.get('email');
		const body = { name, email };
		await updateContactInfo(user.id, body);
		setUser({ ...body, id: user.id });
		setInputDisabled(true);
		setInputsShow(false);
		setBackground('bg-transparent');
	};
	return (
		<>
			<div className="flex justify-center justify-items-center my-4  w-full p-10">
				<div className="flex w-full mx-8  p-4 bg-gray-200 rounded-lg hover:shadow-xl ">
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
								/>
							</div>
							{/* show and hide buttons */}
							<div className="mt-16">
								{inputsShow ? (
									<>
										<Button
											label="No"
											style="focus:outline-none mx-3 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
											onClick={cancelHandler}
											type="submit"
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
										style="focus:outline-none mx-3 text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
										onClick={editHandler}
										type="button"
									/>
								)}
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
