import { useState } from 'react';
import SidebarEmployee from '../../components/organisms/sideBarEmployee';
import { IEmployee } from '../../utils/interfaces/user/employee.interface';
import { EmployeesProfile } from './profile';

function AccountEmployee() {
	const [showSideBarEmployee, setShowSideBarEmployee] = useState(false);
	const [employee, setEmployee] = useState<IEmployee>();

	return (
		<div className="flex h-screen overflow-hidden">
			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
				<main>
					<div className="relative flex">
						{/* Profile sidebar */}
						<SidebarEmployee
							profileSidebarOpen={setShowSideBarEmployee}
							setProfileSidebarOpen={showSideBarEmployee}
							employee={employee}
							setEmployee={setEmployee}
						/>

						{/* Profile body */}
						{employee ? <EmployeesProfile employee={employee} setEmployee={setEmployee} /> : <p> SELECT </p>}
					</div>
				</main>
			</div>
		</div>
	);
}

export default AccountEmployee;
