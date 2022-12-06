import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInValidation } from '../../validation/userValidation';
import { useApiContext } from '../../context/api';
import { InputFormControl } from '../molecules/formControls/inputFormControl';
import Modal from '../organisms/modal';

interface IProps {
	setOpen: (close: boolean) => void;
	open: boolean;
}

const SIGNIN_FORM_ID = 'SIGNIN_FORM_ID';

const SignInModal: FC<IProps> = ({ setOpen, open }) => {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const { postLogin } = useApiContext();
	const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

	const handleSubmit = async (event: any) => {
		setIsLoadingSubmit(true);
		event.preventDefault();
		setError(null);
		const formData = new FormData(event.currentTarget);
		const email = formData.get('email-address')?.toString().toLowerCase();
		const password = formData.get('password')?.toString().toLowerCase();
		const body = {
			email,
			password,
		};

		try {
			await signInValidation.validate({ email });
			await postLogin(body);
			setOpen(false);
			navigate(`/`);
		} catch (err: any) {
			setError(err.message);
			if (err.response) setError(err.response.data.message);
		}
		setIsLoadingSubmit(false);
	};

	return (
		<>
			<Modal
				show={open}
				onClose={() => setOpen(false)}
				title={'SignIn Form'}
				actions={[
					{
						loading: isLoadingSubmit,
						label: 'Submit',
						type: 'submit',
						form: SIGNIN_FORM_ID,
					},
				]}>
				{error && <p className="text-red-500">{error}</p>}
				<form id={SIGNIN_FORM_ID} onSubmit={handleSubmit} className="relative w-full mt-6 space-y-8">
					<InputFormControl
						label={'Email address'}
						inputProps={{
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
				</form>
			</Modal>
		</>
	);
};

export default SignInModal;
