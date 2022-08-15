import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
interface ILayout {
	children: ReactNode;
}

export default function Layout({ children }: ILayout) {
	return (
		<>
			<nav>
				<ul>
					<li>
						<Link to="/">Header</Link>
					</li>
				</ul>
			</nav>

			{children}

			<footer>
				<p>this is a test</p>
			</footer>
		</>
	);
}
