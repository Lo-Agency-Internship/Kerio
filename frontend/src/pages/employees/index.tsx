import { useEffect, useState } from 'react';
import { SidebarEmployee } from '../../components/organisms/sideBarEmployee';
import { useApiContext } from '../../context/api';
import { Page } from '../../layout/page';
import { IEmployee } from '../../utils/interfaces/api/employeeData.interface';

import { EmployeesProfile } from './profile';

export const EmployeesPage = () => {
	const [employee, setEmployee] = useState<IEmployee | null>();
	const { getAllEmployees } = useApiContext();
	const [employees, setEmployees] = useState<IEmployee[] | null>();
	const [error, setError] = useState<string[] | null>(null);
	const getEmployees = async () => {
		try {
			const data = await getAllEmployees();
			setEmployees(data.users);
		} catch (e: any) {
			setError(e.response.data.message);
		}
	};

	useEffect(() => {
		getEmployees();
	}, [employee]);
	return (
		<Page header={{}}>
			<div className="flex h-screen overflow-hidden">
				{/* Content area */}
				<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
					<main>
						<div className="relative flex">
							{/* Profile sidebar */}
							<SidebarEmployee
								employee={employee}
								setEmployee={setEmployee}
								employees={employees}
								setEmployees={setEmployees}
							/>
							{/* Profile body */}
							{employee ? (
								<EmployeesProfile employee={employee} setEmployee={setEmployee} setEmployees={setEmployees} />
							) : (
								<div className="self-start hidden lg:flex flex-col m-32 text-black">
									<div className="flex items-center mb-5">
										<h3 className="text-3xl font-semibold ml-2">Welcome</h3>
									</div>
									<h1 className="my-4 font-semibold text-5xl">Please select an employee</h1>
									<p className="text-sm opacity-75">Then you will see the infomation</p>
								</div>
							)}
						</div>
					</main>
				</div>
			</div>
		</Page>
	);
};
