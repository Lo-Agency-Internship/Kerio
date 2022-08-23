import { createContext, ReactNode, useContext } from 'react';
import { IUser } from '../utils/interfaces/user/user.interface';
import axios from 'axios';
import { backend } from '../utils';
interface IApiProvider {
	children: ReactNode;
}

interface IApiContext {
	user?: IUser;
	setUser?: (value: IUser) => void;
	getContactInfo?: any;
	getContacts?: any;
}

const ApiContext = createContext<IApiContext>({});
export const useApiContext = () => useContext(ApiContext);

export const ApiProvider = ({ children }: IApiProvider) => {
	// const [isLoading, setIsLoading] = useState(false);
	// useEffect(() => {}, []);

	const getContactInfo = async (id: string) => {
		const { data } = await axios.get(backend(`contacts/${id}`));
		return data;
	};
	console.log(typeof getContactInfo);

	const getContacts = async () => {
		const { data } = await axios.get(backend(`contacts`));
		return data;
	};

	return <ApiContext.Provider value={{ getContactInfo, getContacts }}>{children}</ApiContext.Provider>;
};
