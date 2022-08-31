import { useApiContext } from '../context/api';
import { useEffect, useState } from 'react';
import EmployeeCard from '../components/molecules/employeeCard';
interface IEmployee {
	name: string;
	phone: string;
	email: string;
	role: string;
}
export default function Employees() {
	const [employees, setEmployees] = useState<IEmployee[]>();
	const data: IEmployee[] = [
		{
			name: 'Mohamadreza',
			phone: '092356565',
			email: 'mohamadreza@loagency.de',
			role: 'owner',
		},
		{
			name: 'maryam',
			phone: '092356565',
			email: 'maryam@loagency.de',
			role: 'owner',
		},
		{
			name: 'hutan',
			phone: '092356565',
			email: 'hutan@loagency.de',
			role: 'owner',
		},
		{
			name: 'samira',
			phone: '092356565',
			email: 'samira@loagency.de',
			role: 'owner',
		},
		{
			name: 'farzaneh',
			phone: '092356565',
			email: 'farzaneh@loagency.de',
			role: 'owner',
		},
		{
			name: 'Khashi',
			phone: '092356565',
			email: 'Khashi@loagency.de',
			role: 'owner',
		},
		{
			name: 'pouyan',
			phone: '092356565',
			email: 'pouyan@loagency.de',
			role: 'owner',
		},
		{
			name: 'mahsa',
			phone: '092356565',
			email: 'mahsa@loagency.de',
			role: 'owner',
		},
	];
	useEffect(() => {
		setEmployees(data);
	}, []);
	return (
		<>
			{data.map((element, index) => (
				<EmployeeCard employee={element} key={index} />
			))}{' '}
		</>
	);
}
