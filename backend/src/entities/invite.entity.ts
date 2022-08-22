import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Organization } from './organization.entity';
import { User } from './user.entity';

@Entity()
export class Invite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  token: string;

  @ManyToOne(() => User)
  invitedBy: User;

  @ManyToOne(() => Organization)
  invitedOrganization: Organization;

  @CreateDateColumn()
  createdAt: Date;
}
