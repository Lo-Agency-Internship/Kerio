import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { IUser } from '../utils/interfaces/user/user.interface';

interface IApiProvider {
	children: ReactNode;
}

interface IApiContext {
	user?: IUser;
	setUser?: (value: IUser) => void;
}

const ApiContext = createContext<IApiContext>({});

export const useApiContext = () => useContext(ApiContext);

export const ApiProvider = ({ children }: IApiProvider) => {
	// mac data
	const receivedUser: IUser = {
		id: 1,
		name: 'khashayar',
		phone: '09123456789',
		email: 'khashayar@gmail.com',
		status: 'lead',
	};
	// const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState<IUser>();
	useEffect(() => {
		setUser(receivedUser);
	}, []);

	return <ApiContext.Provider value={{ user, setUser }}>{children}</ApiContext.Provider>;
};
