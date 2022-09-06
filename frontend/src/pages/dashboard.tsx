import { useApiContext } from '../context/api';
import { useEffect, useState } from 'react';
import ContactCards from '../components/molecules/contactCard';
import Loading from '../components/molecules/loading';

export default function Dashboard() {
	const { getAllContacts, change, isLoading } = useApiContext();
	const [contacts, setContacts] = useState([]);
	useEffect(() => {
		getAllContacts('contacts').then(setContacts);
	}, [change]);
	return (
		<>{isLoading ? <Loading /> : contacts.map((element, index) => <ContactCards contact={element} key={index} />)}</>
	);
}
