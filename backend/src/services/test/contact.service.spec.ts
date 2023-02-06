import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { ContactService } from '../contact/contact.service';
import { SearchService } from '../search.service';
import { Contact } from '../../entities/contact/contact.entity';
import { ContactStatus } from '../../entities/contact/contactStatus.entity';
import { createMock } from '@golevelup/ts-jest';
import { Organization } from '../../entities/organization.entity';
import { EContactStatus } from '../../utils/types';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  update: jest.fn(),
  softDelete: jest.fn(),
  findAndCount: jest.fn(),
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
      const mockedUptadeResult: UpdateResult = {
        raw: 'any',
        affected: 1,
        generatedMaps: [],
      };
      contactRepository.softDelete.mockReturnValue(mockedUptadeResult);
      expect(await service.delete({ id: 1 })).toEqual(mockedUptadeResult);
      expect(searchService.deleteDocument).toHaveBeenCalled();
    });
  });

  describe('calculateContactScore Function', () => {
    it('should return zero for totalScore if the contact has no notes', async () => {
      const mockedContacts = [
        {
          id: 1,
          name: 'mahsa',
          email: 'goli@d.com',
          phone: '09166430000',
          organization: {},
          notes: [],
          statuses: [],
          createdAt: new Date(),
        } as Contact,
      ];

      const expectedResult = [
        {
          id: 1,
          name: 'mahsa',
          email: 'goli@d.com',
          phone: '09166430000',
          organization: {},
          notes: [],
          statuses: [],
          createdAt: new Date(),
          totalScore: 0,
        },
      ];
      expect(await service.caculateContactScore(mockedContacts)).toEqual(
        expectedResult,
      );
    });
    it('should return zero for totalScore if contact has notes but his notes does not meet required condition like status', async () => {
      const mockedContact = [
        {
          id: 2,
          name: 'sam haris',
          email: 'sam@lo.agency',
          phone: '09123456789',
          createdAt: new Date(),
          statuses: [
            {
              id: 2,
              contactId: 2,
              statusId: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
              deletedAt: null,
              status: {
                id: 1,
                status: 'Lead',
                createdAt: new Date(),
              },
            },
          ],
          organization: {},
          notes: [
            {
              id: 1,
              title: 'c2',
              description: 'coming soon',
              score: 10,
              date: '2022-09-26T20:30:00.000Z',
              createdAt: new Date(),
              status: {
                id: 1,
                status: 'Loyal',
                createdAt: new Date(),
              },
            },
          ],
        } as unknown as Contact,
      ];
      const expectedResult = [
        {
          id: 2,
          name: 'sam haris',
          email: 'sam@lo.agency',
          phone: '09123456789',
          createdAt: new Date(),
          statuses: [
            {
              id: 2,
              contactId: 2,
              statusId: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
              deletedAt: null,
              status: {
                id: 1,
                status: 'Lead',
                createdAt: new Date(),
              },
            },
          ],
          organization: {},
          notes: [
            {
              id: 1,
              title: 'c2',
              description: 'coming soon',
              score: 10,
              date: '2022-09-26T20:30:00.000Z',
              createdAt: new Date(),
              status: {
                id: 1,
                status: 'Loyal',
                createdAt: new Date(),
              },
            },
          ],
          totalScore: 0,
        },
      ];
      expect(await service.caculateContactScore(mockedContact)).toEqual(
        expectedResult,
      );
    });

    it('should return totalscore equal 0.5', async () => {
      const mockedContact = [
        {
          id: 2,
          name: 'sam haris',
          email: 'sam@lo.agency',
          phone: '09123456789',
          createdAt: new Date(),
          statuses: [
            {
              id: 2,
              contactId: 2,
              statusId: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
              deletedAt: null,
              status: {
                id: 1,
                status: 'Lead',
                createdAt: new Date(),
              },
            },
          ],
          organization: {},
          notes: [
            {
              id: 1,
              title: 'c2',
              description: 'coming soon',
              score: 1,
              date: '2022-09-26T20:30:00.000Z',
              createdAt: new Date(),
              status: {
                id: 1,
                status: 'Loyal',
                createdAt: new Date(),
              },
            },
            {
              id: 1,
              title: 'c2',
              description: 'coming soon',
              score: 1,
              date: '2022-09-26T20:30:00.000Z',
              createdAt: new Date(),
              status: {
                id: 1,
                status: 'Lead',
                createdAt: new Date(),
              },
            },
            {
              id: 1,
              title: 'c2',
              description: 'coming soon',
              score: 0,
              date: '2022-09-26T20:30:00.000Z',
              createdAt: new Date(),
              status: {
                id: 1,
                status: 'Lead',
                createdAt: new Date(),
              },
            },
          ],
        } as unknown as Contact,
      ];

      const expectedResult = [
        {
          id: 2,
          name: 'sam haris',
          email: 'sam@lo.agency',
          phone: '09123456789',
          createdAt: new Date(),
          statuses: [
            {
              id: 2,
              contactId: 2,
              statusId: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
              deletedAt: null,
              status: {
                id: 1,
                status: 'Lead',
                createdAt: new Date(),
              },
            },
          ],
          organization: {},
          notes: [
            {
              id: 1,
              title: 'c2',
              description: 'coming soon',
              score: 1,
              date: '2022-09-26T20:30:00.000Z',
              createdAt: new Date(),
              status: {
                id: 1,
                status: 'Loyal',
                createdAt: new Date(),
              },
            },
            {
              id: 1,
              title: 'c2',
              description: 'coming soon',
              score: 1,
              date: '2022-09-26T20:30:00.000Z',
              createdAt: new Date(),
              status: {
                id: 1,
                status: 'Lead',
                createdAt: new Date(),
              },
            },
            {
              id: 1,
              title: 'c2',
              description: 'coming soon',
              score: 0,
              date: '2022-09-26T20:30:00.000Z',
              createdAt: new Date(),
              status: {
                id: 1,
                status: 'Lead',
                createdAt: new Date(),
              },
            },
          ],
          totalScore: 0.5,
        },
      ];

      expect(await service.caculateContactScore(mockedContact)).toEqual(
        expectedResult,
      );
    });
  });

  describe('find method', () => {
    it('should return all contacts with their score when there is no status in our params', async () => {
      const mockedContacts = [
        [
          {
            id: 2,
            name: 'sam haris',
            email: 'sam@lo.agency',
            phone: '09123456789',
            createdAt: new Date(),
            statuses: [
              {
                id: 2,
                contactId: 2,
                statusId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
                status: {
                  id: 1,
                  status: 'Lead',
                  createdAt: new Date(),
                },
              },
            ],
            organization: {},
            notes: [
              {
                id: 1,
                title: 'c2',
                description: 'coming soon',
                score: 1,
                date: '2022-09-26T20:30:00.000Z',
                createdAt: new Date(),
                status: {
                  id: 1,
                  status: 'Lead',
                  createdAt: new Date(),
                },
              },
              {
                id: 1,
                title: 'c2',
                description: 'coming soon',
                score: 0,
                date: '2022-09-26T20:30:00.000Z',
                createdAt: new Date(),
                status: {
                  id: 1,
                  status: 'Lead',
                  createdAt: new Date(),
                },
              },
            ],
          } as unknown as Contact,
          {
            id: 3,
            name: 'john doe',
            email: 'doe@lo.agency',
            phone: '09123456789',
            createdAt: new Date(),
            statuses: [
              {
                id: 2,
                contactId: 3,
                statusId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
                status: {
                  id: 1,
                  status: 'Lead',
                  createdAt: new Date(),
                },
              },
            ],
            organization: {},
            notes: [
              {
                id: 1,
                title: 'cwwwwww2',
                description: 'coming soon',
                score: 1,
                date: '2022-09-26T20:30:00.000Z',
                createdAt: new Date(),
                status: {
                  id: 1,
                  status: 'Lead',
                  createdAt: new Date(),
                },
              },
            ],
          },
        ],
        2,
      ];
      const expectedResult = {
        contacts: [
          {
            id: 2,
            name: 'sam haris',
            email: 'sam@lo.agency',
            phone: '09123456789',
            createdAt: new Date(),
            statuses: undefined,
            lastStatus: {
              id: 2,
              contactId: 2,
              statusId: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
              deletedAt: null,
              status: {
                id: 1,
                status: 'Lead',
                createdAt: new Date(),
              },
            },
            organization: {},
            notes: [
              {
                id: 1,
                title: 'c2',
                description: 'coming soon',
                score: 1,
                date: '2022-09-26T20:30:00.000Z',
                createdAt: new Date(),
                status: {
                  id: 1,
                  status: 'Lead',
                  createdAt: new Date(),
                },
              },
              {
                id: 1,
                title: 'c2',
                description: 'coming soon',
                score: 0,
                date: '2022-09-26T20:30:00.000Z',
                createdAt: new Date(),
                status: {
                  id: 1,
                  status: 'Lead',
                  createdAt: new Date(),
                },
              },
            ],
            totalScore: 0.5,
          },
          {
            id: 3,
            name: 'john doe',
            email: 'doe@lo.agency',
            phone: '09123456789',
            createdAt: new Date(),
            statuses: undefined,
            lastStatus: {
              id: 2,
              contactId: 3,
              statusId: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
              deletedAt: null,
              status: {
                id: 1,
                status: 'Lead',
                createdAt: new Date(),
              },
            },
            organization: {},
            notes: [
              {
                id: 1,
                title: 'cwwwwww2',
                description: 'coming soon',
                score: 1,
                date: '2022-09-26T20:30:00.000Z',
                createdAt: new Date(),

                status: {
                  id: 1,
                  status: 'Lead',
                  createdAt: new Date(),
                },
              },
            ],
            totalScore: 1,
          },
        ],
        metadata: {
          total: 2,
          size: 1,
          page: 1,
        },
      };
      contactRepository.findAndCount.mockResolvedValue(mockedContacts);
      expect(
        await service.find({
          organization: {} as Organization,
          page: 1,
          size: 1,
        }),
      ).toEqual(expectedResult);
    });
    it('should return filtered contact based on their status', async () => {
      const mockedContacts = [
        [
          {
            id: 2,
            name: 'sam haris',
            email: 'sam@lo.agency',
            phone: '09123456789',
            createdAt: new Date(),
            statuses: [
              {
                id: 2,
                contactId: 2,
                statusId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
                status: {
                  id: 1,
                  status: 'Loyal',
                  createdAt: new Date(),
                },
              },
            ],
            organization: {},
            notes: [],
          } as unknown as Contact,
          {
            id: 3,
            name: 'john doe',
            email: 'doe@lo.agency',
            phone: '09123456789',
            createdAt: new Date(),
            statuses: [
              {
                id: 2,
                contactId: 3,
                statusId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
                status: {
                  id: 1,
                  status: 'Lead',
                  createdAt: new Date(),
                },
              },
            ],
            organization: {},
            notes: [],
          },
        ],
        2,
      ];
      const expectedResult = {
        contacts: [
          {
            id: 2,
            name: 'sam haris',
            email: 'sam@lo.agency',
            phone: '09123456789',
            createdAt: new Date(),
            statuses: [
              {
                contactId: 2,
                createdAt: new Date(),
                deletedAt: null,
                id: 2,
                status: {
                  createdAt: new Date(),
                  id: 1,
                  status: 'Loyal',
                },
                statusId: 1,
                updatedAt: new Date(),
              },
            ],

            organization: {},
            notes: [],
            totalScore: 0,
          },
        ],
        metadata: {
          total: 2,
          size: 1,
          page: 1,
        },
      };
      contactRepository.findAndCount.mockResolvedValue(mockedContacts);
      expect(
        await service.find({
          organization: {} as Organization,
          status: EContactStatus.Loyal,
          page: 1,
          size: 1,
        }),
      ).toEqual(expectedResult);
    });
  });
});
