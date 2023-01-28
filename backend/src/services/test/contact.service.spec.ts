import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ContactService } from '../contact/contact.service';
import { SearchService } from '../search.service';
import { Contact } from '../../entities/contact/contact.entity';
import { ContactStatus } from '../../entities/contact/contactStatus.entity';
import { createMock } from '@golevelup/ts-jest';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
});

const contactStub = () => {
  return {
    id: 1,
    name: 'mahsa',
    email: 'goli@d.com',
    phone: '09166430000',
    organization: { id: 1, name: 'kia' },
    note: [],
    contactStatus: [],
    createdAt: new Date(),
  };
};

describe('contactService', () => {
  let service: ContactService;
  let contactRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Contact),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(ContactStatus),
          useValue: createMockRepository(),
        },
        { provide: SearchService, useValue: createMock<SearchService>() },
      ],
    }).compile();

    service = module.get<ContactService>(ContactService);
    contactRepository = module.get(getRepositoryToken(Contact));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneContactById', () => {
    it('should return contact if contact exists', async () => {
      const mockedContact = contactStub();
      const id = 1;
      contactRepository.findOne.mockResolvedValue(mockedContact);
      expect(
        await service.findOneById({
          id,
          organizationId: 1,
        }),
      ).toEqual(mockedContact);
    });

    it('should return null if contact does not exist', async () => {
      const id = 1;
      contactRepository.findOne.mockReturnValue(null);
      expect(
        await service.findOneById({
          id,
          organizationId: 1,
        }),
      ).toBe(null);
    });
  });
});
