export interface IInputProps {
	disabled?: any;
	type?: string;
	id?: string;
	defaultValue?: any;
	name?: string;
	className?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
	placeholder?: string;
}

export const Input: React.FC<IInputProps> = (props) => {
	return (
		<input
			value={props.value}
			onChange={props.onChange}
			disabled={props.disabled}
			type={props.type}
			id={props.id}
			defaultValue={props.defaultValue}
			name={props.name}
			placeholder={props.placeholder}
			className={
				!props.className
					? 'px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative rounded text-sm outline-none focus:outline-none focus:shadow-outline'
					: props.className
			}
		/>
	);
};
