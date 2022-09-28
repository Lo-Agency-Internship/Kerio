import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AddNotetDto } from 'src/dtos/note.dto';
import { Note } from 'src/entities/note.entity';
import { LogService } from 'src/services/log.service';
import { NoteService } from 'src/services/note.service';
import { JwtGuard } from 'src/utils/jwt.guard';
import { EEntityTypeLog } from 'src/utils/types';

@UseGuards(JwtGuard)
@Controller('notes')
export class NoteController {
  constructor(
    private readonly noteService: NoteService,
    private readonly logService: LogService,
  ) {}

  @Get(':contactId')
  getAllNotesByContactId(
    @Param('contactId', ParseIntPipe) contactId: number,
  ): Promise<Note[]> {
    const notes = this.noteService.readAllByContactId(contactId);
    return notes;
  }

  @Post(':contactId')
  addNote(
    @Param('contactId') contactId,
    @Body() body: AddNotetDto,
  ): Promise<Note> {
    console.log('checkcontroller');
    body = { ...body, contactId };

    this.logService.addLog({
      title: 'Add Note Successfully',
      description: `Added Note with  (${body.title}) Title, and (${body.description}) Describtion Successfully `,
      entityType: 'Add Note',
      entityId: EEntityTypeLog.AddNote,
      event: 'Note',
    });

    return this.noteService.create(body);
  }
  @Put(':noteId')
  editNote(@Param('noteId', ParseIntPipe) id: number, @Body() body) {
    this.logService.addLog({
      title: 'Updated Note Successfully',
      description: `Updated Note with  (${body.title}) Title, and (${body.description}) Describtion Successfully `,
      entityType: 'Update Note',
      entityId: EEntityTypeLog.UpdateNote,
      event: 'Note',
    });

    return this.noteService.update(id, body);
  }

  @Delete(':noteId')
  deleteNote(@Param('noteId', ParseIntPipe) id: number) {
    this.logService.addLog({
      title: 'Deleted Note Successfully',
      description: `Deleted Note with id=${id}  Successfully`,
      entityType: 'Delete Note',
      entityId: EEntityTypeLog.DeleteNote,
      event: 'Note',
    });

    return this.noteService.delete(id);
  }
}
