import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../entities/contact.entity';
import { DeepPartial, Repository } from 'typeorm';
import { ContactStatus } from 'src/entities/contactStatus';
import { EStatus as EContactStatus } from 'src/utils/types';
import { AddContactDto } from 'src/dtos/contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,

    @InjectRepository(ContactStatus)
    private readonly contactStatusRepository: Repository<ContactStatus>,
  ) {}

  getAllContact(organizationId, pageNumber, perPage): Promise<Contact[]> {
    return this.contactRepository.find({
      where: { organizationId },
      order: { createdAt: 'DESC' },
      take: perPage,
      skip: pageNumber > 0 ? (pageNumber - 1) * perPage : 1,
    });
  }

  findOneContactById(id: any, organizationId): Promise<Contact[]> {
    return this.contactRepository.find({ where: { id, organizationId } });
  }
  async createContact(contact: Contact): Promise<Contact> {
    const statusId = EContactStatus[contact.status];
    const newContact = await this.contactRepository.save(contact);
    const contactId = newContact.id;
    await this.contactStatusRepository.save({
      contactId,
      statusId,
    });
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
      const statusId = EContactStatus[`${status}`];
      this.contactStatusRepository.save({ contactId, statusId });
    }

    return this.contactRepository.update(id, contact);
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

  createNewContact(contact: DeepPartial<Contact>) {
    return this.contactRepository.create(contact);
  }
}
