import { modalNoteValidation } from '../../validation/addNoteModalValidation';
import { FC, useState } from 'react';
import { useApiContext } from '../../context/api';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../organisms/modal';
import { InputFormControl } from '../molecules/formControls/inputFormControl';
import { SelectFormControl } from '../molecules/formControls/selectFormControl';

interface IProps {
	setOpen: (close: boolean) => void;
	open: boolean;
}

const ADDNOTE_FORM_ID = 'ADDNOTE_FORM_ID';

const NewNoteModal: FC<IProps> = ({ setOpen, open }) => {
	const { id } = useParams();
	const { change, setChange, postNoteInfo } = useApiContext();
	const navigate = useNavigate();
	const [error, setError] = useState<string[] | null>(null);
	const handleSubmit = async (event: any) => {
		setError(null);
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const title = formData.get('title')?.toString().toLowerCase();
		const description = formData.get('description');
		const date = formData.get('date');
		const status = formData.get('status');
		const score = formData.get('score');
		const body = {
			title,
			description,
			date,
			status,
			score,
		};
		console.log(body);
		try {
			await modalNoteValidation.isValid(body);
			await postNoteInfo(body, id);
			setOpen(false);
			setChange(!change);
		} catch (err: any) {
			setError(err.response.data.message);
		}
	};

	return (
		<Modal
			show={open}
			onClose={() => setOpen(false)}
			title={'New Note'}
			actions={[
				{
					label: 'Submit',
					type: 'submit',
					form: ADDNOTE_FORM_ID,
				},
			]}>
			{/* {error && <p>{error}</p>} */}
			<p>{error}</p>
			<form id={ADDNOTE_FORM_ID} onSubmit={handleSubmit} className="relative w-full mt-6 space-y-8">
				<InputFormControl
					label={'Title'}
					inputProps={{
						type: 'text',
						placeholder: 'Title of your note',
					}}
				/>
				<InputFormControl
					label={'Date'}
					inputProps={{
						type: 'date',
						placeholder: 'Date',
					}}
				/>
				<InputFormControl
					label={'Description'}
					inputProps={{
						type: 'text',
						placeholder: 'Description',
					}}
				/>
				<SelectFormControl
					label={'Score'}
					iSelectProps={{
						iOptionProps: [
							{
								title: '+1',
								value: '+1',
							},
							{
								title: '-1',
								value: '-1',
							},
							{
								title: '0',
								value: '0',
							},
						],
					}}
				/>
				<SelectFormControl
					label={'Status'}
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

export default NewNoteModal;
