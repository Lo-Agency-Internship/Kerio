import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApiContext } from '../../context/api';
import { uri } from '../../utils';

export interface RoadmapRecordItems {
	completed: boolean;
	title?: string;
	description?: string;
}

export interface RoadmapRecord {
	date?: string;
	createdAt?: string;
	items?: RoadmapRecordItems[];
}

export interface RoadmapProps {
	records: RoadmapRecord[];
}

export const Roadmap: React.FC<RoadmapProps> = ({ records }) => {
	return (
		<>
			{records.map((record, index) => (
				<article className="pt-6" key={index}>
					<div className="xl:flex">
						<div className="w-32 shrink-0">
							<h2 className="text-xl leading-snug font-bold text-slate-800 xl:leading-7 mb-4 xl:mb-0">{record.date}</h2>
						</div>
						<div className="grow pb-6 border-b border-slate-200">
							<header>
								<div className="flex flex-nowrap items-center space-x-2 mb-6">
									{/* Avatars */}
									<div className="flex shrink-0 -space-x-3 -ml-px">
										{/* <AvatarGroup counts={record.avatars.counts} size={record.avatars.size} space={record.avatars.space} /> */}
									</div>
									<div className="text-slate-400">·</div>
									{/* status */}
									<div>{/* {record.status &&  <Badge {...record.status} />} */}</div>
								</div>
							</header>
							{/* List */}
							<ul className="-my-2">
								{/* List item */}
								{record.items?.map((item, i) => (
									<li className="relative py-2" key={i}>
										<div className="flex items-center mb-1">
											{i + 1 !== record.items?.length && (
												<div
													className="absolute left-0 h-full w-0.5 bg-slate-200 self-start ml-2.5 -translate-x-1/2 translate-y-3"
													aria-hidden="true"></div>
											)}

											{item.completed ? (
												<>
													<div className="absolute left-0 rounded-full bg-indigo-500" aria-hidden="true">
														<svg className="w-5 h-5 fill-current text-white" viewBox="0 0 20 20">
															<path d="M14.4 8.4L13 7l-4 4-2-2-1.4 1.4L9 13.8z" />
														</svg>
													</div>
												</>
											) : (
												<>
													<div className="absolute left-0 rounded-full bg-white" aria-hidden="true">
														<svg className="w-5 h-5 fill-current text-slate-400" viewBox="0 0 20 20">
															<path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z" />
														</svg>
													</div>
												</>
											)}
											<h3 className="text-lg font-bold text-slate-800 pl-9">{item.title}</h3>
										</div>
										<div className="pl-9">{item.description}</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</article>
			))}
		</>
	);
};

export default Roadmap;
