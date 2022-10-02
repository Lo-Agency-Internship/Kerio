import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from 'src/entities/note.entity';

import {
  ICreatePayload,
  IDeletePayloadById,
  IFindByContactIdPayload,
  IUpdateOneByIdPayload,
} from 'src/interfaces/note.service.interface';
import { DeepPartial, DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async create(payload: ICreatePayload): Promise<Note> {
    return await this.noteRepository.save({
      ...payload.note,
      contactId: payload.contactId,
    });
  }

  async updateOneById(payload: IUpdateOneByIdPayload): Promise<UpdateResult> {
    return await this.noteRepository.update(payload.id, payload.note);
  }

  async delete(payload: IDeletePayloadById): Promise<DeleteResult> {
    return await this.noteRepository.softDelete(payload.id);
  }

  async readAllByContactId(payload: IFindByContactIdPayload): Promise<Note[]> {
    return await this.noteRepository.find({ where: { contactId: payload.id } });
  }

  createNewNoteObject(note: DeepPartial<Note>) {
    return this.noteRepository.create(note);
  }
}
