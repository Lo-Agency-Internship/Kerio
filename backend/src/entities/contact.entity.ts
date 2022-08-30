import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ContactStatus } from './contactStatus';
import { Note } from './note.entity';
import { Organization } from './organization.entity';

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

  @Column()
  status: string;

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

  @OneToMany(() => Note, (note) => note.contact)
  notes: Note[];

  @OneToMany(() => ContactStatus, (contactStatus) => contactStatus.contact)
  contactStatus: ContactStatus;
}
