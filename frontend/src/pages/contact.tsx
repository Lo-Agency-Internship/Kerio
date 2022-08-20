import { useEffect, useState } from 'react';
import Profile from '../components/molecules/profile';
import Timeline from '../components/molecules/timeline';
import Note from '../components/molecules/note';
import { useApiContext } from '../context/api';
import Images from '../assets/images/user.png';
import { useParams } from 'react-router-dom';
import { IUser } from '../utils/interfaces/user';

export default function Contact() {
	const [contact, setContact] = useState<IUser>();
	const { getContactInfo } = useApiContext();
	const { id } = useParams();
	useEffect(() => {
		getContactInfo(id as string).then((res: any) => setContact(res));
	}, []);
	return (
		<>
			<div>
				<div className="flex justify-start mt-8 w-12/12 ">
					<div className="flex bg-gray-500 ml-8 p-2 rounded-xl">
						<div className="flex -space-x-1 overflow-hidden">
							<img className="h-10 w-10 rounded-full ring-1 ring-white" src={Images} alt="" />
						</div>
						<h1 className="pt-2 pl-4 font-bold">{contact?.name} Informations</h1>
					</div>
				</div>

				<Profile user={contact} setUser={setContact} />

				<div className="flex justify-center w-12/12 border">
					<Timeline />
					<Note />
				</div>
			</div>
		</>
	);
}
