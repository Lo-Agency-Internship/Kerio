import jwt from 'jwt-decode';
import { createContext, FC, useContext } from 'react';
import { IAccessToken } from '../utils/interfaces/user/accessToken.interface';

interface IAuthContextProvider {
	getToken: () => string | null;
	isTokenValid: () => boolean;
	userMetadata: any;
}

const AuthContext = createContext<IAuthContextProvider>({} as IAuthContextProvider);
export const useAuthContext = () => useContext(AuthContext);
export const AuthProvider: FC<any> = (props: any) => {
	function getToken() {
		return localStorage.getItem('access_token');
	}

	const userMetadata = (): IAccessToken | null => {
		try {
			const token = getToken();
			if (!token) return null;
			return jwt(token) as IAccessToken;
		} catch (err) {
			return null;
		}
	};

	const isTokenValid = (): boolean => {
		try {
			const token = userMetadata();

			if (!token) return true;

			const dateNow = new Date();
			const time = token.exp * 1000;
			let isExpired = false;

			if (time < dateNow.getTime()) {
				isExpired = true;
			}

			return isExpired;
		} catch (err) {
			return true;
		}
	};

	return <AuthContext.Provider value={{ getToken, isTokenValid, userMetadata }}>{props.children}</AuthContext.Provider>;
};
