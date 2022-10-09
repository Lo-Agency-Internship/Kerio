import * as yup from 'yup';

export const modalNoteValidation = yup.object().shape({
	date: yup.date().required('Date is required').typeError('Date is not valid'),
	title: yup
		.string()
		.matches(/[A-Z,a-z]/, 'Title should be valid')
		.required('Title is required')
		.typeError('Title is not valid'),
	description: yup
		.string()
		.matches(/[A-Z,a-z]/, 'Description should be valid')
		.required('Description is required')
		.typeError('Description is required'),
});
