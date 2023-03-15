import Employee from '../molecules/employee';
import { useState } from 'react';
import { Button } from '../atoms/button';
import NewEmployeeModal from '../templates/newEmployeeModal';
import { IEmployee } from '../../utils/interfaces/api/employeeData.interface';

export const SidebarEmployee = ({ employee, setEmployee, employees }: any) => {
	const [openNewEmployeeMoldal, setOpenNewEmployeeMoldal] = useState(false);

	return (
		<div
			id="profile-sidebar"
			className={`absolute  top-0 bottom-0 w-full md:w-auto md:static md:top-auto md:bottom-auto -mr-px md:translate-x-0 transform transition-transform duration-200 ease-in-out 
			}`}>
			<div className="sticky top-16 bg-white overflow-x-hidden overflow-y-auto no-scrollbar shrink-0 border-r border-slate-200 md:w-72 xl:w-80 h-[calc(100vh-64px)]">
				{/* Profile group */}
				<div>
					{/* Group header */}
					<div className="sticky top-0 z-10">
						<div className="flex items-center bg-white border-b border-slate-200 px-5 h-16">
							<div className="w-full flex items-center justify-between">
								{/* Profile image */}
								<div className="relative">
									<div className="grow flex items-center truncate">
										<img
											className="w-8 h-8 rounded-full"
											src={'https://unsplash.it/70/71'}
											width="32"
											height="32"
											alt="User"
										/>
										<div className="truncate">
											<span className="font-semibold text-slate-800">Acme Inc.</span>
										</div>
									</div>
								</div>
								{/* Add button */}
								<Button
									type="submit"
									onClick={(e: any) => {
										setOpenNewEmployeeMoldal(true);
									}}
									style={`p-1.5 shrink-0 rounded border border-slate-200 hover:border-slate-300 shadow-sm ml-2 ${
										openNewEmployeeMoldal && 'bg-slate-200'
									}`}>
									<svg className="w-4 h-4 fill-current text-indigo-500" viewBox="0 0 16 16">
										<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1Z" />
									</svg>
								</Button>
								<NewEmployeeModal setOpen={setOpenNewEmployeeMoldal} open={openNewEmployeeMoldal} />
							</div>
						</div>
					</div>
					{/* Group body */}
					<div className="px-5 py-4">
						{/* Search form */}
						<form className="relative">
							<label htmlFor="profile-search" className="sr-only">
								Search
							</label>
							<input
								id="profile-search"
								className="form-input w-full pl-9 focus:border-slate-300"
								type="search"
								placeholder="Search…"
							/>
							<button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
								<svg
									className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2"
									viewBox="0 0 16 16"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
									<path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
								</svg>
							</button>
						</form>
						{/* Team members */}
						<div className="mt-4">
							<div className="text-xs font-semibold text-slate-400 uppercase mb-3">Team members</div>
							<ul className="mb-6">
								{/* Team members */}
								<li>
									<div className="flex items-start truncate ">
										<div className="relative mr-2">
											<div className="py-1 px-1">
												{employees &&
													employees.map((element: IEmployee, index: number) => (
														<Employee key={index} employee={element} setEmployee={setEmployee} />
													))}
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
