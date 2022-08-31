import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { IUser } from '../utils/interfaces/user/user.interface';
import axios from 'axios';
import { uri } from '../utils/index';
interface IApiProvider {
	children: ReactNode;
}

interface IApiContext {
	user?: IUser;
	setUser?: (value: IUser) => void;
	getContactInfo?: any;
	getContacts?: any;
	change?: any;
	setChange?: any;
	checkToken?: any;
	setUserToken?: any;
}

const ApiContext = createContext<IApiContext>({});

export const useApiContext = () => useContext(ApiContext);

export const ApiProvider = ({ children }: IApiProvider) => {
	// const [isLoading, setIsLoading] = useState(false);
	const [change, setChange] = useState(false);
	const getContactInfo = async (id: string) => {
		const { data } = await axios.get(uri(`contacts/${id}`), {
			headers: {
				Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
			},
		});
		return data;
	};

	const getContacts = async () => {
		const { data } = await axios.get(uri(`contacts`), {
			headers: {
				Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
			},
		});
		return data;
	};
	useEffect(() => {
		const f = async () => getContacts();
		f();
	}, []);

	return (
		<ApiContext.Provider value={{ getContactInfo, getContacts, change, setChange }}>{children}</ApiContext.Provider>
	);
};
