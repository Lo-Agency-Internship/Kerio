export interface Props {
	disabled?: any;
	type?: string;
	id?: string;
	defaultValue?: any;
	name?: string;
	className?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
}

export function Input({ disabled, type, id, defaultValue, name, className, onChange, value }: Props) {
	return (
		<>
			<input
				value={value}
				onChange={onChange}
				disabled={disabled}
				type={type}
				id={id}
				defaultValue={defaultValue}
				name={name}
				className={`px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative  rounded text-sm outline-none focus:outline-none focus:shadow-outline ${className}`}
			/>
		</>
	);
}
