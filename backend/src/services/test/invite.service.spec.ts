import { MailerService } from '../../services/mail.service';

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Invite } from '../../entities/invite.entity';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { InviteService } from '../invite.service';
import { OrganizationService } from '../organization.service';
import { TemplateEngineService } from '../templateEngine.service';
import { UserService } from '../user.service';
import { ConfigService } from '@nestjs/config';
import { createMock } from '@golevelup/ts-jest';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOneBy: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

jest.mock('../user.service');
jest.mock('../organization.service');
jest.mock('../templateEngine.service');

const mockConfigService = () => {
  get: jest.fn();
};

const inviteStub = () => {
  return {
    id: 1,
    name: 'mahsa',
    email: 'goli@d.com',
    token: '12gff45hjj87yyyyyy',
    invitedBy: {},
    invitedOrganization: {
      id: 1,
      name: 'parsteb',
      address: 'tehran',
      slug: 'slug',
      contacts: [],
      orgUser: {},
    },
    createdA: new Date(),
  };
};

describe('inviteService', () => {
  let inviteService: InviteService;
  let inviteRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InviteService,
        UserService,
        OrganizationService,
        TemplateEngineService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Invite),
          useValue: createMockRepository(),
        },
        { provide: ConfigService, useFactory: mockConfigService },
        { provide: MailerService, useValue: createMock<MailerService>() },
      ],
    }).compile();

    inviteService = module.get(InviteService);
    inviteRepository = module.get(getRepositoryToken(Invite));
  });
  it('should be defined', () => {
    expect(inviteService).toBeDefined();
  });
  describe('isInviteValid', () => {
    it('should return invite', async () => {
      const token = '12gff45hjj87yyyyyy';
      const mockInvite = inviteStub();
      const expectedResult = { ok: true, email: mockInvite.email };
      inviteRepository.findOneBy.mockResolvedValue(mockInvite);
      expect(await inviteService.isInviteValid(token)).toEqual(expectedResult);
    });
    it('should handle error', async () => {
      const token = 'uytr56677';
      inviteRepository.findOneBy.mockReturnValue(null);
      expect(inviteService.isInviteValid(token)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getInviteByToken', () => {
    it('should return invite with relation with the organization', async () => {
      const token = '12gff45hjj87yyyyyy';
      const mockInvite = inviteStub();

      inviteRepository.findOne.mockResolvedValueOnce(mockInvite);
      expect(await inviteService.getInviteByToken(token)).toEqual(mockInvite);
    });

    it('should handle error', async () => {
      const token = 'uytr56677';
      inviteRepository.findOne.mockReturnValue(null);
      expect(inviteService.getInviteByToken(token)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
  describe('invalidateInviteByToken method', () => {
    it('should delete the invite if the token exists', async () => {
      const token = '12gy4566jhgt';
      const mockedDeletedResult: DeleteResult = { raw: 'any', affected: 1 };
      inviteRepository.delete.mockReturnValue(mockedDeletedResult);
      expect(await inviteService.invalidateInviteByToken(token)).toEqual(
        mockedDeletedResult,
      );
    });
  });
});
