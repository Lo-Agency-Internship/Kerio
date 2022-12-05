export interface IEmployee {
	id: string;
	name?: string;
	email?: string;
	enabled?: boolean;
	createdAt?: string;
	deletedAt?: string | null;
	updatedAt?: string;
}
export interface IGetEmployees {
	users: IEmployee[];

	metadata: {
		page: number;
		size: number;
		total: number;
	};
}
