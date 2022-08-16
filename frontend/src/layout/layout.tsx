import { ReactNode } from 'react';
import Header from '../components/organisms/header';
import Sidebar from '../components/organisms/sidebar';

interface ILayout {
	children: ReactNode;
}

export default function Layout({ children }: ILayout) {
	return (
		<>
			<div className='flex'>
				<Sidebar />
				<div className='w-5/6'>
					<Header />
					{children}
				</div>
			</div>
			

		</>
	);
}
