import { PaginationDto } from 'src/dtos';
import { Contact } from 'src/entities/contact/contact.entity';
import { Note } from 'src/entities/note.entity';
import { DeepPartial, FindOperator } from 'typeorm';
import { IPaginationParams } from './index';

export interface IFindPayload extends IPaginationParams {
  organizationId: number | FindOperator<number>;
}

export interface IFindOneByIdPayload {
  organizationId: number | FindOperator<number>;
  id: number;
}

export interface IUpdateOneByIdPayload {
  id: number;
  note: DeepPartial<Note>;
}

export interface IDeleteByIdPayload {
  id: number;
}

export interface IFindByContactIdPayload extends PaginationDto {
  id: number | FindOperator<number>;
}

export interface ICreatePayload {
  contact: Contact;
  note: DeepPartial<Note>;
}

export interface IPaginatedNotes {
  notes: Note[];
  metadata: {
    total: number;
    size: number;
    page: number;
  };
}
