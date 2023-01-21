import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrganizationUser } from './organizationUser.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: false,
  })
  enabled?: boolean;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => OrganizationUser)
  @JoinColumn()
  organization: OrganizationUser;

constructor(id: number, name: string, email: string, password: string, salt: string, createdAt: Date, updatedAt: Date, deletedAt: Date, organization: OrganizationUser) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.salt=salt;
    this.createdAt=createdAt;
    this.updatedAt=updatedAt;
    this.deletedAt=deletedAt;
    this.organization=organization;
}
}

