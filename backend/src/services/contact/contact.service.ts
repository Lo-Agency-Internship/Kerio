import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../../entities/contact/contact.entity';
import { DeepPartial, DeleteResult, Repository, UpdateResult } from 'typeorm';
import {
  AbstractContact,
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

  async caculateContactScore(contacts: Contact[]): Promise<AbstractContact[]> {
    const contactsWithScore = contacts.map((contact) => {
      if (contact.notes.length === 0) {
        return { ...contact, totalScore: 0 };
      }

      const lastStatus =
        contact.statuses[contact.statuses.length - 1].status.status;

      const notesUsedForScoreCalculation = contact.notes.filter(
        (note) => note.score !== null && note.status.status === lastStatus,
      );
      const scores = notesUsedForScoreCalculation.map((note) => {
        return note.score;
      });

      const sumScores = scores.reduce((acc, s) => {
        return acc + s;
      }, 0);

      return { ...contact, totalScore: sumScores / scores.length };
    });

    return contactsWithScore;
  }

  async find(payload: IFindPayload): Promise<IPaginatedContacts> {
    const [result, total] = await this.contactRepository.findAndCount({
      where: {
        organization: { id: payload.organization.id },
      },
      relations: [
        'statuses',
        'statuses.status',
        'notes',
        'notes.status',
        'organization',
      ],
      order: { createdAt: payload.sort },
      take: payload.size,
      skip: getPaginationOffset(payload),
    });

    const contactsWithScore = await this.caculateContactScore(result);

    if (!payload.status) {
      const contacts = contactsWithScore.map((contact) => ({
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

    const contacts = contactsWithScore.filter((contact) => {
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
    // eslint-disable-next-line
    const { organization, statuses, ...rest } = result;
    // question why typescrip dose not tell us this type does not need extra information
    this.searchService.addDocument([
      {
        ...rest,
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

  async batchDelete(payload: IMultiDeletePayload): Promise<DeleteResult> {
    const deletedContact = await this.contactRepository.softDelete(payload.ids);
    await this.searchService.deleteDocuments(payload.ids);
    return deletedContact;
  }

  createNewContactObject(contact: DeepPartial<Contact>) {
    return this.contactRepository.create(contact);
  }
}
