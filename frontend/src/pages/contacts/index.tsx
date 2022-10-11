import { useApiContext } from '../../context/api';
import { useEffect, useState } from 'react';
import { Page } from '../../layout/page';
import { Button } from '../../components/atoms/button';
import NewContactModal from '../../components/templates/newContactModal';
import ContactTable from '../../components/organisms/contactTable';
import { IUser } from '../../utils/interfaces/user';

export default function ContactsPage() {
	const { getAllContacts } = useApiContext();
	const [showAddConactModal, setShowAddConactModal] = useState(false);
	const [contacts, setContacts] = useState<IUser[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);
	useEffect(() => {
		getAllContacts(1, 5).then(setContacts);
	}, []);
	const fetchData = async (page: number, size: number) => {
		const result = await getAllContacts(page, size);
		setIsLoaded(true);
		setContacts(result.contacts);
		setTotalRows(result.metadata.total);
	};
	console.log(fetchData);

	return (
		<Page
			header={{
				actions: [
					() => (
						<Button label="New Contact" type="submit" style="" onClick={() => setShowAddConactModal(true)}></Button>
					),
				],
			}}>
			<NewContactModal
				open={showAddConactModal}
				setOpen={setShowAddConactModal}
				setContact={setContacts}
				fetchData={fetchData}
				totalRows={totalRows}
				perPage={perPage}
			/>
			<ContactTable
				contact={contacts}
				setContacts={setContacts}
				fetchData={fetchData}
				isLoaded={isLoaded}
				totalRows={totalRows}
				perPage={perPage}
				setPerPage={setPerPage}
			/>
		</Page>
	);
}
