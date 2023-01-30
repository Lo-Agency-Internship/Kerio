import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ContactService } from '../contact/contact.service';
import { SearchService } from '../search.service';
import { Contact } from '../../entities/contact/contact.entity';
import { ContactStatus } from '../../entities/contact/contactStatus.entity';
import { createMock } from '@golevelup/ts-jest';
// export const SearchService = jest.fn().mockReturnValue({
//   updateDocument: jest.fn()
// });
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  update: jest.fn(),
  softDelete: jest.fn(),
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
  let searchService;
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
    searchService = module.get<SearchService>(SearchService);
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
  describe('updateOneById', () => {
    it('should update the contact and return updateresult', async () => {
      const mockedUpdatedResult: UpdateResult = {
        raw: 'any',
        affected: 1,
        generatedMaps: [],
      };
      const mockUpdateMailiSearch = {
        taskUid: 2,
        indexUid: 'string',
        status: 'success',
        type: 'TaskTypes',
        enqueuedAt: 'string',
      };

      contactRepository.update.mockResolvedValue(mockedUpdatedResult);
      expect(
        await service.updateOneById({ id: 1, contact: { name: 'mary' } }),
      ).toEqual({
        raw: 'any',
        affected: 1,
        generatedMaps: [],
      });
      expect(searchService.updateDocument).toHaveBeenCalled();
      searchService.updateDocument.mockResolvedValue(mockUpdateMailiSearch);
    });
  });
  describe('Delete method', () => {
    it('should delete the contact if the id exists', async () => {
      const mockedUptadeResult: UpdateResult = { raw: 'any', affected: 1, generatedMaps:[] };
      contactRepository.softDelete.mockReturnValue(mockedUptadeResult);
      expect(await service.delete({id:1})).toEqual(
        mockedUptadeResult,
      );
      expect(searchService.deleteDocument).toHaveBeenCalled();
    });
  });
});
