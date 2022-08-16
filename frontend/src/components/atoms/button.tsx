export interface Props {
	style: string;
	label: string;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
}

export function Button({ label, onClick, style, type }: Props) {
	return (
		<>
			<button type={type} className={style} onClick={onClick}>
				{label}
			</button>
		</>
	);
}
