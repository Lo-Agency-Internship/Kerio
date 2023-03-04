import { useState } from 'react';
import { AccountPanel } from '../../components/organisms/accountPanel';
import NotePannel from '../../components/organisms/notePannel';
import SettingsSidebar from '../../components/organisms/settingSidebar';
import { IUserById } from '../../utils/interfaces/user';
import RoadMapPannel from '../../components/organisms/roadMapPannel';

export interface AccountProps {
	user?: IUserById;
	setUser?: (value: IUserById) => void;
}

export const Account: React.FC<AccountProps> = ({ user, setUser }) => {
	const [sidebarActiveItem, setSidebarActiveItem] = useState('account');
	return (
		<div className="flex h-screen overflow-y-scroll w-full">
			{/* Content area */}
			<div className="relative flex flex-col flex-1 ">
				<main>
					<div className="px-4 sm:px-6 lg:px-8 py-8 max-w-9xl mx-auto w-full">
						{/* Page header */}
						<div className="mb-8">
							{/* Title */}
							<h1 className="text-2xl md:text-3xl text-slate-800 font-bold">{user?.name}✨</h1>
						</div>

						{/* Content */}
						<div className="bg-white shadow-lg rounded-sm mb-8">
							<div className="flex flex-col md:flex-row md:-mr-px">
								<SettingsSidebar
									setActive={setSidebarActiveItem}
									active={sidebarActiveItem}
									settingItems={[
										{
											label: 'account',
											icon: () => (
												<svg className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2`} viewBox="0 0 16 16">
													<path d="M12.311 9.527c-1.161-.393-1.85-.825-2.143-1.175A3.991 3.991 0 0012 5V4c0-2.206-1.794-4-4-4S4 1.794 4 4v1c0 1.406.732 2.639 1.832 3.352-.292.35-.981.782-2.142 1.175A3.942 3.942 0 001 13.26V16h14v-2.74c0-1.69-1.081-3.19-2.689-3.733zM6 4c0-1.103.897-2 2-2s2 .897 2 2v1c0 1.103-.897 2-2 2s-2-.897-2-2V4zm7 10H3v-.74c0-.831.534-1.569 1.33-1.838 1.845-.624 3-1.436 3.452-2.422h.436c.452.986 1.607 1.798 3.453 2.422A1.943 1.943 0 0113 13.26V14z" />
												</svg>
											),
										},
										{
											label: 'notes',
											icon: () => (
												<svg className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2`} viewBox="0 0 16 16">
													<path d="M3.414 2L9 7.586V16H7V8.414l-5-5V6H0V1a1 1 0 011-1h5v2H3.414zM15 0a1 1 0 011 1v5h-2V3.414l-3.172 3.172-1.414-1.414L12.586 2H10V0h5z" />
												</svg>
											),
										},
										{
											label: 'roadmap',
											icon: () => (
												<svg className={`w-4 h-4 shrink-0 fill-current text-slate-400 mr-2`} viewBox="0 0 16 16">
													<path d="M5 9h11v2H5V9zM0 9h3v2H0V9zm5 4h6v2H5v-2zm-5 0h3v2H0v-2zm5-8h7v2H5V5zM0 5h3v2H0V5zm5-4h11v2H5V1zM0 1h3v2H0V1z" />
												</svg>
											),
										},
									]}
								/>
								{sidebarActiveItem === 'account' && (
									<>
										<AccountPanel user={user} setUser={setUser} />
									</>
								)}
								{sidebarActiveItem === 'notes' && (
									<>
										<NotePannel statuses={user?.statuses} />
									</>
								)}
								{sidebarActiveItem === 'roadmap' && (
									<>
										<RoadMapPannel />
									</>
								)}
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};
