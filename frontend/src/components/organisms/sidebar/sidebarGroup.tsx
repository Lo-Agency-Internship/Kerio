import * as React from 'react';

export interface SidebarGroupProps {
	children: React.ReactNode;
	groupTitle: string;
	sidebarExpanded: boolean;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({ children, groupTitle, sidebarExpanded }) => {
	return (
		<div>
			<h3 className=" text-xs  uppercase  text-slate-500  font-semibold ltr:pl-3 rtl:pr-3">
				<span
					className={` hidden lg:block 2xl:hidden  text-center  w-6 ${sidebarExpanded && 'lg:hidden'}`}
					aria-hidden="true">
					•••
				</span>
				<span className={`lg:hidden  2xl:block ${sidebarExpanded && 'lg:block'}`}>{groupTitle}</span>
			</h3>

			<ul className=" mt-3">{children}</ul>
		</div>
	);
};
