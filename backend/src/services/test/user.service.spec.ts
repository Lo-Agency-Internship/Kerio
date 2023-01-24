import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrganizationUser } from '../../entities/organizationUser.entity';
import { User } from '../../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UserService } from '../user.service';
import { RequestContextService } from '../requestContext.service';
import { SecureUser } from 'src/utils/types';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOneBy: jest.fn(),
  findOne: jest.fn(),
});

const userStub = () => {
  return {
    id: 1,
    name: 'mahsa',
    email: 'goli@d.com',
    password: '1234556',
    salt: 'ASE$%RHJJJJJJ',
    organization: {},
    createdAt: new Date(),
  };
};

jest.mock('../requestContext.service');

describe('userService', () => {
  let service: UserService;
  let userRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        RequestContextService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(OrganizationUser),
          useValue: createMockRepository(),
        },
        { provide: getRepositoryToken(User), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneUserById', () => {
    it('should return true if user exists', async () => {
      const mockedUser = userStub();
      const id = 1;
      userRepository.findOneBy.mockResolvedValue(mockedUser);
      expect(await service.findOneUserById({ id })).toEqual(mockedUser);
    });

    it('should return null if user does not exist', async () => {
      const id = 1;
      userRepository.findOneBy.mockReturnValue(null);
      expect(await service.findOneUserById({ id })).toBe(null);
    });
  });
  describe('findone', () => {
    it('should return the user object', async () => {
      const userId = 1;
      const mockedUser = userStub();
      const expectedUser = {
        id: 1,
        name: 'mahsa',
        email: 'goli@d.com',
        organization: {},
        createdAt: new Date(),
      } as SecureUser;

      userRepository.findOne.mockReturnValue(mockedUser);
      const user = await service.readOneById({ id: userId });
      expect(user).toEqual(expectedUser);
    });
    it('should handle error', async () => {
      const userId = 1;

      userRepository.findOne.mockReturnValue(null);
      expect(service.readOneById({ id: userId })).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
