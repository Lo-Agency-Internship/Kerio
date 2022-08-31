import * as yup from 'yup';

export const modalContactValidation = yup.object().shape({
	name: yup.string().required('Name is required').typeError('Name is not valid'),
	phone: yup.number().required('Phone Number is required').positive().integer().typeError('Phone is not valid!'),
	email: yup.string().email('Please enter a valid email').required('Email is required').typeError('Email is not valid'),
	status: yup.string().required('Please select a status').typeError('Status is not valid'),
});
