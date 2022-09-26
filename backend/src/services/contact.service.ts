import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../entities/contact.entity';
import { Repository } from 'typeorm';
import { ContactStatus } from 'src/entities/contactStatus';
import { EStatus } from 'src/utils/types';
import { SearchService } from './search.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,

    @InjectRepository(ContactStatus)
    private readonly contactStatusRepository: Repository<ContactStatus>,
    private readonly searchService:SearchService,
  ) {}

  getAllContact(organizationId, pageNumber, perPage): Promise<Contact[]> {
    return this.contactRepository.find({
      where: { organizationId },
      order: { createdAt: 'DESC' },
      take: perPage,
      skip: pageNumber > 0 ? (pageNumber - 1) * perPage : 1,
    });
  }

  findOneContactById(id: any): Promise<Contact> {
    return this.contactRepository.findOneBy({ id });
  }
  async addContact(body): Promise<Contact> {
    const { status } = body;
    const statusId = EStatus[`${status}`];
    const newContact = await this.contactRepository.save(body);
    const contactId = newContact.id;
    await this.contactStatusRepository.save({
      contactId,
      statusId,
    });
    //const test = this.searchService.getDocuments();
    // const contacts = await this.contactRepository.find()
    // contacts.push(newContact)
    // console.log('===================',contacts);

    this.searchService.addDocument([newContact])
    
    return newContact;
  }

  async updateContact(id: number, contact: Contact): Promise<any> {
    const { status } = contact;
    const allOfContactStatus = await this.contactStatusRepository.find({
      where: {
        contactId: id,
      },
      relations: ['status'],
      loadEagerRelations: true,
      relationLoadStrategy: 'join',
    });

    const recentContactStatus =
      allOfContactStatus[allOfContactStatus.length - 1];
    const recentStatus = recentContactStatus.status.title;
    const contactId = id;
    if (status !== recentStatus) {
      const statusId = EStatus[`${status}`];
      this.contactStatusRepository.save({ contactId, statusId });
    }
    const updatedContact =this.contactRepository.update(id, contact);
    this.searchService.addDocument(updatedContact)
    return updatedContact
  }

  async deleteContact(id: string): Promise<any> {
    return await this.contactRepository.softDelete(id);
  }

  async getContactsFilteredByStatus(
    query,
    organizationId,
    pageNumber,
    perPage,
  ) {
    const contacts = this.contactRepository.find({
      where: {
        status: query,
        organizationId,
      },
      order: { createdAt: 'DESC' },
      take: perPage,
      skip: pageNumber > 0 ? (pageNumber - 1) * perPage : 1,
    });
    return contacts;
  }
}
