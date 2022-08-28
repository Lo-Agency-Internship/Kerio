import { Body, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Note } from "src/entities/note.entity";
import { Repository } from "typeorm";

@Injectable()
export class Noteservice{
    constructor(
        @InjectRepository(Note)
        private readonly noteRepository:Repository<Note>
    ){}

   async addNote(@Body() body ,contactId:number){

    //add contactId from url
     //await this.noteRepository.save(body,contactId)

    }

    async updateNote(@Body()body,id){
        await this.noteRepository.update(body,id)

    }

    async deleteNote(id){
        await this.noteRepository.softDelete(id)
    }

    async findOneNoteById(noteId){
        await this.findOneNoteById(noteId)

    }
    async findNotesByContactId(contactId){
        await this.noteRepository.find({where:{id:contactId}})
    }
    }
