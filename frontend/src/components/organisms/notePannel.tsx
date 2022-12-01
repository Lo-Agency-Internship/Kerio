import { useEffect, useState } from 'react';
import NoteCard from '../molecules/noteCard';
import { useParams } from 'react-router-dom';
import { INote } from '../../utils/interfaces/user/note.interface';
import { useApiContext } from '../../context/api';
import EditNoteModal from '../templates/editNoteModal';

interface IProps {
	statuses: any;
}

const NotePannel: React.FC<IProps> = ({ statuses }) => {
	const [notes, setNotes] = useState<INote[] | null>();
	const { change, getAllNotes } = useApiContext();
	const [error, setError] = useState<string[] | null>(null);
	const { id } = useParams();
	const [editNoteModal, setEditNoteModal] = useState<boolean>(false);
	const [note, setNote] = useState<INote>();

	const getNotes = async () => {
		try {
			const data = await getAllNotes({
				id,
				pagination: {
					page: 1,
					size: 3,
					sort: 'asc',
				},
			});
			setNotes(data.notes);
		} catch (e: any) {
			setError(e.response.data.message);
		}
	};
	useEffect(() => {
		getNotes();
	}, [change]);

	// const handleNextPage = () => {};

	// const handlePreviousPage = () => {};
	return (
		<>
			{editNoteModal && (
				<EditNoteModal
					setOpen={setEditNoteModal}
					open={editNoteModal}
					note={note}
					setNote={setNote}
					setNotes={setNotes}
					statuses={statuses}
				/>
			)}
			{error}
			<div className="space-y-2 w-full px-12 py-4">
				{notes &&
					notes.map((element, index) => (
						<NoteCard data={element} key={index} setEditNoteModal={setEditNoteModal} setNote={setNote} />
					))}
				<div className="mt-8 text-right">
					<nav className="inline-flex" role="navigation" aria-label="Navigation">
						<ul className="flex justify-center my-4">
							<li className="ml-3 first:ml-0">
								<button className="btn bg-gray-200 border-slate-500 text-slate-500 cursor-not-allowed p-2 rounded-md">
									Previous
								</button>
							</li>
							<li className="ml-3 first:ml-0">
								<button className="btn bg-gray-100 border-slate-500 hover:border-slate-500 text-indigo-500 p-2 rounded-md">
									Next
								</button>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
};

export default NotePannel;
