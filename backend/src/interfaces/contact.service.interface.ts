import { IPaginationParams } from './index';
import { DeepPartial, FindOperator } from 'typeorm';
import { EContactStatus } from '../utils/types';
import { Contact } from '../entities/contact/contact.entity';
import { Status } from '../entities/contact/status.entity';

export interface IFindPayload extends IPaginationParams {
  organizationId: number | FindOperator<number>;
  status?: EContactStatus;
}

export interface IFindOneByIdPayload {
  organizationId: number | FindOperator<number>;
  id: number;
}

export interface ICreatePayload {
  organizationId: number;
  contact: DeepPartial<Contact>;
}

export interface IUpdateOneByIdPayload {
  id: number;
  contact: DeepPartial<Contact>;
}

export interface IUpdateStatusPayload {
  id: number;
  organizationId: number | FindOperator<number>;
  status: Status;
}

export interface IDeletePayload {
  id: number;
}
