import { useState } from 'react';
import NoteModal from './noteModal';
// import NoteModal from '../components/molecules/noteModal';

export default function Note() {
	const [showNoteModal, setShowNoteModal] = useState(false);
	return (
		<>
			<div className="flex justify-evenly w-11/12 ">
				<NoteModal />
				{/* // <!-- This is button of Note --> */}
				{showNoteModal && <NoteModal setOpen={setShowNoteModal} />}

				<div className="m-3 pt-16 py-8 px-8">
					<button
						onClick={() => setShowNoteModal(true)}
						className="w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
						<span className="mx-auto">Add Note</span>
					</button>
				</div>
			</div>
		</>
	);
}
