import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrganizationUser } from '../../entities/organizationUser.entity';

import { Role } from '../../entities/role.entity';
import { User } from '../../entities/user.entity';

import { DataSource, Repository } from 'typeorm';
import { OrganizationUserService } from '../organizationUser.service';
import { Organization } from '../../entities/organization.entity';
import { ERole } from '../../utils/types';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOneByOrFail: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
});

const userStub = () => {
  return {
    user: {
      id: 1,
      name: 'mahsa',
      email: 'goli@d.com',
      password: '1234556',
      salt: 'ASE$%RHJJJJJJ',
      organization: {},
      createdAt: new Date(),
    } as User,
    org: {
      id: 1,
      name: 'goli',
      slug: 'golislug',
      createdAt: new Date(),
      contacts: [],
      OrgUser: {},
    } as Organization,
    role: { id: 1, name: ERole.Owner, createdAt: '' } as Role,
  };
};

describe('organizationUserService', () => {
  let service: OrganizationUserService;
  let userRepository: MockRepository;
  let orgUserRepository: MockRepository;
  let roleRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationUserService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Role), useValue: createMockRepository() },
        { provide: getRepositoryToken(User), useValue: createMockRepository() },
        {
          provide: getRepositoryToken(OrganizationUser),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Organization),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<OrganizationUserService>(OrganizationUserService);
    userRepository = module.get(getRepositoryToken(User));
    orgUserRepository = module.get(getRepositoryToken(OrganizationUser));
    roleRepository = module.get(getRepositoryToken(Role));
  });
  it('service should be defined', async () => {
    expect(service).toBeDefined();
  });

  describe('assignUserToOrganization', () => {
    it('should add a user to organizationUser table and return an orgUser Object', async () => {
      const mockedUser = {
        id: 1,
        name: 'mahsa',
        email: 'goli@d.com',
        password: '1234556',
        salt: 'ASE$%RHJJJJJJ',
        organization: {},
        createdAt: new Date(),
      } as User;

      const mockedOrganization = {
        id: 1,
        name: 'goli',
        slug: 'golislug',
        createdAt: new Date(),
        contacts: [],
        OrgUser: {},
      } as Organization;

      const expectedResult = userStub();
      roleRepository.findOneByOrFail.mockResolvedValue({
        id: 1,
        name: 'Owner',
        createdAt: new Date(),
      });
      orgUserRepository.save.mockResolvedValue({
        org: mockedOrganization,
        user: mockedUser,
        role: { id: 1, name: 'Owner', createdAt: '' },
      });
      userRepository.update.mockResolvedValue({
        raw: 'any',
        affected: 1,
        generatedMaps: [],
      });

      expect(
        await service.assignUserToOrganization({
          user: mockedUser,
          organization: mockedOrganization,
          role: ERole.Owner,
        }),
      ).toEqual(expectedResult);
    });
  });
  describe('findUserWithOrganizationByUserEmail', () => {
    it('should return user without salt and pass and with organization Info ', async () => {
      const mockedUser = {
        id: 2,
        name: 'tesla',
        email: 'test@d.com',
        password: '$2b$10$j.3UXQZBUOS8',
        salt: '$2b$10$j.3UXQZBUOS8',
        createdAt: new Date(),
        organization: {
          id: 2,
          createdAt: new Date(),
          role: {
            id: 1,
            name: 'Owner',
            createdAt: new Date(),
          },
          org: {
            id: 2,
            name: "tesla's Organization",
            address: '',
            slug: 'hi-teslas-company',
            createdAt: new Date(),
          },
        },
      };

      const expectedResult = {
        id: 2,
        name: 'tesla',
        email: 'test@d.com',
        createdAt: new Date(),
        organization: {
          id: 2,
          name: "tesla's Organization",
          address: '',
          slug: 'hi-teslas-company',
          createdAt: new Date(),
        },
        role: {
          id: 1,
          name: 'Owner',
          createdAt: new Date(),
        },
      };

      userRepository.findOne.mockReturnValue(mockedUser);
      expect(
        await service.findUserWithOrganizationByUserEmail('goli@d.com'),
      ).toEqual(expectedResult);
    });
  });
  it('should handle error if user does not exists', async () => {
    userRepository.findOne.mockResolvedValue(null);
    expect(
      service.findUserWithOrganizationByUserEmail('goli@d.com'),
    ).rejects.toThrow(NotFoundException);
  });
});
