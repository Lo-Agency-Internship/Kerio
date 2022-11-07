import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ERole,
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
import { InjectRepository } from '@nestjs/typeorm';
import { IFindUserToCheckForLogin } from 'src/interfaces/auth.service.interface';
import { kebab } from 'case';
import {
  AuthEmailAlreadyExistsException,
  AuthOrganizationAlreadyExistsException,
} from 'src/utils/exceptions';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
  }: UserRegisterDto): Promise<SecureUserWithOrganization> {
    const pipedOrgSlug = kebab(organizationSlug);
    const userExists = await this.userService.exists(email);

    if (userExists) {
      throw new AuthEmailAlreadyExistsException('Email already exist');
    }

    const [orgExists] = await this.orgService.existsAndFindBySlug(pipedOrgSlug);

    if (orgExists) {
      throw new AuthOrganizationAlreadyExistsException(
        'organization already exists',
      );
    }

    const newOrg = await this.orgService.addOrganization({
      name: `${name}'s Organization`,
      address: '',
      slug: pipedOrgSlug,
    });
    const [orgExist, organization] = await this.orgService.existsAndFindBySlug(
      newOrg.slug,
    );

    if (!orgExist) throw new NotExistException(`Organization doesn't exists`);

    const salt = genSaltSync(10);
    const hashedPass = hashSync(password, salt);

    const role = ERole.Owner;

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

  async activeAccount(email: string) {
    const getUser = await this.userService.findOneUserByEmail({ email });

    if (!getUser) {
      throw new NotFoundException();
    }
    getUser.enabled = true;
    return await this.userService.updateUserById({
      id: getUser.id,
      user: getUser,
    });
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

    // if (!user.enabled) {
    //   throw new UnauthorizedException();
    // }

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
