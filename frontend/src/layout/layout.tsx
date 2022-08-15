import Header from '../components/molecules/header';
import Sidebar from '../components/molecules/sidebar';

interface ILayout {
	children: any;
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
