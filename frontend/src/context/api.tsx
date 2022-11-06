import { IUser } from '../utils/interfaces/user/user.interface';
import axios from 'axios';
import { uri } from '../utils/index';
import { createContext, ReactNode, useContext, useState } from 'react';
interface IApiPaginationParams {
	pagination: {
		page?: number;
		size?: number;
		sort?: 'asc' | 'desc';
	};
}

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
	employee?: any;
	setEmployee?: any;
	setContacts?: any;
	getAllContacts?: any;
	getAllUsers?: any;
	getContactsInfoById?: any;
	getAllTimelines?: any;
	getUsersInfoById?: any;
	getEmployeesInfoById?: any;
	getAllEmployees?: any;
	getAllNotes?: any;
	postContactInfo?: any;
	postUserInfo?: any;
	postNoteInfo?: any;
	getNoteInfo?: any;
	updateContactInfo?: any;
	deleteContact?: any;
	postLogin?: any;
	postSignUp?: any;
	postInviteEmployee?: any;
	deleteContacts?: any;
	updateUserInfo?: any;
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
	type IGetContactsPayload = IApiPaginationParams;
	const getAllContacts = async (page: number, size: number) => {
		const { data } = await axios.get(uri(`contacts`), {
			params: {
				page,
				size,
			},
			...headerAuth,
		});
		return data;
	};
	// get employees
	// const getAllEmployees = async () => {
	// 	setIsLoading(true);
	// 	const { data } = await axios.get(uri('users'), headerAuth);
	// 	console.log(data);
	// 	setIsLoading(false);
	// 	return data;
	// };

	// get users(employees)
	const getAllUsers = async () => {
		setIsLoading(true);
		const { data } = await axios.get(uri('users'), headerAuth);
		setIsLoading(false);
		return data;
	};

	// get notes(employees)
	const getAllNotes = async (id: string) => {
		const { data } = await axios.get(uri(`notes/${id}`), {
			params: {
				sort: 'asc',
			},
			...headerAuth,
		});
		return data;
	};

	// get contacts info by ID
	const getContactsInfoById = async (id: string) => {
		setIsLoading(true);
		const { data } = await axios.get(uri(`contacts/${id}`), headerAuth);
		setIsLoading(false);
		return data;
	};
	// get employees info by ID
	// const getEmployeesInfoById = async (id: string) => {
	//     setIsLoading(true);
	//     const { data } = await axios.get(uri(`???/${id}`), headerAuth);
	//     setIsLoading(false);
	//     return data;
	// };

	// get Users info by ID
	const getUsersInfoById = async (id: string) => {
		setIsLoading(true);
		const { data } = await axios.get(uri(`employees/${id}`), headerAuth);
		setIsLoading(false);
		return data;
	};

	const getAllTimelines = async (id: string) => {
		const { data } = await axios.get(uri(`notes/timeline/${id}`), headerAuth);
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
	// post data for add note
	const postNoteInfo = async (body: object, id: string) => {
		await axios.post(uri(`notes/${id}`), body, headerAuth);
	};
	/// //////////////// PUT

	// update contact info
	const updateContactInfo = async (id: string, body: object) => {
		axios.put(uri(`contacts/${id}`), body, headerAuth);
	};
	// ///////delete contact
	const deleteContact = async (id: string) => {
		axios.delete(uri(`contacts/${id}`), headerAuth);
	};
	// update user info
	const updateUserInfo = async (sub: string, body: object) => {
		console.log(headerAuth);
		axios.put(uri(`users/${sub}`), body, headerAuth);
	};

	const deleteContacts = async (body: any) => {
		axios.delete(uri(`contacts/batch`), {
			data: {
				ids: body,
			},
			...headerAuth,
		});
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
				getAllTimelines,
				getContactsInfoById,
				getUsersInfoById,
				getAllNotes,
				postContactInfo,
				postUserInfo,
				postLogin,
				postSignUp,
				postNoteInfo,
				updateContactInfo,
				deleteContact,
				deleteContacts,
				updateUserInfo,
				postInviteEmployee,
			}}>
			{children}
		</ApiContext.Provider>
	);
};
