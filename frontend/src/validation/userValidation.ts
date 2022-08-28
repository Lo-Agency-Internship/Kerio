import * as yup from 'yup';

export const modalUserValidation = yup.object().shape({
	name: yup.string().required('Name is required').typeError('Name is not valid'),
	email: yup.string().email('Please enter a valid email').required('Email is required').typeError('Email is not valid'),
	password: yup
		.string()
		.min(8)
		.max(12)
		.required('Please enter at least 8 character')
		.typeError('Password is not valid'),
});

export const signInValidation = yup.object().shape({
	email: yup.string().email('Please enter a valid email').required('Email is required').typeError('Email is not valid'),
});
