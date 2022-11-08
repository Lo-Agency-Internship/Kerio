import { useEffect, useState } from 'react';
import NoteCard from '../molecules/noteCard';
import { useParams } from 'react-router-dom';
import { INote } from '../../utils/interfaces/user/note.interface';
import { useApiContext } from '../../context/api';

export default function NotePannel() {
	const [notes, setNote] = useState<INote[] | null>();
	const { change, getAllNotes } = useApiContext();
	const [error, setError] = useState<string[] | null>(null);
	const { id } = useParams();

	const getNotes = async () => {
		try {
			const data = await getAllNotes({ id });
			setNote(data.notes);
		} catch (e: any) {
			setError(e.response.data.message);
		}
	};
	useEffect(() => {
		getNotes();
	}, [change]);

	return (
		<>
			{error}
			<div className="space-y-2 w-full px-12 py-6 block">
				{notes && notes.map((element, index) => <NoteCard data={element} key={index} />)}
			</div>
		</>
	);
}
