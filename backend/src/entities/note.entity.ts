import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Contact } from './contact/contact.entity';
import { Status } from './contact/status.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  score: number;

  @Column({ nullable: true })
  date: Date;

  @Column({nullable:true})
  testll: string;

  @Column({nullable:true})
  msgoop:string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Status)
  status: Status;

  @ManyToOne(() => Contact, (contact) => contact.notes)
  @JoinColumn()
  contact: Contact;
}
