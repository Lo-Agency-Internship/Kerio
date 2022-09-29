import { useEffect, useState } from 'react';
import { Button } from '../components/atoms/button';
import EmployeeCard from '../components/molecules/employeeCard';
import { Page } from '../layout/page';
import AddEmployModal from '../components/molecules/addEmployeeModal';
interface IEmployee {
	name: string;
	phone: string;
	email: string;
	role: string;
}
export default function Employees() {
	const [employees, setEmployees] = useState<IEmployee[]>();
	const [showAddEmployModal, setAddEmployModal] = useState<boolean>(false);

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
		<Page
			header={{
				actions: [
					() => (
						<Button
							style="mt-3 inline-flex w-full flex items-center justify-center rounded-md border border-blue-700 bg-white px-4 py-2 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							label={'Add Employee'}
							onClick={() => {
								setAddEmployModal(true);
							}}
						/>
					),
				],
			}}>
			{showAddEmployModal && <AddEmployModal setOpen={setAddEmployModal} />}
			{data.map((element, index) => (
				<EmployeeCard employee={element} key={index} />
			))}{' '}
		</Page>
	);
}
