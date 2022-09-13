import axios from 'axios';
import { useEffect, useState } from 'react';
import { uri } from '../../utils';
import { Button } from '../atoms/button';
import { Input } from '../atoms/input';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import SubmitDelete from './submitDelete';

export default function ShowNoteModal({ note, setNote, setOpen }: any) {
	const [inputDisabled, setInputDisabled] = useState(true);
	const [inputsShow, setInputsShow] = useState(false);
	const [background, setBackground] = useState('bg-transparent');

	const editHandler = () => {
		setInputDisabled(false);
		setInputsShow(true);
		setBackground('bg-gray-300');
	};

	// const deleteHandler = async (e: any) => {
	// 	e.preventDefault();
	// 	await axios.delete(uri(`notes/${note.id}`), {
	// 		headers: {
	// 			Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
	// 		},
	// 		// setChange(!change)
	// 	});
	// };
	const [showsubmitDelete, setShowsubmitDelete] = useState(false);
	const cancelHandler = () => {
		setInputDisabled(true);
		setInputsShow(false);
		setNote(note);
		setBackground('bg-transparent');
	};

	const submitHandler = async (e: any) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const date = formData.get('date');
		const title = formData.get('title');
		const description = formData.get('description');
		const body = { date, title, description };
		await axios.put(uri(`notes/${note.id}`), body, {
			headers: {
				Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
			},
		});

		setNote({ ...body, id: note.id });
		setInputDisabled(true);
		setInputsShow(false);
		setBackground('bg-transparent');
	};
	console.log(note.date, note);

	return (
		<>
			{showsubmitDelete && <SubmitDelete setOpen={setShowsubmitDelete} note={undefined} />}
			<div
				className="py-12  backdrop-blur-sm transition duration-150 ease-in-out z-10 fixed top-14 right-0 bottom-0 left-0"
				id="modal">
				<div role="alert" className="container mx-auto w-96 md:w-2/3 max-w-lg">
					<div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
						<div className="w-full flex justify-start text-gray-600 mb-3"></div>
						<form onSubmit={submitHandler}>
							<h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4"> Your Note</h1>
							<label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Date</label>
							<Input
								disabled={inputDisabled}
								type={'date'}
								id={'date'}
								defaultValue={note?.date}
								name="date"
								className={background}
							/>
							<div>
								<label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Title</label>
								<div className="relative mb-5 mt-2">
									{/* <input name="title" value={note.title} className={background} id="date" type="text" /> */}
									<Input
										disabled={inputDisabled}
										type={'text'}
										id={'title'}
										defaultValue={note?.title}
										name="title"
										className={background}
									/>
								</div>
							</div>
							<label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Description</label>
							<div className="relative mb-5 mt-2">
								<Input
									disabled={inputDisabled}
									type={'text'}
									id={'description'}
									defaultValue={note?.description}
									name="description"
									className={background}
								/>
							</div>
							<div className="flex items-center justify-start w-full">
								<Button
									label="Delete"
									style="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-150 ease-in-out hover:bg-gray-600 bg-gray-700 rounded text-white px-8 py-2 text-sm"
									type="button"
									onClick={() => setShowsubmitDelete(true)}
								/>

								<button
									className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
									type="button"
									onClick={() => setOpen(false)}>
									Cancel
								</button>
							</div>
							<button
								className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
								onClick={() => setOpen(false)}
								aria-label="close modal"
								type="button">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="icon icon-tabler icon-tabler-x"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									strokeWidth="2.5"
									stroke="currentColor"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" />
									<line x1="18" y1="6" x2="6" y2="18" />
									<line x1="6" y1="6" x2="18" y2="18" />
								</svg>
							</button>

							{/* show and hide buttons */}
							<div className="mt-16">
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
					</div>
				</div>
			</div>
		</>
	);
}
