import { Button } from '../atoms/button';
import { useNavigate } from 'react-router-dom';
interface IEmployee {
	name: string;
	phone: string;
	email: string;
	role: string;
}
const EmployeeCard: React.FC<any> = ({ employee }: any) => {
	const navigate = useNavigate();
	return (
		<>
			<div className="h-24 items-center justify-around w-2/3 my-2 bg-gradient-to-r from-amber-100 to-zinc-300 p-3 rounded-xl border-2 border-slate-100 shadow-lg transition-all transform-all hover:scale-105 cursor-pointer relative flex">
				<div className="">
					<div className="font-mono text-base">{employee.name}</div>
					<div className="font-mono text-base">{employee.phone}</div>
				</div>
				<div className="">
					<div className="font-mono text-base">{employee.email}</div>
					<div className="font-mono text-base">{employee.status}</div>
				</div>
				<div className="">
					<Button
						type="submit"
						label="Profile"
						style="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
						onClick={() => navigate(`/dashboard/contacts/${employee.id}`)}
					/>
				</div>
			</div>
		</>
	);
};
export default EmployeeCard;
