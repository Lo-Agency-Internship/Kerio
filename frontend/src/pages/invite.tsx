import { Button } from '../components/atoms/button';

export default function Invite() {
	return (
		<>
			<div className="flex flex-col absolute w-5/6 h-4/5 bg-white rounded-lg shadow-lg overflow-hidden md:flex-row my-16 mx-12 justify-center top-12 right-32 left-20 mt-2 mr-12">
				<div className="md:flex items-center justify-center md:w-1/2 md:bg-gray-800">
					<div className="py-9 px-14 md:py-0">
						<h3 className="text-gray-700 font-bold md:text-gray-100 text-3xl ml-2">Welcome</h3>
						<h1 className="my-4 font-semibold text-5xl md:text-gray-100 ">We are Kerio</h1>
						<p className="text-sm opacity-75  md:text-gray-100">All Rights Reserved to Lo Agency</p>

						<h4 className=" text-gray-600 md:text-gray-400 font-bold mt-16 top-2">
							You are invited by your manager. Please fill up the form and click submit.
						</h4>
					</div>
				</div>
				<div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2 md:border-b-8 border-gray-700">
					<form className="relative w-full mt-1 space-y-6 px-8 py-1">
						<h4 className="w-full text-4xl font-bold items-center justify-center ">Registration Form</h4>
						<div className="relative ">
							<label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Name</label>
							<input
								name="name"
								className="block w-11/12 px-3 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
								placeholder="Mark"
								disabled={true}
							/>
						</div>
						<div className="relative">
							<label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Email Address</label>
							<input
								name="email"
								type="email"
								className="block w-11/12 px-3 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
								placeholder="Mark@email.com"
								disabled={true}
							/>
						</div>
						<div className="relative">
							<label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">Password</label>
							<input
								name="password"
								type="password"
								className="block w-11/12 px-3 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
								placeholder="pa@ssword"
							/>
						</div>
						<div className="relative">
							<label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">re-Password</label>
							<input
								name="rePassword"
								type="password"
								className="block w-11/12 px-3 py-2 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
								placeholder="pa@ssword"
							/>
						</div>
						<div className="relative">
							<Button
								type="submit"
								label="submit"
								style="inline-block w-11/12 px-4 py-3 text-xl font-medium text-center text-white transition duration-200 bg-gray-500 rounded-lg hover:bg-gray-900 ease"
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
