import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { uri } from '../utils';

export default function Activation() {
	const [error, setError] = useState<string | null>(null);
	const [message, setMessage] = useState<boolean>(false);
	const { email } = useParams();
	const active = async () => {
		try {
			await axios.get(uri(`enable`), {
				params: {
					email,
				},
			});
			setMessage(true);
		} catch (err: any) {
			setError(err.response.data.message);
		}

		useEffect(() => {
			active();
		}, []);
	};
	return (
		<div className="pt-6 md:p-8 text-center md:text-left space-y-4">
			{message && (
				<>
					<p className="text-red-700">Your account activated successfully!</p>
					<Link
						to="/Auth"
						className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
						<span className="ml-3">Click here for Registeration!</span>
					</Link>
				</>
			)}

			{error && <p className="text-red-700">{error}</p>}
		</div>
	);
}
