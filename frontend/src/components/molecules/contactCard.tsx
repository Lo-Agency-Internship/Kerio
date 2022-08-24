import { IUser } from '../../utils/interfaces/user';
import { Button } from '../atoms/button';
import { useNavigate } from 'react-router-dom';
interface IContactCards {
	contact: IUser;
}
const ContactCards: React.FC<IContactCards> = ({ contact }) => {
	const navigate = useNavigate();
	return (
		<>
			<div className="h-24 w-3/4 my-4 mx-20 bg-gradient-to-r from-amber-100 to-zinc-300 inline-block p-3 rounded-xl border-2 border-slate-100 shadow-lg transition-all transform-all hover:scale-105 cursor-pointer relative">
				<div className="relative top-4">
					<div className="font-mono text-base">{contact.name}</div>
					<div className="font-mono text-base">{contact.phone}</div>
				</div>
				<div className="relative left-48 bottom-8">
					<div className="font-mono text-base">{contact.email}</div>
					<div className="font-mono text-base">{contact.status}</div>
				</div>
				<div className="relative left-96 bottom-20">
					<Button
						type="submit"
						label="Profile"
						style="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
						onClick={() => navigate(`/dashboard/contacts/${contact.id}`)}
					/>
				</div>
			</div>
		</>
	);
};
export default ContactCards;
