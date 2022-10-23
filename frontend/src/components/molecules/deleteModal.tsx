import { FC } from 'react';
import Modal from '../organisms/modal';
interface IDeleteContatctsProps {
	open: boolean;
	setOpen: any;
	title: string;
	handleDelete: () => void;
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
					label: 'Delete',
					type: 'submit',
					form: DELETE_FORM_ID,
					onClick: () => props.handleDelete(),
					style: 'bg-rose-500 text-gray-900 border-slate-200',
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
