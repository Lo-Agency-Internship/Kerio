import axios from 'axios';
import { SetStateAction, useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { uri } from '../../utils';
import { IUser } from '../../utils/interfaces/user';
import { useApiContext } from '../../context/api';
import { useNavigate } from 'react-router-dom';
interface IContactTable {
	contact: IUser[];
}
const columns: TableColumn<IUser>[] = [
	{
		name: 'Name',
		selector: (row) => row.name as string,
		sortable: true,
	},
	{
		name: 'Email',
		selector: (row) => row.email as string,
		sortable: true,
	},
	{
		name: 'Phone',
		selector: (row) => row.phone as string,
		sortable: true,
	},
	{
		name: 'Status',
		selector: (row) => row.status as string,
		sortable: true,
	},
	{
		name: 'Score',
		selector: (row) => row.score as string,
		sortable: true,
	},
];

const ContactTable: React.FC<IContactTable> = ({ contact }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(5);
	const { getContacts } = useApiContext();
	const headerAuth = {
		headers: {
			Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
		},
	};
	const navigate = useNavigate();
	const handleRowClicked = (row: any) => {
		console.log(row.id);
		console.log(row);
		navigate(`/contacts/${row.id}`);
	};
	return (
		<DataTable
			columns={columns}
			data={contact}
			onRowClicked={handleRowClicked}
			highlightOnHover
			pointerOnHover
			// selectableRows
			pagination
		/>
	);
};

	// const fetchUsers = async (page: number, size: number) => {
	// 	setLoading(true);
	// 	console.log(page);
	// 	const response = await axios.get(uri(`contacts`), {
	// 		params: {
	// 			page,
	// 			size,
	// 		},
	// 		...headerAuth,
	// 	});

	// const response1 = await getAllContacts(page, perPage);
	// 	console.log(response);
	// 	console.log(response.data);
	// 	console.log(response.data.length);

	// 	setData(response.data.data);
	// 	setTotalRows(response.data.length);
	// 	setLoading(false);
	// };

	//

	// const handlePageChange = (page: number) => {
	// 	fetchUsers(page);
	// };

	// const handlePerRowsChange = async (newPerPage: SetStateAction<number>, page: number) => {
	// 	setLoading(true);
	// 	// console.log(page);
	// 	console.log({ perPage, page });

	// 	const response = await axios.get(uri(`contacts`), {
	// 		params: {
	// 			size: newPerPage,
	// 			page: page,
	// 		},
	// 		...headerAuth,
	// 	});
	// 	// const response1 = await getAllContacts(page, newPerPage);
	// 	console.log(response);

	// 	setData(response.data.data);
	// 	setPerPage(newPerPage);
	// 	setLoading(false);
	// };

	// useEffect(() => {
	// 	fetchUsers(1, 5); // fetch page 1 of users
	// }, []);

// 	return (
// 		<DataTable
// 			title="List Of Customer"
// 			columns={columns}
// 			data={contact}
// 			progressPending={loading}
// 			pagination
// 			paginationServer
// 			paginationTotalRows={totalRows}
// 			// onChangeRowsPerPage={handlePerRowsChange}
// 			// onChangePage={handlePageChange}
// 		/>
// 	);
// };
export default ContactTable;
