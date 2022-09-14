import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useApiContext } from '../../context/api';
import { uri } from '../../utils';
import { Button } from '../atoms/button';

interface ISubmitDelete {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	note: any;
}

const SubmitDelete: FC<ISubmitDelete> = ({ setOpen, note }) => {
	const { change, setChange } = useApiContext();
	const deleteHandler = async () => {
		await axios.delete(uri(`notes/${note.id}`), {
			headers: {
				Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
			},
		});
		setChange(!change);
	};
	return (
		<div
			className="py-12  backdrop-blur-sm transition duration-150 ease-in-out z-50 fixed top-14
			h-full
			w-full right-0 bottom-0 left-0"
			id="modal">
			<div role="alert" className="container mx-auto w-96 md:w-2/3 max-w-lg">
				<div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
					<div className="w-full flex justify-start text-gray-600 mb-3"></div>
					<form>
						<h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Are you sure?</h1>
						<Button
							label="No"
							style="focus:outline-none mx-3 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
							type="button"
							onClick={() => setOpen(false)}
						/>
						<Button
							label="Yes"
							style="focus:outline-none mx-3 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
							type="button"
							onClick={deleteHandler}
						/>
					</form>
				</div>
			</div>
		</div>
	);
};
export default SubmitDelete;
