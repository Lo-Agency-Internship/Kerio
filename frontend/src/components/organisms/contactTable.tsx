import { SetStateAction, useEffect, useState } from 'react';
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
	const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    fetchData(1, perPage);
  }, [perPage])

  const fetchData = async (page: number, per_page: number) => {
    fetch(`https://www.mecallapi.com/api/attractions?page=${page}&per_page=${per_page}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data);
          setTotalRows(result.total);
        },
        (error) => {
          setIsLoaded(true);
		  setError(error);
        }
      )
  }

  const handlePageChange = (page: any) => {
    fetchData(page, perPage);
  }

  const handlePerRowsChange = async (newPerPage: SetStateAction<number>, page: any) => {
    setPerPage(newPerPage);
  }
  if (error) {
    return <div>{error && <p className="text-red-700">{error}</p>}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

	return(
		<div className="App">
	 <DataTable columns={columns} 
	 data={contact} 
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

export default ContactTable;
