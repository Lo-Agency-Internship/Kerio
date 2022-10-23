import { kebab, title } from 'case';
import { IInputProps, Input } from '../../atoms/input';
import { Lable } from '../../atoms/lable';
export interface IInputFormControlProps {
	label: string;
	inputProps?: IInputProps;
}
export const InputFormControl: React.FC<IInputFormControlProps> = (props) => {
	const htmlFor = kebab(props.label);

	return (
		<div className="mt-1">
			<Lable className="px-2 font-medium text-gray-600 bg-white" htmlfor={htmlFor} title={title(props.label)} />
			<Input
				{...props.inputProps}
				name={htmlFor}
				id={htmlFor}
				className={
					!props.inputProps?.className
						? 'block w-full px-3 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black'
						: props.inputProps?.className
				}
				placeholder={title(props.inputProps?.placeholder || '')}
			/>
		</div>
	);
};
