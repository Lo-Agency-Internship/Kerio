import { useState } from 'react';
import { Button } from '../atoms/button';
import { Input } from '../atoms/input';
export default function Profile({ user, setUser }: any) {
	const [inputsShow, setInputsShow] = useState(false);
	const [inputDisabled, setInputDisabled] = useState(true);

	const editHandler = () => {
		setInputDisabled(false);
		setInputsShow(true);
	};
	const cancelHandler = () => {
		setInputDisabled(true);
		setInputsShow(false);
		setUser(user);
	};

	const submitHandler = (e: any) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const name = formData.get('name');
		const email = formData.get('email');
		const phone = formData.get('phone');
		const status = formData.get('status');
		const updatedUser = { name, email, phone, status };
		setUser(updatedUser);
		setInputDisabled(true);
		setInputsShow(false);
	};

	return (
		<>
			<div className="flex justify-start my-24  w-full p-10">
				<div className="flex w-full mx-8  p-4 bg-gray-500 rounded-lg hover:shadow-xl ">
					<form onSubmit={submitHandler}>
						<div className="flex justify-start  flex-row flex-wrap">
							<div className="m-3 pt-0 hover:shadow-md rounded-lg hover:bg-gray-400">
								<label className="mx-2" htmlFor="name">
									Name:
								</label>
								<Input
									disabled={inputDisabled}
									type={'text'}
									id={'name'}
									defaultValue={user?.name}
									name="name"
									className={'bg-transparent'}
								/>
							</div>

							<div className="m-3 pt-0 hover:shadow-md rounded-lg hover:bg-gray-400">
								<label className="mx-2" htmlFor="email">
									Email:
								</label>
								<Input
									disabled={inputDisabled}
									type={'text'}
									id={'email'}
									defaultValue={user?.email}
									name="email"
									className={
										'px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-transparent rounded text-sm outline-none focus:outline-none focus:shadow-outline'
									}
								/>
							</div>

							<div className="m-3 pt-0 hover:shadow-md rounded-lg hover:bg-gray-400">
								<label className="mx-2" htmlFor="phone">
									Phone:
								</label>
								<Input
									disabled={inputDisabled}
									type={'text'}
									id={'phone'}
									defaultValue={user?.phone}
									name="phone"
									className={
										'px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-transparent rounded text-sm outline-none focus:outline-none focus:shadow-outline'
									}
								/>
							</div>

							<div className="m-3 pt-0 hover:shadow-md rounded-lg hover:bg-gray-400">
								<label className="mx-2" htmlFor="status">
									Status :
								</label>
								<select
									disabled={inputDisabled}
									name="status"
									className="status px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-transparent rounded text-sm outline-none focus:outline-none focus:shadow-outline"
									defaultValue={user?.status}
									id="customerStatus">
									<option value="lead">Lead</option>
									<option value="lostLoyal">Lost Loyal</option>
									<option value="potenial">Potential Customer</option>
									<option value="lostPotenial">Lost Potential Customer</option>
									<option value="lostLoyal">Lost Loyal Customer</option>
									<option value="loyal">Loyal Customer</option>
								</select>
							</div>
						</div>
						<div className="mt-16">
							{inputsShow ? (
								<>
									<Button
										label="No"
										style="focus:outline-none mx-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
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
									style="focus:outline-none mx-3 text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
									onClick={editHandler}
									type="button"
								/>
							)}
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
