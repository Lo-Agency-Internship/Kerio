import { useEffect, useState } from 'react';
import axios from 'axios';
import { uri } from '../../utils';
import NoteCard from '../molecules/noteCard';
import { useParams } from 'react-router-dom';
import { INote } from '../../utils/interfaces/user/note.interface';
import { useApiContext } from '../../context/api';

export default function NotePannel() {
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
		<div className="grow">
			{/* Panel body */}
			<div className="p-6 space-y-6">
				<h2 className="text-2xl text-slate-800 font-bold mb-5"></h2>

				{/* Business Profile */}
				<div className="flex flex-col w-full">
					<h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Notes</h2>
					<div className="flex justify-start align-item item-center w-11/12 ">
						<div className="m-8 py-1 px-1">
							{notes && notes.map((element, index) => <NoteCard data={element} key={index} />)}
						</div>
					</div>
					<div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
						<div className="sm:w-1/3"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
