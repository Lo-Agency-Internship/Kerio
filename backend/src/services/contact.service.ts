import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../entities/contact/contact.entity';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
import {
  ICreatePayload,
  IDeletePayload,
  IFindOneByIdPayload,
  IFindPayload,
  IUpdateOneByIdPayload,
  IUpdateStatusPayload,
} from '../interfaces/contact.service.interface';
import { getPaginationOffset } from '../utils/functions';
import { ContactStatus } from '../entities/contact/contactStatus.entity';
import { Status } from '../entities/contact/status.entity';
import { SearchService } from './search.service';
import { UpdateContactBodyDto } from 'src/dtos/contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,

    @InjectRepository(ContactStatus)
    private readonly contactStatusRepository: Repository<ContactStatus>,

    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,

    private readonly searchService: SearchService,
  ) {}

  async find(payload: IFindPayload): Promise<Contact[]> {
    const contacts = await this.contactRepository.find({
      where: {
        organizationId: payload.organizationId,
      },
      relations: ['statuses', 'statuses.status', 'statuses.status'],
      order: { createdAt: payload.sort },
      take: payload.size,
      skip: getPaginationOffset(payload),
    });

    if (!payload.status) return contacts.map(contact => ({
      ...contact,
      statuses: undefined,
      lastStatus: contact.statuses.length > 0 && contact.statuses[contact.statuses.length - 1]
    }));

    return contacts.filter((contact) => {
      const lastStatus = contact.statuses[contact.statuses.length - 1];

      return lastStatus.status.status === payload.status;
    });
  }

  async findOneById(payload: IFindOneByIdPayload): Promise<Contact | null> {
    return await this.contactRepository.findOne({
      where: {
        id: payload.id,
        organizationId: payload.organizationId,
      },
      relations: ['statuses', 'statuses.status'],
    });
  }

  async create(payload: ICreatePayload): Promise<Contact> {
    const result = await this.contactRepository.save({
      ...payload.contact,
      organizationId: payload.organizationId,
    });

    this.searchService.addDocument([
      {
        ...result,
        lastStatus: payload.contact.statuses[0].status.status,
      },
    ]);

    return result;
  }

  async updateOneById(payload: IUpdateOneByIdPayload): Promise<UpdateResult> {
    const updatedContact = await this.contactRepository.update(
      payload.id,
      payload.contact,
    );
    const contact = { ...payload.contact, id: payload.id };

    this.searchService.updateDocument([contact]);
    return updatedContact;
  }

  async updateStatus(payload: IUpdateStatusPayload) {
    const contact = await this.findOneById({
      id: payload.id,
      organizationId: payload.organizationId,
    });

    this.searchService.updateDocument([
      {
        ...contact,
        lastStatus: payload.status.status,
      },
    ]);

    return await this.contactStatusRepository.save({
      contact,
      status: payload.status,
      contactId: contact.id,
      statusId: payload.status.id,
    });
  }

  async delete(payload: IDeletePayload): Promise<any> {
    this.searchService.deleteDocument(payload.id);
    return await this.contactRepository.softDelete(payload.id);
  }

  createNewContactObject(contact: DeepPartial<Contact>) {
    return this.contactRepository.create(contact);
  }
}
