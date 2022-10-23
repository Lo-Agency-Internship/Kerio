import { Organization } from 'src/entities/organization.entity';
import { User } from 'src/entities/user.entity';
import { DeepPartial } from 'typeorm';

export interface IReadAllByOrganization {
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
