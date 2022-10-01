import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from 'src/entities/note.entity';
import { Repository } from 'typeorm';
import { ContactStatus } from '../entities/contact/contactStatus.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(ContactStatus)
    private readonly contactStatusRepository: Repository<ContactStatus>,
  ) {}

  async create(@Body() body): Promise<Note> {
    return await this.noteRepository.save(body);
  }

  async update(id, body) {
    return await this.noteRepository.update(id, body);
  }

  async delete(id) {
    return await this.noteRepository.softDelete(id);
  }

  async readAllByContactId(contactId): Promise<Note[]> {
    return await this.noteRepository.find({ where: { contactId } });
  }
}
