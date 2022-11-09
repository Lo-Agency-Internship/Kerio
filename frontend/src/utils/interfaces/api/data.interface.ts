export interface IGetContacts {
	contacts: [
		{
			id: number;
			name: string;
			email: string;
			phone: string;
			createdAt: string;
			deletedAt: string | null;
			updatedAt: string;
			organization: {
				id: number;
				name: string;
				slug: string;
				address: string;
				createdAt: string;
				deletedAt: string | null;
				updatedAt: string;
			};
			lastStatus: {
				contactId: number;
				createdAt: string;
				deletedAt: string | null;
				id: number;
				status: {
					updatedAt: string;
					createdAt: string;
					id: string;
					status: string;
				};
			};
		},
	];
	metadata: {
		page: number;
		size: number;
		total: number;
	};
}

export interface IGetContactsInfoById {
	id: number;
	name: string;
	email: string;
	phone: string;
	createdAt: string;
	deletedAt: string | null;
	updatedAt: string;
	organization: {
		id: number;
		name: string;
		slug: string;
		address: string;
		createdAt: string;
		deletedAt: string | null;
		updatedAt: string;
	};
	Statuses: [
		{
			updatedAt: string;
			contactId: number;
			createdAt: string;
			deletedAt: string | null;
			id: number;
			statusId: number;
			status: {
				updatedAt: string;
				createdAt: string;
				id: string;
				status: string;
			};
		},
	];
}

export interface IGetEmployees {
	id: number;
	name: string;
	email: string;
	createdAt: string;
	deletedAt: string | null;
	updatedAt: string;
	enabled: boolean;
}
