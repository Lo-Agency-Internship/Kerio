export default function NoteDropDown() {
	return (
		<>
			{/*         
			<style>
            .tab {
            overflow: hidden;
            }
            .tab-content {
            max-height: 0;
            transition: all 0.5s;
            }
            input:checked + .tab-label .test {
                background-color: #000;
            }
            input:checked + .tab-label .test svg {
                transform: rotate(180deg);
                stroke: #fff;
            }
            input:checked + .tab-label::after {
            transform: rotate(90deg);
            }
            input:checked ~ .tab-content {
            max-height: 100vh;
            }
        </style> */}

			<main className="w-3/5 p-8 mx-auto">
				<section className="shadow row">
					<div className="tabs">
						<div className="border-b tab">
							<div className="border-b tab">
								<div className="border-l-2 border-transparent relative">
									<input
										name="name"
										id="title"
										className="w-full absolute z-10 cursor-pointer opacity-0 h-5 top-6"
										type="checkbox"
									/>
									<header className="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none tab-label">
										<span className="text-grey-darkest font-thin text-xl">This is title of notes</span>

										<div className="rounded-full border border-grey w-7 h-7 flex items-center justify-center test">
											{/* <!-- icon by feathericons.com --> */}
											<svg
												aria-hidden="true"
												className=""
												data-reactid="266"
												fill="none"
												height="24"
												stroke="#606F7B"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												width="24"
												xmlns="http://www.w3.org/2000/svg">
												<polyline points="6 9 12 15 18 9"></polyline>
											</svg>
										</div>
									</header>
									<div className="tab-content">
										<div className="pl-8 pr-8 pb-5 text-grey-darkest">
											<div className="flex items-center p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
												<div className="p-1 mr-8 bg-blue-900 text-white rounded-full">
													<img
														className="flex items-baseline justify-self-center "
														src="https://img.icons8.com/plasticine/100/000000/note.png"
													/>
												</div>
												<div>
													<div className="container py-5 max-w-md mx-auto">
														<form method="" action="" />

														<div className="mb-5">
															<input
																name="name"
																id="title"
																placeholder="Description"
																className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
																type="text"
															/>
														</div>
													</div>
												</div>
											</div>
											<div className="flex items-center justify-around pt-8">
												<button
													className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
													type="button">
													save
												</button>
												<button
													className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
													type="button">
													edit
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
