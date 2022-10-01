import { modalContactValidation } from '../../validation/addContactValidaion';
import { FC, useState } from 'react';
import { useApiContext } from '../../context/api';
import { useNavigate } from 'react-router-dom';
import Modal from '../organisms/modal';
import { InputFormControl } from '../molecules/formControls/inputFormControl';
import { SelectFormControl } from '../molecules/formControls/selectFormControl';

interface IProps {
	setOpen: (close: boolean) => void;
	open: boolean;
}

const ADDCONTACT_FORM_ID = 'ADDCONTACT_FORM_ID';

const NewContactModal: FC<IProps> = ({ setOpen, open }) => {
	const { change, setChange, postContactInfo } = useApiContext();
	const navigate = useNavigate();
	const [error, setError] = useState<string[] | null>(null);
	const handleSubmit = async (event: any) => {
		setError(null);
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const name = formData.get('name')?.toString().toLowerCase();
		const phone = formData.get('phone-number');
		const email = formData.get('email')?.toString().toLowerCase();
		const status = formData.get('status');
		const body = {
			name,
			phone,
			email,
			status,
		};
		try {
			await modalContactValidation.isValid(body);
			await postContactInfo(body);
			setOpen(false);
			setChange(!change);
			navigate('/contacts');
		} catch (err: any) {
			setError(err.response.data.message);
		}
	};

	return (
		<Modal
			show={open}
			onClose={() => setOpen(false)}
			title={'New Contact'}
			actions={[
				{
					label: 'Submit',
					type: 'submit',
					form: ADDCONTACT_FORM_ID,
				},
			]}>
			{error && (
				<p>
					{error.map((element, index) => (
						<p className="text-red-500 block" key={index}>
							{element}
							<br />
						</p>
					))}
				</p>
			)}
			<form id={ADDCONTACT_FORM_ID} onSubmit={handleSubmit} className="relative w-full mt-6 space-y-8">
				<InputFormControl
					label={'Name'}
					inputProps={{
						type: 'string',
						placeholder: 'Name',
					}}
				/>
				<InputFormControl
					label={'Phone Number'}
					inputProps={{
						type: 'string',
						placeholder: 'Phone',
					}}
				/>
				<InputFormControl
					label={'Email'}
					inputProps={{
						type: 'email',
						placeholder: 'Email',
					}}
				/>

				<SelectFormControl
					label={'Customer Status'}
					iSelectProps={{
						iOptionProps: [
							{
								title: 'Lead',
								value: 'Lead',
							},
							{
								title: 'PotentialCustomer',
								value: 'PotentialCustomer',
							},
							{
								title: 'LostPotentialCustomer',
								value: 'LostPotentialCustomer',
							},
							{
								title: 'LostLoyalCustomer',
								value: 'LostLoyalCustomer',
							},
							{
								title: 'LoyalCustomer',
								value: 'LoyalCustomer',
							},
						],
					}}
				/>
			</form>
		</Modal>
	);
};

export default NewContactModal;
