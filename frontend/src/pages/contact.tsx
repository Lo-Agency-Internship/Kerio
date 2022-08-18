import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { IUser } from '../utils/interfaces/user/index';
import Profile from '../components/molecules/profile';
import Timeline from '../components/molecules/timeline';
import Note from '../components/molecules/note';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { backend } from '../utils';

export default function Contact() {
	// const receivedUser: IUser = {
	// 	id: 1,
	// 	name: 'khashayar',
	// 	phone: '09123456789',
	// 	email: 'khashayar@gmail.com',
	// 	status: 'lead',
	// };

	const { id } = useParams();
	const [user, setUser] = useState<IUser>();
	const getData = async () => {
		const { data } = await axios.get(backend(`contacts/${id}`));
		setUser(data);
	};
	useEffect(() => {
		getData();
		// setUser(receivedUser);
	}, [user]);

	return (
		<>
			<div>
				<div className="border flex flex-row justify-between align-baseline mt-32 ml-32">
					<h1 className="p-2">{user?.name} Informations</h1>
				</div>
				<Profile user={user} setUser={setUser} />
				<Timeline />
				<Note />
			</div>
		</>
	);
}
