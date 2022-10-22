import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organization } from './organization.entity';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity()
export class OrganizationUser {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Organization, (organization) => organization.OrgUser, {})
  org: Organization;

  @ManyToOne(() => Role)
  role: Role;
}
