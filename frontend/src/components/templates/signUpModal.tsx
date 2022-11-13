/* eslint-disable */
import { modalUserValidation } from '../../validation/userValidation';
import { useEffect, useState, FC } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { uri } from '../../utils';
import { kebab } from 'case';
import { useApiContext } from '../../context/api';
import Modal from '../organisms/modal';
import { InputFormControl } from '../molecules/formControls/inputFormControl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SIGNUP_FORM_ID = 'SIGNUP_FORM_ID';

interface IProps {
	setOpen: (close: boolean) => void;
	open: boolean;
}
const SignUpModal: FC<IProps> = ({ setOpen, open }) => {
	const { postSignUp } = useApiContext();
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [emailValue, setemailValue] = useState('');
	const [loading, setLoading] = useState<boolean>(false);
	const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);

	useEffect(() => {
		if (emailValue !== '') {
			const timeoutId = setTimeout(() => checkEmail(emailValue), 3000);
			return () => clearTimeout(timeoutId);
		}
	}, [emailValue]);

	useEffect(() => {
		if (registerSuccess) navigate('/');
	}, [registerSuccess]);

	const inputChanged = (e: any) => {
		setemailValue(e.target.value);
	};

	const checkEmail = async (emailValue: any) => {
		try {
			await axios.post(uri('auth/duplicateEmail'), { email: emailValue }).then((response) => {
				setError('');
			});
		} catch (err: any) {
			setError(err.response.data.message);
		}
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		setError(null);

		const formData = new FormData(event.currentTarget);
		const name = formData.get('name')?.toString().toLowerCase();
		const email = formData.get('email-address')?.toString().toLowerCase();
		const password = formData.get('password')?.toString();
		const rePassword = formData.get('repeat-password')?.toString();
		const organizationName = formData.get('organization-name');

		if (password !== rePassword) {
			setError('passwords do not matched');
			return;
		}

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
		console.log(body);
		try {
			setRegisterSuccess(true);
			await modalUserValidation.validate(body);
			await postSignUp(body);
			toast.success('Registration has been successful!', {
				position: 'top-center',
				autoClose: 8000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		} catch (e: any) {
			setError(e.message);
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

		setLoading(false);
	};

	return (
		<>
			<Modal
				show={open}
				onClose={() => setOpen(false)}
				title={'SignUp Form'}
				actions={[
					{
						label: 'Submit',
						type: 'submit',
						form: SIGNUP_FORM_ID,
						loading,
						success: registerSuccess,
					},
				]}>
				{error && <p className="text-red-500">{error}</p>}
				<form id={SIGNUP_FORM_ID} onSubmit={handleSubmit} className="relative w-full mt-6 space-y-8">
					<InputFormControl
						label={'Name'}
						inputProps={{
							type: 'string',
							placeholder: 'Your name',
						}}
					/>
					<InputFormControl
						label={'Organization Name'}
						inputProps={{
							type: 'string',
							placeholder: 'Your organization name',
						}}
					/>
					<InputFormControl
						label={'Email address'}
						inputProps={{
							value: emailValue,
							onChange: inputChanged,
							type: 'email',
							placeholder: 'Your email address',
						}}
					/>
					<InputFormControl
						label={'Password'}
						inputProps={{
							type: 'password',
							placeholder: 'Your password',
						}}
					/>
					<InputFormControl
						label={'Repeat Password'}
						inputProps={{
							type: 'password',
							placeholder: 'Repeat the previous password',
						}}
					/>
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
export default SignUpModal;
