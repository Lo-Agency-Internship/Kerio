import { FC } from 'react';
import Modal from '../organisms/modal';
interface IDeleteContatctsProps {
	open: boolean;
	setOpen: any;
	title: string;
	handleDelete: () => void;
	loading?: boolean;
	children: any;
}

const DELETE_FORM_ID = 'DELETE_FORM_ID';

const DeleteModal: FC<IDeleteContatctsProps> = (props) => {
	return (
		<Modal
			show={props.open}
			onClose={() => props.setOpen(false)}
			title={props.title}
			actions={[
				{
					loading: props.loading,
					label: 'Delete',
					type: 'submit',
					form: DELETE_FORM_ID,
					onClick: () => props.handleDelete(),
					style:
						'mt-3 inline-flex w-full flex items-center justify-center rounded-md border bg-rose-500 px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-rose-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm',
				},
				{
					label: 'Cancel',
					type: 'button',
					onClick: () => props.setOpen(false),
					style: 'text-gray-900 border-slate-400',
				},
			]}>
			{props.children}
		</Modal>
	);
};

export default DeleteModal;
