import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Status } from './status.entity';
import { Note } from '../note.entity';
import { Organization } from '../organization.entity';
import { JoinTable } from 'typeorm/browser';
import { ContactStatus } from './contactStatus.entity';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ length: 14 })
  phone: string;

  @Column({ nullable: true })
  organizationId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Organization, (organization) => organization.contacts)
  organization: Organization;

  @OneToMany(() => Note, (note) => note.contact, {
    cascade: true
  })
  notes: Note[];

  @OneToMany(() => ContactStatus, (c) => c.contact, {
    cascade: true
  })
  statuses: ContactStatus[];
}
