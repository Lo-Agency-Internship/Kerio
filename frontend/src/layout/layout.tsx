import { ReactNode } from 'react';
import Header from '../components/organisms/header';
import Sidebar from '../components/organisms/sidebar';

interface ILayout {
	children: ReactNode;
}

export default function Layout({ children }: ILayout) {
	return (
		<>
			<Header />
			<Sidebar />
			{children}
		</>
	);
}
