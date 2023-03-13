import axios from 'axios';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../../utils/component/transition';
import searchProps from '../../utils/interfaces/api/search.interface';

interface SearchModalProps {
	id?: string;
	searchId?: string;
	open?: boolean;
	setOpen?: any;
}

function SearchModal({ id, searchId, open, setOpen }: SearchModalProps) {
	const modalContent = useRef<any>(null);
	const searchInput = useRef<any>(null);

	const [text, setText] = useState('');
	const [results, setResults] = useState([]);
	const headerAuth = {
		headers: {
			Authorization: ` Bearer ${localStorage.getItem('access_token')}`,
		},
	};
	const searchData = async () => {
		const resp = await axios.get(`http://localhost:3001/search`, { params: { search: `${text}` }, ...headerAuth });
		setResults(resp.data.hits);
	};
	useEffect(() => {
		searchData();
	}, [text]);

	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }: any) => {
			if (!open || modalContent.current.contains(target)) return;
			setOpen(false);
		};
		document.addEventListener('click', clickHandler);
		return () => document.removeEventListener('click', clickHandler);
	});

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }: any) => {
			if (!open || keyCode !== 27) return;
			setOpen(false);
		};
		document.addEventListener('keydown', keyHandler);
		return () => document.removeEventListener('keydown', keyHandler);
	});

	useEffect(() => {
		open && searchInput.current.focus();
	}, [open]);

	return (
		<>
			{/* Modal backdrop */}
			<Transition
				className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
				show={open}
				enter="transition ease-out duration-200"
				enterStart="opacity-0"
				enterEnd="opacity-100"
				leave="transition ease-out duration-100"
				leaveStart="opacity-100"
				leaveEnd="opacity-0"
				aria-hidden="true"
				appear={undefined}
			/>
			{/* Modal dialog */}
			<Transition
				id={id}
				className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
				role="dialog"
				aria-modal="true"
				show={open}
				enter="transition ease-in-out duration-200"
				enterStart="opacity-0 translate-y-4"
				enterEnd="opacity-100 translate-y-0"
				leave="transition ease-in-out duration-200"
				leaveStart="opacity-100 translate-y-0"
				leaveEnd="opacity-0 translate-y-4"
				appear={undefined}>
				<div ref={modalContent} className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg">
					{/* Search form */}
					<form className="border-b border-slate-200">
						<div className="relative">
							<label htmlFor={searchId} className="sr-only">
								Search
							</label>
							<input
								id={searchId}
								className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4"
								type="search"
								placeholder="Search Anything…"
								ref={searchInput}
							/>
							<button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
								<svg
									className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-4 mr-2"
									viewBox="0 0 16 16"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
									<path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
								</svg>
							</button>
						</div>
					</form>
					<div className="py-4 px-2">
						{/* Recent searches */}
						<div className="mb-3 last:mb-0">
							<div className="text-xs font-semibold text-slate-400 uppercase px-2 mb-2">Recent searches</div>
							<ul className="text-sm">
								{results &&
									results.map((result: searchProps, index: number) => (
										<li key={index}>
											<Link
												className="flex items-center p-2 text-slate-800 hover:text-white hover:bg-indigo-500 rounded group"
												to={`/contacts/${result.id}`}
												onClick={() => setOpen(!open)}>
												<svg
													className="w-4 h-4 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
													viewBox="0 0 16 16">
													<path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
												</svg>
												<span>{result.name}</span>
											</Link>
										</li>
									))}
							</ul>
						</div>
						{/* Recent pages */}
					</div>
				</div>
			</Transition>
		</>
	);
}

export default SearchModal;
