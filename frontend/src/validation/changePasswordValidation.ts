import * as yup from 'yup';

export const changePasswordValidation = yup.object().shape({
	newPassword: yup
		.string()
		.min(8)
		.max(12)
		.required('Please enter at least 8 character')
		.typeError('Password is not valid'),
});
