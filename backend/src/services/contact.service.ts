import { Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Contact } from '../entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(Contact)
        private readonly contactRepository:Repository<Contact>
    ){}

    findAllContact():Promise<Contact[]>
    {
        return this.contactRepository.find()
    }

    findOneContact(id: number):Promise<Contact>
    {
        return this.contactRepository.findOneBy({id})
    }

    addContact(contact:Contact): Promise<Contact>
    {
        return this.contactRepository.save(contact)
    }

    updateContact(id:number,contact: Contact): Promise<any>
    {
        return this.contactRepository.update(id,contact);
    }

   async deleteContact(id:string): Promise<any>
    {
        return await  this.contactRepository.softDelete(id);
    }
}
