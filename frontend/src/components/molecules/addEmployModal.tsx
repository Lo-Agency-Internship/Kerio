import { useState } from "react";



const AddEmployModal=()=>{
    const [error, setError] = useState<string | null>(null);
    const handleSubmit = async (event: any) => {
		event.preventDefault();
        const formData = new FormData(event.currentTarget);
		const name = formData.get('name')?.toString().toLowerCase();
		const email = formData.get('email')?.toString().toLowerCase();
		const body = {
			name,
			email,
		};
    }
    return(<>
    <div className="py-12 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
			<div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
				<div className="relative inline-block text-left w-full">
					<div>
						<div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
							<h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Contact Form</h1>
							{/* // form starts here */}
							{error && <p>{error}</p>}
							<form onSubmit={handleSubmit}>
								<label htmlFor="title" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
									Name
								</label>
								<input
									name="name"
									id="title"
									className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border
                         focus:border-indigo-700 font-normal w-full h-10 flex items-center 
                         pl-3 text-sm border-gray-300 rounded border"
									placeholder="Farzaneh"
								/>
								<label htmlFor="e-mail" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
									Email
								</label>
								<input
									name="email"
									id="email"
									className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border
                         focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 
                         text-sm border-gray-300 rounded border"
									placeholder="X@gmail.com"
								/>
								<button
									type="submit"
									className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">
									Add
								</button>
								<button
									className="cursor-pointer absolute top-0 right-0 mt-4 mr-5
                         text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out 
                         rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
									aria-label="close modal"
									// onClick={() => setOpen(false)}
									role="button">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-x"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										strokeWidth="2.5"
										stroke="currentColor"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" />
										<line x1="18" y1="6" x2="6" y2="18" />
										<line x1="6" y1="6" x2="18" y2="18" />
									</svg>
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
    </>)
}
export default AddEmployModal