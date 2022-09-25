import { ReactNode } from 'react';
import Header from '../components/organisms/header';
import Sidebar from '../components/organisms/sidebar';
import { Page } from './page';

interface ILayout {
	children: ReactNode;
}

export default function Layout({ children }: ILayout) {
	return (
		<>
			<div className="flex relative h-full w-full">
				<Sidebar />
				{children}
			</div>
		</>
	);
}
