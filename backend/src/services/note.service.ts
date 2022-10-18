import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from 'src/entities/note.entity';

import {
  ICreatePayload,
  IDeleteByIdPayload,
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
      contact: payload.contact,
    });
  }

  async updateOneById(payload: IUpdateOneByIdPayload): Promise<UpdateResult> {
    return await this.noteRepository.update(payload.id, payload.note);
  }

  async delete(payload: IDeleteByIdPayload): Promise<DeleteResult> {
    return await this.noteRepository.softDelete(payload.id);
  }

  async readAllByContactId(payload: IFindByContactIdPayload): Promise<Note[]> {
    return await this.noteRepository.find({
      where: { contact: { id: payload.id } },
      relations: ['contact'],
    });
  }

  createNewNoteObject(note: DeepPartial<Note>) {
    return this.noteRepository.create(note);
  }
}
