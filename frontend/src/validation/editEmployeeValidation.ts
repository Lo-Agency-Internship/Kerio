import * as yup from 'yup';
export const editEmployeeValidation = yup.object().shape({
	name: yup
		.string()
		.matches(/[A-Z,a-z]/, 'Name should be valid')
		.required('Name is required')
		.typeError('Name is not valid'),
});
