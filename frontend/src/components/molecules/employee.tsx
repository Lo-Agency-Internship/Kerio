import { IEmployee } from '../../utils/interfaces/user/employee.interface';

import { useState } from 'react';

interface IEmployeeSideBar {
	data: IEmployee;
	employee: IEmployee;
	setEmployee: (value: IEmployee) => void;
}
const Employee: React.FC<IEmployeeSideBar> = ({ data, setEmployee }) => {
	const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);
	const [employees, setEmployees] = useState<IEmployee>(data);
	return (
		<>
			{/* Team members */}
			<li className="-mx-2">
				<button
					className="w-full p-2 rounded"
					onClick={() => {
						setProfileSidebarOpen(false);
						setEmployee(data);
					}}>
					<div className="flex items-center truncate">
						<div className="relative mr-2">
							<img
								className="w-8 h-8 rounded-full"
								src={'https://unsplash.it/70/71'}
								width="32"
								height="32"
								alt="User"
							/>
							<div className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
						</div>
						<div className="truncate">
							<span className="text-sm font-medium text-slate-800">{employees.name}</span>
						</div>
					</div>
				</button>
			</li>
		</>
	);
};
export default Employee;
