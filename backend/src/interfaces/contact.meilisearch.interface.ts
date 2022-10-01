import { Contact } from '../entities/contact/contact.entity';
import { DeepPartial } from 'typeorm';

export interface IContactMeilisearch
  extends Omit<
    DeepPartial<Contact>,
    'statuses' | 'organization' | 'organizationId'
  > {
  lastStatus: string;
}
