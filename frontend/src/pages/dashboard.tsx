import { useApiContext } from '../context/api';
import { useEffect } from 'react';
import ContactCards from '../components/molecules/contactCard';
import Loading from '../components/molecules/loading';
import DataTable from 'react-data-table-component';
import ContactTable from '../components/organisms/contactTable';

export default function Dashboard() {
	const { getAllContacts, change, isLoading, contacts, setContacts } = useApiContext();
	useEffect(() => {
		getAllContacts().then(setContacts);
	}, [change]);

	return <>{isLoading ? <Loading /> : <ContactTable contact={contacts} />}</>;
}
