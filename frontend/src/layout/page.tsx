import Header, { IHeaderProps } from '../components/organisms/header';

export interface IPage {
	children: any;
	header?: IHeaderProps;
}
export const Page: React.FC<IPage> = (props) => {
	return (
		<div className="w-5/6 ml-56 m-auto relative flex flex-col items-stretch min-h-screen">
			<Header {...props.header} />
			<div className="flex flex-1 mt-16 min-h-full flex-col items-center justify-self-stretch">{props.children}</div>
		</div>
	);
};
