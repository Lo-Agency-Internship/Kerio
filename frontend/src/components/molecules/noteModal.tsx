export default function NoteModal({ setOpen }: any) {
	return (
		<>
			<form>
				<div className="absolute pt-1 my-6 mx-30">
					<div className=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
						<button
							className="cursor-pointer absolute top-0 right-0 mt-8 mr-8
                         text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out 
                         rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
							onClick={() => setOpen(false)}
							aria-label="close modal"
							role="button">
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
						<h1 className="text-center text-2xl font-bold text-gray-500 mb-10">ADD Note</h1>
						<div className="space-y-4">
							<div>
								<label className="text-lx font-serif">Title:</label>
								<input
									type="text"
									placeholder="title"
									id="title"
									className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
								/>
							</div>
							<div>
								<label className="block mb-2 text-lg font-serif">Description:</label>
								<textarea
									id="description"
									placeholder="write here..."
									className="w-full font-serif  p-4 text-gray-600 bg-indigo-50 outline-none rounded-md"></textarea>
							</div>
							<div className="flex items-center justify-around pt-8">
								<button
									className="bg-indigo-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
									type="button">
									save
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}
