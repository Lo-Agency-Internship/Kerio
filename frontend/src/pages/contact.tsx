import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import Profile from '../components/molecules/profile';
import Timeline from '../components/molecules/timeline';
import Note from '../components/molecules/note';
import { useApiContext } from '../context/api';

export default function Contact() {
	const { user, setUser } = useApiContext();

	// const { id } = useParams();

	useEffect(() => {
		// async ()=>{
		// 	const {data} = await axios.get(`http://localhost:3001/contacts/${id}`)
		// 	setUser(data)
		// }
	}, []);

	return (
		<>
			<div>
				<div className="border flex justify-center mt-16 w-12/12">
					<h1 className="p-2">{user?.name} Informations</h1>
				</div>

				<Profile user={user} setUser={setUser} />

				<div className="flex justify-center w-12/12 border">
					<Timeline />
					<Note />
				</div>
			</div>
		</>
	);
}
