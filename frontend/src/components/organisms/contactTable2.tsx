import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

const columns = [
	{
		name: 'Name',
		selector: (row: any) => row.name as string,
		sortable: true,
	},
	{
		name: 'Email',
		selector: (row: any) => row.email as string,
		sortable: true,
	},
	{
		name: 'Phone',
		selector: (row: any) => row.phone as string,
		sortable: true,
	},
	{
		name: 'Status',
		selector: (row: any) => row.status as string,
		sortable: true,
	},
	{
		name: 'Score',
		selector: (row: any) => row.score as string,
		sortable: true,
	},
];

function App() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);

	const fetchData = async (page: number, size: number) => {
		fetch(`contacts${page}&size=${perPage}`)
			.then((res) => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					setItems(result.data);
					setTotalRows(result.total);
				},
				// (error) => {
				// 	setIsLoaded(true);
				// 	setError(error);
				// },
			);
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

	if (error) {
		return <div>Error: {error}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			<div className="App">
				<DataTable
					columns={columns}
					data={items}
					pagination
					paginationServer
					paginationTotalRows={totalRows}
					onChangePage={handlePageChange}
					onChangeRowsPerPage={handlePerRowsChange}
				/>
			</div>
		);
	}
}

export default App;
