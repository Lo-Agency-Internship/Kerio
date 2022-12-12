import { useEffect, useState } from 'react';
import { useApiContext } from '../../context/api';
import { useNavigate, useParams } from 'react-router-dom';
import { IUserById } from '../../utils/interfaces/user';
import Loading from '../../components/molecules/loading';
import { Page } from '../../layout/page';
import { Button } from '../../components/atoms/button';
import NewNoteModal from '../../components/templates/newNoteModal';
import Roadmap from '../../components/organisms/roadMap';
import { ITimeline } from '../../utils/interfaces/user/timeline.interface';
import { Account } from './account';

export default function ContactPage() {
	const [contact, setContact] = useState<IUserById>();
	const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
	const [roadMap] = useState<ITimeline[] | null>(null);
	const { getContactsInfoById, isLoading } = useApiContext();
	const { id } = useParams();
	const navigate = useNavigate();
	async function fetchData() {
		try {
			await getContactsInfoById({ id }).then((res: any) => setContact(res));
		} catch (err: any) {
			if (err.response.data.message === 'contact not found') {
				navigate('/404');
			}
		}
	}
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<Page
			header={{
				actions: [
					() => <Button label="New Note" type="submit" style="" onClick={() => setShowNoteModal(true)}></Button>,
				],
			}}>
			{showNoteModal && <NewNoteModal setOpen={setShowNoteModal} open={showNoteModal} statuses={contact?.statuses} />}
			{isLoading ? (
				<Loading />
			) : (
				<>
					<div>
						<div className="flex justify-start mt-8 w-12/12 ">
							<div className="flex -space-x-1 overflow-hidden"></div>
						</div>
					</div>
					<div className="flex justify-center"></div>
					<Account user={contact} setUser={setContact} />
					{roadMap &&
						roadMap.map((element, index) => (
							<Roadmap
								records={[
									{
										items: [{ description: element.description, title: element.title, completed: false }],
										createdAt: element.createdAt,
										date: element.date,
									},
								]}
								key={index}
							/>
						))}
				</>
			)}
		</Page>
	);
}
