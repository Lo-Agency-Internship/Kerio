import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/atoms/button';
import LogoutModal from '../components/molecules/logoutModal';
import { uri } from '../utils';

export default function Activation() {
	const [error, setError] = useState<string | null>(null);
	const [message, setMessage] = useState<boolean>(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [searchParams] = useSearchParams();
	const email = searchParams.get('email');
	const navigate = useNavigate();
	const active = async () => {
		try {
			await axios.get(uri(`auth/enable?email=${email}`), {});
			setMessage(true);
		} catch (err: any) {
			setError(err.response.data.message);
		}
	};

	const logoutModal = () => {
		if (localStorage.getItem('access_token')) {
			localStorage.removeItem('access_token');
			navigate('/auth');
		} else navigate('/auth');
	};

	useEffect(() => {
		active();
	}, []);
	return (
		<>
			<LogoutModal title={'Ops'} open={showDeleteModal} setOpen={setShowDeleteModal} logoutModal={logoutModal}>
				<p>You signed in</p>
			</LogoutModal>
			<div className="bg-white p-9 h-screen w-screen flex flex-col items-center justify-center space-y-4">
				{message ? (
					<>
						<p className="text-green-700 font-bold">Your account activated successfully!</p>
						<Button
							style="w-42 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-solid border-2 border-indigo-600 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
							label="Click here for Sign In!"
							onClick={() => setShowDeleteModal(true)}
						/>
					</>
				) : (
					<>{error && <p className="text-red-700 font-bold">{error}</p>}</>
				)}
			</div>
		</>
	);
}
