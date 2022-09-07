import axios from 'axios';
import { uri } from '../../utils';
import NoteCard from './noteCard';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Note({ setShowNoteModal, user, setUser }: any) {
	const [notes, setNote] = useState([]);
	const { id } = useParams();
	const getAllNotes = async () => {
		const res = await axios.get(uri(`notes/${id}`), {
			headers: {
				Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
			},
		});
		const data = res.data;
		setNote(data);
	};
	useEffect(() => {
		getAllNotes();
	}, []);

	return (
		<>
			<div className="flex justify-start align-item item-center w-11/12 ">
				<div className="m-8 py-1 px-1">
					<button
						onClick={() => setShowNoteModal(true)}
						className="w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 hover:border-gray-600 hover:bg-gray-800 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
						<span className="mx-auto">Add Note</span>
					</button>
					{notes.map((element, index) => (
						<NoteCard note={element} key={index} />
					))}
				</div>
			</div>
		</>
	);
}
