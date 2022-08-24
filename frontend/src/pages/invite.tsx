import { useEffect, useState } from 'react';

export default function Invite() {
	return (
		<>
			<div className="flex flex-col absolute max-w-7xl md:h-96 bg-white rounded-lg shadow-lg overflow-hidden md:flex-row my-16 mx-12 justify-center top-20 right-32 left-32 mt-14 mr-12">
				<div className="md:flex items-center justify-center md:w-1/2 md:bg-gray-800">
					<div className="py-9 px-14 md:py-0">
						<h2 className="text-gray-700 text-2xl font-bold md:text-gray-100">
							Welcome! You are invited by your manager
						</h2>
						<p className="mt-2 text-gray-600 md:text-gray-400">
							Please fill up the form and put accept to create your account.
						</p>
					</div>
				</div>
				<div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2 md:border-b-8 border-gray-700">
					<form className="relative w-full mt-6 space-y-8"></form>
				</div>
			</div>
		</>
	);
}
