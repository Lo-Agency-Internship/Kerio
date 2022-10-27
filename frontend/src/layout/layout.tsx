import React, { ReactNode, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/organisms/sidebar/sidebar';
import { SidebarGroup } from '../components/organisms/sidebar/sidebarGroup';
import { SidebarLink } from '../components/organisms/sidebar/sidebarLink';
import { SidebarLinkGroup } from '../components/organisms/sidebar/sidebarLinkGroup';
import NewContactModal from '../components/templates/newContactModal';
import NewEmployeeModal from '../components/templates/newEmployeeModal';

interface ILayout {
	children: ReactNode;
}
export default function Layout({ children }: ILayout) {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [showContactModal, setShowContactModal] = useState(false);
	const [showEmployeeModal, setShowEmployeeModal] = useState(false);
	const location = useLocation();
	const { pathname } = location;
	const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
	const [sidebarExpanded, setSidebarExpanded] = React.useState(
		storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
	);
	return (
		<>
			<div className="flex h-screen overflow-hidden">
				<Sidebar
					sidebarOpen={sidebarOpen}
					setSidebarOpen={setSidebarOpen}
					logo={
						<svg width="32" height="32" viewBox="0 0 32 32">
							<defs>
								<linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
									<stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
									<stop stopColor="#A5B4FC" offset="100%" />
								</linearGradient>
								<linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
									<stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
									<stop stopColor="#38BDF8" offset="100%" />
								</linearGradient>
							</defs>
							<rect fill="#6366F1" width="32" height="32" rx="16" />
							<path
								d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
								fill="#4F46E5"
							/>
							<path
								d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
								fill="url(#logo-a)"
							/>
							<path
								d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
								fill="url(#logo-b)"
							/>
						</svg>
					}>
					<SidebarGroup groupTitle="Pages">
						<SidebarLink
							href="/"
							anchor="Dashbaord"
							icon={
								<svg className="shrink-0 h-6 w-6 pr-1" viewBox="0 0 24 24">
									<path
										className={`fill-current text-slate-400 `}
										d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
									/>
									<path
										className={`fill-current text-slate-600 `}
										d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
									/>
									<path
										className={`fill-current text-slate-400 `}
										d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
									/>
								</svg>
							}
						/>
						<SidebarLinkGroup
							activeCondition={pathname.includes('contact')}
							linkGroupTitle={'Contacts'}
							linkGroupIcon={
								<svg className="shrink-0 h-6 w-6 pr-1" viewBox="0 0 24 24">
									<path
										className="fill-current text-slate-600 false"
										d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"></path>
									<path
										className="fill-current text-slate-400 false"
										d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"></path>
								</svg>
							}>
							<li className="mb-1 last:mb-0">
								<SidebarLink href="/contacts" anchor="Contacts" />
							</li>
							<li className="mb-1 last:mb-0">
								<SidebarLink onClick={() => setShowContactModal(true)} anchor="Add Contact" href={'#'} />
							</li>
						</SidebarLinkGroup>
						<SidebarLinkGroup
							activeCondition={pathname.includes('Employees')}
							linkGroupTitle={'Employees'}
							linkGroupIcon={
								<svg className="shrink-0 h-6 w-6 pr-1" viewBox="0 0 24 24">
									<path
										className={`fill-current text-slate-600 `}
										d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
									/>
									<path
										className={`fill-current text-slate-400 `}
										d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
									/>
								</svg>
							}>
							<li className="mb-1 last:mb-0">
								<SidebarLink href="/Employees" anchor="Employees" />
							</li>
							<li className="mb-1 last:mb-0">
								<SidebarLink onClick={() => setShowEmployeeModal(true)} anchor="Add Employee" href={'#'} />
							</li>
						</SidebarLinkGroup>
					</SidebarGroup>
					<SidebarGroup groupTitle="Settings">
						<SidebarLink href="/" anchor="Profile" />
					</SidebarGroup>
				</Sidebar>
				<NewContactModal
					open={showContactModal}
					setOpen={setShowContactModal}
					setContact={undefined}
					fetchData={undefined}
					totalRows={0}
					perPage={0}
				/>
				<NewEmployeeModal open={showEmployeeModal} setOpen={setShowEmployeeModal} />
				{children}
			</div>
		</>
	);
}
