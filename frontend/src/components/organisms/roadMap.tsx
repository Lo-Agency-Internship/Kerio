import * as React from 'react';
import { ITimeline } from '../../utils/interfaces/user/timeline.interface';
import { format } from 'date-fns';

export interface RoadmapProps {
	data: ITimeline;
}

export const Roadmap: React.FC<RoadmapProps> = ({ data }) => {
	return (
		<>
			<li className="relative pb-4 last-of-type:pb-0">
				<div className="pl-6">
					<div className="text-sm font-medium uppercase text-indigo-600 mb-0.5">{data.title}</div>
					<div className="text-xs mb-2">
						<a className="font-medium text-slate-800" href="#0">
							{data.description ? data.description : ''}
						</a>
					</div>
					{/* Avatars */}
					<div className="flex items-center space-x-2">
						<div className="flex text-sm -space-x-3 -ml-0.5">
							{data.date && format(new Date(data.date), ' dd/MM/yyyy')}
						</div>
						<div className="text-sm font-medium text-slate-400 italic">
							Created at : {data.createdAt && format(new Date(data.createdAt), 'dd/MM/yyyy')}
						</div>
					</div>
				</div>
				{/* Timeline element */}
				<div aria-hidden="true">
					<div className="absolute top-1 -bottom-1 left-0.5 ml-px w-0.5 bg-slate-200" />
					<div className="absolute top-1 left-0 ml- w-2 h-2 rounded-full bg-slate-400" />
				</div>
			</li>
		</>
	);
};

export default Roadmap;
