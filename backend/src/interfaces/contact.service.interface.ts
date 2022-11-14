import { IPaginationParams } from './index';
import { DeepPartial, FindOperator } from 'typeorm';
import { EContactStatus } from '../utils/types';
import { Contact } from '../entities/contact/contact.entity';
import { Status } from '../entities/contact/status.entity';
import { Organization } from 'src/entities/organization.entity';

export interface IFindPayload extends IPaginationParams {
  organization: Organization;
  status?: EContactStatus;
}

export interface IFindOneByIdPayload {
  organizationId: number | FindOperator<number>;
  id: number;
}

export interface ICreatePayload {
  organization: Organization;
  contact: DeepPartial<Contact>;
}

export interface IUpdateOneByIdPayload {
  id: number;
  contact: DeepPartial<Contact>;
}

export interface IUpdateStatusPayload {
  id: number;
  status: Status;
  organizationId: number | FindOperator<number>;
}

export interface IDeletePayload {
  id: number;
}

export interface IMultiDeletePayload {
  ids: number[];
}

export interface IPaginatedContacts {
  contacts: AbstractContact[];
  metadata: {
    total: number;
    size: number;
    page: number;
  };
}

export interface AbstractContact extends Contact {
  totalScore: number;
}
