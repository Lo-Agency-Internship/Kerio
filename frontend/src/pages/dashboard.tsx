import { useApiContext } from '../context/api';
import { useEffect, useState } from 'react';
import ContactCards from '../components/molecules/contactCard';

export default function Dashboard() {
	const { getContacts } = useApiContext();
	const [contacts, setContacts] = useState([]);
	useEffect(() => {
		getContacts().then(setContacts);
	}, []);
	return (
		<>
			{contacts.map((element, index) => (
				<ContactCards contact={element} key={index} />
			))}
		</>
	);
}
