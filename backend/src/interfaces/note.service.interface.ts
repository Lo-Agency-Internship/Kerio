import { Contact } from 'src/entities/contact/contact.entity';
import { Note } from 'src/entities/note.entity';
import { DeepPartial, FindOperator } from 'typeorm';

export interface IUpdateOneByIdPayload {
  id: number;
  note: DeepPartial<Note>;
}

export interface IDeletePayloadById {
  id: number;
}

export interface IFindByContactIdPayload {
  id: number | FindOperator<number>;
}

export interface ICreatePayload {
  contact: Contact;
  note: DeepPartial<Note>;
}
