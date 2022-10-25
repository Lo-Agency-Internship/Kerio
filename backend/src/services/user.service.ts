import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { SecureUser } from '../utils/types';
import { Organization } from 'src/entities/organization.entity';
import {
  IAddUserPayload,
  IExistAndFindByEmailPayload,
  IFindOneUserByEmailPayload,
  IFindOneUserByIdPayload,
  IUpdateUserByEmailPayload,
  IUpdateUserByIdPayload,
} from 'src/interfaces/user.service.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Organization)
    private readonly orgRepository: Repository<Organization>, //private readonly authService:AuthService,
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

  async existsAndFindByEmail(
    payload: IExistAndFindByEmailPayload,
  ): Promise<[boolean, User]> {
    const user = await this.findOneUserByEmail(payload);
    return [user !== null, user];
  }
}
