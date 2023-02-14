import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { UserService } from '../user.service';
import { OrganizationService } from '../organization.service';
import { OrganizationUserService } from '../organizationUser.service';
import { createMock } from '@golevelup/ts-jest';
import { AuthService } from '../auth.service';
import {
  ERole,
  SecureUser,
  SecureUserWithOrganization,
} from '../../utils/types';
import {
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '../../entities/role.entity';
import { Organization } from '../../entities/organization.entity';
import { OrganizationUser } from 'src/entities/organizationUser.entity';

jest.mock('../user.service');
jest.mock('../organization.service');
jest.mock('../organizationUser.service');

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  create: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
});
describe('auth.service', () => {
  let service: AuthService;
  let jwtService;
  let userService;
  let userRepository: MockRepository;
  let orgService;
  let orgUserService;
  let organizationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        AuthService,
        OrganizationService,
        OrganizationUserService,
        { provide: DataSource, useValue: {} },
        {
          provide: JwtService,
          useValue: createMock<JwtService>(),
        },
        { provide: getRepositoryToken(User), useValue: createMockRepository() },
        {
          provide: getRepositoryToken(Organization),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User));
    orgService = module.get<OrganizationService>(OrganizationService);
    orgUserService = module.get<OrganizationUserService>(
      OrganizationUserService,
    );
    organizationRepository = module.get(getRepositoryToken(Organization));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('userRepository shoulld be defined', () => {
    expect(userRepository).toBeDefined();
  });
  it('organizationrepo shoulld be defined', () => {
    expect(organizationRepository).toBeDefined();
  });

  describe('CreateJwt', () => {
    it('should return a JWT response object', async () => {
      const mockedUser = {
        id: 1,
        email: 'goli@g.com',
        name: 'Mary',
        role: { id: 1, name: ERole.Owner } as Role,
      } as SecureUserWithOrganization;
      jwtService.sign.mockResolvedValue('generated_access_token');
      expect(await service.createJwt(mockedUser)).toEqual({
        access_token: 'generated_access_token',
      });
    });
  });

  describe('validateUser', () => {
    it('should return null if user not exist', async () => {
      userService.findOneUserByEmail.mockResolvedValue(null);
      expect(
        await service.validateUser({
          email: 'mahsa@loagency.com',
          password: '123456',
        }),
      ).toEqual(null);
    });
    it('should return an object of type secureUser if user exists', async () => {
      const mockedUser = {
        id: 1,
        email: 'goli@d.com',
        name: 'feri',
        password: '123456',
        organization: {},
      } as User;
      const expectedResult = {
        id: 1,
        email: 'goli@d.com',
        name: 'feri',
        organization: {},
      } as SecureUser;
      userService.findOneUserByEmail.mockResolvedValue(mockedUser);
      expect(
        await service.validateUser({ email: 'goli@d.com', password: '123456' }),
      ).toEqual(expectedResult);
    });
  });

  describe('FindUserToCheckForLogin', () => {
    it('Should return error if does not exist', async () => {
      const mockUser = {
        email: 'tahuti@g.com',
        password: 'Hut123',
      };
      userRepository.findOne.mockResolvedValue(null);
      expect(service.findUserToCheckForLogin(mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return error if user does not enable', async () => {
      const mockUser = {
        id: 1,
        name: 'houtan',
        email: 'tahuti@g.com',
        password: '123456',
        enabled: false,
      } as User;
      userRepository.findOne.mockResolvedValue(mockUser);
      expect(
        service.findUserToCheckForLogin({
          email: 'tahuti@g.com',
          password: '12345',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
    it('should return error if comparing hash password does not correct', async () => {
      const mockUser = {
        id: 1,
        name: 'houtan',
        email: 'goli@d.com',
        password:
          '$2b$10$ffPTwKE78Nc7Ab7ZX/ADjucMlIQ3aonorw/vLFDdN5SiVP5K1cb3W',
        salt: '$2b$10$ffPTwKE78Nc7Ab7ZX/ADju',
        enabled: true,
        organization: {},
      } as User;
      userRepository.findOne.mockResolvedValue(mockUser);
      expect(
        service.findUserToCheckForLogin({
          email: 'tahuti@g.com',
          password: '00000',
        }),
      ).rejects.toThrow(NotAcceptableException);
    });
    it('should return jwt if user find successfully', async () => {
      const mockUser = {
        id: 1,
        name: 'houtan',
        email: 'goli@d.com',
        password:
          '$2b$10$ffPTwKE78Nc7Ab7ZX/ADjucMlIQ3aonorw/vLFDdN5SiVP5K1cb3W',
        salt: '$2b$10$ffPTwKE78Nc7Ab7ZX/ADju',
        enabled: true,
        organization: {},
      } as User;
      const { email } = mockUser;
      userRepository.findOne.mockResolvedValue(mockUser);
      jwtService.sign.mockResolvedValue('generated_access_token');
      expect(
        await service.findUserToCheckForLogin({ email, password: '0000' }),
      ).toEqual({ access_token: 'generated_access_token' });
    });
  });

  // describe('createOrganizationByOwner', () => {
  //   it('should return NotAcceptableException if organization exist', async () => {
  //     orgService.existsAndFindBySlug.mockResolvedValue([true, {}]);
  //     expect(
  //       service.createOrganizationByOwner({
  //         organizationSlug: '',
  //         name: 'Feri',
  //       }),
  //     ).rejects.toThrow(NotAcceptableException);
  //   });
  //   it('should return new organization if organization not exist', async () => {
  //     orgService.existsAndFindBySlug.mockResolvedValue([false, undefined]);
  //     const mockedNewOrg = {
  //       id: '1',
  //       name: 'G',
  //       address: 'TR',
  //       slug: '',
  //     } as unknown as Organization;
  //     orgService.addOrganization.mockResolvedValue(mockedNewOrg);
  //     expect(
  //       await service.createOrganizationByOwner({
  //         organizationSlug: '',
  //         name: 'Feri',
  //       }),
  //     ).toEqual(mockedNewOrg);
  //   });
  // });
  describe('activeAccount function', () => {
    it('should return NotFoundException if email does not  exist', async () => {
      const mockUser = {
        id: 1,
        name: 'houtan',
        email: 'goli@d.com',
        password:
          '$2b$10$ffPTwKE78Nc7Ab7ZX/ADjucMlIQ3aonorw/vLFDdN5SiVP5K1cb3W',
        salt: '$2b$10$ffPTwKE78Nc7Ab7ZX/ADju',
        enabled: true,
        organization: {},
      } as User;
      userService.findOneUserByEmail.mockResolvedValue(null);
      const { email } = mockUser;
      expect(service.activeAccount(email)).rejects.toThrow(NotFoundException);
    });
    it('should return ', async () => {
      const mockUser = {
        id: 1,
        name: 'houtan',
        email: 'goli@d.com',
        password:
          '$2b$10$ffPTwKE78Nc7Ab7ZX/ADjucMlIQ3aonorw/vLFDdN5SiVP5K1cb3W',
        salt: '$2b$10$ffPTwKE78Nc7Ab7ZX/ADju',
        enabled: false,
        organization: {},
      } as User;
      const mockedUpdatedResult: UpdateResult = {
        raw: 'any',
        affected: 1,
        generatedMaps: [],
      };

      userService.findOneUserByEmail.mockResolvedValue(mockUser);
      userService.makeUserEnabled.mockResolvedValue(mockedUpdatedResult);
      expect(await service.activeAccount('Houtan@h.com')).toEqual(
        mockedUpdatedResult,
      );
    });
  });
  describe('registerUser', () => {
    it('should return an object of type secureUserWithOrganization', async () => {
      const mockedOrganization = {
        id: 1,
        name: ` homagol's Organization`,
        address: 'string',
        slug: 'gol',
        createdAt: new Date(),
        contacts: [],
        OrgUser: {},
      } as Organization;

      userService.exists.mockResolvedValue(null);
      orgService.createOrganizationByOwner.mockResolvedValue(
        mockedOrganization,
      );
      orgService.existsAndFindBySlug.mockResolvedValue([
        true,
        mockedOrganization,
      ]);

      const mockedUser = {
        id: 1,
        name: 'houtan',
        email: 'goli@d.com',
        password:
          '$2b$10$ffPTwKE78Nc7Ab7ZX/ADjucMlIQ3aonorw/vLFDdN5SiVP5K1cb3W',
        salt: '$2b$10$ffPTwKE78Nc7Ab7ZX/ADju',
        enabled: false,
        organization: {},
      } as User;
      const mockedOrgUser = {} as OrganizationUser;

      userService.addUser.mockResolvedValue(mockedUser);

      orgUserService.assignUserToOrganization.mockResolvedValue(mockedOrgUser);

      const mockedUserWithOrganization = {
        id: 1,
        name: 'houtan',
        email: 'goli@d.com',
        enabled: false,
        organization: {},
        role: {},
      } as SecureUserWithOrganization;

      orgUserService.findUserWithOrganizationByUserEmail.mockResolvedValue(
        mockedUserWithOrganization,
      );

      expect(
        await service.registerUser({
          email: 'goli@d.com',
          name: 'houtan',
          password: '0000',
          organizationSlug: 'gol',
          role: ERole.Owner,
        }),
      ).toEqual(mockedUserWithOrganization);
    });
  });
  it('should return UnauthorizedException if userExists', async () => {
    const mockedUser = {
      email: 'goli@d.com',
      name: 'Feri',
      password: '0000',
      organizationSlug: 'Mahsa',
      role: ERole.Owner,
    } as unknown as User;
    userService.exists.mockResolvedValue(mockedUser);
    expect(
      service.registerUser({
        email: 'goli@d.com',
        name: 'Feri',
        password: '0000',
        organizationSlug: 'gol',
        role: ERole.Owner,
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
  it('should return NotFoundException if orgExists not exist', async () => {
    userService.exists.mockResolvedValue(null);
    orgService.existsAndFindBySlug.mockResolvedValue([false, null]);
    expect(
      service.registerUser({
        email: 'goli@d.com',
        name: 'Feri',
        password: '0000',
        organizationSlug: 'Mahsa',
        role: ERole.Owner,
      }),
    ).rejects.toThrow(NotFoundException);
  });
});
