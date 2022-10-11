import { FC, useState } from 'react';
import { useApiContext } from '../../context/api';
import Modal from '../organisms/modal';
import { InputFormControl } from '../molecules/formControls/inputFormControl';
import axios from 'axios';
import { uri } from '../../utils';
import note from '../molecules/note';

interface IProps {
	setOpen: (close: boolean) => void;
	open: boolean;
}

const EditNote_FORM_ID = 'EDITNOTE_FORM_ID';

const EditNoteModal: FC<IProps> = ({ setOpen, open }) => {
	const [inputDisabled, setInputDisabled] = useState(true);
	const [inputsShow, setInputsShow] = useState(false);
	const [background, setBackground] = useState('bg-transparent');
	// const [setContactDate] = useState(note?.date);
	// const [contactTitle, setContactTitle] = useState(note?.title);
	// const [contactDescription, setContactDescription] = useState(note?.description);
	const editHandler = () => {
		setInputDisabled(false);
		setInputsShow(true);
		setBackground('bg-gray-300');
	};
	const { postContactInfo } = useApiContext();
	const [error, setError] = useState<string[] | null>(null);
	const handleSubmit = async (event: any) => {
		setError(null);
		event.preventDefault();

		const formData = new FormData(e.currentTarget);
		const date = formData.get('date');
		const title = formData.get('title');
		const description = formData.get('description');
		const body = { date, title, description };
		await axios.put(uri(`notes`), body, {
			headers: {
				Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
			},
		});

		setNote({ ...body, id: note.id });
		setInputDisabled(true);
		setInputsShow(false);
		setBackground('bg-transparent');
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
					form: EditNote_FORM_ID,
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
			<form id={EditNote_FORM_ID} onSubmit={handleSubmit} className="relative w-full mt-6 space-y-8">
				<InputFormControl
					label={'Title'}
					inputProps={{
						type: 'string',
						placeholder: 'Title',
					}}
				/>
				<InputFormControl
					label={'Description'}
					inputProps={{
						type: 'string',
						placeholder: 'Description',
					}}
				/>
				<InputFormControl
					label={'Date'}
					inputProps={{
						type: 'date',
						placeholder: 'date',
					}}
				/>
			</form>
		</Modal>
	);
};

export default EditNoteModal;
function setInputsShow(arg0: boolean) {
	throw new Error('Something went wrong.');
}

function setNote(arg0: {
	id: any;
	date: FormDataEntryValue | null;
	title: FormDataEntryValue | null;
	description: FormDataEntryValue | null;
}) {
	throw new Error('Function not implemented.');
}
