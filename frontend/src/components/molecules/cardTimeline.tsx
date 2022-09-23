import { ITimeline } from '../../utils/interfaces/user/timeline.interface';
import { format } from 'date-fns';

interface ITimelines {
	timeline: ITimeline;
}
const CardTimeline: React.FC<ITimelines> = ({ timeline }) => {
	return (
		<>
			<div className="flex flex-row-reverse md:contents">
				<div className="border-solid border-2 border-gray-600 col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md">
					<h3 className="font-semibold text-sm mb-1">
						{timeline.date && format(new Date(timeline.date), ' dd/MM/yyyy')}
					</h3>

					<p className="leading-tight text-justify">{timeline.title}</p>
				</div>
				<div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
					<div className="h-full w-6 flex items-center justify-center">
						<div className="h-full w-1 bg-gray-600 pointer-events-none"></div>
					</div>
					<div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gray-500 shadow"></div>
				</div>
			</div>
			<div className="flex md:contents">
				<div className="col-start-5 col-end-6 mr-10 md:mx-auto relative">
					<div className="h-full w-6 flex items-center justify-center">
						<div className="h-full w-1 bg-gray-600 pointer-events-none"></div>
					</div>
					<div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gray-500 shadow"></div>
				</div>
				<div className="border-solid border-2 border-gray-600  col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md">
					<h3 className="font-semibold text-lg mb-1">{timeline.title}</h3>
					<p className="leading-tight text-justify">
						{timeline.description && format(new Date(timeline.description), ' dd/MM/yyyy')}
					</p>
					<p className="leading-tight text-justify">
						{timeline.createdAt && format(new Date(timeline.createdAt), ' dd/MM/yyyy')}
					</p>
				</div>
			</div>
		</>
	);
};
export default CardTimeline;
