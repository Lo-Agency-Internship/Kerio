import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import Profile from '../components/molecules/profile';
import Timeline from '../components/molecules/timeline';
import Note from '../components/molecules/note';
import { useApiContext } from '../context/api';
import Images from '../assets/images/user1.jpg';

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
				<div className="flex justify-start mt-8 w-12/12 ">
					<div className="flex hover:bg-gray-500 ml-8 p-2 rounded-xl">
						<div className="flex -space-x-1 overflow-hidden">
							<img
								className="h-10 w-10 rounded-full ring-1 ring-white"
								src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
								alt=""
							/>
						</div>
						<h1 className="pt-2 pl-4 font-bold">{user?.name} Informations</h1>
					</div>
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
