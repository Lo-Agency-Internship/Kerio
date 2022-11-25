export interface IStatuses {
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
}

export interface ILastStatus {
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
}
