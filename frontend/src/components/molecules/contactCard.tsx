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
			<div className="flex items-center justify-around h-24 w-3/4 my-4 mx-20 bg-gradient-to-r from-amber-100 to-zinc-300 p-3 rounded-xl border-2 border-slate-100 shadow-lg transition-all transform-all hover:scale-105 cursor-pointer relative">
				<div>
					<div className="font-mono text-base">{contact.name}</div>
					<div className="font-mono text-base">{contact.phone}</div>
				</div>
				<div>
					<div className="font-mono text-base">{contact.email}</div>
					<div className="font-mono text-base">{contact.lastStatus.status.status}</div>
				</div>
				<div>
					<Button
						type="submit"
						label="Profile"
						style="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
						onClick={() => navigate(`/dashboard/contacts/${contact.id}`)}
					/>
				</div>
			</div>
		</>
	);
};
export default ContactCards;
