import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { OrganizationUser } from '../entities/organizationUser.entity';
import { Organization } from '../entities/organization.entity';
import { SecureUserWithOrganization } from '../utils/types';
import { Role } from '../entities/role.entity';
import { IassignUserToOrganization } from '../interfaces/organizationUser.service.interface';
import { NotFoundException } from '@nestjs/common/exceptions';

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
    payload: IassignUserToOrganization,
  ): Promise<OrganizationUser> {
    const userRole = await this.roleRepository.findOneByOrFail({
      name: payload.role,
    });

    const orgUser = await this.orgUserRepository.save({
      org: payload.organization,
      user: payload.user,
      role: userRole,
    });

    await this.userRepository.update(
      {
        id: payload.user.id,
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
      relations: ['organization', 'organization.role', 'organization.org'],
      loadEagerRelations: true,
      relationLoadStrategy: 'join',
    });

    if (!user){
      throw new NotFoundException('user does not exist')
    }

    delete user.password;
    delete user.salt;

    return {
      ...user,
      organization: user.organization.org,
      role: user.organization.role,
    };
  }
}
