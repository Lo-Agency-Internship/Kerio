import { PaginationDto } from 'src/dtos';
import { Organization } from 'src/entities/organization.entity';
import { User } from 'src/entities/user.entity';
import { NewUser, SecureUser } from 'src/utils/types';
import { DeepPartial } from 'typeorm';

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

export interface IReadAllByOrganization extends PaginationDto {
  organization: Organization;
}

export interface IReadOneById {
  id: number;
}

export interface IUpdateOneByIdPayload {
  id: number;
  employee: DeepPartial<User>;
}

export interface IDeleteOneByIdPayload {
  id: number;
}

export interface IPaginatedUserResponse {
  users: SecureUser[];
  metaData: {
    total: number;
    page: number;
    size: number;
  };
}
