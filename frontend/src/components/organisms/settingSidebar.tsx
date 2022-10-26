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
					{/* <li className="mr-0.5 md:mr-0 md:mb-0.5">
						<NavLink
							end
							href="/settings/notifications"
							className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
								pathname.includes('/settings/notifications') && 'bg-indigo-50'
							}`}
						>
							<svg
								className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2 ${
									pathname.includes('/settings/notifications') && 'text-indigo-400'
								}`}
								viewBox="0 0 16 16"
							>
								<path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8zM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1z" />
							</svg>
							<span
								className={`text-sm font-medium ${
									pathname.includes('/settings/notifications')
										? 'text-indigo-500'
										: 'hover:text-slate-700'
								}`}
							>
								My Notifications
							</span>
						</NavLink>
					</li>
					<li className="mr-0.5 md:mr-0 md:mb-0.5">
						<NavLink
							end
							href="/settings/apps"
							className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
								pathname.includes('/settings/apps') && 'bg-indigo-50'
							}`}
						>
							<svg
								className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2 ${
									pathname.includes('/settings/apps') && 'text-indigo-400'
								}`}
								viewBox="0 0 16 16"
							>
								<path d="M3.414 2L9 7.586V16H7V8.414l-5-5V6H0V1a1 1 0 011-1h5v2H3.414zM15 0a1 1 0 011 1v5h-2V3.414l-3.172 3.172-1.414-1.414L12.586 2H10V0h5z" />
							</svg>
							<span
								className={`text-sm font-medium ${
									pathname.includes('/settings/apps') ? 'text-indigo-500' : 'hover:text-slate-700'
								}`}
							>
								Connected Apps
							</span>
						</NavLink>
					</li>
					<li className="mr-0.5 md:mr-0 md:mb-0.5">
						<NavLink
							end
							href="/settings/plans"
							className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
								pathname.includes('/settings/plans') && 'bg-indigo-50'
							}`}
						>
							<svg
								className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2 ${
									pathname.includes('/settings/plans') && 'text-indigo-400'
								}`}
								viewBox="0 0 16 16"
							>
								<path d="M5 9h11v2H5V9zM0 9h3v2H0V9zm5 4h6v2H5v-2zm-5 0h3v2H0v-2zm5-8h7v2H5V5zM0 5h3v2H0V5zm5-4h11v2H5V1zM0 1h3v2H0V1z" />
							</svg>
							<span
								className={`text-sm font-medium ${
									pathname.includes('/settings/plans') ? 'text-indigo-500' : 'hover:text-slate-700'
								}`}
							>
								Plans
							</span>
						</NavLink>
					</li>
					<li className="mr-0.5 md:mr-0 md:mb-0.5">
						<NavLink
							end
							href="/settings/billing"
							className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
								pathname.includes('/settings/billing') && 'bg-indigo-50'
							}`}
						>
							<svg
								className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2 ${
									pathname.includes('/settings/billing') && 'text-indigo-400'
								}`}
								viewBox="0 0 16 16"
							>
								<path d="M15 4c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1H3c-1.7 0-3-1.3-3-3V3c0-1.7 1.3-3 3-3h7c.6 0 1 .4 1 1v3h4zM2 3v1h7V2H3c-.6 0-1 .4-1 1zm12 11V6H2v7c0 .6.4 1 1 1h11zm-3-5h2v2h-2V9z" />
							</svg>
							<span
								className={`text-sm font-medium ${
									pathname.includes('/settings/billing')
										? 'text-indigo-500'
										: 'hover:text-slate-700'
								}`}
							>
								Billing & Invoices
							</span>
						</NavLink>
					</li> */}
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
