export interface IEmployee {
	id: string;
	name?: string;
	email?: string;
	profileSidebarOpen?: boolean;
	setProfileSidebarOpen?: boolean;
	createdAt?: string;
	deletedAt?: string | null;
	updatedAt?: string;
	enabled?: boolean;
}
