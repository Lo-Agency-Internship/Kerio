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

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,

    @InjectRepository(ContactStatus)
    private readonly contactStatusRepository: Repository<ContactStatus>,

    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,

    private readonly searchService:SearchService,
  ) {}

  async find(payload: IFindPayload): Promise<Contact[]> {
    const contacts = await this.contactRepository.find({
      where: {
        organizationId: payload.organizationId,
      },
      relations: ['statuses', 'statuses.status', 'statuses.status'],
      order: { createdAt: payload.sort },
      take: payload.page,
      skip: getPaginationOffset(payload),
    });

    if (!payload.status) return contacts;

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
     return await this.contactRepository.save({
      ...payload.contact,
      organizationId: payload.organizationId,
    });
    
  }

  async updateOneById(payload: IUpdateOneByIdPayload): Promise<UpdateResult> {
    return this.contactRepository.update(payload.id, payload.contact);
  }

  async updateStatus(payload: IUpdateStatusPayload) {
    const contact = await this.findOneById({
      id: payload.id,
      organizationId: payload.organizationId,
    });

    return await this.contactStatusRepository.save({
      contact,
      status: payload.status,
      contactId: contact.id,
      statusId: payload.status.id,
    });
  }

  async delete(payload: IDeletePayload): Promise<any> {
    return await this.contactRepository.softDelete(payload.id);
  }

  createNewContactObject(contact: DeepPartial<Contact>) {
    
  const result =this.contactRepository.create(contact);
    this.searchService.addDocument([contact]);
    
    return result
  }
}
