import { kebab, title } from 'case';
import { IInputProps, Input } from '../atoms/input';
export interface IFormControlProps {
	label: string;
	placeholder?: string;
	inputProps?: IInputProps;
}
export const FormControl: React.FC<IFormControlProps> = (props) => {
	const htmlFor = kebab(props.label);

	return (
		<div className="mt-1">
			<label htmlFor={htmlFor} className="px-2 font-medium text-gray-600 bg-white">
				{title(props.label)}
			</label>
			<Input
				{...props.inputProps}
				name={htmlFor}
				id={htmlFor}
				className="block w-full px-3 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
				placeholder={title(props.placeholder || '')}
			/>
		</div>
	);
};
