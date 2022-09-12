import CardTimeline from './cardTimeline';
import axios from 'axios';
import { uri } from '../../utils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ITimeline } from '../../utils/interfaces/user/timeline.interface';

export default function Timeline() {
	const [timelineNotes, setTimlineNote] = useState<ITimeline[] | null>();
	const [timelineStatus, setTimlineSatatus] = useState<ITimeline[] | null>();
	const { id } = useParams();
	const getAllTimelines = async () => {
		const res = await axios.get(uri(`notes/timeline/${id}`), {
			headers: {
				Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
			},
		});
		const data = res.data;

		setTimlineNote(data.newNotes);
		setTimlineSatatus(data.newStatus);
	};
	useEffect(() => {
		getAllTimelines();
	}, []);
	return (
		<>
			<div className="container">
				<div className="flex flex-col md:grid grid-cols-9 mx-auto p-2 text-blue-50">
					{timelineStatus && timelineStatus.map((Element, Index) => <CardTimeline timeline={Element} key={Index} />)}
					{timelineNotes && timelineNotes.map((Element, Index) => <CardTimeline timeline={Element} key={Index} />)}
				</div>
			</div>
		</>
	);
}
