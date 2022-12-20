import { useEffect, useState } from 'react';
import NoteCard from '../molecules/noteCard';
import { useParams } from 'react-router-dom';
import { INote } from '../../utils/interfaces/user/note.interface';
import { useApiContext } from '../../context/api';
import EditNoteModal from '../templates/editNoteModal';
import { Button } from '../atoms/button';

interface IProps {
	statuses: any;
}

const NotePannel: React.FC<IProps> = ({ statuses }) => {
	const [notes, setNotes] = useState<INote[] | null>();
	const { change, getAllNotes } = useApiContext();
	const [error, setError] = useState<string[] | null>(null);
	const { id } = useParams();
	const [editNoteModal, setEditNoteModal] = useState<boolean>(false);
	const [note, setNote] = useState<INote>();
	const [pageCount, setPageCount] = useState<number>(1);
	const [sizeCount, setSizeCount] = useState<number>(5);
	const [isLoadingNextPage, setIsLoadingNextPage] = useState<boolean>(false);
	const [isLoadingPreviousPage, setIsLoadingPreviousPage] = useState<boolean>(false);
	const [totalNotes, setTotalNotes] = useState<number>(1);

	const getNotes = async (page: number, size: number) => {
		try {
			const data = await getAllNotes({
				id,
				pagination: {
					page,
					size,
					sort: 'asc',
				},
			});
			setTotalNotes(data.metadata.total);
			setNotes(data.notes);
		} catch (e: any) {
			setError(e.response.data.message);
		}
	};
	useEffect(() => {
		getNotes(pageCount, sizeCount);
	}, [change]);

	const handleNextPage = async () => {
		setIsLoadingNextPage(true);
		const newPageCount = pageCount + 1;
		await getNotes(newPageCount, sizeCount);
		setPageCount(newPageCount);
		setIsLoadingNextPage(false);
	};

	const handlePreviousPage = async () => {
		setIsLoadingPreviousPage(true);
		const newPageCount = pageCount - 1;
		await getNotes(newPageCount, sizeCount);
		setPageCount(newPageCount);
		setIsLoadingPreviousPage(false);
	};
	return (
		<>
			{editNoteModal && (
				<EditNoteModal
					setOpen={setEditNoteModal}
					open={editNoteModal}
					note={note}
					setNote={setNote}
					setNotes={setNotes}
					statuses={statuses}
					pageCount={pageCount}
					sizeCount={sizeCount}
					id={id}
					totalNotes={totalNotes}
					setTotalNotes={setTotalNotes}
				/>
			)}
			{error}
			<div className="space-y-2 w-full px-12 py-4">
				{notes &&
					notes.map((element, index) => (
						<NoteCard data={element} key={index} setEditNoteModal={setEditNoteModal} setNote={setNote} />
					))}
				<div className="mt-8 text-right">
					<nav className="inline-flex" role="navigation" aria-label="Navigation">
						<ul className="flex justify-center my-4">
							{pageCount > 1 && (
								<li className="ml-3 first:ml-0">
									<Button
										loading={isLoadingPreviousPage}
										onClick={handlePreviousPage}
										style="btn bg-gray-100 border-slate-500 hover:border-slate-500 text-indigo-600 text-sm py-1 px-2 rounded-md">
										Previous
									</Button>
								</li>
							)}
							{Math.ceil(totalNotes / sizeCount) > pageCount && (
								<li className="ml-3 first:ml-0">
									<Button
										loading={isLoadingNextPage}
										onClick={handleNextPage}
										style="btn bg-gray-100 border-slate-500 hover:border-slate-500 text-indigo-600 text-sm py-1 px-2 rounded-md">
										Next
									</Button>
								</li>
							)}
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
};

export default NotePannel;
