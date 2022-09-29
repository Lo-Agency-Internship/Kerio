import { kebab, title } from 'case';
import { Lable } from '../../atoms/lable';
import { ISelectProps, Select } from '../../atoms/select';
export interface ISelectFormControlProps {
	label: string;
	iSelectProps?: ISelectProps;
}
export const SelectFormControl: React.FC<ISelectFormControlProps> = (props) => {
	const htmlFor = kebab(props.label);
	return (
		<div className="mt-1">
			<Lable className="px-2 font-medium text-gray-600 bg-white" htmlfor={htmlFor} title={title(props.label)} />
			<Select
				{...props.iSelectProps}
				name={htmlFor}
				id={htmlFor}
				className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
			/>
		</div>
	);
};
