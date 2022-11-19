import { useEffect, useState } from 'react';
import NoteCard from '../molecules/noteCard';
import { useParams } from 'react-router-dom';
import { INote } from '../../utils/interfaces/user/note.interface';
import { useApiContext } from '../../context/api';
import EditNoteModal from '../templates/editNoteModal';

export default function NotePannel() {
	const [notes, setNotes] = useState<INote[] | null>();
	const { change, getAllNotes } = useApiContext();
	const [error, setError] = useState<string[] | null>(null);
	const { id } = useParams();
	const [editNoteModal, setEditNoteModal] = useState<boolean>(false);
	const [note, setNote] = useState<INote>();

	const getNotes = async () => {
		try {
			const data = await getAllNotes({ id });
			setNotes(data.notes);
		} catch (e: any) {
			setError(e.response.data.message);
		}
	};
	useEffect(() => {
		getNotes();
	}, [change]);

	return (
		<>
			{editNoteModal && (
				<EditNoteModal
					setOpen={setEditNoteModal}
					open={editNoteModal}
					note={note}
					setNote={setNote}
					setNotes={setNotes}
				/>
			)}
			{error}
			<div className="space-y-2 w-full px-12 py-6 block">
				{notes &&
					notes.map((element, index) => (
						<NoteCard data={element} key={index} setEditNoteModal={setEditNoteModal} setNote={setNote} />
					))}
			</div>
		</>
	);
}
