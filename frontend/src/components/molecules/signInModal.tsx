import { Button } from '../atoms/button';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backend } from '../../utils';
import { signInValidation } from '../../validation/userValidation';
interface ISignInModal {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignInModal: FC<ISignInModal> = ({ setOpen }) => {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const handleSubmit = async (event: any) => {
		event.preventDefault();
		setError(null);
		const formData = new FormData(event.currentTarget);

		const email = formData.get('email')?.toString().toLowerCase();
		const password = formData.get('password')?.toString().toLowerCase();

		const body = {
			email,
			password,
		};

		const isValid = await signInValidation.isValid({ email });
		if (isValid) {
			await axios.post(backend('auth/login'), body).then((response) => {
				const user = response.data;
				console.log(user);
				localStorage.setItem('access_token', user.access_token);
				setOpen(false);
				navigate(`/dashboard`);
			});
		} else {
			signInValidation.validate({ email }).catch((e) => {
				setError(e.message);
			});
		}
	};
	return (
		<div className="flex flex-col z-50 absolute items-start justify-center w-full px-10 pt-5 pb-20 lg:pt-20 lg:flex-row">
			<div className="relative z-10 w-full max-w-2xl mt-20 lg:mt-0 lg:w-5/12">
				<div className="relative z-10 flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl">
					<button
						className="cursor-pointer absolute top-0 right-0 mt-8 mr-8
                         text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out 
                         rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
						aria-label="close modal"
						role="button"
						onClick={() => setOpen(false)}>
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
					<h4 className="w-full text-4xl font-medium leading-snug">LogIn Form</h4>
					{error && <p>{error}</p>}
					<form onSubmit={handleSubmit} className="relative w-full mt-6 space-y-8">
						<div className="relative">
							<label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Email Address</label>
							<input
								name="email"
								type="text"
								className="block w-full px-4 py-3 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
								placeholder="XxX@email.com"
							/>
						</div>
						<div className="relative">
							<label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Password</label>
							<input
								name="password"
								type="password"
								className="block w-full px-4 py-3 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
								placeholder="pa@ssword"
							/>
						</div>
						<div className="relative">
							<Button
								type="submit"
								label="Submit"
								style="inline-block w-full px-5 py-4 text-xl font-medium text-center text-white transition duration-200 bg-gray-700 rounded-lg hover:bg-gray-900 ease"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignInModal;
