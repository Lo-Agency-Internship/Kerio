import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
					<a href="/Auth">click here to Reg</a>
				</>
			)}

			{error && <p className="text-red-700">{error}</p>}
		</div>
	);
}
