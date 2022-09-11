import { ITimeline } from '../../utils/interfaces/user/timeline.interface';

// export interface Card {
// 	title: string;
// 	index: number;
// }
interface ITimelines {
	timeline: ITimeline;
}
const CardTimeline: React.FC<ITimelines> = ({ timeline }) => {
	return (
		<>
			(
			<div className="flex flex-row-reverse md:contents">
				<div className="bg-gray-500 col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md">
					<h3 className="font-semibold text-lg mb-1">{timeline.title}</h3>
					<p className="leading-tight text-justify">Lorem ipsum dolor sit</p>
				</div>
				<div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
					<div className="h-full w-6 flex items-center justify-center">
						<div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
					</div>
					<div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gray-500 shadow"></div>
				</div>
			</div>
			) : (
			<div className="flex md:contents">
				<div className="col-start-5 col-end-6 mr-10 md:mx-auto relative">
					<div className="h-full w-6 flex items-center justify-center">
						<div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
					</div>
					<div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gray-500 shadow"></div>
				</div>
				<div className="bg-gray-500 col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md">
					<h3 className="font-semibold text-lg mb-1">{timeline.title}</h3>
					<p className="leading-tight text-justify">Lorem ipsum, dolor sit amet</p>
				</div>
			</div>
			)
		</>
	);
};
export default CardTimeline;
