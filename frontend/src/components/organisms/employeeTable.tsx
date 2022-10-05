import React, { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { useApiContext } from '../../context/api';
import { IEmployee } from '../../utils/interfaces/user/employee.interface';
interface IEmployeeTable {
	employee: IEmployee[];
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
const columns: TableColumn<IEmployee>[] = [
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
];

const EmployeeTable: React.FC<IEmployeeTable> = ({ employee }) => {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);
	const { getAllEmployees } = useApiContext();
	const fetchData = async (page: number, size: number) => {
		const result = await getAllEmployees(page, size);
		setIsLoaded(true);
		setItems(result);
		setTotalRows(13);
	};

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
		navigate(`/employees/${row.id}`);
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
					data={items}
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
export default EmployeeTable;
