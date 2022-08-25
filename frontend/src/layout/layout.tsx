import { ReactNode } from 'react';
import Header from '../components/organisms/header';
import Sidebar from '../components/organisms/sidebar';

interface ILayout {
	children: ReactNode;
}

export default function Layout({ children }: ILayout) {
	return (
		<>
			<div className="flex relative h-full w-full">
				<Sidebar />
				<div className="w-5/6 ml-64 m-auto relative ">
					<Header />
					<div className="mt-24 flex flex-col items-center justify-center">{children}</div>
				</div>
			</div>
		</>
	);
}
