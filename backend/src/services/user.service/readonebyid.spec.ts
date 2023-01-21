import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { OrganizationUser } from "../../entities/organizationUser.entity";
import { User } from "../../entities/user.entity";
import {  DataSource, Repository } from "typeorm";
import { UserService } from "./../user.service";
import { RequestContextService } from "./../requestContext.service";
import { SecureUser } from "src/utils/types";
import { NotFoundException } from "@nestjs/common";



type MockRepository<T = any> = Partial<Record<keyof Repository<T>,jest.Mock>>
const createMockRepository =  <T  = any>():MockRepository<T> => ({
    findOne:jest.fn()
})

const mockContextService = () =>{
    get:jest.fn()
}

describe('userService',()=>{
    
        let service:UserService;
        let userRepository:MockRepository;
        let orgUserRepository:MockRepository;
    
    
        beforeEach(async ()=>{
            
            const module:TestingModule = await Test.createTestingModule({
                providers:[
                    UserService,
                    {provide:DataSource, useValue:{}},
                    {provide:getRepositoryToken(OrganizationUser), useValue:createMockRepository()},
                    {provide:getRepositoryToken(User), useValue:createMockRepository()},
                    {provide:RequestContextService, useFactory: mockContextService}

                    
                ], 
            }) .compile()
    
            service =  module.get<UserService>(UserService);
            userRepository = module.get(getRepositoryToken(User));
            orgUserRepository = module.get(getRepositoryToken(OrganizationUser))
            
       
    });
    
    it('should be defined', () => {
        expect(service).toBeDefined();
    
    });
    describe('findone',()=>{
        it('should return the user object',async ()=>{
            const userId = 1;
            const mockedUser = {
                name:"mahsa",
                email:"goli@d.com",
                password:"1234556",
                salt:"ASE$%RHJJJJJJ",
                organization:{}
            } 
            const expectedUser = {
                name:"mahsa",
                email:"goli@d.com",
                organization:{}
            } as SecureUser

            userRepository.findOne.mockReturnValue(mockedUser)
            const user = await service.readOneById({id:userId})
            expect(user).toEqual(expectedUser)
        })
        it('should handle error',async ()=>{
            const userId = 1;
            
            userRepository.findOne.mockReturnValue(null)
            expect(service.readOneById({id:userId})).rejects.toThrow(NotFoundException)
        })

    })
    
  })