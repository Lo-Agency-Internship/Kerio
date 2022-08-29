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

  getAllContact(organizationId): Promise<Contact[]> {
    return this.contactRepository.find({where:{organizationId}});
  }

  findOneContactById(id: number): Promise<Contact> {
    return this.contactRepository.findOneBy({ id });
  }

  async addContact(contact: Contact): Promise<Contact> {
     const { status} = contact;
     const statusId = EStatus[`${status}`];
     const newContact = await this.contactRepository.save(contact);
     const contactId = newContact.id;
     const contactStatus = await this.contactStatusRepository.save({contactId,statusId});
     return newContact
    //cascade true save relation automatically
  }

  async updateContact(id: number, contact: Contact): Promise<any> {
    const {status} = contact;
    const userState = await this.contactStatusRepository.findOne({
      where: {
        contactId:id,
      },
      relations: ['status'],
      loadEagerRelations: true,
      relationLoadStrategy: 'join',
    });

    console.log('zzzzzzzzzzzzzzzzzz',userState)
    //if(status!== currentStatus){
      // find status ID 
      // save a row in contactStatus table
 // }

      return this.contactRepository.update(id, contact);
    };
  


  async deleteContact(id: string): Promise<any> {
    return await this.contactRepository.softDelete(id);
  }
}
