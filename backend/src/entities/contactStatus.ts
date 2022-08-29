import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Contact } from './contact.entity';
import { Status } from './status.entity';

@Entity()
export class ContactStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contactId?:number;

  @Column()
  statusId?:number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Contact, (contact) => contact.contactStatus)
  contact: Contact;

  @ManyToOne(() => Status, (status) => status.contactStatus)
  status: Status;
}
