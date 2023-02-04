import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UserService } from '../user.service';
import { OrganizationService } from '../organization.service';
import { OrganizationUserService } from '../organizationUser.service';
import { createMock } from '@golevelup/ts-jest';
import { AuthService } from '../auth.service';
import { ERole, SecureUserWithOrganization } from '../../utils/types';
import { Role } from '../../entities/role.entity';
import exp from 'constants';

jest.mock('../user.service');
jest.mock('../auth.service')
jest.mock('../organization.service');
jest.mock('../organizationUser.service');



type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  create: jest.fn(),
  
});
describe ('auth.service',()=>{
    let service: AuthService;
    let jwtService;
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
      
      ],
    }).compile();
    
    service = module.get<AuthService>(AuthService);
    jwtService=module.get<JwtService>(JwtService);
    }); 
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
describe('CreateJwt', () => {
    it('should return a JWT response object', async () => {
      const mockedUser = {
        id: 1,
        email:'goli@g.com',
        name:'Mary',
        role:{id:1 , name:ERole.Owner} as Role,
      } as SecureUserWithOrganization;
      jwtService.sign.mockResolvedValue('generated_access_token')
      expect(await service.createJwt(mockedUser)).toEqual(
        {access_token: 'generated_access_token' }
      );
    });
  });

  describe('FindUserToCheckForLogin',()=>
  {
    it('Should return error if does not match', async () =>
    {
      const mockUser ={
        email: 'tahuti@g.com',
        password: 'Hut123'
      }
      expect(service.findUserToCheckForLogin(mockUser)).toBeFalsy();
    })
  })
});