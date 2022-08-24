import { useApiContext } from '../context/api';
import { useEffect, useState } from 'react';
import ContactCards from '../components/molecules/contactCard';

export default function Dashboard() {
	const { getContacts, change } = useApiContext();
	const [contacts, setContacts] = useState([]);
	useEffect(() => {
		getContacts().then(setContacts);
	}, [change]);
	return (
		<>
			{contacts.map((element, index) => (
				<ContactCards contact={element} key={index} />
			))}
		</>
	);
}
