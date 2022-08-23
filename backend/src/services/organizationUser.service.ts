import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { OrganizationUser } from '../entities/organizationUser.entity';
import { Organization } from '../entities/organization.entity';
import { SecureUserWithOrganization } from '../utils/types';

@Injectable()
export class OrganizationUserService {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRepository: Repository<Organization>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(OrganizationUser)
    private readonly orgUserRepository: Repository<OrganizationUser>,
  ) {}

  async assignUserToOrganization(
    userId: number,
    orgId: number,
    roleId = 0,
  ): Promise<OrganizationUser> {
    const orgUser = await this.orgUserRepository.save({
      orgId,
      userId,
      roleId,
    });

    await this.userRepository.update(
      {
        id: userId,
      },
      {
        organization: orgUser,
      },
    );

    return orgUser;
  }

  async findUserWithOrganizationByUserEmail(
    email: string,
  ): Promise<SecureUserWithOrganization> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      relations: ['organization'],
      loadEagerRelations: true,
      relationLoadStrategy: 'join',
    });

    const org = await this.orgRepository.findOneBy({
      id: user.organization.orgId,
    });

    user.organization.roleId;

    return {
      ...user,
      organization: org,
    };
  }
}
