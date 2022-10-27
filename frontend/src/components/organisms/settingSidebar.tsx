import React from 'react';

import { title, kebab } from 'case';
import { NavLink, useLocation } from 'react-router-dom';

interface IPropsSettingItem {
	label: string;
	icon: React.FC<IProps>;
}

interface IProps {
	settingItems: IPropsSettingItem[];
	active: string;
	setActive: (id: string) => void;
}
const SettingsSidebar: React.FC<IProps> = (props) => {
	const location = useLocation();
	const { pathname } = location;

	return (
		<div className="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-3 py-6 border-b md:border-b-0 md:border-r border-slate-200 min-w-60 md:space-y-3">
			<div>
				<div className="text-xs font-semibold text-slate-400 uppercase mb-3">Account settings</div>
				<ul className="flex flex-nowrap md:block mr-3 md:mr-0">
					{props.settingItems?.map((item, idx) => {
						const itemId = kebab(item.label);
						const isActive = kebab(props.active) === itemId;

						return (
							<li key={idx} className="mr-0.5 md:mr-0 md:mb-0.5">
								<button
									onClick={() => props.setActive(itemId)}
									className={`flex items-center px-2.5 py-2 block w-full rounded whitespace-nowrap ${
										isActive && 'bg-indigo-50'
									}`}>
									{item.icon(props)}
									<span className={`text-sm font-medium ${isActive ? 'text-indigo-500' : 'hover:text-slate-700'}`}>
										{title(item.label)}
									</span>
								</button>
							</li>
						);
					})}
				</ul>
			</div>
			<div>
				<div className="text-xs font-semibold text-slate-400 uppercase mb-3">Experience</div>
				<ul className="flex flex-nowrap md:block mr-3 md:mr-0">
					<li className="mr-0.5 md:mr-0 md:mb-0.5">
						<NavLink
							end
							to="/settings/feedback"
							className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
								pathname.includes('/settings/feedback') && 'bg-indigo-50'
							}`}>
							<svg
								className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2 ${
									pathname.includes('/settings/feedback') && 'text-indigo-400'
								}`}
								viewBox="0 0 16 16">
								<path d="M7.001 3h2v4h-2V3zm1 7a1 1 0 110-2 1 1 0 010 2zM15 16a1 1 0 01-.6-.2L10.667 13H1a1 1 0 01-1-1V1a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1zM2 11h9a1 1 0 01.6.2L14 13V2H2v9z" />
							</svg>
							<span
								className={`text-sm font-medium ${
									pathname.includes('/settings/feedback') ? 'text-indigo-500' : 'hover:text-slate-700'
								}`}>
								Give Feedback
							</span>
						</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SettingsSidebar;
