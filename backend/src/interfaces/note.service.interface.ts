import { Note } from "src/entities/note.entity";
import { DeepPartial } from "typeorm";

export interface IUpdateOneByIdPayload {
    id:number;
    note:DeepPartial<Note>;
}

export interface IDeletePayloadById {
    id:number;
}

export interface IFindByContactIdPayload {
    id:number
}

export interface  ICreatePayload {
    contactId:number;
    note:DeepPartial<Note>

}