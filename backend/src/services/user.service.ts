import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository, UpdateResult } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { NewUser, SecureUser } from '../utils/types';
import { MaliciousUserRequestException } from 'src/utils/exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
    const user = await this.userRepository.findBy({ email: Equal(email) });
    if (!user) {
      throw new MaliciousUserRequestException('User Not Found');
    }
    return user.pop();
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
    return [!!user, user];
  }
}
