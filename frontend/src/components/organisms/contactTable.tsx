import React, { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { useApiContext } from '../../context/api';
import { IUser } from '../../utils/interfaces/user';
interface IContactTable {
	contact: IUser[];
	setContacts: any;
	fetchData: any;
	isLoaded: boolean;
	totalRows: number;
	perPage: number;
	setPerPage: (page: React.SetStateAction<number>) => void;
}

const customStyles = {
	rows: {
		style: {
			minHeight: '72px', // override the row height
		},
	},
	headCells: {
		style: {
			paddingLeft: '8px', // override the cell padding for head cells
			paddingRight: '8px',
		},
	},
	cells: {
		style: {
			paddingLeft: '8px', // override the cell padding for data cells
			paddingRight: '8px',
		},
	},
};
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
		selector: (row) => row.lastStatus.status.status as any,
		sortable: true,
	},
	{
		name: 'Score',
		selector: (row) => row.score as string,
		sortable: true,
	},
];

const ContactTable: React.FC<IContactTable> = ({
	contact,
	setContacts,
	fetchData,
	isLoaded,
	totalRows,
	perPage,
	setPerPage,
}) => {
	const [error, setError] = useState(null);

	const { getAllContacts } = useApiContext();

	useEffect(() => {
		fetchData(1, perPage);
	}, [perPage]);

	const handlePageChange = (page: any) => {
		fetchData(page, perPage);
	};

	const handlePerRowsChange = async (newPerPage: React.SetStateAction<number>, page: any) => {
		setPerPage(newPerPage);
	};
	const navigate = useNavigate();
	const handleRowClicked = (row: any) => {
		navigate(`/contacts/${row.id}`);
	};
	if (error) {
		return <div>Error</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			<>
				<DataTable
					columns={columns}
					data={contact}
					pagination
					paginationServer
					paginationTotalRows={totalRows}
					onChangePage={handlePageChange}
					onChangeRowsPerPage={handlePerRowsChange}
					onRowClicked={handleRowClicked}
					highlightOnHover
					pointerOnHover
					customStyles={customStyles}
				/>
			</>
		);
	}
};
export default ContactTable;
