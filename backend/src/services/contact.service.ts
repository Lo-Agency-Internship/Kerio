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
    private readonly searchService: SearchService,
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
    await this.contactRepository.save(body);

    await this.contactStatusRepository.save({
      contactId: body.id,
      statusId,
    });

    this.searchService.addDocument([body]);

    return body;
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
    const updatedContact = await this.contactRepository.update(id, contact);
    contact = { ...contact, id };

    this.searchService.updateDocument([contact]);
    return updatedContact;
  }

  async deleteContact(id: string): Promise<any> {
    this.searchService.deleteDocument(id);
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
