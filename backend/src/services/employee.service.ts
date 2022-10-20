import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/entities/organization.entity';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/entities/role.entity';
import { OrganizationUser } from 'src/entities/organizationUser.entity';
import { RequestContextService } from './requestContext.service';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(OrganizationUser)
    private readonly orgRepository: Repository<OrganizationUser>,

    @InjectRepository(OrganizationUser)
    private readonly orgUserRepository: Repository<OrganizationUser>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    private readonly contextService: RequestContextService,
  ) {}

  /*   async findAll(): Promise<User[]> {
    const organization = this.contextService.get(
      'organization',
    ) as Organization;
    const results = await this.userRepository.find({
      where: {},
    });

    return results;
  } */

  async findOneById(id: number): Promise<User> {
    const orgUser = await this.orgUserRepository.findOne({
      where: { user: { id } },
      relations: ['user'],
    });
    if (!orgUser.user) {
      throw new NotFoundException();
    }
    return orgUser.user;
  }
}
