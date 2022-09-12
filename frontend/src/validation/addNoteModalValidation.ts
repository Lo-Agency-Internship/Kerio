import * as yup from 'yup';

export const addNoteModalValidation = yup.object().shape({
	date: yup.date().required('Date is required').typeError('Date is not valid'),
	title: yup
		.string()
		.matches(/[A-Z,a-z]/, 'Name should be valid')
		.required('Title is required')
		.typeError('Title is not valid'),
	description: yup
		.string()
		.matches(/[A-Z,a-z]/, 'Name should be valid')
		.required('Description is required')
		.typeError('Description is required'),
});
