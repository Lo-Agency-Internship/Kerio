import * as React from 'react';

export interface SidebarGroupProps {
	children: React.ReactNode;
	groupTitle: string;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({ children, groupTitle }) => {
	return (
		<div>
			<h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
				<span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
					•••
				</span>
				<span className="lg:hidden lg:sidebar-expanded:block 2xl:block">{groupTitle}</span>
			</h3>

			<ul className="mt-3">{children}</ul>
		</div>
	);
};
