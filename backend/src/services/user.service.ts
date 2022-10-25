import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { SecureUser, UserWithOrganization } from '../utils/types';

import {
  IAddUserPayload,
  IDeleteOneByIdPayload,
  IExistAndFindByEmailPayload,
  IFindOneUserByEmailPayload,
  IFindOneUserByIdPayload,
  IFindUserWithOrganizationPayload,
  IReadAllByOrganization,
  IReadOneById,
  IUpdateOneByIdPayload,
  IUpdateUserByEmailPayload,
  IUpdateUserByIdPayload,
} from 'src/interfaces/user.service.interface';
import { OrganizationUser } from 'src/entities/organizationUser.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(OrganizationUser)
    private readonly orgUserRepository: Repository<OrganizationUser>,
  ) {}

  async addUser(payload: IAddUserPayload): Promise<User> {
    return await this.userRepository.save(payload.user);
  }

  async updateUserById(payload: IUpdateUserByIdPayload): Promise<UpdateResult> {
    return await this.userRepository.update(payload.id, payload.user);
  }

  async updateUserByEmail(
    payload: IUpdateUserByEmailPayload,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(payload.email, payload.user);
  }

  async findOneUserById(payload: IFindOneUserByIdPayload): Promise<User> {
    return await this.userRepository.findOneBy({ id: payload.id });
  }

  async findOneUserByEmail(
    payload: IFindOneUserByEmailPayload,
  ): Promise<User | null> {
    return await this.userRepository.findOneBy({
      email: payload.email,
    });
  }

  async exists(email: string): Promise<boolean> {
    const count = await this.userRepository.count({
      where: {
        email,
      },
    });

    return count > 0;
  }

  async existsAndFindByEmail(
    payload: IExistAndFindByEmailPayload,
  ): Promise<[boolean, User]> {
    const user = await this.findOneUserByEmail(payload);
    return [user !== null, user];
  }

  async findUserWithOrganizationByUserEmail(
    payload: IFindUserWithOrganizationPayload,
  ): Promise<[boolean, UserWithOrganization]> {
    const user = await this.userRepository.findOne({
      where: {
        email: payload.email,
      },
      relations: ['organization', 'organization.role', 'organization.org'],
      loadEagerRelations: true,
      relationLoadStrategy: 'join',
    });

    return [
      user !== null,
      {
        ...user,
        organization: user.organization.org,
        role: user.organization.role,
      },
    ];
  }

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
    await this.orgUserRepository.softDelete(orgUser.id);
    return await this.userRepository.softDelete(payload.id);
  }
}
