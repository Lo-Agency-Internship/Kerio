import { useState } from 'react';
import SidebarEmployee from '../../components/organisms/sideBarEmployee';
import ProfileBody from './profile';

function AccountEmployee() {
	const [showSideBarEmployee, setShowSideBarEmployee] = useState(false);

	return (
		<div className="flex h-screen overflow-hidden">
			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
				<main>
					<div className="relative flex">
						{/* Profile sidebar */}
						<SidebarEmployee profileSidebarOpen={setShowSideBarEmployee} setProfileSidebarOpen={showSideBarEmployee} />

						{/* Profile body */}
						<ProfileBody />
					</div>
				</main>
			</div>
		</div>
	);
}

export default AccountEmployee;
