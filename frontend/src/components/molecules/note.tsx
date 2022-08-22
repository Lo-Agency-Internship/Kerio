import NoteDropDown from '../molecules/noteDropDown';

export default function Note() {
	return (
		<>
			<div className="flex justify-evenly w-7/12 ">
				<h1>Note</h1>;
				<NoteDropDown />
			</div>
		</>
	);
}
