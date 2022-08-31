export default function Loading() {
	return (
		<div>
			<span className="flex h-3 w-3">
				<span className="animate-ping absolute inline-flex h-96 w-96 rounded-full bg-gray-400 opacity-75"></span>
				<span className="relative inline-flex rounded-full h-3 w-3 bg-gray-500"></span>
			</span>
		</div>
	);
}