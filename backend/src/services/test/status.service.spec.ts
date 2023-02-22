import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Status } from "../../entities/contact/status.entity";
import { EContactStatus } from "../../utils/types";
import { DataSource, Repository } from "typeorm";
import { StatusService } from "../contact/status.service";



type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOneBy: jest.fn(),
});
const statusStub = () =>({
    id: 1,
    status: EContactStatus.Lead,
    createdAt: new Date(),
    updatedAt: new Date(),
    contacts: [],
    notes: [],
}) as unknown as Status


describe('statustService', () => {
    let service: StatusService;
    let statusRepository: MockRepository;
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          StatusService,
          { provide: DataSource, useValue: {} },
          {
            provide: getRepositoryToken(Status),
            useValue: createMockRepository(),
          }
        ],
      }).compile();
  
      service = module.get<StatusService>(StatusService);
    statusRepository = module.get(getRepositoryToken(Status));

});
it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneByTitle', () => {
    it('should return status by find tiltle', async () => {
      const mockedStatus = statusStub();
      statusRepository.findOneBy.mockResolvedValue(mockedStatus);
      expect(
        await service.findOneByTitle({
            title: EContactStatus.Lead
        }),
      ).toEqual(mockedStatus);
    });
    it('should return null', async () => {
        const mockedStatus = statusStub();
        statusRepository.findOneBy.mockResolvedValue(null);
        expect(
          await service.findOneByTitle({
              title: EContactStatus.Lead
          }),
        ).toEqual(null);
      });
})
})