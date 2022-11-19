import { FC, useState } from 'react';
import Modal from '../organisms/modal';
import { INote } from '../../utils/interfaces/user/note.interface';
import { Button } from '../atoms/button';
import SubmitDelete from '../molecules/submitDelete';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { useApiContext } from '../../context/api';
import { InputFormControl } from '../molecules/formControls/inputFormControl';
import DeleteModal from '../molecules/deleteModal';

interface IProps {
	setNote: (note: INote) => void;
	open: boolean;
	note: any;
	setOpen: (open: boolean) => void;
	setNotes: any;
}

const EditNoteFormID = 'EditNoteFORMID';

const EditNoteModal: FC<IProps> = ({ open, note, setOpen, setNote, setNotes }) => {
	const { updateContactNoteById, deleteNote, getAllNotes } = useApiContext();
	const params = useParams();
	const [error, setError] = useState<string[] | null>(null);
	const [inputDisabled, setInputDisabled] = useState(true);
	const [inputsShow, setInputsShow] = useState(false);
	const [background, setBackground] = useState('bg-transparent');
	const [contactDate, setContactDate] = useState(note?.date);
	const [contactTitle, setContactTitle] = useState(note?.title);
	const [contactDescription, setContactDescription] = useState(note?.description);
	const [contactScore, setContactScore] = useState(note?.score);
	const [handleType, setHandleType] = useState<string>('text');
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const editHandler = () => {
		setInputDisabled(false);
		setInputsShow(true);
		setHandleType('date');
		setBackground('bg-gray-300');
	};
	const [showsubmitDelete, setShowsubmitDelete] = useState(false);
	const cancelHandler = () => {
		setInputDisabled(true);
		setInputsShow(false);
		setNote(note);
		setHandleType('text');
		setBackground('bg-transparent');
		setContactDate(note?.date);
		setContactDescription(note?.description);
		setContactTitle(note?.title);
	};

	const submitHandler = async (e: any) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const date = contactDate;
		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const score = formData.get('score') as string;
		const status = formData.get('status') as string;

		const body = { date, title, description, score, status };

		try {
			await updateContactNoteById({
				date: body.date,
				description: body.description,
				id: params.id,
				score: body.score,
				status: body.status,
				title: body.title,
			});
			setNote({ ...body, id: params.id as string });
			setInputDisabled(true);
			setInputsShow(false);
			setBackground('bg-transparent');
		} catch (err: any) {
			setError(err.response.data.message);
		}
	};

	const handleDelete = async () => {
		try {
			await deleteNote({ id: note.id });
			const dataa = await getAllNotes({ id: params.id as string });
			console.log(dataa, params.id);
			setNotes(dataa.notes);
		} catch (err: any) {
			setError(err.response.data.message);
		}
		setShowDeleteModal(false);
		setOpen(false);
	};
	return (
		<>
			<DeleteModal
				open={showDeleteModal}
				setOpen={setShowDeleteModal}
				title={'Delete Modal'}
				handleDelete={handleDelete}>
				<p>are U sure that delete this note ?</p>
			</DeleteModal>
			<Modal show={open} onClose={() => setOpen(false)} title={'Edit Note'}>
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
				{showsubmitDelete && <SubmitDelete setOpen={setShowsubmitDelete} note={note} />}
				<form id={EditNoteFormID} onSubmit={submitHandler} className="relative w-full mt-6 space-y-8">
					<InputFormControl
						label={'Date'}
						inputProps={{
							type: handleType,
							placeholder: 'Date',
							defaultValue: format(new Date(contactDate as string), 'dd/MM/yyyy'),
							className: background,
							onChange: (e) => {
								e.preventDefault();
								setContactDate(e.target.value);
							},
							disabled: inputDisabled,
						}}
					/>
					<InputFormControl
						label={'title'}
						inputProps={{
							type: 'text',
							placeholder: 'Title',
							defaultValue: note?.title,
							className: background,
							onChange: (e) => setContactTitle(e.target.value),
							value: contactTitle,
							disabled: inputDisabled,
						}}
					/>
					<InputFormControl
						label={'Description'}
						inputProps={{
							type: 'text',
							placeholder: 'Description',
							defaultValue: note?.description,
							className: `text-gray-600 focus:outline-none font-normal w-full h-24 flex items-center pl-3 text-sm ${background}`,
							onChange: (e) => setContactDescription(e.target.value),
							value: contactDescription,
							disabled: inputDisabled,
						}}
					/>
					<InputFormControl
						label={'Score'}
						inputProps={{
							type: 'text',
							placeholder: 'Score',
							defaultValue: note?.score,
							className: background,
							onChange: (e) => setContactScore(e.target.value),
							value: contactScore,
							disabled: inputDisabled,
						}}
					/>
					<div className="flex items-center justify-start w-full">
						<Button
							label="Delete"
							style="focus:outline-none mx-3 text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-red-900"
							type="button"
							onClick={() => setShowDeleteModal(true)}
						/>

						<button
							className="focus:outline-none mx-3 text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-gray-900"
							type="button"
							onClick={() => setOpen(false)}>
							Cancel
						</button>
						{inputsShow ? (
							<>
								<Button
									label="No"
									style="focus:outline-none mx-3 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
									onClick={cancelHandler}
									type="reset"
								/>
								<Button
									label="Yes"
									style="focus:outline-none mx-3 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
									type="submit"
								/>
							</>
						) : (
							<Button
								label="Edit"
								style="focus:outline-none mx-3 text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
								onClick={editHandler}
								type="button"
							/>
						)}
					</div>
				</form>
			</Modal>
		</>
	);
};
export default EditNoteModal;
