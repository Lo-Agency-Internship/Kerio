import { useState } from 'react';
import { AccountPanel } from '../../components/organisms/accountPanel';
import SettingsSidebar from '../../components/organisms/accountSetting';

import { IUser } from '../../utils/interfaces/user';

export interface AccountProps {
	user?: IUser;
	setUser?: (value: IUser) => void;
}

export const Account: React.FC<AccountProps> = ({ user, setUser }) => {
	const [contact, setContact] = useState<IUser>();
	console.log(user);
	return (
		<div className="flex h-screen overflow-hidden">
			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				<main>
					<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
						{/* Page header */}
						<div className="mb-8">
							{/* Title */}
							<h1 className="text-2xl md:text-3xl text-slate-800 font-bold">{user?.name}✨</h1>
						</div>

						{/* Content */}
						<div className="bg-white shadow-lg rounded-sm mb-8">
							<div className="flex flex-col md:flex-row md:-mr-px">
								<SettingsSidebar />
								<AccountPanel user={user} />
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};
