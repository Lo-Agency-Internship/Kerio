import { modalNoteValidation } from '../../validation/addNoteModalValidation';
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

const ADDNOTE_FORM_ID = 'ADDNOTE_FORM_ID';

const NewNoteModal: FC<IProps> = ({ setOpen, open }) => {
	// const { id } = useParams();
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
		const body = {
			title,
			description,
			date,
		};
		try {
			await modalNoteValidation.isValid(body);
			await postNoteInfo(body);
			setOpen(false);
			setChange(!change);
			navigate('/contacts:id');
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
			<form id={ADDNOTE_FORM_ID} onSubmit={handleSubmit} className="relative w-full mt-6 space-y-8">
				<InputFormControl
					label={'Title'}
					inputProps={{
						type: 'string',
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
						type: 'email',
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
			</form>
		</Modal>
	);
};

export default NewNoteModal;
