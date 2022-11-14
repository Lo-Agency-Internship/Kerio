// import { useApiContext } from '../../context/api';
import { useEffect, useState } from 'react';
import { Page } from '../../layout/page';
// import { Button } from '../../components/atoms/button';
// import NewEmployeeModal from '../../components/templates/newEmployeeModal';
// import { IEmployee } from '../../utils/interfaces/user/employee.interface';
import axios from 'axios';
import { uri } from '../../utils';
import AccountEmployee from './accountEmployee';

export default function EmployeesPage() {
	// const { getAllEmployees, setEmployee } = useApiContext();
	// const [showAddConactModal, setShowAddConactModal] = useState(false);
	// const [showAddEmployModal, setAddEmployModal] = useState<boolean>(false);
	const headerAuth = {
		headers: {
			Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
		},
	};
	const readEmployee = async () => {
		const data = await axios.get(uri('users'), headerAuth);
	};

	useEffect(() => {
		// getAllEmployees(readEmployee).then(setEmployee);
		readEmployee();
	}, []);

	return (
		<Page
			header={
				{
					// actions: [
					// 	() => <Button label="New Employee" type="submit" style="" onClick={() => setAddEmployModal(true)}></Button>,
					// ],
				}
			}>
			{/* {showAddEmployModal && <NewEmployeeModal setOpen={setAddEmployModal} open={showAddEmployModal} />} */}
			{/* {data.map((element: any, index: any) => (
				<EmployeeCard employee={element} key={index} />
			
			))}{' '} */}
			{/* <EmployeeTable employee={[]} /> */}
			<AccountEmployee />
		</Page>
	);
}
