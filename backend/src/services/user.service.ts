import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { SecureUser } from '../utils/types';

import {
  IAddUserPayload,
  IDeleteOneByIdPayload,
  IExistAndFindByEmailPayload,
  IFindOneUserByEmailPayload,
  IFindOneUserByIdPayload,
  IPaginatedUserResponse,
  IReadAllByOrganization,
  IReadOneById,
  IUpdateOneByIdPayload,
  IUpdateUserByEmailPayload,
} from 'src/interfaces/user.service.interface';
import { OrganizationUser } from '../entities/organizationUser.entity';
import { getPaginationOffset } from '../utils/functions';
import { hashSync } from 'bcrypt';
import { RequestContextService } from './requestContext.service';

@Injectable()
export class UserService {
  static findOneUserByEmail: any;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(OrganizationUser)
    private readonly orgUserRepository: Repository<OrganizationUser>,

    private readonly contextService: RequestContextService,
  ) {}

  async addUser(payload: IAddUserPayload): Promise<User> {
    return await this.userRepository.save(payload.user);
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
    return await this.userRepository.findOne({
      where: {
        email: payload.email,
      },
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

  async readAllByOrganization(
    payload: IReadAllByOrganization,
  ): Promise<IPaginatedUserResponse> {
    const [results, total] = await this.orgUserRepository.findAndCount({
      where: { org: { id: payload.organization.id }, role: { id: 2 } },
      relations: ['user'],
      order: { createdAt: payload.sort },
      skip: getPaginationOffset(payload),
      take: payload.size,
    });

    const users = results.map((item) => {
      delete item.user.password;
      delete item.user.salt;
      return item.user;
    });

    return {
      users,
      metaData: {
        total,
        page: payload.page,
        size: payload.size,
      },
    };
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
    const { id: userId } = this.contextService.get('userData');

    if (payload.user.oldPassword && userId === payload.id) {
      const user = await this.userRepository.findOneBy({ id: payload.id });
      const hashedPassword = hashSync(payload.user.oldPassword, user.salt);
      const areEqual = user.password === hashedPassword;
      if (!areEqual) {
        throw new UnauthorizedException('user is unathorized');
      }
      const hashedNewPassword = hashSync(payload.user.newPassword, user.salt);
      return await this.userRepository.update(payload.id, {
        password: hashedNewPassword,
      });
    } else if (payload.user.oldPassword && userId !== payload.id) {
      throw new UnauthorizedException('user is unathorized');
    }
    return await this.userRepository.update(payload.id, payload.user);
  }

  async delete(payload: IDeleteOneByIdPayload): Promise<DeleteResult> {
    const orgUser = await this.orgUserRepository.findOne({
      where: { user: { id: payload.id } },
    });
    await this.orgUserRepository.softDelete(orgUser.id);
    return await this.userRepository.softDelete(payload.id);
  }

  async findUserByEmailEvenDeleted(email: string) {
    const user = await this.userRepository.find({
      where: { email },
      withDeleted: true,
    });

    return user.length !== 0;
  }

  async makeUserEnabled(payload: IUpdateOneByIdPayload) {
    return await this.userRepository.update(payload.id, payload.user);
  }
}
