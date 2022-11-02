import { useApiContext } from '../../context/api';
import { useEffect, useState } from 'react';
import { Page } from '../../layout/page';
import { Button } from '../../components/atoms/button';
import EmployeeTable from '../../components/organisms/employeeTable';
import NewEmployeeModal from '../../components/templates/newEmployeeModal';
import EmployeeCard from '../../components/molecules/employeeCard';
import { IEmployee } from '../../utils/interfaces/user/employee.interface';

export default function EmployeesPage() {
	const { getAllEmployees, setEmployee } = useApiContext();
	// const [showAddConactModal, setShowAddConactModal] = useState(false);
	const [showAddEmployModal, setAddEmployModal] = useState<boolean>(false);

	// const data: IEmployee[] = [
	// 	{
	// 		name: 'Mohamadreza',
	// 		email: 'mohamadreza@loagency.de',
	// 	},
	// 	{
	// 		name: 'maryam',
	// 		email: 'maryam@loagency.de',
	// 	},
	// 	{
	// 		name: 'hutan',
	// 		email: 'hutan@loagency.de',
	// 	},
	// 	{
	// 		name: 'samira',
	// 		email: 'samira@loagency.de',
	// 	},
	// 	{
	// 		name: 'farzaneh',
	// 		email: 'farzaneh@loagency.de',
	// 	},
	// ];
	useEffect(() => {
		getAllEmployees(1, 5).then(setEmployee);
	}, []);

	return (
		<Page
			header={{
				actions: [
					() => <Button label="New Employee" type="submit" style="" onClick={() => setAddEmployModal(true)}></Button>,
				],
			}}>
			{showAddEmployModal && <NewEmployeeModal setOpen={setAddEmployModal} open={showAddEmployModal} />}
			{/* {data.map((element: any, index: any) => (
				<EmployeeCard employee={element} key={index} />
			))}{' '} */}
			<EmployeeTable employee={[]} />
		</Page>
	);
}
