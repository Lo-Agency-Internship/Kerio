import { useEffect, useState } from 'react';
import Profile from '../components/molecules/profile';
import Timeline from '../components/molecules/timeline';
import Note from '../components/molecules/note';
import NoteModal from '../components/molecules/noteModal';
import { useApiContext } from '../context/api';
import Images from '../assets/images/user.png';
import { useParams } from 'react-router-dom';
import { IUser } from '../utils/interfaces/user';
import Loading from '../components/molecules/loading';

export default function Contact() {
	const [contact, setContact] = useState<IUser>();
	const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
	const { getContactsInfoById, isLoading } = useApiContext();
	const { id } = useParams();

	useEffect(() => {
		getContactsInfoById(id as string).then((res: any) => setContact(res));
	}, []);
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div>
					<div className="flex justify-start mt-8 w-12/12 ">
						<div className="flex bg-gray-500 ml-8 p-2 rounded-xl">
							<div className="flex -space-x-1 overflow-hidden">
								<img className="h-10 w-10 rounded-full ring-1 ring-white" src={Images} alt="" />
							</div>
							<h1 className="pt-2 pl-4 font-bold">{contact?.name} Informations</h1>
						</div>
					</div>
					<div className="flex justify-center">{showNoteModal && <NoteModal setOpen={setShowNoteModal} />}</div>
					<Profile setUser={setContact} user={contact} />

					<div className="flex justify-center w-12/12 border">
						<Timeline />
						<Note setShowNoteModal={setShowNoteModal} />
					</div>
				</div>
			)}
		</>
	);
}
