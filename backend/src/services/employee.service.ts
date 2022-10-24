import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/entities/role.entity';
import { OrganizationUser } from 'src/entities/organizationUser.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import {
  IDeleteOneByIdPayload,
  IReadAllByOrganization,
  IReadOneById,
  IUpdateOneByIdPayload,
} from 'src/interfaces/employee.service.interface';
import { SecureUser } from 'src/utils/types';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(OrganizationUser)
    private readonly orgUserRepository: Repository<OrganizationUser>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async readAllByOrganization(
    payload: IReadAllByOrganization,
  ): Promise<SecureUser[]> {
    const results = await this.orgUserRepository.find({
      where: { org: { id: payload.organization.id }, role: { id: 2 } },
      relations: ['user'],
    });

    const empolyees = results.map((item) => {
      delete item.user.password;
      delete item.user.salt;
      return item.user;
    });

    return empolyees;
  }

  async readOneById(payload: IReadOneById): Promise<SecureUser> {
    const user = await this.userRepository.findOne({
      where: { id: payload.id },
    });

    if (!user) {
      throw new NotFoundException();
    }
    delete user.password;
    delete user.salt;
    return user;
  }

  async updateOneById(payload: IUpdateOneByIdPayload): Promise<UpdateResult> {
    return await this.userRepository.update(payload.id, payload.employee);
  }

  async delete(payload: IDeleteOneByIdPayload): Promise<DeleteResult> {
    const orgUser = await this.orgUserRepository.findOne({
      where: { user: { id: payload.id } },
    });
    console.log({ id: orgUser.id });
    await this.orgUserRepository.softDelete(orgUser.id);
    return await this.userRepository.softDelete(payload.id);
  }
}
