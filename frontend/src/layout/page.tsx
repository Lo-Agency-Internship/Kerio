import Header, { IHeaderProps } from '../components/organisms/header';

export interface IPage {
	children: any;
	header?: IHeaderProps;
}
export const Page: React.FC<IPage> = (props) => {
	return (
		<div className="w-full flex flex-col overflow-scroll">
			<Header {...props.header} />
			<div className="mx-8 flex flex-1 mt-16 min-h-full flex-col items-center justify-self-stretch  w-full">
				{props.children}
			</div>
		</div>
	);
};
