import { useApiContext } from '../../context/api';
import { useEffect } from 'react';
import Loading from '../../components/molecules/loading';
import ContactTable from '../../components/organisms/contactTable';
import { Page } from '../../layout/page';

export default function ContactsPage() {
	const { getAllContacts, change, isLoading, contacts, setContacts } = useApiContext();
	useEffect(() => {
		getAllContacts().then(setContacts);
	}, [change]);

	return (
		<Page
			header={{
				actions: [() => <p>Salam</p>, () => <h1>Hey</h1>],
			}}>
			{isLoading ? <Loading /> : <ContactTable contact={contacts} />}
		</Page>
	);
}
