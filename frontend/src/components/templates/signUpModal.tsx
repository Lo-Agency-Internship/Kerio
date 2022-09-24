/* eslint-disable */
import { Button } from '../atoms/button';
import { modalUserValidation } from '../../validation/userValidation';
import { SetStateAction, useEffect, useState, FC } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { uri } from '../../utils';
import { kebab } from 'case';
import { useApiContext } from '../../context/api';
import Modal from '../organisms/modal';
import { FormControl } from '../molecules/formControl';

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
		if (registerSuccess) navigate('/dashboard');
	}, [registerSuccess]);

	const inputChanged = (e: any) => {
		setemailValue(e.target.value);
	};

	const checkEmail = async (emailValue: any) => {
		try {
			await axios.post(uri('auth/duplicateEmail'), { email: emailValue }).then((response) => {
				setError(response.data.message);
			});
		} catch (err: any) {
			setError(err.response.data.message);
		}
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		//setLoading(true);
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

		try {
			await modalUserValidation.validate(body);
			await postSignUp(body);

			setRegisterSuccess(true);
		} catch (e: any) {
			setError(e.message);
		}

		setLoading(false);
	};

	return (
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
				<FormControl label={'Name'} placeholder={'Your name'} />
				<FormControl label={'Organization Name'} placeholder={'Your organization name'}/>
				<FormControl label={'Email address'} placeholder={'Your email address'} inputProps={{
					value: emailValue,
					onChange: inputChanged,
					type: 'email',
				}}/>
				<FormControl label={'Password'} placeholder={'Your password'} inputProps={{
					type: 'password',
				}}/>
				<FormControl label={'Repeat Password'} placeholder={'Repeat the previous password'} inputProps={{
					type: 'password',
				}}/>
			</form>
		</Modal>
	);
};
export default SignUpModal;
