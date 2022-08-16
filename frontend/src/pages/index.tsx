export default function Index() {
	return (
		// <!-- This is button of signUp/signIn component -->
		<div className="bg-white-700 py-9 px-9">
			<div className="min-h-screen  sm:flex sm:flex-row  justify-center bg-gray-900 p-5 sm:p-60 rounded-3xl shadow-xl">
				<div className="flex-col flex  self-center lg:p-10 sm:max-w-5xl xl:max-w-lg  z-10">
					<div className="self-start hidden lg:flex flex-col  text-white">
						<div className="flex items-center mb-5">
							<h3 className="text-3xl font-semibold ml-2">Welcome</h3>
						</div>
						<h1 className="my-4 font-semibold text-5xl">We are Kerio</h1>
						<p className="pr-3 text-sm opacity-75">All Rights Reserved to Lo Agency</p>
					</div>
				</div>
				<div className="mt-2 py-9 px-9">
					<div className="m-3">
						<button className="w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
							<span className="mx-auto">SignUp</span>
						</button>
					</div>
					<div className="m-3">
						<button className="w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
							<span className="mx-auto">SignIn</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
