import { useState } from 'react';
import ShowNoteModal from '../molecules/showNoteModal';
import { INote } from '../../utils/interfaces/user/note.interface';
interface INoteCards {
	note: INote;
}
const NoteCard: React.FC<INoteCards> = ({ note }) => {
	const [showNoteModal, setShowNoteModal] = useState(false);

	return (
		<>
			{showNoteModal && <ShowNoteModal setOpen={setShowNoteModal} />}
			<div onClick={() => setShowNoteModal(true)}>
				<div className="m-auto h-32 w-96 my-5 bg-white shadow p-2 border-t-8 border-gray-700 rounded-xl">
					<header className="p-2 border-b flex">
						<div className="flex flex-col">
							<h4 className="text-xs font-semibold">Note Card</h4>
							<h1 className="text-lg font-mono text-gray-700">{note.title}</h1>
						</div>
					</header>
					<div className="flex flex-wrap p-2 w-full gap-9 space-x-28">
						<div className="flex flex-col">
							<h1 className="text-xs">Date</h1>
							<h4 className="text-md">{note.date}</h4>
						</div>

						<div className="flex flex-col">
							<h1 className="text-xs">Description</h1>
							<h4 className="text-md font-thin">{note.description}</h4>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default NoteCard;
