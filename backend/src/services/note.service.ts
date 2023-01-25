import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginatedNoteResponse } from '../dtos/note.dto';
import { Note } from '../entities/note.entity';

import {
  ICreatePayload,
  IDeleteByIdPayload,
  IFindByContactIdPayload,
  IUpdateOneByIdPayload,
} from '../interfaces/note.service.interface';
import { getPaginationOffset } from '../utils/functions';
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
      status: payload.status,
    });
  }

  async updateOneById(payload: IUpdateOneByIdPayload): Promise<UpdateResult> {
    return await this.noteRepository.update(payload.id, payload.note);
  }

  async delete(payload: IDeleteByIdPayload): Promise<DeleteResult> {
    return await this.noteRepository.softDelete(payload.id);
  }

  async readAllByContactId(
    payload: IFindByContactIdPayload,
  ): Promise<IPaginatedNoteResponse> {
    const [notes, total] = await this.noteRepository.findAndCount({
      where: { contact: { id: payload.id } },
      relations: ['contact'],
      order: { createdAt: payload.sort },
      skip: getPaginationOffset(payload),
      take: payload.size,
    });

    return {
      notes,
      metadata: {
        total,
        size: payload.size,
        page: payload.page,
      },
    };
  }

  createNewNoteObject(payload: DeepPartial<Note>) {
    return this.noteRepository.create(payload);
  }
}
