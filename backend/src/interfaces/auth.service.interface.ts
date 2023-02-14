import { ERole } from 'src/utils/types';

export interface IFindUserToCheckForLogin {
  email: string;
  password: string;
}

export interface IValidateUser {
  email: string;
  password: string;
}



export interface IRgisterUser {
  email: string;
  name: string;
  password: string;
  organizationSlug: string;
  role: ERole;
}
