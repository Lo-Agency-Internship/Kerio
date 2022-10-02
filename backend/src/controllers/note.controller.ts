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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddNotetDto, UpdateNoteBodyDto } from 'src/dtos/note.dto';
import { Note } from 'src/entities/note.entity';
import { LogService } from 'src/services/log.service';
import { NoteService } from 'src/services/note.service';
import { JwtGuard } from 'src/utils/jwt.guard';
import { DeleteResult, UpdateResult } from 'typeorm';

@UseGuards(JwtGuard)
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('notes')
export class NoteController {
  constructor(
    private readonly noteService: NoteService,
    private readonly logService: LogService,
  ) {}

  @Get(':contactId')
  getAllNotesByContactId(
    @Param('contactId', ParseIntPipe) id: number,
  ): Promise<Note[]> {
    const notes = this.noteService.readAllByContactId({ id });
    return notes;
  }

  @Post(':contactId')
  create(
    @Param('contactId', ParseIntPipe) contactId,
    @Body() body: AddNotetDto,
  ): Promise<Note> {
    const note = this.noteService.createNewNoteObject(body);
    return this.noteService.create({ note, contactId });
  }
  @Put(':noteId')
  update(
    @Param('noteId', ParseIntPipe) id: number,
    @Body() note: UpdateNoteBodyDto,
  ): Promise<UpdateResult> {
    return this.noteService.updateOneById({ id, note });
  }

  @Delete(':noteId')
  delete(@Param('noteId', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.noteService.delete({ id });
  }
}
