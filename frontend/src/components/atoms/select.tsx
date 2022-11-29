export interface IOptionProps {
	title?: string;
	value?: string;
	selected?: boolean;
}
export interface ISelectProps {
	id?: string;
	name?: string;
	className?: string;
	iOptionProps?: IOptionProps[];
	disabled?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	defaultValue?: any;
	value?: string;
}

export const Select: React.FC<ISelectProps> = (props) => {
	return (
		<select
			name={props.name}
			id={props.id}
			className={props.className}
			disabled={props.disabled}
			onChange={props.onChange}
			defaultValue={props.defaultValue}
			value={props.value}>
			{props.iOptionProps?.map((element, index) => (
				<option value={element.value} key={index} selected={element.selected}>
					{element.title}
				</option>
			))}
		</select>
	);
};
