import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../organisms/modal';
interface IDeleteContatctsProps {
	open: boolean;
	setOpen: any;
	title: string;
	logoutModal: () => void;
	loading?: boolean;
	children: any;
}

const LogoutModal: FC<IDeleteContatctsProps> = (props) => {
	const navigate = useNavigate();

	return (
		<Modal
			show={props.open}
			onClose={() => props.setOpen(false)}
			title={props.title}
			actions={[
				{
					loading: props.loading,
					label: 'Login',
					type: 'submit',
					onClick: () => props.logoutModal(),
					style:
						'mt-3 inline-flex w-full flex items-center justify-center rounded-md border bg-rose-500 px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-rose-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm',
				},
				{
					label: 'Go back Home',
					type: 'button',
					onClick: () => navigate(`/`),
					style:
						'mt-3 inline-flex w-full flex items-center justify-center rounded-md border px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-indigo-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm bg-indigo-300',
				},
			]}>
			{props.children}
		</Modal>
	);
};

export default LogoutModal;
