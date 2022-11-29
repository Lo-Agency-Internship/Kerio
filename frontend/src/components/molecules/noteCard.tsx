import { useState } from 'react';
import { INote } from '../../utils/interfaces/user/note.interface';
import { format } from 'date-fns';
interface INoteCards {
	data: INote;
	setEditNoteModal: any;
	setNote: any;
}
const NoteCard: React.FC<INoteCards> = ({ data, setEditNoteModal, setNote }) => {
	return (
		<>
			{/* Post 1 */}
			<article className="bg-white shadow-md rounded border border-slate-200 p-5">
				<div className="flex flex-start space-x-4">
					{/* Avatar */}
					<div className="shrink-0 mt-1.5">
						<img
							className="w-8 h-8 rounded-full"
							src={'	https://unsplash.it/70/70'}
							width="32"
							height="32"
							alt="User avatar"
						/>
					</div>
					{/* Content */}
					<div
						className="grow"
						onClick={() => {
							setEditNoteModal(true);
							setNote(data);
						}}>
						{/* Title */}
						<h2 className="font-semibold text-slate-700 mb-2 text-lg">
							<p>{data.title}</p>
						</h2>

						<h3 className="text-sm font-semibold text-slate-600 mb-2">{data.description ? data.description : ''}</h3>

						{/* Footer */}
						<footer className="flex flex-wrap text-sm">
							<div className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 after:px-2">
								<h4 className="text-sm text-slate-500">{data.date && format(new Date(data.date), ' dd/MM/yyyy')}</h4>
							</div>
							<div className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 after:px-2">
								<span className="text-slate-500">{data.status}</span>
							</div>
						</footer>
					</div>
					{/* Upvote button */}
					<div className="shrink-0">
						<button className="text-xs font-semibold text-center h-12 w-12 border border-indigo-400 rounded-sm flex flex-col justify-center items-center outline outline-2 outline-indigo-100">
							<svg
								className="inline-flex fill-indigo-500 mt-1.5 mb-1.5"
								width="12"
								height="6"
								xmlns="http://www.w3.org/2000/svg">
								<path d="m0 6 6-6 6 6z" />
							</svg>
							<div>{data.score}</div>
						</button>
					</div>
				</div>
			</article>
		</>
	);
};
export default NoteCard;
