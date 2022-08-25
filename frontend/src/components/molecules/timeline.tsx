import { useState } from 'react';
import CardTimeline from './cardTimeline';

export default function Timeline() {
	const [timeline, setTimline] = useState([]);
	const data = [
		{
			title: 'add a contact',
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
						<CardTimeline title="call" key={index} />
					))}

					{/* <!-- right --> */}
					<div className="flex md:contents">
						<div className="col-start-5 col-end-6 mr-10 md:mx-auto relative">
							<div className="h-full w-6 flex items-center justify-center">
								<div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
							</div>
							<div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gray-500 shadow"></div>
						</div>
						<div className="bg-gray-500 col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md">
							<h3 className="font-semibold text-lg mb-1">Lorem ipsum</h3>
							<p className="leading-tight text-justify">Lorem ipsum, dolor sit amet</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
