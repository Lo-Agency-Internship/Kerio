import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../entities/contact/contact.entity';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
import { EContactStatus as EContactStatus } from 'src/utils/types';
import {
  ICreatePayload,
  IDeletePayload,
  IFindOneByIdPayload,
  IFindPayload,
  IUpdateOneByIdPayload,
  IUpdateStatusPayload,
} from '../interfaces/contact.service.interface';
import { getPaginationOffset } from '../utils/functions';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  find(payload: IFindPayload): Promise<Contact[]> {
    return this.contactRepository.find({
      where: {
        organizationId: payload.organizationId,
        ...(payload.status && {
          status: payload.status,
        }),
      },
      order: { createdAt: payload.sort },
      take: payload.page,
      skip: getPaginationOffset(payload),
    });
  }

  findOneById(payload: IFindOneByIdPayload): Promise<Contact | null> {
    return this.contactRepository.findOneBy({
      id: payload.id,
      organizationId: payload.organizationId,
    });
  }

  async create(payload: ICreatePayload): Promise<Contact> {
    return await this.contactRepository.save(payload.contact);
  }

  async updateOneById(payload: IUpdateOneByIdPayload): Promise<UpdateResult> {
    return this.contactRepository.update(payload.id, payload.contact);
  }

  async updateStatus(payload: IUpdateStatusPayload) {
    const contact = await this.findOneById({
      id: payload.id,
      organizationId: payload.organizationId,
    });

    return this.updateOneById({
      id: payload.id,
      contact: {
        ...contact,
        statuses: [...contact.statuses, payload.status],
      },
    });
  }

  async delete(payload: IDeletePayload): Promise<any> {
    return await this.contactRepository.softDelete(payload.id);
  }

  createNewContactObject(contact: DeepPartial<Contact>) {
    return this.contactRepository.create(contact);
  }
}
