import { IStatuses } from '../user/status.interface';

interface searchProps {
	id?: number;
	name?: string;
	email?: string;
	phone?: string;
	statuses?: IStatuses;
	score?: string;
}

export default searchProps;
