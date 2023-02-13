import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm";
import { Organization } from "../../entities/organization.entity";
import { Repository } from "typeorm";
import { OrganizationService } from "../organization.service"


type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOneBy: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  count: jest.fn(),
  save: jest.fn()
});

const organizationStub = ()=>({
    id:1,
    name: 'homagol',
   address: 'string',
   slug: 'gol',
   createdAt: new Date(),
   updatedAt: new Date(),
  contacts:[],
  OrgUser:{}
}) as Organization

describe('organizationservice',()=>{
    let organizationRepository:MockRepository;
    let service:OrganizationService;
    beforeEach(async()=>{
        const module:TestingModule = await Test.createTestingModule({
            providers:[OrganizationService,
            { provide: getRepositoryToken(Organization),
            useValue: createMockRepository(),}
            ]

        }).compile()
    organizationRepository = module.get(getRepositoryToken(Organization));
    service = module.get<OrganizationService>(OrganizationService);
    });
    it('service should be defined',async()=>{
        expect(service).toBeDefined()
    });
    describe('exitsAndFindBySlug',()=>{
        it('should return an array of ture and an object of type Organization',async()=>{
            organizationRepository.findOneBy.mockResolvedValue(organizationStub());
            const expectedResult = [true,organizationStub()];
            expect(await service.existsAndFindBySlug('gol')).toEqual(expectedResult)

        });
        it('should return an array of false and null',async()=>{
            organizationRepository.findOneBy.mockResolvedValue(null);
            const expectedResult = [false,null];
            expect(await service.existsAndFindBySlug('gol') ).toEqual(expectedResult)
        })
    });
   
})