import { useApiContext } from '../../context/api';
import { useEffect, useState } from 'react';
import { Page } from '../../layout/page';
import { Button } from '../../components/atoms/button';
import NewContactModal from '../../components/templates/newContactModal';
import ContactTable from '../../components/organisms/contactTable';
import { IUser } from '../../utils/interfaces/user';
import DeleteModal from '../../components/molecules/deleteModal';
import {IApiPaginationParams} from '../../utils/interfaces/api/api.interface'
export default function ContactsPage() {
	const { getAllContacts } = useApiContext();
	const [showAddConactModal, setShowAddConactModal] = useState(false);
	const [contacts, setContacts] = useState<IUser[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [selectedRows, setSelectedRows] = useState<IUser[]>([]);

	useEffect(() => {
		getAllContacts().then(setContacts);
	}, []);
	const fetchData = async (payload:IApiPaginationParams) => {
		const result = await getAllContacts(payload);
		setIsLoaded(true);
		setContacts(result.contacts);
		setTotalRows(result.metadata.total);
	};

	const handleDelete = () => {
		console.log(selectedRows);
	};
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
				setSelectedRows={setSelectedRows}
				selectedRows={selectedRows}
				showDeleteModal={showDeleteModal}
				setShowDeleteModal={setShowDeleteModal}
			/>
			<DeleteModal
				open={showDeleteModal}
				setOpen={setShowDeleteModal}
				title={'Delete Modal'}
				handleDelete={handleDelete}>
				{selectedRows.length !== 1 ? (
					<p>Are you sure that you want Delete these contacts ?</p>
				) : (
					<p>
						Are you sure that you want Delete <span className="text-red-700">{selectedRows[0].name}</span> ?
					</p>
				)}
			</DeleteModal>
		</Page>
	);
}
