import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../entities/contact.entity';
import { Repository } from 'typeorm';
import { ContactStatus } from 'src/entities/contactStatus';
import { EStatus } from 'src/utils/types';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,

    @InjectRepository(ContactStatus)
    private readonly contactStatusRepository:Repository<ContactStatus>
  ) {}

  getAllContact(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  findOneContactById(id: number): Promise<Contact> {
    return this.contactRepository.findOneBy({ id });
  }

  async addContact(contact: Contact,organizationId:number): Promise<Contact> {
    //TODO find status id
     //this.contactStatusRepository.save(contactId,statusid)
     const { status} = contact;
     //check if it is correct way to get the value from enum
     const statusId = EStatus[status]
     const newContact = await this.contactRepository.save(contact);
     const contactId = newContact.id
     const contactStatus = await this.contactStatusRepository.save({contactId,statusId});
     return newContact
    //cascade true save relation automatically
  }

  updateContact(id: number, contact: Contact): Promise<any> {
    return this.contactRepository.update(id, contact);
  }

  async deleteContact(id: string): Promise<any> {
    return await this.contactRepository.softDelete(id);
  }
}
