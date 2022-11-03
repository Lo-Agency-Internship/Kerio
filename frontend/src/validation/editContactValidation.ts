import * as yup from 'yup';
const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const editContactValidation = yup.object().shape({
	name: yup
		.string()
		.matches(/[A-Z,a-z]/, 'Name should be valid')
		.required('Name is required')
		.typeError('Name is not valid'),
	phone: yup
		.string()
		.matches(phoneRegExp, 'Phone number is not valid')
		.required('Phone Number is required')
		.typeError('Phone is not valid!'),
	email: yup.string().email('Please enter a valid email').required('Email is required').typeError('Email is not valid'),
});
