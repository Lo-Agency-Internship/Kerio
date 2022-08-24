import { createContext, ReactNode, useContext } from 'react';
import { IUser } from '../utils/interfaces/user/user.interface';
import axios from 'axios';
import { backend } from '../utils';
import jwt from 'jwt-decode';
interface IApiProvider {
	children: ReactNode;
}

interface IApiContext {
	user?: IUser;
	setUser?: (value: IUser) => void;
	getContactInfo?: any;
	checkToken?: any;
}

const ApiContext = createContext<IApiContext>({});
export const useApiContext = () => useContext(ApiContext);
export const ApiProvider = ({ children }: IApiProvider) => {
	// const [isLoading, setIsLoading] = useState(false);
	// useEffect(() => {}, []);
	// const [isToken, setIsToken] = useState(null);
	const getContactInfo = async (id: string) => {
		const { data } = await axios.get(backend(`contacts/${id}`));
		return data;
	};

	const checkToken = (token: any) => {
		let isExpired = false;
		try {
			const decoded: any = jwt(token);
			if (token) {
				const dateNow = new Date();
				const timee = decoded.exp * 1000;
				if (timee < dateNow.getTime()) {
					isExpired = true;
				}
			} else {
				isExpired = true;
			}
		} catch (err) {
			isExpired = true;
		}
		return isExpired;
	};

	return <ApiContext.Provider value={{ getContactInfo, checkToken }}>{children}</ApiContext.Provider>;
};
