import { useState } from 'react';
import ShowNoteModal from '../molecules/showNoteModal';
import { INote } from '../../utils/interfaces/user/note.interface';
import { format } from 'date-fns';
interface INoteCards {
	data: INote;
}
const NoteCard: React.FC<INoteCards> = ({ data }) => {
	const [showNoteModal, setShowNoteModal] = useState(false);
	const [note, setNote] = useState<INote>(data);
	const truncate = (input: string) => (input?.length > 8 ? `${input.substring(0, 8)}...` : input);

	return (
		<>
			{showNoteModal && <ShowNoteModal setOpen={setShowNoteModal} note={note} setNote={setNote} />}
			<div onClick={() => setShowNoteModal(true)}>
				<div className="m-auto h-32 w-96 my-5 bg-white shadow p-2 border-t-8 border-gray-700 rounded-xl">
					<header className="p-2 border-b flex">
						<div className="flex flex-col">
							<h4 className="text-xs font-semibold">Note Card</h4>
							<h1 className="text-lg font-mono text-gray-700">{note.title}</h1>
						</div>
					</header>
					<div className="flex p-2 w-full gap-9 space-x-20">
						<div className="flex">
							<h1 className="text-xs text-gray-800 font-bold leading-tight tracking-normal">Date: </h1>
							<h4 className="text-sm">{note.date && format(new Date(note.date), ' dd/mm/yyyy')}</h4>
						</div>
						<div className="flex flex-col">
							<h1 className="text-xs text-gray-800 font-bold leading-tight tracking-normal">Description: </h1>
							{/* {truncate(this.state.banners.overview)}							 */}
							<h4 className="text-xs font-thin">{note.description}</h4>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default NoteCard;
