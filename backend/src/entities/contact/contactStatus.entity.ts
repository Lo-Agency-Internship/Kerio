import {
  BaseEntity,
  Column,
  CreateDateColumn, DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Contact } from './contact.entity';
import { Status } from './status.entity';

@Entity()
export class ContactStatus{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contactId: number;

  @Column()
  statusId: number;

  @ManyToOne(() => Contact, (c) => c.statuses)
  contact: Contact;

  @ManyToOne(() => Status, (s) => s.contacts)
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
