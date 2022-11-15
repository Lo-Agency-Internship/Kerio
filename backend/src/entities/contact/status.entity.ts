import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EContactStatus } from '../../utils/types';
import { Note } from '../note.entity';
import { ContactStatus } from './contactStatus.entity';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: EContactStatus,
    default: EContactStatus.Lead,
  })
  status: EContactStatus;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;

  @OneToMany(() => ContactStatus, (c) => c.status)
  contacts: ContactStatus[];

  @OneToMany(() => Note, (note) => note.status)
  notes: Note[];
}
