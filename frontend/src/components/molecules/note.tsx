export default function Note({ setShowNoteModal }: any) {
	return (
		<>
			<div className="flex justify-center align-item item-center w-11/12 ">
				<div className="m-8 py-1 px-1">
					<button
						onClick={() => setShowNoteModal(true)}
						className="w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 hover:border-gray-600 hover:bg-gray-800 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
						<span className="mx-auto">Add Note</span>
					</button>
				</div>
			</div>
		</>
	);
}
