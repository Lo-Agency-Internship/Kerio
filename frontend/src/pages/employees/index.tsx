import { useApiContext } from '../../context/api';
import { useEffect, useState } from 'react';
import { Page } from '../../layout/page';
import { Button } from '../../components/atoms/button';
import EmployeeTable from '../../components/organisms/employeeTable';
import AddEmployeeModal from '../../components/molecules/addEmployeeModal';

export default function EmployeesPage() {
	const { getAllEmployees, employee, setEmployee } = useApiContext();
	const [showAddConactModal, setShowAddConactModal] = useState(false);

	useEffect(() => {
		getAllEmployees(1, 5).then(setEmployee);
	}, []);

	return (
		<Page
			header={{
				actions: [
					() => (
						<Button label="New Contact" type="submit" style="" onClick={() => setShowAddConactModal(true)}></Button>
					),
				],
			}}>
			<EmployeeTable employee={[]} />
		</Page>
	);
}
