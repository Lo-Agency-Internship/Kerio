import { User } from '../entities/user.entity';
import { Organization } from '../entities/organization.entity';
import { Invite } from 'src/entities/invite.entity';
import { Role } from 'src/entities/role.entity';

export type SecureUser = Omit<User, 'password' | 'salt'>;
export type SecureUserWithOrganization = Omit<SecureUser, 'organization'> & {
  organization: Organization;
  role: Role | null;
};

export type UserWithOrganization = Omit<User, 'organization'> & {
  organization: Organization;
  role: Role | null;
};

export type NewUser = Omit<
  User,
  'id' | 'createdAt' | 'deletedAt' | 'updatedAt' | 'organization'
>;

export type NewOrganization = Omit<
  Organization,
  'id' | 'createdAt' | 'deletedAt' | 'updatedAt' | 'contacts' | 'OrgUser'
>;

export type JwtPayload = {
  email: string;
  sub: number;
  name: string;
  role: Role;
};

export type JwtResponse = {
  access_token: string;
};

export type SecureInvite = Omit<Invite, 'token'>;

export enum ERole {
  Owner = 'Owner',
  Employee = 'Employee',
}

export type UserUpdate = User & { oldPassword: string; newPassword: string };

export enum EContactStatus {
  Lead = 'Lead',
  PotentialCustomer = 'PotentialCustomer',
  LostPotentialCustomer = 'LostPotentialCustomer',
  LoyalCustomer = 'LoyalCustomer',
  LostLoyalCustomer = 'LostLoyalCustomer',
  Loyal = 'Loyal',
  LostLoyal = 'LostLoyal',
}

export enum EEntityTypeLog {
  Login = 1,
  Register = 2,
  AddContact = 3,
  UpdateContact = 4,
  DeleteContact = 5,
  AddNote = 6,
  UpdateNote = 7,
  DeleteNote = 8,
  Invite = 9,
  ActiveAccount = 10,
}
