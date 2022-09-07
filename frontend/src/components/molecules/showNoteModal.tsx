import axios from 'axios';
import { useState } from 'react';
import { Button } from '../atoms/button';
export default function ShowNoteModal({ note, setNote, setOpen }: any) {
	const [inputDisabled, setInputDisabled] = useState(true);
	const [inputsShow, setInputsShow] = useState(false);
	const [background, setBackground] = useState('bg-transparent');
	const [selectBoxValue, setSelectBoxValue] = useState<string | null>(null);

	const submitHandler = async (e: any) => {
		e.preventDefault();
		setSelectBoxValue(null);
		const formData = new FormData(e.currentTarget);
		const date = formData.get('date');
		const title = formData.get('title');
		const description = formData.get('description');
		const body = { date, title, description };
	};

	return (
		<>
			<div
				className="py-12  backdrop-blur-sm transition duration-150 ease-in-out z-10 fixed top-14 right-0 bottom-0 left-0"
				id="modal">
				<div role="alert" className="container mx-auto w-96 md:w-2/3 max-w-lg">
					<div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
						<div className="w-full flex justify-start text-gray-600 mb-3"></div>
						<form onSubmit={submitHandler}>
							<h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4"> Your Note</h1>
							<label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Date</label>
							<div>
								<input className={background} disabled={inputDisabled} id="date" type="date" />
							</div>
							<label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Title</label>
							<div className="relative mb-5 mt-2">
								<input className={background} disabled={inputDisabled} id="date" type="text" />
							</div>
							<label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Description</label>
							<div className="relative mb-5 mt-2">
								<input className={background} disabled={inputDisabled} id="date" type="text" />
							</div>
							<div className="flex items-center justify-start w-full">
								<button
									type="submit"
									className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-150 ease-in-out hover:bg-gray-600 bg-gray-700 rounded text-white px-8 py-2 text-sm">
									Delete
								</button>
								<button
									type="submit"
									className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-150 ease-in-out hover:bg-gray-600 bg-gray-700 rounded text-white px-8 py-2 text-sm">
									Edit
								</button>
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
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
