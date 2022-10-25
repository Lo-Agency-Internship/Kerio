import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  JwtPayload,
  JwtResponse,
  SecureUser,
  SecureUserWithOrganization,
} from '../utils/types';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto } from 'src/dtos/user.dto';
import { genSaltSync, hashSync } from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { OrganizationUserService } from './organizationUser.service';
import { OrganizationService } from './organization.service';
import { NotExistException } from '../utils/exceptions';
import { Repository } from 'typeorm';
import { Organization } from 'src/entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IFindUserToCheckForLogin } from 'src/interfaces/auth.service.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Organization)
    private readonly orgRepository: Repository<Organization>,
    private readonly userService: UserService,
    private readonly orgService: OrganizationService,
    private readonly orgUserService: OrganizationUserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<SecureUser | null> {
    const user = await this.userService.findOneUserByEmail({ email });

    if (!user || user.password === password) return null;

    // eslint-disable-next-line
    const { password: ignorePass, ...rest } = user;
    return rest;
  }

  async createJwt(user: SecureUserWithOrganization): Promise<JwtResponse> {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      name: user.name,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser({
    email,
    name,
    password,
    organizationSlug,
    role,
  }: UserRegisterDto): Promise<SecureUserWithOrganization> {
    const [orgExists, organization] = await this.orgService.existsAndFindBySlug(
      organizationSlug,
    );

    if (!orgExists) throw new NotExistException(`organization doesn't exist`);

    const salt = genSaltSync(10);

    const hashedPass = hashSync(password, salt);

    const createdUser: User = await this.userService.addUser({
      user: {
        salt,
        password: hashedPass,
        email,
        name,
      },
    });

    await this.orgUserService.assignUserToOrganization(
      createdUser,
      organization,
      role,
    );

    return await this.orgUserService.findUserWithOrganizationByUserEmail(email);
  }

  async activeAccount(email) {
    const getUser = await this.userService.findOneUserByEmail(email);
    if (!getUser) {
      throw new NotFoundException();
    }
    getUser.enabled = true;
    await this.userService.updateUserById({ id: getUser.id, user: getUser });
  }

  //login
  async findUserToCheckForLogin(payload: IFindUserToCheckForLogin) {
    const user = await this.userRepository.findOne({
      where: {
        email: payload.email,
      },
      relations: ['organization', 'organization.role', 'organization.org'],
      loadEagerRelations: true,
      relationLoadStrategy: 'join',
    });

    if (!user) {
      throw new NotFoundException();
    }

    if (!user.enabled) {
      throw new UnauthorizedException();
    }

    const hashedPassword = hashSync(payload.password, user.salt);

    const areEqual = user.password === hashedPassword;

    if (!areEqual) {
      throw new NotAcceptableException();
    }

    delete user.password;
    delete user.salt;

    const result = {
      ...user,
      organization: user.organization.org,
      role: user.organization.role,
    };

    const jwt = await this.createJwt(result as SecureUserWithOrganization);

    return jwt;
  }
}
