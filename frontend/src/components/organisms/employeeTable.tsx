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
];

const EmployeeTable: React.FC<IEmployeeTable> = () => {
	const [error] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);
	const { getAllEmployees } = useApiContext();
	const fetchData = async () => {
		const result = await getAllEmployees();
		setIsLoaded(true);
		setItems(result);
		// setTotalRows(13);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const navigate = useNavigate();
	const handleRowClicked = (row: any) => {
		navigate(`/employees/${row.id}`);
		console.log('hi');
		console.log(handleRowClicked);
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
					// onChangePage={handlePageChange}
					// onChangeRowsPerPage={handlePerRowsChange}
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
