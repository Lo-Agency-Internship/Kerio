import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IUser } from '../utils/interfaces/user/index';
import { Button } from '../components/atoms/button';
import axios from 'axios';
import Profile from '../components/molecules/profile';
import Timeline from '../components/molecules/timeline';
import Note from '../components/molecules/note';

export default function Contact(props: any) {
	const receivedUser: IUser = {
		id: 1,
		name: 'khashayar',
		phone: '09123456789',
		email: 'khashayar@gmail.com',
		status: 'lead',
	};

	const { id } = useParams();
	const [user, setUser] = useState<IUser>();

	useEffect(() => {
		// async ()=>{
		// 	const {data} = await axios.get(`http://localhost:3001/contacts/${id}`)
		// 	setUser(data)
		// }
		setUser(receivedUser);
	}, []);

	return (
		<>
			<div>
				<div className="border flex flex-row justify-between align-baseline">
					<h1 className="p-2">{user?.name} Informations</h1>
				</div>
				<Profile user={user} setUser={setUser} />
				<Timeline />
				<Note />
			</div>
		</>
	)
}
