import { modalNoteValidation } from '../../validation/addNoteModalValidation';
import { FC, useState } from 'react';
import { useApiContext } from '../../context/api';
import { useParams } from 'react-router-dom';
import Modal from '../organisms/modal';
import { InputFormControl } from '../molecules/formControls/inputFormControl';
import { SelectFormControl } from '../molecules/formControls/selectFormControl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface IProps {
	setOpen: (close: boolean) => void;
	open: boolean;
	statuses: any;
}

const ADDNOTE_FORM_ID = 'ADDNOTE_FORM_ID';

const NewNoteModal: FC<IProps> = ({ setOpen, open, statuses }) => {
	const { id } = useParams();
	const { change, setChange, postNoteInfo } = useApiContext();
	const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
	const [error, setError] = useState<string[] | null>(null);
	const handleSubmit = async (event: any) => {
		setIsLoadingSubmit(true);
		setError(null);
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const title = formData.get('title')?.toString().toLowerCase();
		const description = formData.get('description');
		const date = formData.get('date');
		const status = statuses[statuses.length - 1].status.status.toString();
		const score = formData.get('score');
		let body;
		if (score === '') {
			body = { title, description, date, status, score: null };
		} else {
			body = {
				title,
				description,
				date,
				status,
				score,
			};
		}
		try {
			await modalNoteValidation.validate(body);
			await postNoteInfo({
				date: body.date,
				description: body.description,
				score: body.score,
				status: body.status,
				title: body.title,
				id,
			});
			setOpen(false);
			setChange(!change);
			toast.success('Look! You have a new note in your profile!', {
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
			if (err.response) setError(err.response.data.message);
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
		setTimeout(() => {
			setIsLoadingSubmit(false);
		}, 500);
	};

	return (
		<>
			<Modal
				show={open}
				onClose={() => setOpen(false)}
				title={'New Note'}
				actions={[
					{
						loading: isLoadingSubmit,
						label: 'Submit',
						type: 'submit',
						form: ADDNOTE_FORM_ID,
					},
				]}>
				{error && <p className="text-red-500">{error}</p>}
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
								{
									title: 'No score',
									value: '',
								},
							],
						}}
					/>
					<SelectFormControl
						label={'Status'}
						iSelectProps={{
							iOptionProps: [
								{
									title: statuses[statuses.length - 1].status.status,
									value: statuses[statuses.length - 1].status.status,
								},
							],
							disabled: true,
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

export default NewNoteModal;
