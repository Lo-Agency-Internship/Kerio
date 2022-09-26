import DataTable, { TableColumn } from 'react-data-table-component';
import { IUser } from '../../utils/interfaces/user';
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

export default ContactTable;
