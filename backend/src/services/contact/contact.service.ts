import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../../entities/contact/contact.entity';
import { DeepPartial, DeleteResult, Repository, UpdateResult } from 'typeorm';
import {
  ICreatePayload,
  IDeletePayload,
  IFindOneByIdPayload,
  IFindPayload,
  IMultiDeletePayload,
  IPaginatedContacts,
  IUpdateOneByIdPayload,
  IUpdateStatusPayload,
} from '../../interfaces/contact.service.interface';
import { getPaginationOffset } from '../../utils/functions';
import { ContactStatus } from '../../entities/contact/contactStatus.entity';
import { SearchService } from '../search.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,

    @InjectRepository(ContactStatus)
    private readonly contactStatusRepository: Repository<ContactStatus>,

    private readonly searchService: SearchService,
  ) {}

  async find(payload: IFindPayload): Promise<IPaginatedContacts> {
    const [result, total] = await this.contactRepository.findAndCount({
      where: {
        organization: { id: payload.organization.id },
      },
      relations: [
        'statuses',
        'statuses.status',
        'statuses.status',
        'organization',
      ],
      order: { createdAt: payload.sort },
      take: payload.size,
      skip: getPaginationOffset(payload),
    });

    if (!payload.status) {
      const contacts = result.map((contact) => ({
        ...contact,
        statuses: undefined,
        lastStatus:
          contact.statuses.length > 0 &&
          contact.statuses[contact.statuses.length - 1],
      }));
      return {
        contacts,
        metadata: {
          total,
          size: payload.size,
          page: payload.page,
        },
      };
    }

    const contacts = result.filter((contact) => {
      const lastStatus = contact.statuses[contact.statuses.length - 1];
      return lastStatus.status.status === payload.status;
    });
    return {
      contacts,
      metadata: {
        total,
        size: payload.size,
        page: payload.page,
      },
    };
  }

  async findOneById(payload: IFindOneByIdPayload): Promise<Contact | null> {
    return await this.contactRepository.findOne({
      where: {
        id: payload.id,
        organization: { id: payload.organizationId },
      },
      relations: ['statuses', 'statuses.status', 'organization', 'notes'],
    });
  }

  async create(payload: ICreatePayload): Promise<Contact> {
    const result = await this.contactRepository.save({
      ...payload.contact,
      organization: payload.organization,
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

  async delete(payload: IDeletePayload): Promise<DeleteResult> {
    const deletedContact = await this.contactRepository.softDelete(payload.id);
    this.searchService.deleteDocument(payload.id);
    return deletedContact;
  }

  async deleteMulti(payload: IMultiDeletePayload): Promise<DeleteResult> {
    const deletedContact = await this.contactRepository.softDelete(payload.ids);
    payload.ids.map((item) => {
      this.searchService.deleteDocument(payload.ids[item]);
    });
    return deletedContact;
  }

  createNewContactObject(contact: DeepPartial<Contact>) {
    return this.contactRepository.create(contact);
  }
}
