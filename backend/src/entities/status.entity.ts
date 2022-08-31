import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ContactStatus } from './contactStatus';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => ContactStatus, (contactStatus) => contactStatus.status)
  contactStatus: ContactStatus;
}
