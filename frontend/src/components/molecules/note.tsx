import axios from 'axios';
import { uri } from '../../utils';
import NoteCard from './noteCard';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { INote } from '../../utils/interfaces/user/note.interface';
import { useApiContext } from '../../context/api';

export default function Note({ user, setUser }: any) {
	const [notes, setNote] = useState<INote[] | null>();
	const { change } = useApiContext();
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
	}, [change]);

	return (
		<>
			<div className="flex justify-start align-item item-center w-11/12 ">
				<div className="m-8 py-1 px-1">
					{notes && notes.map((element, index) => <NoteCard data={element} key={index} />)}
				</div>
			</div>
		</>
	);
}
