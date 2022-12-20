import * as React from 'react';

export interface SidebarProps {
	children: React.ReactNode;
	sidebarOpen: boolean;
	setSidebarOpen: (newState: boolean) => void;
	sidebarExpanded: boolean;
	setSidebarExpanded: (newState: boolean) => void;
	logo?: React.ReactNode;
	onLogoClicked?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}
export const Sidebar: React.FC<SidebarProps> = ({
	children,
	sidebarOpen,
	logo,
	onLogoClicked,
	setSidebarOpen,
	sidebarExpanded,
	setSidebarExpanded,
}) => {
	const trigger = React.useRef<any>(null);
	const sidebar = React.useRef<any>(null);
	// close on click outside
	React.useEffect(() => {
		const clickHandler = ({ target }: any) => {
			if (!sidebar.current || !trigger.current) return;
			if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
			setSidebarOpen(false);
		};
		document.addEventListener('click', clickHandler);
		return () => document.removeEventListener('click', clickHandler);
	});
	// close if the esc key is pressed
	React.useEffect(() => {
		const keyHandler = ({ keyCode }: any) => {
			if (!sidebarOpen || keyCode !== 27) return;
			setSidebarOpen(false);
		};
		document.addEventListener('keydown', keyHandler);
		return () => document.removeEventListener('keydown', keyHandler);
	});

	return (
		<div>
			{/* Sidebar backdrop (mobile only) */}
			<div
				className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
					sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
				aria-hidden="true"></div>

			{/* Sidebar */}
			<div
				id="sidebar"
				ref={sidebar}
				className={` flex  flex-col  absolute  z-40 ltr:left-0 rtl:right-0  top-0 lg:static ltr:lg:left-auto rtl:lg:right-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto  no-scrollbar w-64 lg:w-20 2xl:!w-64  shrink-0  bg-slate-800  p-4  transition-all  duration-200  ease-in-out ${
					sidebarOpen ? 'translate-x-0' : 'ltr:-translate-x-64 rtl:translate-x-64'
				}
        ${sidebarExpanded && 'lg:!w-64'}`}>
				{/* Sidebar header */}
				<div className="flex justify-between mb-10 ltr:pr-3 rtl:pl-3">
					{/* Close button */}
					<button
						ref={trigger}
						className="lg:hidden text-slate-500 hover:text-slate-400 ltr:rotate-0 rtl:rotate-180"
						onClick={() => setSidebarOpen(false)}>
						<span className=" sr-only">Close sidebar</span>
						<svg className=" w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
						</svg>
					</button>
					{/* Logo */}
					<a href="#" className=" block" onClick={onLogoClicked}>
						{logo}
					</a>
				</div>

				{/* Links */}
				<div className="space-y-8">{children}</div>
				{/* Expand / collapse button */}
				<div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
					<div className="px-3  py-2">
						<button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
							<span className="sr-only">Expand / collapse sidebar</span>
							<svg
								className={`w-6 h-6 fill-current ltr:rotate-0 rtl:rotate-180 ${
									sidebarExpanded && 'ltr:rotate-180 rtl:rotate-0'
								}`}
								viewBox="0 0 24 24">
								<path
									className=" text-slate-400"
									d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
								/>
								<path className="text-slate-600" d="M3 23H1V1h2z" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
