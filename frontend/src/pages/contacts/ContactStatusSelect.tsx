import axios from 'axios';
import React, { useState } from 'react';
import { SelectFormControl } from '../../components/molecules/formControls/selectFormControl';
import { uri } from '../../utils';

interface Props {
	scoreDigit: any;
}

const ContactStatusSelect: React.FC<Props> = ({ scoreDigit }) => {
	const [selectedStatus, setSelectedStatus] = useState<string>('All');

	const handleStatusChange = async (event: any) => {
		const status = event.target.value;
		setSelectedStatus(status);

		let url = uri('contacts');
		if (status !== 'All') {
			url = uri(`contacts?status=${status}`);
		}

		try {
			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('access_token')}`,
				},
			});
			scoreDigit(response.data);
			console.log(response.data.contacts);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<form>
			<SelectFormControl
				label={'Customer Status'}
				iSelectProps={{
					value: selectedStatus,
					onChange: handleStatusChange,
					iOptionProps: [
						{
							title: 'All',
							value: 'All',
						},
						{
							title: 'Lead',
							value: 'Lead',
						},
						{
							title: 'PotentialCustomer',
							value: 'PotentialCustomer',
						},
						{
							title: 'LostPotentialCustomer',
							value: 'LostPotentialCustomer',
						},
						{
							title: 'LostLoyalCustomer',
							value: 'LostLoyalCustomer',
						},
						{
							title: 'LoyalCustomer',
							value: 'LoyalCustomer',
						},
					],
				}}
			/>
		</form>
	);
};
export default ContactStatusSelect;
