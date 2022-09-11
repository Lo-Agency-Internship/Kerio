import { useEffect, useState } from 'react';
import { useApiContext } from '../context/api';
import Images from '../assets/images/user.png';
import { useParams } from 'react-router-dom';
import { IEmployee } from '../utils/interfaces/user/employee.interface';
import Employee from '../components/molecules/employee';

export default function EmployeeProfile() {
	const [employee, setEmployee] = useState<IEmployee>();
	const { getEmployeesInfoById, isLoading } = useApiContext();
	const { id } = useParams();

	useEffect(() => {
		// 	getEmployeesInfoById(id as string).then((res: any) => setEmployee(res));
		console.log('ddddddddd');
	}, []);
	return (
		<>
			<div>
				<div className="flex justify-start mt-8 w-12/12 ">
					<div className="flex bg-gray-500 ml-8 p-2 rounded-xl">
						<div className="flex -space-x-1 overflow-hidden">
							<img className="h-10 w-10 rounded-full ring-1 ring-white" src={Images} alt="" />
						</div>
						<h1 className="pt-2 pl-4 font-bold">{employee?.name} Information</h1>
					</div>
					<h1 className="pt-2 pl-4 font-bold">{employee?.name} Information</h1>
				</div>
			</div>
			<Employee setUser={setEmployee} user={employee} />)
		</>
	);
}
