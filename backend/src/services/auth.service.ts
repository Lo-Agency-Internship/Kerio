import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
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
import { genSaltSync, hashSync } from 'bcrypt';
import { User } from '../entities/user.entity';
import { OrganizationUserService } from './organizationUser.service';
import { OrganizationService } from './organization.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ICreateOrganizationByOwner,
  IFindUserToCheckForLogin,
  IRgisterUser,
  IValidateUser,
} from 'src/interfaces/auth.service.interface';
import { kebab } from 'case';
import { Organization } from 'src/entities/organization.entity';

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

  async validateUser(payload: IValidateUser): Promise<SecureUser | null> {
    const user = await this.userService.findOneUserByEmail({
      email: payload.email,
    });
    if (!user || user.password !== payload.password) return null;

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
      access_token: await this.jwtService.sign(payload),
    };
  }

  async createOrganizationByOwner(payload: ICreateOrganizationByOwner) {
    const pipedOrgSlug = kebab(payload.organizationSlug);
    const [orgExists] = await this.orgService.existsAndFindBySlug(pipedOrgSlug);

    if (orgExists) {
      throw new NotAcceptableException();
    }
    const newOrg = await this.orgService.addOrganization({
      name: `${payload.name}'s Organization`,
      address: '',
      slug: pipedOrgSlug,
    });

    return newOrg;
  }

  async registerUser(
    payload: IRgisterUser,
  ): Promise<SecureUserWithOrganization> {
    let orgExists: boolean, organization: Organization;

    if (payload.role === ERole.Owner) {
      const userExists = await this.userService.exists(payload.email);

      if (userExists) throw new UnauthorizedException();

      const newOrg = await this.createOrganizationByOwner({
        name: payload.name,
        organizationSlug: payload.organizationSlug,
      });

      [orgExists, organization] = await this.orgService.existsAndFindBySlug(
        newOrg.slug,
      );

      if (!orgExists) throw new NotFoundException();
    } else {
      [orgExists, organization] = await this.orgService.existsAndFindBySlug(
        payload.organizationSlug,
      );

      if (!orgExists) throw new NotFoundException();
    }

    const salt = genSaltSync(10);

    const hashedPass = hashSync(payload.password, salt);

    const createdUser: User = await this.userService.addUser({
      user: {
        salt,
        password: hashedPass,
        email: payload.email,
        name: payload.name,
      },
    });

    await this.orgUserService.assignUserToOrganization({
      user: createdUser,
      organization,
      role: payload.role,
    });

    return await this.orgUserService.findUserWithOrganizationByUserEmail(
      payload.email,
    );
  }

  async activeAccount(email: string) {
    const getUser = await this.userService.findOneUserByEmail({ email });

    if (!getUser) {
      throw new NotFoundException();
    }
    getUser.enabled = true;
    return await this.userService.makeUserEnabled({
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
