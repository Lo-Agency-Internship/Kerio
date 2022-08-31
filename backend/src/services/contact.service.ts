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
    private readonly contactStatusRepository: Repository<ContactStatus>,
  ) {}

  getAllContact(organizationId): Promise<Contact[]> {
    return this.contactRepository.find({ where: { organizationId } });
  }

  findOneContactById(id: number): Promise<Contact> {
    return this.contactRepository.findOneBy({ id });
  }

  async addContact(contact: Contact): Promise<Contact> {
    const { status } = contact;
    const statusId = EStatus[`${status}`];
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
    const allOfUserStatus = await this.contactStatusRepository.find({
      where: {
        contactId: id,
      },
      relations: ['status'],
      loadEagerRelations: true,
      relationLoadStrategy: 'join',
    });

    const recentUserStatus = allOfUserStatus[allOfUserStatus.length - 1];
    const recentStatus = recentUserStatus.status.title;
    const contactId = id;
    if (status !== recentStatus) {
      const statusId = EStatus[`${status}`];
      this.contactStatusRepository.save({ contactId, statusId });
    }

    return this.contactRepository.update(id, contact);
  }

  async deleteContact(id: string): Promise<any> {
    return await this.contactRepository.softDelete(id);
  }
}
