import { useApiContext } from '../../context/api';
import { useState } from 'react';
import { Page } from '../../layout/page';
import { Button } from '../../components/atoms/button';
import NewContactModal from '../../components/templates/newContactModal';
import ContactTable from '../../components/organisms/contactTable';
import { IUsers } from '../../utils/interfaces/user';
import DeleteModal from '../../components/molecules/deleteModal';
import { ToastContainer, toast } from 'react-toastify';
import ContactStatusSelect from './ContactStatusSelect';

export default function ContactsPage() {
	const { getAllContacts, deleteContacts } = useApiContext();
	const [showAddConactModal, setShowAddConactModal] = useState(false);
	const [contacts, setContacts] = useState<IUsers[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [selectedRows, setSelectedRows] = useState<IUsers[]>([]);
	const [toggleCleared, setToggleCleared] = useState(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [error, setError] = useState(0);
	const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
	const scoreDigit = (result: any) => {
		result.contacts.forEach((contact: any) => {
			contact.totalScore = parseFloat(contact.totalScore).toFixed(2);
		});
		setContacts(result.contacts);
		setTotalRows(result.contacts.length);
	};

	const fetchData = async (page: number, size: number) => {
		const result = await getAllContacts({ pagination: { page, size } });
		result.contacts.forEach((contact: any) => {
			contact.totalScore = parseFloat(contact.totalScore).toFixed(2);
		});
		setIsLoaded(true);
		scoreDigit(result);
	};

	const handleDelete = async () => {
		setIsLoadingSubmit(true);
		try {
			const ids = selectedRows.map((element) => {
				return element.id;
			});
			await deleteContacts(ids);
			setToggleCleared(!toggleCleared);
			await fetchData(currentPage, perPage);
			setShowDeleteModal(false);
			toast.success(
				selectedRows.length === 1 ? `${selectedRows[0].name} Deleted!` : `${selectedRows.length} Contacts Deleted! `,
				{
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				},
			);
		} catch (err: any) {
			setError(err.response.data.message);
			toast.error('Something went wrong! ', {
				position: 'top-right',
				autoClose: 8000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		}
		setTimeout(() => {
			setIsLoadingSubmit(false);
		}, 500);
	};
	return (
		<>
			<Page
				header={{
					actions: [
						() => <Button label="New Contact" type="submit" onClick={() => setShowAddConactModal(true)}></Button>,
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
				<ContactStatusSelect scoreDigit={scoreDigit} />
				<ContactTable
					toggleCleared={toggleCleared}
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
					setCurrentPage={setCurrentPage}
				/>

				<DeleteModal
					open={showDeleteModal}
					setOpen={setShowDeleteModal}
					title={'Delete Modal'}
					handleDelete={handleDelete}
					loading={isLoadingSubmit}>
					{selectedRows.length !== 1 ? (
						<p>Are you sure that you want Delete these contacts ?</p>
					) : (
						<p>
							Are you sure that you want Delete <span className="text-red-700">{selectedRows[0].name}</span> ?
						</p>
					)}
				</DeleteModal>
			</Page>
			<ToastContainer
				position="top-right"
				autoClose={8000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</>
	);
}
