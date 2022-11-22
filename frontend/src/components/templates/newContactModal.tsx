import { modalContactValidation } from '../../validation/addContactValidaion';
import { FC, useState } from 'react';
import { useApiContext } from '../../context/api';
import Modal from '../organisms/modal';
import { InputFormControl } from '../molecules/formControls/inputFormControl';
import { SelectFormControl } from '../molecules/formControls/selectFormControl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
	setOpen: (close: boolean) => void;
	open: boolean;
	setContact: any;
	fetchData: any;
	totalRows: number;
	perPage: number;
}

const ADDCONTACT_FORM_ID = 'ADDCONTACT_FORM_ID';

const NewContactModal: FC<IProps> = ({ setOpen, open, fetchData, totalRows, perPage }) => {
	const { postContactInfo } = useApiContext();
	const [error, setError] = useState<string[] | null>(null);
	const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

	const handleSubmit = async (event: any) => {
		setIsLoadingSubmit(true);
		setError(null);
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const name = formData.get('name')?.toString().toLowerCase();
		const phone = formData.get('phone-number');
		const email = formData.get('email')?.toString().toLowerCase();
		const status = formData.get('customer-status');
		const body = {
			name,
			phone,
			email,
			status,
		};
		try {
			await modalContactValidation.isValid(body);
			await postContactInfo(body);
			const pageNumber = Math.ceil((totalRows + 1) / perPage);
			await fetchData(pageNumber, perPage);
			setOpen(false);
			toast.success('Look, you have a new contact in your list!', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		} catch (err: any) {
			setError(err.response.data.message);
			toast.error('Something went wrong! ', {
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
				title={'New Contact'}
				actions={[
					{
						loading: isLoadingSubmit,
						label: 'Submit',
						type: 'submit',
						form: ADDCONTACT_FORM_ID,
					},
				]}>
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

export default NewContactModal;
