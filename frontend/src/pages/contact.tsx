import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import Profile from '../components/molecules/profile';
import Timeline from '../components/molecules/timeline';
import Note from '../components/molecules/note';
import { useApiContext } from '../context/api';
import Images from '../assets/images/user.png';

export default function Contact() {
	const { user, setUser } = useApiContext();
	return (
		<>
			<div>
				<div className="flex justify-start mt-8 w-12/12 ">
					<div className="flex bg-gray-500 ml-8 p-2 rounded-xl">
						<div className="flex -space-x-1 overflow-hidden">
							<img className="h-10 w-10 rounded-full ring-1 ring-white" src={Images} alt="" />
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
