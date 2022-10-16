import { User } from 'src/entities/user.entity';
import { NewUser } from 'src/utils/types';

export interface IAddUserPayload {
  user: NewUser;
}

export interface IUpdateUserByIdPayload {
  id: number;
  user: User;
}

export interface IUpdateUserByEmailPayload {
  email: string;
  user: User;
}

export interface IFindOneUserByIdPayload {
  id: number;
}

export interface IFindOneUserByEmailPayload {
  email: string;
}

export interface IExistAndFindByEmailPayload {
  email: string;
}

export interface IFindUserWithOrganizationPayload {
  email: string;
}
