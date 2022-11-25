export interface IOptionProps {
	title?: string;
	value?: string;
}
export interface ISelectProps {
	id?: string;
	name?: string;
	className?: string;
	iOptionProps?: IOptionProps[];
	disabled?: boolean;
}

export const Select: React.FC<ISelectProps> = (props) => {
	return (
		<select name={props.name} id={props.id} className={props.className} disabled={props.disabled}>
			{props.iOptionProps?.map((element, index) => (
				<option value={element.value} key={index}>
					{element.title}
				</option>
			))}
		</select>
	);
};
