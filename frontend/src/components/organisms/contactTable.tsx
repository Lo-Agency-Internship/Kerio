import DataTable, { TableColumn } from 'react-data-table-component';
import { IUser } from '../../utils/interfaces/user';
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
	return <DataTable columns={columns} data={contact} />;
};

export default ContactTable;
