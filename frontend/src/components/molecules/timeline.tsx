import CardTimeline from './cardTimeline';
import axios from 'axios';
import { uri } from '../../utils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Timeline() {
	console.log('-------------------');
	const [timeline, setTimline] = useState([]);
	const { id } = useParams();
	const getAllTimelines = async () => {
		const res = await axios.get(uri(`notes/timeline/${id}`), {
			headers: {
				Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
			},
		});
		const data = res.data;
		console.log('========', data);
		console.log(data);
		setTimline(data);
	};
	useEffect(() => {
		getAllTimelines();
	}, []);
	return (
		<>
			<div className="container">
				<div className="flex flex-col md:grid grid-cols-9 mx-auto p-2 text-blue-50">
					{timeline.map((Element, Index) => (
						<CardTimeline timeline={Element} key={Index} />
					))}
					))
				</div>
			</div>
		</>
	);
}
