import { Organization } from 'src/entities/organization.entity';

export interface IReadAllByOrganization {
  organization: Organization;
}

export interface IReadOneById {
  id: number;
}
