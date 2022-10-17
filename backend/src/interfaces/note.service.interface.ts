import { IPaginationParams } from './index';
import { DeepPartial, FindOperator } from 'typeorm';
import { Note } from 'src/entities/note.entity';

export interface IFindPayload extends IPaginationParams {
  organizationId: number | FindOperator<number>;
}

export interface IFindOneByIdPayload {
  organizationId: number | FindOperator<number>;
  id: number;
}

export interface ICreatePayload {
  organizationId: number;
  note: DeepPartial<Note>;
}

export interface IUpdateOneByIdPayload {
  id: number;
  note: DeepPartial<Note>;
}



export interface IDeletePayload {
  id: number;
}

export interface IPaginatedNotes {
  notes: Note[];
  metadata: {
    total: number;
    size: number;
    page: number;
  };
}
