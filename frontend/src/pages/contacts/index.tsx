import { useApiContext } from '../../context/api';
import { useEffect } from 'react';
import Loading from '../../components/molecules/loading';
import ContactTable from '../../components/organisms/contactTable';
import { Page } from '../../layout/page';
import App from '../../components/organisms/contactTable2';

export default function ContactsPage() {
	const { getContacts, change, isLoading, contacts, setContacts } = useApiContext();
	useEffect(() => {
		getContacts(1, 5).then(setContacts);
	}, []);

	return (
		<Page
			header={{
				actions: [() => <p>Salam</p>, () => <h1>Hey</h1>],
			}}>
			{isLoading ? <Loading /> : <App />}
		</Page>
	);
}
