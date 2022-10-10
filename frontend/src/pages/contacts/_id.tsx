import { useEffect, useState } from 'react';
import Profile from '../../components/molecules/profile';
import Timeline from '../../components/molecules/timeline';
import Note from '../../components/molecules/note';
import { useApiContext } from '../../context/api';
import Images from '../../assets/images/user.png';
import { useParams } from 'react-router-dom';
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

	useEffect(() => {
		getContactsInfoById(id as string).then((res: any) => setContact(res));
	}, []);
	return (
		<Page
			header={{
				actions: [
					() => <Button label="New Contact" type="submit" style="" onClick={() => setShowNoteModal(true)}></Button>,
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
