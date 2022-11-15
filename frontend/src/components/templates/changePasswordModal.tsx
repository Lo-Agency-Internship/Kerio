import { FC, useState } from 'react';
import { changePasswordValidation } from '../../validation/changePasswordValidation';
import { InputFormControl } from '../molecules/formControls/inputFormControl';
import Modal from '../organisms/modal';

interface IProps {
	setOpen: (close: boolean) => void;
	open: boolean;
}

const ChangePassword = 'ChangePassword';

const ChangePasswordModal: FC<IProps> = ({ setOpen, open }) => {
	const [error, setError] = useState<string | null>(null);
	const [Isloading, setIsLoading] = useState<boolean>(false);

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		setError(null);
		const formData = new FormData(event.currentTarget);
		const oldPassword = formData.get('oldPassword')?.toString().toLowerCase();
		const newPassword = formData.get('newPassword')?.toString().toLowerCase();
		const body = {
			oldPassword,
			newPassword,
		};

		try {
			await changePasswordValidation.isValid({ oldPassword });
			setOpen(false);
		} catch (err: any) {
			setError(err.response.data.message);
		}
	};

	return (
		<Modal
			show={open}
			onClose={() => setOpen(false)}
			title={'Change password'}
			actions={[
				{
					label: 'Submit',
					type: 'submit',
					form: ChangePassword,
				},
			]}>
			{error && <p className="text-red-500">{error}</p>}
			<form id={ChangePassword} onSubmit={handleSubmit} className="relative w-full mt-6 space-y-8">
				<InputFormControl
					label={'Old password'}
					inputProps={{
						type: 'password',
						placeholder: 'Your Old password',
					}}
				/>
				<InputFormControl
					label={'New password'}
					inputProps={{
						type: 'password',
						placeholder: 'Your new password',
					}}
				/>
				<InputFormControl
					label={'Confirm new password'}
					inputProps={{
						type: 'password',
						placeholder: 'Confirm your new password',
					}}
				/>
			</form>
		</Modal>
	);
};

export default ChangePasswordModal;
