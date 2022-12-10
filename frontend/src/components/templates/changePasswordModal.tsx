import { FC, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { changePasswordValidation } from '../../validation/changePasswordValidation';
import { InputFormControl } from '../molecules/formControls/inputFormControl';
import Modal from '../organisms/modal';
import { useApiContext } from '../../context/api';
import { useAuthContext } from '../../context/auth';

interface IProps {
	setOpen: (close: boolean) => void;
	open: boolean;
}

const ChangePassword = 'ChangePassword';

const ChangePasswordModal: FC<IProps> = ({ setOpen, open }) => {
	const [error, setError] = useState<string | null>(null);
	const { userMetadata } = useAuthContext();
	const { name: usersName, email: usersEmail, sub } = userMetadata();
	const { updateUserInfo } = useApiContext();
	const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

	const handleSubmit = async (event: any) => {
		setIsLoadingSubmit(true);
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const oldPassword = formData.get('old-password');
		const newPassword = formData.get('new-password');
		const reNewPassword = formData.get('confirm-new-password');
		if (newPassword !== reNewPassword) {
			setError('new password is not match');
			return;
		}
		const body = {
			oldPassword,
			newPassword,
		};

		try {
			await changePasswordValidation.validate({ newPassword });
			await updateUserInfo(sub, body);
			setOpen(false);
			toast.success('Your password has been changes successfully!', {
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
			setError(err.message);
			setError(err?.response?.data?.message);
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
		setIsLoadingSubmit(false);
	};

	return (
		<>
			<Modal
				show={open}
				onClose={() => setOpen(false)}
				title={'Change password'}
				actions={[
					{
						loading: isLoadingSubmit,
						label: 'Submit',
						type: 'submit',
						form: ChangePassword,
					},
				]}>
				{error && <p className="text-red-500">{error}</p>}
				<form id={ChangePassword} onSubmit={handleSubmit} className="relative w-full mt-6 space-y-8">
					<InputFormControl
						label="Old password"
						inputProps={{
							type: 'password',
							placeholder: 'Your Old password',
						}}
					/>
					<InputFormControl
						label="New password"
						inputProps={{
							type: 'password',
							placeholder: 'Your new password',
						}}
					/>
					<InputFormControl
						label="Confirm new password"
						inputProps={{
							type: 'password',
							placeholder: 'Confirm your new password',
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

export default ChangePasswordModal;
