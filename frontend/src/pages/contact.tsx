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

	// getting the id from url and setting the state via the id 
	const { id } = useParams();
	const [user, setUser] = useState<IUser>();
	const getData = async () => {
		const { data } = await axios.get(backend(`contacts/${id}`));
		setUser(data);
	};
	useEffect(() => {
		getData();
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
