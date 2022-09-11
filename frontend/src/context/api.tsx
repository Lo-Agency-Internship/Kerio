import { createContext, ReactNode, useContext, useState } from 'react';
import { IUser } from '../utils/interfaces/user/user.interface';
import axios from 'axios';
import { uri } from '../utils/index';
interface IApiProvider {
	children: ReactNode;
}

interface IApiContext {
	user?: IUser;
	setUser?: (value: IUser) => void;
	change?: any;
	setChange?: any;
	checkToken?: any;
	setUserToken?: any;
	isLoading?: boolean;
	contacts?: any;
	setContacts?: any;
	getAllContacts?: any;
	getAllUsers?: any;
	getContactsInfoById?: any;
	getUsersInfoById?: any;
	postContactInfo?: any;
	postUserInfo?: any;
	updateContactInfo?: any;
	postLogin?: any;
	postSignUp?: any;
	postInviteEmployee?: any;
}

const ApiContext = createContext<IApiContext>({});

export const useApiContext = () => useContext(ApiContext);

export const ApiProvider = ({ children }: IApiProvider) => {
	const [isLoading, setIsLoading] = useState(false);
	const [change, setChange] = useState(false);
	const headerAuth = {
		headers: {
			Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
		},
	};
	const [contacts, setContacts] = useState([]);
	/// //////////////// GET

	// get contacts
	const getAllContacts = async () => {
		setIsLoading(true);
		const { data } = await axios.get(uri('contacts'), headerAuth);
		console.log(data);
		setIsLoading(false);
		return data;
	};

	// get users(employees)
	const getAllUsers = async () => {
		setIsLoading(true);
		const { data } = await axios.get(uri('users'), headerAuth);
		setIsLoading(false);
		return data;
	};

	// get contacts info by ID
	const getContactsInfoById = async (id: string) => {
		setIsLoading(true);
		const { data } = await axios.get(uri(`contacts/${id}`), headerAuth);
		setIsLoading(false);
		return data;
	};

	// get Users info by ID
	const getUsersInfoById = async (id: string) => {
		setIsLoading(true);
		const { data } = await axios.get(uri(`employees/${id}`), headerAuth);
		setIsLoading(false);
		return data;
	};

	/// //////////////// POST

	// post info for signup
	const postSignUp = async (body: any) => {
		await axios.post(uri('auth/register'), body);
	};

	// post info for Login
	const postLogin = async (body: any) => {
		await axios.post(uri('auth/login'), body).then((response: any) => {
			localStorage.setItem('access_token', response.data.access_token);
		});
	};

	// post data for add a new contact
	const postContactInfo = async (body: object) => {
		await axios.post(uri('contacts'), body, headerAuth);
	};

	// post data for add a new user
	const postUserInfo = async (body: object) => {
		await axios.post(uri('user'), body, headerAuth);
	};
	// post data for add a employee
	const postInviteEmployee = async (body: object) => {
		await axios.post(uri('invites'), body, headerAuth);
	};
	/// //////////////// PUT

	// update contact info
	const updateContactInfo = async (id: string, body: object) => {
		axios.put(uri(`contacts/${id}`), body, headerAuth);
	};

	return (
		<ApiContext.Provider
			value={{
				change,
				setChange,
				isLoading,
				contacts,
				setContacts,
				getAllUsers,
				getAllContacts,
				getContactsInfoById,
				getUsersInfoById,
				postContactInfo,
				postUserInfo,
				postLogin,
				postSignUp,
				updateContactInfo,
				postInviteEmployee,
			}}>
			{children}
		</ApiContext.Provider>
	);
};
