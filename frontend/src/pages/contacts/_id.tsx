import { useEffect, useState } from 'react';
import Profile from '../../components/molecules/profile';
import Timeline from '../../components/molecules/timeline';
import Note from '../../components/molecules/note';
import { useApiContext } from '../../context/api';
import Images from '../../assets/images/user.png';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser } from '../../utils/interfaces/user';
import Loading from '../../components/molecules/loading';
import { Page } from '../../layout/page';
import { Button } from '../../components/atoms/button';
import NewNoteModal from '../../components/templates/newNoteModal';

export default function ContactPage() {
	const [contact, setContact] = useState<IUser>();
	const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
	const { getContactsInfoById, isLoading } = useApiContext();
	const { id } = useParams();
	const navigate = useNavigate();
	async function fetchData() {
		try {
			await getContactsInfoById(id as string).then((res: any) => setContact(res));
		} catch (err: any) {
			if (err.response.data.message === 'contact not found') {
				navigate('/404');
			}
		}
	}
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Page
			header={{
				actions: [
					() => (
						<Button
							style="mt-3 inline-flex w-full flex items-center justify-center rounded-md border border-blue-700 bg-white px-4 py-2 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							label={'Add Note'}
							onClick={() => {
								setShowNoteModal(true);
							}}
						/>
					),
				],
			}}>
			{showNoteModal && <NewNoteModal setOpen={setShowNoteModal} open={showNoteModal} />}

			{isLoading ? (
				<Loading />
			) : (
				<>
					<div>
						<div className="flex justify-start mt-8 w-12/12 ">
							<div className="flex bg-white ml-8 p-2 border-solid border-2 border-gray-300  rounded-xl">
								<div className="flex -space-x-1 overflow-hidden">
									<img className="h-10 w-10 rounded-full ring-1 ring-white" src={Images} alt="" />
								</div>
								<h1 className="pt-2 pl-4 font-bold">{contact?.name} Information</h1>
							</div>
						</div>
					</div>
					<div className="flex justify-center">
						{/* {showNoteModal && <NoteModal setOpen={setShowNoteModal} user={contact} setUser={setContact} />} */}
					</div>
					<Profile setUser={setContact} user={contact} />

					<div className="flex justify-center w-12/12 border">
						<Timeline />
						<Note user={contact} setUser={setContact} />
					</div>
				</>
			)}
		</Page>
	);
}
