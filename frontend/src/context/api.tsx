import { IUser } from '../utils/interfaces/user/user.interface';
import axios from 'axios';
import { uri } from '../utils/index';
import { createContext, ReactNode, useContext, useState } from 'react';
import {
	IApiPaginationParams,
	IGetAllTimelines,
	IGetContactsInfoById,
	IGetUsersInfoById,
	IPostLogin,
	IPostSignUp,
	IPostContactInfo,
	IPostInviteEmployee,
	IPostNoteInfo,
	IUpdateContactInfo,
	IDeleteContact,
} from '../utils/interfaces/api/api.interface';

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
	getAllContacts(payload: IApiPaginationParams): Promise<any>;
	getAllUsers?: any;
	getContactsInfoById?: any;
	getAllTimelines?: any;
	getUsersInfoById?: any;
	getEmployeesInfoById?: any;
	getAllEmployees?: any;
	postContactInfo?: any;
	postNoteInfo?: any;
	getNoteInfo?: any;
	getAllNotes?: any;
	updateContactInfo?: any;
	deleteContact?: any;
	postLogin?: any;
	postSignUp?: any;
	postInviteEmployee?: any;
}

const ApiContext = createContext<IApiContext | null>(null);

export const useApiContext = () => useContext(ApiContext) as IApiContext;

export const ApiProvider = ({ children }: IApiProvider) => {
	const [isLoading, setIsLoading] = useState(false);
	const [change, setChange] = useState(false);
	const headerAuth = {
		headers: {
			Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
		},
	};
	const [contacts, setContacts] = useState([]);
	const getAllContacts = async (payload: IApiPaginationParams) => {
		console.log(payload);
		const { data } = await axios.get(uri(`contacts`), {
			params: {
				page: payload.pagination.page,
				size: payload.pagination.size,
			},
			...headerAuth,
		});

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
	const getContactsInfoById = async (payload: IGetContactsInfoById) => {
		setIsLoading(true);
		const { data } = await axios.get(uri(`contacts/${payload.id}`), {
			params: {
				id: payload.id,
			},
			...headerAuth,
		});
		setIsLoading(false);
		return data;
	};

	// get Users info by ID
	const getUsersInfoById = async (payload: IGetUsersInfoById) => {
		setIsLoading(true);
		const { data } = await axios.get(uri(`employees/${payload.id}`), headerAuth);
		setIsLoading(false);
		return data;
	};

	const getAllTimelines = async (payload: IGetAllTimelines) => {
		const { data } = await axios.get(uri(`notes/timeline/${payload.id}`), headerAuth);
		return data;
	};

	/// //////////////// POST

	// post info for signup
	const postSignUp = async (payload: IPostSignUp) => {
		await axios.post(uri('auth/register'), {
			params: {
				email: payload.email,
				name: payload.name,
				password: payload.password,
				organizationSlug: payload.organizationSlug,
			},
			...headerAuth,
		});
	};

	// post info for Login
	const postLogin = async (payload: IPostLogin) => {
		await axios.post(uri('auth/login'), payload).then((response: any) => {
			localStorage.setItem('access_token', response.data.access_token);
		});
	};

	// post data for add a new contact
	const postContactInfo = async (payload: IPostContactInfo) => {
		await axios.post(uri('contacts'), {
			params: {
				email: payload.email,
				name: payload.name,
				status: payload.status,
				phone: payload.phone,
			},
			...headerAuth,
		});
	};

	// post data for add a employee
	const postInviteEmployee = async (payload: IPostInviteEmployee) => {
		await axios.post(uri('invites'), {
			params: {
				email: payload.email,
				name: payload.name,
			},
			...headerAuth,
		});
	};
	// post data for add note
	const postNoteInfo = async (payload: IPostNoteInfo) => {
		await axios.post(uri(`notes/${payload.id}`), {
			params: {
				title: payload.title,
				description: payload.description,
				date: payload.date,
				status: payload.status,
				score: payload.score,
				id: payload.id,
			},
			...headerAuth,
		});
	};
	/// //////////////// PUT

	// update contact info
	const updateContactInfo = async (payload: IUpdateContactInfo) => {
		axios.put(uri(`contacts/${payload.id}`), {
			params: {
				name: payload.name,
				phone: payload.phone,
				email: payload.email,
			},
			...headerAuth,
		});
	};
	// ///////delete contact
	const deleteContact = async (payload: IDeleteContact) => {
		axios.delete(uri(`contacts/${payload.id}`), headerAuth);
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
				postContactInfo,
				postLogin,
				postSignUp,
				postNoteInfo,
				updateContactInfo,
				deleteContact,
				postInviteEmployee,
			}}>
			{children}
		</ApiContext.Provider>
	);
};
