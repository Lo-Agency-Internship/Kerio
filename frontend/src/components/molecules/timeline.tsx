import { useState } from 'react';
import CardTimeline from './cardTimeline';

export default function Timeline() {
	// const [timeline, setTimline] = useState([]);
	const data = [
		{
			title: 'add a contact',
		},
		{
			title: 'call a contact',
		},
		{
			title: 'call a contact',
		},
		{
			title: 'call a contact',
		},
		{
			title: 'call a contact',
		},
		{
			title: 'call a contact',
		},
	];
	return (
		<>
			{/* <!-- component --> */}
			<div className="container">
				<div className="flex flex-col md:grid grid-cols-9 mx-auto p-2 text-blue-50">
					{/* <!-- left --> */}
					{/* {Card.map((Element,Index)=>(<CardTimeline Card={Element} key={Index} />))} */}
					{data.map((element, index) => (
						<CardTimeline title={element.title} index={index} />
					))}

					{/* <!-- right --> */}
				</div>
			</div>
		</>
	);
}
