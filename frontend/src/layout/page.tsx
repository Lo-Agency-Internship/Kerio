import { useState } from 'react';
import Header, { IHeaderProps } from '../components/organisms/header';

export interface IPage {
	children: any;
	header?: IHeaderProps;
}
export const Page: React.FC<IPage> = (props) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="w-full flex flex-col overflow-scroll">
			<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} actions={props.header?.actions} />
			<div className="flex flex-1 min-h-full flex-col items-center justify-self-stretch  w-full">{props.children}</div>
		</div>
	);
};
