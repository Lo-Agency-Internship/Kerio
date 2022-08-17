import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Organization } from "src/entities/organization.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrganizationService{
    constructor(
        @InjectRepository(Organization)
        private readonly organizationRepository: Repository<Organization>
    ){}

    async addOrganization(organization:Organization): Promise<Organization>
    {
        return await this.organizationRepository.save(organization)
    }

    async updateOrganization(id:number, organization:Organization): Promise<any>
    {
        return await this.organizationRepository.update(id,organization);
    }

    async findOneOrganizationById(id:number): Promise<Organization>
    {
        return await this.organizationRepository.findOneBy({id})
    }

    async findOneOrganizationByName(name:string): Promise<Organization>
    {
        return await this.organizationRepository.findOneBy({name})
    }
}