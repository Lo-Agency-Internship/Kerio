import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/entities/organization.entity';
import { Repository } from 'typeorm';
import { NewOrganization } from '../utils/types';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async addOrganization(organization: NewOrganization): Promise<Organization> {
    return await this.organizationRepository.save(organization);
  }

  async updateOrganization(
    id: number,
    organization: Organization,
  ): Promise<any> {
    return await this.organizationRepository.update(id, organization);
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
    const org = await this.findOneOrganizationBySlug(slug);

    return [org !== null, org];
  }
}
