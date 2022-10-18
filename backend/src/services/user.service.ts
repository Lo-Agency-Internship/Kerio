import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { NewUser, SecureUser, UserWithOrganization } from '../utils/types';
import { Organization } from 'src/entities/organization.entity';
import { Role } from 'src/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Organization)
    private readonly orgRepository: Repository<Organization>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async addUser(user: NewUser): Promise<User> {
    return await this.userRepository.save(user);
  }

  async updateUserById(id: number, user: User): Promise<UpdateResult> {
    return await this.userRepository.update(id, user);
  }

  async updateUserByEmail(email: string, user: User): Promise<UpdateResult> {
    return await this.userRepository.update(email, user);
  }

  async findOneUserById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({
      email,
    });
  }

  async findAll(): Promise<SecureUser[]> {
    const users = await this.userRepository.find();

    return users.map((user) => {
      // eslint-disable-next-line
      const { password, salt, ...rest } = user;
      return rest;
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

  async existsAndFindByEmail(email: string): Promise<[boolean, User]> {
    const user = await this.findOneUserByEmail(email);
    return [user !== null, user];
  }

  async findUserWithOrganizationByUserEmail(
    email: string,
  ): Promise<[boolean, UserWithOrganization]> {
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

    return [
      user !== null,
      {
        ...user,
        organization: org,
        role: user.organization.role,
      },
    ];
  }
}
