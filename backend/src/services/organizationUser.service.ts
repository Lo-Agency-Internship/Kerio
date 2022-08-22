import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { OrganizationUser } from '../entities/organizationUser.entity';
import { Organization } from '../entities/organization.entity';
import { SecureUserWithOrganization } from '../utils/types';
import { Role } from 'src/entities/role.entity';
import { roleEnum } from '../utils/types'


@Injectable()
export class OrganizationUserService {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRepository: Repository<Organization>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(OrganizationUser)
    private readonly orgUserRepository: Repository<OrganizationUser>,
  ) {}

  async assignUserToOrganization(
    userId: number,
    orgId: number,
    userRole
  ): Promise<OrganizationUser> {
    const orgUser = await this.orgUserRepository.save({
      orgId,
      userId,
      userRole
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

    //user.organization.roleId;
    const role = await this.roleRepository.findOneBy({id:user.organization.roleId})

    return {
      ...user,
      organization: org,
      role:role
    };
  }
}
