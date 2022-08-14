import ContactModal from '../components/molecules/contactModal';
import { useState } from 'react';

export default function Dashboard() {
	const [showContactModal, setShowContactModal] = useState(false);
	return (
		<>
			<ContactModal showContactModal={showContactModal} />
			<h1>Dashboard page </h1>;
		</>
	);
}
