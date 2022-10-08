import { useApiContext } from '../../context/api';
import { useEffect, useState } from 'react';
import { Page } from '../../layout/page';
import { Button } from '../../components/atoms/button';
import NewContactModal from '../../components/templates/newContactModal';
import ContactTable from '../../components/organisms/contactTable';

export default function ContactsPage() {
	const { getAllContacts, contacts, setContacts } = useApiContext();
	const [showAddConactModal, setShowAddConactModal] = useState(false);

	useEffect(() => {
		getAllContacts(1, 5).then(setContacts);
	}, []);

	return (
		<Page>
			<NewContactModal open={showAddConactModal} setOpen={setShowAddConactModal} />
			<ContactTable contact={contacts} />
		</Page>
	);
}
