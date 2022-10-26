import * as React from 'react';
import classNames from 'classnames';

export interface SidebarLinkProps {
	href?: string;
	icon?: React.ReactNode;
	anchor: string;
	isGroupLink?: boolean;
	active?: boolean;
	onClick?: any;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({ href, anchor, icon, isGroupLink, active, onClick }) => {
	const linkClassnames = classNames('last:mb-0', {
		'px-3 py-2 rounded-sm mb-0.5': !isGroupLink,
		'mb-1': isGroupLink,
	});

	const textClassnames = classNames({
		'text-sm font-medium ltr:ml-3 rtl:mr-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-indigo-500':
			active,
		'text-sm font-medium ltr:ml-3 rtl:mr-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200':
			!active,
	});

	return (
		<li onClick={onClick} className={linkClassnames}>
			<a href={href} className={`block text-slate-200 hover:text-white truncate transition duration-150`}>
				<div className="flex items-center justify-between">
					<div className="grow flex items-center">
						{icon || null}
						<span className={textClassnames}>{anchor}</span>
					</div>
				</div>
			</a>
		</li>
	);
};
