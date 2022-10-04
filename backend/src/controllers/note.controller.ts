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
import { ContactService } from 'src/services/contact.service';
import { NoteService } from 'src/services/note.service';
import { RequestContextService } from 'src/services/requestContext.service';
import { JwtGuard } from 'src/utils/jwt.guard';
import { DeleteResult, UpdateResult } from 'typeorm';

@UseGuards(JwtGuard)
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('notes')
export class NoteController {
  constructor(
    private readonly noteService: NoteService,
    private readonly contactService: ContactService,
    private readonly contextService: RequestContextService,
  ) {}

  @Get(':contactId')
  readAll(@Param('contactId', ParseIntPipe) id: number): Promise<Note[]> {
    const notes = this.noteService.readAllByContactId({ id });
    return notes;
  }

  @Post(':contactId')
  async create(
    @Param('contactId', ParseIntPipe) id: number,
    @Body() body: AddNotetDto,
  ): Promise<Note> {
    const organization = this.contextService.get('organization');
    const contact = await this.contactService.findOneById({
      id,
      organizationId: organization.id,
    });
    const note = this.noteService.createNewNoteObject(body);
    return this.noteService.create({ note, contact });
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
