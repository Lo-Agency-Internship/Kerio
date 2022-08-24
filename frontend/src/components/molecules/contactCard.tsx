const ContactCards = () => {
	return (
		<>
			<div className="h-24 w-3/4 my-4 mx-20 bg-gradient-to-r from-amber-100 to-zinc-300 flex items-start p-3 rounded-xl border-2 border-slate-100 shadow-lg transition-all transform-all hover:scale-105 cursor-pointer relative">
				<div className="text ">
					<div>Name </div>
					<div className="font-mono text-xs">Category</div>
					<div className="font-mono text-xs">Created by</div>
				</div>
			</div>
		</>
	);
};
export default ContactCards;
