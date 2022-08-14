interface Props {
	label: string;
	onClick: () => void;
}

export function Button({ label, onClick }: Props) {
	return (
		<>
			<button className="border border-3 border-black p-2 hover:bg-gray-500 rounded hover:text-white" onClick={onClick}>
				{label}
			</button>
		</>
	);
}
