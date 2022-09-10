import { useApiContext } from '../context/api';
import { useEffect } from 'react';
import ContactCards from '../components/molecules/contactCard';
import Loading from '../components/molecules/loading';

export default function Dashboard() {
	const { getAllContacts, change, isLoading, contacts, setContacts } = useApiContext();
	useEffect(() => {
		getAllContacts().then(setContacts);
	}, [change]);
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				contacts.map((element: any, index: any) => <ContactCards contact={element} key={index} />)
			)}
		</>
	);
}
