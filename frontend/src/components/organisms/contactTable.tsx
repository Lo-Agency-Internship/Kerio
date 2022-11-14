import React, { useState, useEffect, useMemo } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../utils/interfaces/user';
import { Button } from '../atoms/button';

interface IContactTable {
	contact: IUser[];
	setContacts: any;
	fetchData: any;
	isLoaded: boolean;
	totalRows: number;
	perPage: number;
	setPerPage: (page: React.SetStateAction<number>) => void;
	setSelectedRows: any;
	selectedRows: IUser[];
	showDeleteModal: boolean;
	setShowDeleteModal: any;
	toggleCleared: any;
	setCurrentPage: any;
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
	header: {
		style: {
			minHeight: '50px',
			maxHeight: '60px',
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
	fetchData,
	isLoaded,
	totalRows,
	perPage,
	setPerPage,
	setSelectedRows,
	selectedRows,
	showDeleteModal,
	setShowDeleteModal,
	toggleCleared,
	setCurrentPage,
}) => {
	const [error] = useState(null);
	useEffect(() => {
		fetchData(1, perPage);
	}, [perPage]);

	const handlePageChange = (page: any) => {
		fetchData(page, perPage);
		setCurrentPage(page);
	};

	const handlePerRowsChange = async (newPerPage: React.SetStateAction<number>) => {
		setPerPage(newPerPage);
	};
	const navigate = useNavigate();
	const handleRowClicked = (row: any) => {
		navigate(`/contacts/${row.id}`);
	};

	const handleRowSelected = React.useCallback((state: any) => {
		setSelectedRows(state.selectedRows);
	}, []);
	const contextActions = useMemo(() => {
		return (
			<Button
				onClick={() => {
					setSelectedRows(selectedRows);
					setShowDeleteModal(!showDeleteModal);
				}}
				label="Delete"
				type="button"
				style="mt-3 inline-flex w-full flex items-center justify-center rounded-md border bg-rose-500 px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-rose-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
			/>
		);
	}, [contact, selectedRows, toggleCleared]);

	if (error) {
		return <div>Error</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			<>
				<DataTable
					columns={columns}
					title="Contacts"
					data={contact}
					selectableRows
					contextActions={contextActions}
					onSelectedRowsChange={handleRowSelected}
					clearSelectedRows={toggleCleared}
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
