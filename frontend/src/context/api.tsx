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
	IUpdateContactNoteById,
	IGetAllNotes,
} from '../utils/interfaces/api/api.interface';
import { IGetContacts } from '../utils/interfaces/api/data.interface';

interface IApiProvider {
	children: ReactNode;
}

interface IApiContext {
	change?: any;
	setChange?: any;
	checkToken?: any;
	setUserToken?: any;
	isLoading?: boolean;
	contacts?: any;
	employee?: any;
	setEmployee?: any;
	setContacts?: any;
	getAllContacts(payload: IApiPaginationParams): Promise<IGetContacts>;
	getAllUsers?: any;
	getContactsInfoById(payload: IGetContactsInfoById): Promise<IGetContactsInfoById>;
	getTimelines?: any;
	getUsersInfoById?: any;
	getEmployeesInfoById?: any;
	getAllEmployees?: any;
	getAllNotes(payload: IGetAllNotes): Promise<any>;
	postContactInfo(payload: IPostContactInfo): Promise<void>;
	postNoteInfo(payload: IPostNoteInfo): Promise<void>;
	getNoteInfo?: any;
	updateContactInfo(payload: IUpdateContactInfo): Promise<void>;
	updateContactNoteById(payload: IUpdateContactNoteById): Promise<void>;
	deleteContact(payload: IDeleteContact): Promise<void>;
	postLogin(payload: IPostLogin): Promise<void>;
	postSignUp(payload: IPostSignUp): Promise<void>;
	postInviteEmployee(payload: IPostInviteEmployee[]): Promise<void>;
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
	const getAllContacts = async (payload: IApiPaginationParams) => {
		const { data } = await axios.get(uri(`contacts`), {
			params: {
				page: payload.pagination.page,
				size: payload.pagination.size,
			},
			...headerAuth,
		});
		return data;
	};

	// we must fix it
	const getAllUsers = async () => {
		setIsLoading(true);
		const { data } = await axios.get(uri('users'), headerAuth);
		setIsLoading(false);
		return data;
	};
	// get notes(employees)
	const getAllNotes = async (payload: IGetAllNotes) => {
		const { data } = await axios.get(uri(`notes/${payload.id}`), {
			params: {
				sort: 'asc',
			},
			...headerAuth,
		});
		return data;
	};

	// get contacts info by ID
	const getContactsInfoById = async (payload: IGetContactsInfoById) => {
		setIsLoading(true);
		const { data } = await axios.get(uri(`contacts/${payload.id}`), headerAuth);
		setIsLoading(false);
		return data;
	};

	// we must fix it
	const getUsersInfoById = async (payload: IGetUsersInfoById) => {
		setIsLoading(true);
		const { data } = await axios.get(uri(`employees/${payload.id}`), headerAuth);
		setIsLoading(false);
		return data;
	};

	// we must fix it
	const getTimelines = async (payload: IGetAllTimelines) => {
		const { data } = await axios.get(uri(`notes/timeline/${payload.id}`), headerAuth);
		return data;
	};

	/// //////////////// POST

	const postSignUp = async (payload: IPostSignUp) => {
		await axios.post(uri('auth/register'), {
			email: payload.email,
			name: payload.name,
			password: payload.password,
			organizationSlug: payload.organizationSlug,
		});
	};

	const postLogin = async (payload: IPostLogin) => {
		await axios.post(uri('auth/login'), payload).then((response: any) => {
			localStorage.setItem('access_token', response.data.access_token);
		});
	};

	const postContactInfo = async (payload: IPostContactInfo) => {
		await axios.post(
			uri('contacts'),
			{
				email: payload.email,
				name: payload.name,
				status: payload.status,
				phone: payload.phone,
			},
			headerAuth,
		);
	};

	const postInviteEmployee = async (payload: IPostInviteEmployee[]) => {
		await axios.post(
			uri('invites'),
			{
				invites: payload,
			},
			headerAuth,
		);
	};

	const postNoteInfo = async (payload: IPostNoteInfo) => {
		await axios.post(
			uri(`notes/${payload.id}`),
			{
				title: payload.title,
				description: payload.description,
				date: payload.date,
				status: payload.status,
				score: payload.score,
				id: payload.id,
			},
			headerAuth,
		);
	};

	/// //////////////// PUT
	const updateContactInfo = async (payload: IUpdateContactInfo) => {
		axios.put(
			uri(`contacts/${payload.id}`),
			{
				name: payload.name,
				phone: payload.phone,
				email: payload.email,
			},
			headerAuth,
		);
	};

	const updateContactNoteById = async (payload: IUpdateContactNoteById) => {
		await axios.put(
			uri(`notes/${payload.id}`),
			{
				date: payload.date,
				title: payload.title,
				description: payload.description,
				score: payload.score,
				status: payload.status,
			},
			headerAuth,
		);
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
				getAllUsers,
				getAllContacts,
				getTimelines,
				getContactsInfoById,
				getUsersInfoById,
				getAllNotes,
				postContactInfo,
				postLogin,
				postSignUp,
				postNoteInfo,
				updateContactInfo,
				updateContactNoteById,
				deleteContact,
				postInviteEmployee,
			}}>
			{children}
		</ApiContext.Provider>
	);
};
