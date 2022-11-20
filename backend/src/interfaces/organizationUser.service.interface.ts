import { Organization } from 'src/entities/organization.entity';
import { User } from 'src/entities/user.entity';
import { ERole } from 'src/utils/types';

export interface IassignUserToOrganization {
  user: User;
  organization: Organization;
  role: ERole;
}

export interface IupdateOrganization {
  id: number;
  organization: Organization;
}
