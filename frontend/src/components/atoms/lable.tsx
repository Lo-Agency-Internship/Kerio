export interface ILableProps {
	title?: string;
	className?: string;
	htmlfor?: string;
}

export const Lable: React.FC<ILableProps> = (props) => {
	return (
		<label htmlFor={props.htmlfor} className={` ${props.className}`}>
			{props.title}
		</label>
	);
};
