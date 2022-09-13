import * as yup from 'yup';

export const addEmployeModalValidation = yup.object().shape({
	name: yup
		.string()
		.matches(/[A-Z,a-z]/, 'Name should be valid')
		.required('Name is required')
		.typeError('Name is not valid'),
	email: yup.string().email('Please enter a valid email').required('Email is required').typeError('Email is not valid'),
});
