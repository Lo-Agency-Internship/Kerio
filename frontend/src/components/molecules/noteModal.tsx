export default function NoteModal({ setOpen }: any) {
	return (
		<>
			<div
				className="py-12 transition duration-150 ease-in-out z-10 absolute top-14 right-0 bottom-0 left-0"
				id="modal">
				<div role="alert" className="container mx-auto w-96 md:w-2/3 max-w-lg">
					<div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
						<div className="w-full flex justify-start text-gray-600 mb-3"></div>
						<h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Add your notes</h1>
						<label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Date</label>
						<input
							id="date"
							type="date"
							className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-gray-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
							placeholder=""
						/>
						<label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Title</label>
						<div className="relative mb-5 mt-2">
							<input
								id="date"
								type="text"
								className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-gray-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
								placeholder="title"
							/>
						</div>
						<label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Description</label>
						<div className="relative mb-5 mt-2">
							<div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer"></div>
							<textarea
								className="text-gray-600 focus:outline-none focus:border focus:border-gray-700 font-normal w-full h-24 flex items-center pl-3 text-sm border-gray-300 rounded border"
								placeholder="Description"></textarea>
						</div>
						<div className="flex items-center justify-start w-full">
							<button
								type="submit"
								className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-150 ease-in-out hover:bg-gray-600 bg-gray-700 rounded text-white px-8 py-2 text-sm">
								Submit
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
					</div>
				</div>
			</div>
		</>
	);
}
