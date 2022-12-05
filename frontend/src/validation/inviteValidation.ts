import * as yup from 'yup';

export const inviteValidation = yup.object().shape({
	name: yup
		.string()
		.matches(/[A-Z,a-z]/, 'Name should be valid')
		.required('Name is required')
		.typeError('Name is not valid'),

	password: yup
		.string()
		.min(8)
		.max(12)
		.required('Please enter at least 8 character')
		.typeError('Password is not valid'),
});
