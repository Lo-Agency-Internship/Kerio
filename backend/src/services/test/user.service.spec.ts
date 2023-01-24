import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrganizationUser } from '../../entities/organizationUser.entity';
import { User } from '../../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UserService } from '../user.service';
import { RequestContextService } from '../requestContext.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  count: jest.fn(),
  findOneBy: jest.fn(),
});

const userStub = () => {
  return {
    id: 1,
    name: 'mahsa',
    email: 'goli@d.com',
    password: '1234556',
    salt: 'ASE$%RHJJJJJJ',
    organization: {},
    createdA: new Date(),
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

  describe('exists function',()=>
  {
    it('should return true if count emails greater than zero',async ()=>
    {
      const mockedCount = 1;
      userRepository.count.mockResolvedValue(mockedCount);
      expect(await service.exists("thohuti@gmail.com")).toEqual(true);
    })

    it('should return false if count emails equal zero',async ()=>
    {
      const mockedCount= 0;
      userRepository.count.mockResolvedValue(mockedCount);
      expect(await service.exists('thohuti@gmail.com')).toEqual(false);
    })
  })
});
