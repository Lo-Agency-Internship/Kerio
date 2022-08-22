export default function NoteDropDown() {
	return (
		<>
			<form>
				<div className="md:px-20 pt-1">
					<div className=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
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
								<button
									className="bg-indigo-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
									type="button">
									edit
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}
