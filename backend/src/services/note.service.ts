import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactStatus } from 'src/entities/contactStatus';
import { Note } from 'src/entities/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(ContactStatus)
    private readonly contactStatusRepository: Repository<ContactStatus>,
  ) {}

  async addNote(@Body() body): Promise<Note> {
    return await this.noteRepository.save(body);
  }

  async updateNote(id, body) {
    return await this.noteRepository.update(id, body);
  }

  async deleteNote(id) {
    return await this.noteRepository.softDelete(id);
  }

  async findOneNoteById(noteId) {
    return await this.findOneNoteById(noteId);
  }
  async getAllNotesByContactId(contactId): Promise<Note[]> {
    return await this.noteRepository.find({ where: { contactId } });
  }

  async getContactTimeLine(id) {
    const notes = await this.noteRepository.find({ where: { contactId: id } });
    const newNotes = notes.map((note) => {
      const { title, date, id } = note;
      return { title, date, id };
    });

    const status = await this.contactStatusRepository.find({
      where: { contactId: id },
      relations: ['status'],
      loadEagerRelations: true,
      relationLoadStrategy: 'join',
    });
    const newStatus = status.map((item) => {
      const { title } = item.status;
      const { id, createdAt } = item;
      return { id, createdAt, title };
    });

    return {
      newNotes,
      newStatus,
    };
  }
}
