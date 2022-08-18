export interface Props {
	disabled?: any;
	type?: string;
	id?: string;
	defaultValue?: any;
	name?: string;
	className?: string;
}

export function Input({ disabled, type, id, defaultValue, name, className }: Props) {
	return (
		<>
			<input
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
