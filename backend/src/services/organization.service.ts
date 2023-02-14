import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from '../entities/organization.entity';
import { IupdateOrganization } from '../interfaces/organizationUser.service.interface';
import { NewOrganization } from '../utils/types';
import { Repository } from 'typeorm';
import { kebab } from 'case';
import { ICreateOrganizationByOwner } from 'src/interfaces/organization.service';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async addOrganization(organization: NewOrganization): Promise<Organization> {
    return await this.organizationRepository.save(organization);
  }

  async updateOrganization(payload: IupdateOrganization): Promise<any> {
    return await this.organizationRepository.update(
      payload.id,
      payload.organization,
    );
  }

  async findOneOrganizationById(id: number): Promise<Organization> {
    return await this.organizationRepository.findOneBy({ id });
  }

  async findOneOrganizationBySlug(slug: string): Promise<Organization> {
    return await this.organizationRepository.findOneBy({ slug });
  }

  async findAll(): Promise<Organization[]> {
    return await this.organizationRepository.find();
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.organizationRepository.count({
      where: {
        id,
      },
    });

    return count > 0;
  }

  async existsAndFindBySlug(slug: string): Promise<[boolean, Organization]> {
    const org = await this.organizationRepository.findOneBy({ slug });

    return [org !== null, org];
  }

  async createOrganizationByOwner(payload: ICreateOrganizationByOwner) {
    const pipedOrgSlug = kebab(payload.organizationSlug);
    const orgExists = await this.organizationRepository.findOneBy({
      slug: pipedOrgSlug,
    });
    if (orgExists) {
      throw new NotAcceptableException();
    }
    const newOrg = await this.addOrganization({
      name: `${payload.name}'s Organization`,
      address: '',
      slug: pipedOrgSlug,
    });

    return newOrg;
  }
}
