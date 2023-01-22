//import { MailerModule } from '@nestjs-modules/mailer';
import { MailerService } from '../../services/mail.service';

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Invite } from '../../entities/invite.entity';
import { DataSource, Repository } from 'typeorm';
import { InviteService } from '../invite.service';
import { OrganizationService } from '../organization.service';
import { TemplateEngineService } from '../templateEngine.service';
import { UserService } from '../user.service';
import { ConfigService } from '@nestjs/config';
import { createMock } from '@golevelup/ts-jest';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOneBy: jest.fn(),
});

jest.mock('../user.service');
//jest.mock('../mail.service');
jest.mock('../organization.service');
jest.mock('../templateEngine.service');

const mockConfigService = () => {
  get: jest.fn();
};
const inviteStub = ()=>{
  return {
    id:1,
    name:'mahsa',
    email:'goli@d.com',
    token:'12gff45hjj87yyyyyy',
    invitedBy:{},
    invitedOrganization:{},
    createdA:new Date()
  }
}

describe('inviteService', () => {
  let inviteService: InviteService;
  let mailerService:MailerService;
  let userService: UserService;
  let orgService: OrganizationService;
  let configService;
  let templateService: TemplateEngineService;
  let inviteRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      //imports:[MailerModule],
      providers: [
        InviteService,
        //MailerService,
        UserService,
        OrganizationService,
        TemplateEngineService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Invite),
          useValue: createMockRepository(),
        },
        { provide: ConfigService, useFactory: mockConfigService },
        //{ provide: MailerService, useFactory: mockMailerService },
        //{ provide: MailerService, useValue: {} },
        //{ provide: MailerModule, useValue: createMock<MailerService>()},
        { provide: MailerService, useValue: createMock<MailerService>()},
        
      
      
      ],
    })
    //.useMocker(createMock)
    .compile();

    inviteService = module.get(InviteService);
    inviteRepository = module.get(getRepositoryToken(Invite));
  });
  it('should be defined', () => {
    expect(inviteService).toBeDefined();
  });

  it('should return invite',async ()=>{
    const token = '12gff45hjj87yyyyyy';
    const mockInvite = inviteStub();
    const expectedResult = {ok:true,email:mockInvite.email};
    inviteRepository.findOneBy.mockResolvedValue(mockInvite)
    expect(await inviteService.isInviteValid(token)).toEqual(expectedResult)

  })
});

