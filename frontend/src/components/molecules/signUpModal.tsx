import { Button } from '../atoms/button';
import { modalUserValidation } from '../../validation/userValidation';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { uri } from '../../utils';
import { kebab } from 'case';

function SignUpModal({ setOpen }: any) {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const handleSubmit = async (event: any) => {
		event.preventDefault();
		setError(null);

		const formData = new FormData(event.currentTarget);
		const name = formData.get('name')?.toString().toLowerCase();
		const email = formData.get('email')?.toString().toLowerCase();
		const password = formData.get('password')?.toString().toLowerCase();
		const organizationName = formData.get('organizationName');
		let organizationSlug;
		if (organizationName === '') {
			organizationSlug = kebab(`${name}'s Organization`);
		} else {
			organizationSlug = kebab(organizationName as string);
		}
		const body = {
			name,
			email,
			password,
			organizationSlug,
		};

		const isValid = await modalUserValidation.isValid(body);
		if (isValid) {
			try {
				await axios.post(uri('auth/register'), body).then((response) => {
					if (response.status === 201) {
						alert('Successful signUp! Please signIn');
						navigate('/');
						setOpen(false);
					}
				});
			} catch (err) {
				if (err) {
					setError('This email has been chosen before!');
				} else {
					setError('Something went wrong!');
				}
			}
		} else {
			modalUserValidation.validate(body).catch((e) => {
				setError(e.message);
			});
		}
	};
	return (
		// <!--  // modal starts here component -->
		<div className="absolute flex flex-col z-50 items-center justify-center w-full px-20 pt-5 pb-30 lg:pt-18 lg:flex-row top-0 right-0 bottom-0 left-0">
			<div className="relative z-10 w-full max-w-2xl mt-20 lg:mt-0 lg:w-6/12">
				<div className="relative z-10 flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl">
					<button
						className="cursor-pointer absolute top-0 right-0 mt-8 mr-8
                         text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out 
                         rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
						onClick={() => setOpen(false)}
						aria-label="close modal"
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
					<h4 className="w-full text-4xl font-medium leading-snug">SignUp Form</h4>
					{error && <p>{error}</p>}
					<form onSubmit={handleSubmit} className="relative w-full mt-6 space-y-8">
						<div className="relative">
							<label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Name</label>
							<input
								name="name"
								className="block w-full px-3 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
								placeholder="Aien Saeedi"
							/>
						</div>
						<div className="relative">
							<label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Organization Name</label>
							<input
								name="organizationName"
								className="block w-full px-3 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
								placeholder="Lo Agency"
							/>
						</div>
						<div className="relative">
							<label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Email Address</label>
							<input
								name="email"
								type="email"
								className="block w-full px-3 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
								placeholder="XxX@email.com"
							/>
						</div>
						<div className="relative">
							<label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Password</label>
							<input
								name="password"
								type="password"
								className="block w-full px-3 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
								placeholder="pa@ssword"
							/>
						</div>
						<div className="relative">
							<label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">re-Password</label>
							<input
								name="rePassword"
								type="password"
								className="block w-full px-3 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
								placeholder="pa@ssword"
							/>
						</div>
						<div className="relative">
							<Button
								type="submit"
								label="submit"
								style="inline-block w-full px-4 py-3 text-xl font-medium text-center text-white transition duration-200 bg-gray-500 rounded-lg hover:bg-gray-900 ease"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
export default SignUpModal;
