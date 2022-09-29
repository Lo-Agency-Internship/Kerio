import { useApiContext } from '../../context/api';
import { useEffect, useState } from 'react';
import Loading from '../../components/molecules/loading';
// import ContactTable from '../../components/organisms/contactTable';
import { Page } from '../../layout/page';
import { Button } from '../../components/atoms/button';
import SignUpModal from '../../components/templates/signUpModal';
import NewContactModal from '../../components/templates/newContactModal';
import ContactTable from '../../components/organisms/contactTable';

export default function ContactsPage() {
	const { getAllContacts, change, isLoading, contacts, setContacts } = useApiContext();
	const [showAddConactModal, setShowAddConactModal] = useState(false);

	useEffect(() => {
		getAllContacts(1, 5).then(setContacts);
	}, []);

	return (
		<Page
			header={{
				actions: [
					() => (
						<Button label="New Contact" type="submit" style="" onClick={() => setShowAddConactModal(true)}></Button>
					),
				],
			}}>
			<NewContactModal open={showAddConactModal} setOpen={setShowAddConactModal} />
			<ContactTable contact={contacts} />
		</Page>
	);
}
