import { User } from '../entities/user.entity';
import { Organization } from '../entities/organization.entity';
import { Invite } from 'src/entities/invite.entity';
import { Role } from 'src/entities/role.entity';

export type SecureUser = Omit<User, 'password' | 'salt'>;
export type SecureUserWithOrganization = Omit<SecureUser, 'organization'> & {
  organization: Organization;
  role:Role
};
export type NewUser = Omit<
  User,
  'id' | 'createdAt' | 'deletedAt' | 'updatedAt' | 'organization'
>;

export type NewOrganization = Omit<
  Organization,
  'id' | 'createdAt' | 'deletedAt' | 'updatedAt'
>;

export type JwtPayload = {
  email: string;
  sub: number;
  name: string;
};

export type JwtResponse = {
  access_token: string;
};

export type SecureInvite = Omit<Invite, 'token'>;

export enum roleEnum {
  Owner=1,
  Employee=2

}
