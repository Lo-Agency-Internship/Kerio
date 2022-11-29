import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../components/atoms/button';
import { InputFormControl } from '../components/molecules/formControls/inputFormControl';
import { uri } from '../utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { inviteValidation } from '../validation/inviteValidation';

export default function Invite() {
	const [error, setError] = useState<string | null>(null);
	const [message, setMessage] = useState<boolean>(false);
	const [response, setResponse] = useState<any>();
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');

	const submitHandler = async (event: any) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const name = formData.get('name')?.toString().toLowerCase();
		const password = formData.get('password');
		const rePassword = formData.get('repassword');

		if (password !== rePassword) {
			setError('password do not matched');
			return;
		}
		const body = {
			name,
			password,
		};

		try {
			await inviteValidation.validate(body);
			await axios.post(uri(`invites/${token}`), body);
			toast.success('Thanks for the registration. Please check your email!', {
				position: 'top-center',
				autoClose: 8000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		} catch (err: any) {
			setError(err.response.data.message);
			toast.error('Something went wrong! :((', {
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
	};
	const active = async () => {
		try {
			const data = await axios.get(uri(`invites/${token}`));
			const email = data.data.email;

			setResponse(email);
			setMessage(true);
		} catch (err: any) {
			setError(err.response.data.message);
			toast.error('Something went wrong! :((', {
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
	};
	useEffect(() => {
		active();
	}, []);
	return (
		<>
			{message ? (
				<div className="flex flex-col absolute w-5/6 h-4/5  bg-white rounded-lg shadow-lg overflow-hidden md:flex-row my-16 justify-center top-12 right-32 left-20 mt-2 mr-12">
					<div className="md:flex items-center justify-center md:w-1/2 md:bg-gray-800">
						<div className="py-9 px-14 md:py-0">
							<h3 className="text-gray-700 font-bold md:text-gray-100 text-3xl ml-2">Welcome</h3>
							<h1 className="my-4 font-semibold text-5xl md:text-gray-100 ">We are Kerio</h1>
							<p className="text-sm opacity-75  md:text-gray-100">All Rights Reserved to Lo Agency</p>

							<h4 className=" text-gray-600 md:text-gray-400 font-bold mt-16 top-2">
								You are invited by your manager. Please fill up the form and click submit.
							</h4>
						</div>
					</div>
					<div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2 md:border-b-8 border-gray-700">
						<form onSubmit={submitHandler} className="relative w-full mt-1 space-y-6 px-8 py-1">
							<h4 className="w-full text-4xl font-bold items-center justify-center ">Registration Form</h4>
							<div className="relative ">
								<InputFormControl
									label="Name"
									inputProps={{
										className:
											'block w-11/12 px-3 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black',
										placeholder: 'Mark',
										type: 'text',
									}}
								/>
							</div>
							<div className="relative">
								<InputFormControl
									label="Email Address"
									inputProps={{
										className:
											'block w-11/12 px-3 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black',
										disabled: true,
										type: 'email',
										defaultValue: response,
									}}
								/>
							</div>
							<div className="relative">
								<InputFormControl
									label="Password"
									inputProps={{
										className:
											'block w-11/12 px-3 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black',
										type: 'password',
										placeholder: 'password',
									}}
								/>
							</div>
							<div className="relative">
								<InputFormControl
									label="repassword"
									inputProps={{
										className:
											'block w-11/12 px-3 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black',
										type: 'password',
										placeholder: 'password',
									}}
								/>
							</div>
							<div className="relative">
								<Button
									type="submit"
									label="submit"
									style="inline-block w-11/12 px-4 py-3 text-xl font-medium text-center text-white transition duration-200 bg-gray-500 rounded-lg hover:bg-gray-900 ease"
								/>
								{error && <p className="text-red-500 justify-items-end mt-4 ml-40 flex">{error}</p>}
							</div>
						</form>
					</div>
				</div>
			) : (
				<>{error && <p className="text-red-700 font-bold">{error}</p>}</>
			)}
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
}
