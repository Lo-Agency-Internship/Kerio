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
import { NoteService } from "src/services/note.service";
import { JwtGuard } from 'src/utils/jwt.guard';

@UseGuards(JwtGuard)
@Controller('notes')
export class NoteController{
    constructor(private readonly noteService:NoteService){}

    @Get(':contactId')
    getAllNotesByContactId(@Param('contactId',ParseIntPipe) contactId:number):Promise<Note[]>{
    
        const notes =  this.noteService.getAllNotesByContactId(contactId)
        return notes
    }

    @Post(':contactId')
    addNote(@Param('contactId') contactId ,@Body() body:AddNotetDto):Promise<Note>{
        console.log('checkcontroller')
        //assign note to the its contact
        body = {...body,contactId}
        return this.noteService.addNote(body)

    }
    @Put(':noteId')
    editNote( @Param('noteId',ParseIntPipe) id:number , @Body() body){

        return this.noteService.updateNote(id,body)

    }

    @Delete(':noteId')
    deleteNote(@Param('noteId',ParseIntPipe) id:number){
        return this.noteService.deleteNote(id)

    }
}