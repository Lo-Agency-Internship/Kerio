import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { uri } from '../../utils';
import { ITimeline } from '../../utils/interfaces/user/timeline.interface';
import Roadmap from './roadMap';

const roadMapPannel = () => {
	const { id } = useParams();
	const [roadMap, setRoadMap] = useState<ITimeline[] | null>(null);
	const ShowRoadmap = async () => {
		const res = await axios.get(uri(`contacts/${id}`), {
			headers: {
				Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
			},
		});

		setRoadMap(res.data.notes);
	};
	useEffect(() => {
		ShowRoadmap();
	}, []);

	return (
		<>
			<div className="bg-slate-50 ml-12 p-12 w-[800px] rounded border border-slate-200 overflow-hidden">
				<div className="text-lg w-[1600px] font-semibold text-slate-400 uppercase mb-4">RoadMap</div>
				<ul>{roadMap && roadMap.map((element: ITimeline, index: number) => <Roadmap data={element} key={index} />)}</ul>
			</div>
		</>
	);
};

export default roadMapPannel;
