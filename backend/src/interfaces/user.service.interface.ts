import { Organization } from 'src/entities/organization.entity';
import { User } from 'src/entities/user.entity';
import { NewUser, UserUpdate } from 'src/utils/types';
import { DeepPartial } from 'typeorm';

export interface IAddUserPayload {
  user: NewUser;
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

export interface IReadAllByOrganization {
  organization: Organization;
}

export interface IReadOneById {
  id: number;
}

export interface IUpdateOneByIdPayload {
  id: number;
  user: DeepPartial<UserUpdate>;
}

export interface IDeleteOneByIdPayload {
  id: number;
}
