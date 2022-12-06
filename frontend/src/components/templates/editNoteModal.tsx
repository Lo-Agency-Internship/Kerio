import { FC, useState } from 'react';
import Modal from '../organisms/modal';
import { INote } from '../../utils/interfaces/user/note.interface';
import { Button } from '../atoms/button';
import { modalNoteValidation } from '../../validation/addNoteModalValidation';
import { InputFormControl } from '../molecules/formControls/inputFormControl';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { useApiContext } from '../../context/api';
import DeleteModal from '../molecules/deleteModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SelectFormControl } from '../molecules/formControls/selectFormControl';
interface IProps {
	setNote: (note: INote) => void;
	open: boolean;
	note: any;
	setOpen: (open: boolean) => void;
	setNotes: any;
	statuses: any;
}

const EditNoteFormID = 'EditNoteFORMID';

const EditNoteModal: FC<IProps> = ({ open, note, setOpen, setNote, setNotes, statuses }) => {
	const { updateContactNoteById, deleteNote, getAllNotes } = useApiContext();
	const params = useParams();
	const [error, setError] = useState<string[] | null | boolean>(null);
	const [inputDisabled, setInputDisabled] = useState(true);
	const [inputsShow, setInputsShow] = useState(false);
	const [background, setBackground] = useState('bg-transparent');
	const [contactDate, setContactDate] = useState(note?.date);
	const [contactTitle, setContactTitle] = useState(note?.title);
	const [contactDescription, setContactDescription] = useState(note?.description);
	const [contactScore, setContactScore] = useState(note?.score);
	const [handleType, setHandleType] = useState<string>('text');
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

	const editHandler = () => {
		setInputDisabled(false);
		setInputsShow(true);
		setHandleType('date');
		setBackground('bg-gray-300');
	};
	const cancelHandler = () => {
		setInputDisabled(true);
		setInputsShow(false);
		setNote(note);
		setHandleType('text');
		setBackground('bg-transparent');
		setContactDate(note?.date);
		setContactDescription(note?.description);
		setContactTitle(note?.title);
		setContactScore(note?.score);
		setError(!error);
	};
	const submitHandler = async (e: any) => {
		e.preventDefault();
		setIsLoadingSubmit(true);
		const formData = new FormData(e.currentTarget);
		const date = contactDate;
		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const score = formData.get('score') as string;
		let body;
		if (score === '') {
			body = { title, description, date, score: null };
		} else {
			body = {
				title,
				description,
				date,
				score,
			};
		}

		try {
			await modalNoteValidation.validate(body);
			await updateContactNoteById({
				date: body.date,
				description: body.description,
				id: note.id,
				score: body.score,
				title: body.title,
			});
			setNote({ ...body, id: params.id as string });
			setInputDisabled(true);
			setInputsShow(false);
			setOpen(false);
			setBackground('bg-transparent border-2');
			setIsLoadingSubmit(false);
			toast.success('Your note has been changed!', {
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
			setError(err.message);
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
	};

	const handleDelete = async () => {
		setIsLoadingSubmit(true);
		try {
			await deleteNote({ id: note.id });
			// const dataa = await getAllNotes({ id: params.id as string });
			// setNotes(dataa.notes);
			setIsLoadingSubmit(false);
			toast.success(
				<p>
					<span className="text-rose-500">{note.title} </span>Deleted!
				</p>,
				{
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				},
			);
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
		setShowDeleteModal(false);
		setOpen(false);
	};
	return (
		<>
			<Modal show={open} onClose={() => setOpen(false)} title={'Edit Note'}>
				{showDeleteModal && (
					<DeleteModal
						open={showDeleteModal}
						setOpen={setShowDeleteModal}
						title={'Delete Modal'}
						handleDelete={handleDelete}
						loading={isLoadingSubmit}>
						{<p>Are you sure that you want Delete these contacts ?</p>}
					</DeleteModal>
				)}
				{error && <p className="text-red-500">{error}</p>}
				<form id={EditNoteFormID} onSubmit={submitHandler} className="relative w-full mt-10 space-y-8">
					<InputFormControl
						label={'Date'}
						inputProps={{
							className: `'block w-full px-3 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black' ${background}`,
							type: handleType,
							placeholder: 'Date',
							defaultValue: format(new Date(contactDate as string), 'dd/MM/yyyy'),
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
							className: `'block w-full px-3 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black' ${background}`,
							type: 'text',
							placeholder: 'Title',
							onChange: (e) => setContactTitle(e.target.value),
							value: contactTitle,
							disabled: inputDisabled,
						}}
					/>
					<InputFormControl
						label={'Description'}
						inputProps={{
							className: `'block w-full px-3 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black' ${background}`,
							type: 'text',
							placeholder: 'Description',
							onChange: (e) => setContactDescription(e.target.value),
							value: contactDescription,
							disabled: inputDisabled,
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
								{
									title: 'No score',
									value: '',
								},
							],
							disabled: inputDisabled,
							onChange: (e) => setContactScore(e.target.value),
							value: contactScore === null ? '' : contactScore,
						}}
					/>
					<SelectFormControl
						label={'Status'}
						iSelectProps={{
							iOptionProps: [
								{
									title: statuses[statuses.length - 1].status.status.toString(),
									value: statuses[statuses.length - 1].status.status.toString(),
								},
							],
							disabled: true,
						}}
					/>

					<div className="flex items-center justify-start w-full">
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
									loading={isLoadingSubmit}
								/>
							</>
						) : (
							<>
								<Button
									label="Edit"
									style="focus:outline-none mx-3 text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
									onClick={editHandler}
									type="button"
								/>

								<Button
									label="Delete"
									style="focus:outline-none mx-3 text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-red-900"
									type="button"
									onClick={() => setShowDeleteModal(true)}
								/>
							</>
						)}
					</div>
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
export default EditNoteModal;
