import * as yup from 'yup';

export const editUserValidation = yup.object().shape({
	name: yup
		.string()
		.matches(/[A-Z,a-z]/, 'Name should be valid')
		.typeError('Name is not valid'),
	email: yup.string().email('Please enter a valid email').typeError('Email is not valid'),
});
