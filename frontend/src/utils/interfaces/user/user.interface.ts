import { ILastStatus, IStatuses } from './status.interface';

export interface IUsers {
	id?: number;
	name?: string;
	email?: string;
	phone?: string;
	lastStatus: ILastStatus;
	score?: string;
}
export interface IUserById {
	id?: number;
	name?: string;
	email?: string;
	phone?: string;
	statuses?: IStatuses;
	score?: string;
}
