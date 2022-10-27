import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaginationDto } from 'src/dtos';
import {
  AddNotetDto,
  IPaginatedNoteResponse,
  UpdateNoteBodyDto,
} from 'src/dtos/note.dto';
import { Note } from 'src/entities/note.entity';
import { ContactService } from 'src/services/contact/contact.service';
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
  readAll(
    @Param('contactId', ParseIntPipe) id: number,
    @Query() { page, size, sort }: PaginationDto,
  ): Promise<IPaginatedNoteResponse> {
    return this.noteService.readAllByContactId({ id, page, size, sort });
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
    if (!contact) {
      throw new HttpException(
        `this contact  does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
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
