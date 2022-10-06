import * as React from 'react';

export interface SidebarLinkGroupProps {
	children: React.ReactNode;
	activeCondition: boolean;
	linkGroupTitle: string;
	linkGroupIcon?: React.ReactNode;
}

export const SidebarLinkGroup: React.FC<SidebarLinkGroupProps> = ({
	children,
	activeCondition,
	linkGroupTitle,
	linkGroupIcon,
}) => {
	const [open, setOpen] = React.useState(activeCondition);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${activeCondition && 'bg-slate-900'}`}>
			<a
				href="#0"
				className={`block text-slate-200 hover:text-white truncate transition duration-150`}
				onClick={(event) => {
					event.preventDefault();
					handleClick();
				}}>
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						{linkGroupIcon || null}
						<span className="text-sm font-medium ltr:ml-3 rtl:mr-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
							{linkGroupTitle}
						</span>
					</div>

					{/* Icon */}
					<div className="flex shrink-0 ltr:ml-2 rtl:mr-2">
						<svg
							className={`w-3 h-3 shrink-0 ltr:ml-1 rtl:mr-1 fill-current text-slate-400 ${
								open && 'transform rotate-180'
							}`}
							viewBox="0 0 12 12">
							<path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
						</svg>
					</div>
				</div>
			</a>

			<div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
				<ul className={`ltr:pl-9 rtl:pr-9 mt-1 ${!open && 'hidden'}`}>{children}</ul>
			</div>
		</li>
	);
};
