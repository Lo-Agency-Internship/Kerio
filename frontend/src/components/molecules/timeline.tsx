import CardTimeline from './cardTimeline';
import axios from 'axios';
import { uri } from '../../utils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ITimeline } from '../../utils/interfaces/user/timeline.interface';
import { useApiContext } from '../../context/api';

export default function Timeline() {
	const { getTimelines } = useApiContext();
	const [timelineNotes, setTimlineNote] = useState<ITimeline[] | null>();
	const [timelineStatus, setTimlineSatatus] = useState<ITimeline[] | null>();
	const { id } = useParams();

	useEffect(() => {
		const { data } = getTimelines({ id });
		setTimlineNote(data.newNotes);
		setTimlineSatatus(data.newStatus);
	}, []);
	return (
		<>
			<div className="container">
				<div className="flex flex-col md:grid grid-cols-9 mx-auto p-2">
					{timelineStatus && timelineStatus.map((Element, Index) => <CardTimeline timeline={Element} key={Index} />)}
					{timelineNotes && timelineNotes.map((Element, Index) => <CardTimeline timeline={Element} key={Index} />)}
				</div>
			</div>
		</>
	);
}
