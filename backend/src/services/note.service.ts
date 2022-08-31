import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from 'src/entities/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Noteservice {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async addNote(@Body() body) {
    //add contactId from url
    return await this.noteRepository.save(body);
  }

  async updateNote(@Body() body, id) {
    return await this.noteRepository.update(body, id);
  }

  async deleteNote(id) {
    return await this.noteRepository.softDelete(id);
  }

  async findOneNoteById(noteId) {
    return await this.findOneNoteById(noteId);
  }
  async findNotesByContactId(contactId) {
    return await this.noteRepository.find({ where: { id: contactId } });
  }
}
