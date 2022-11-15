export interface IApiPaginationParams {
	pagination: {
		page?: number;
		size?: number;
		sort?: 'asc' | 'desc';
	};
}
export interface IGetContactsInfoById {
	id?: string;
}
export interface IGetUsersInfoById {
	id: string;
}

export interface IGetAllTimelines {
	id: string;
}

export interface IPostLogin {
	email?: string;
	password?: string;
}

export interface IPostSignUp {
	name?: string;
	email?: string;
	password?: string;
	organizationSlug?: string;
}

export interface IPostContactInfo {
	name?: string;
	phone: FormDataEntryValue | null;
	email?: string;
	status: FormDataEntryValue | null;
}

export interface IPostInviteEmployee {
	name: string;
	email: string;
}

export interface IPostNoteInfo {
	title?: FormDataEntryValue | null;
	description?: FormDataEntryValue | null;
	date?: FormDataEntryValue | null;
	status?: FormDataEntryValue | null;
	score?: FormDataEntryValue | null;
	id?: string;
}

export interface IUpdateContactInfo {
	name?: string;
	email?: string;
	phone?: string;
	id?: number;
}

export interface IUpdateEmployeeInfo {
	name?: string;
	email?: string;
	id: string;
}

export interface IUpdateContactNoteById {
	date?: string;
	title?: string;
	description?: string;
	score?: string;
	status?: string;
	id?: string;
}

export interface IDeleteContact {
	id: number;
}

export interface IDeleteEmployee {
	id: string;
}

export interface IGetAllNotes {
	id?: string;
}
