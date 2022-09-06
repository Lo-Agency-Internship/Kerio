import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from 'src/entities/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async addNote(@Body() body) {
    
    return await this.noteRepository.save(body);
  }

  async updateNote(id,body) {
    return await this.noteRepository.update(id,body);
  }

  async deleteNote(id) {
    return await this.noteRepository.softDelete(id);
  }

  async findOneNoteById(noteId) {
    return await this.findOneNoteById(noteId);
  }
  async getAllNotesByContactId(contactId):Promise<Note[]> {
    return await this.noteRepository.find({ where: { contactId } });
  }
}
