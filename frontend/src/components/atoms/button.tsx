export interface Props {
	style: string;
	label: string;
	onClick?: () => void;
}

export function Button({ label, onClick, style }: Props) {
	return (
		<>
			<button className={style} onClick={onClick}>
				{label}
			</button>
		</>
	);
}
