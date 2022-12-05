import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/entities/organization.entity';
import { IupdateOrganization } from 'src/interfaces/organizationUser.service.interface';
import { NewOrganization } from 'src/utils/types';
import { Repository } from 'typeorm';

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
    const org = await this.findOneOrganizationBySlug(slug);

    return [org !== null, org];
  }
}
