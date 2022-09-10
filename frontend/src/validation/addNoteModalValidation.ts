import * as yup from 'yup';

export const addNoteModalValidation = yup.object().shape({
	date: yup.date().required('Date is required').typeError('Date is not valid'),
	title: yup.string().required('Title is required').typeError('Title is not valid'),
	description: yup.string().required('Description is required').typeError('Description is required'),
});
