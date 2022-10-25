export interface IApiPaginationParams {
	pagination: {
		page?: number;
		size?: number;
		sort?: 'asc' | 'desc';
	};
}
export interface IGetContactsInfoById {
	id: string;
}
export interface IGetUsersInfoById {
	id: string;
}

export interface IGetAllTimelines {
	id: string;
}

export interface IPostLogin {
	email: string;
	password: string;
}

export interface IPostSignUp {
	name: string;
	email: string;
	password: string;
	organizationSlug: string;
}

export interface IPostContactInfo {
	name: string;
	phone: string;
	email: string;
	status: string;
}

export interface IPostInviteEmployee {
	name: string;
	email: string;
}

export interface IPostNoteInfo {
	title: string;
	description: string;
	date: string;
	status: string;
	score: string;
	id: string;
}

export interface IUpdateContactInfo {
	name: string;
	email: string;
	phone: string;
	id: string;
}

export interface IDeleteContact {
	id: string;
}
