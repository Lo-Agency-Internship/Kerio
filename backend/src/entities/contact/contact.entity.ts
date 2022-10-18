import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Note } from '../note.entity';
import { Organization } from '../organization.entity';
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Organization, (organization) => organization.contacts)
  @JoinColumn()
  organization: Organization;

  @OneToMany(() => Note, (note) => note.contact, {
    cascade: true,
  })
  notes: Note[];

  @OneToMany(() => ContactStatus, (c) => c.contact, {
    cascade: true,
  })
  statuses: ContactStatus[];
}
