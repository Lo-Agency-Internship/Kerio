import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { IUser } from '../utils/interfaces/user/user.interface';
import axios from 'axios';
import { uri } from '../utils';
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
>>>>>>>>> Temporary merge branch 2
}

const ApiContext = createContext<IApiContext>({});

export const useApiContext = () => useContext(ApiContext);

export const ApiProvider = ({ children }: IApiProvider) => {
	// const [isLoading, setIsLoading] = useState(false);
	// useEffect(() => {}, []);
	const [change, setChange] = useState(false);

=========
	// const [isToken, setIsToken] = useState(null);
>>>>>>>>> Temporary merge branch 2
	const getContactInfo = async (id: string) => {
		const { data } = await axios.get(uri(`contacts/${id}`));
		return data;
	};

	const getContacts = async () => {
		const { data } = await axios.get(uri(`contacts`));
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
