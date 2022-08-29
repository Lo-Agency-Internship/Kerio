import jwt from 'jwt-decode';
import {createContext, FC, PropsWithChildren, useContext, useState} from 'react';
import {IAccessToken} from "../utils/interfaces/user/accessToken.interface";

interface IAuthContextProvider {
	getToken: () => string | null;
	isTokenValid: () => boolean;
	userMetadata: () => IAccessToken | null
}

const AuthContext = createContext<IAuthContextProvider>({} as IAuthContextProvider);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: FC<any> = (props: any) => {
	const getToken = () => localStorage.getItem('access_token');

	const isTokenValid = (): boolean => {
		try {
			const token = userMetadata()

			if (!token) return false

			const dateNow = new Date();
			const time = token.exp * 1000;
			let isExpired = false;

			if (time < dateNow.getTime()) {
				isExpired = true;
			}

			return isExpired;
		} catch (err) {
			return false;
		}
	};

	const userMetadata = (): IAccessToken | null => {
		const token = getToken();

		if (!token) return null;

		return jwt(token) as IAccessToken
	}

	return <AuthContext.Provider value={{ getToken, isTokenValid, userMetadata }}>{props.children}</AuthContext.Provider>;
};
