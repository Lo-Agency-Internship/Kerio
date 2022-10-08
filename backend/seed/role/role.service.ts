import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "../../src/entities/role.entity";
import { IRole } from "./role.interface";
import { roles } from "./role.seed";

@Injectable()
export class RoleSeederService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository:Repository<Role>
    ){}

    create(){
        return roles.map(async (item:IRole) => {
            const role = await this.roleRepository.findOneBy({ name:item.name });
            if (role) {
              return;
            }
            const newRole = this.roleRepository.create(item);
            return this.roleRepository.save(newRole);
          });
        }
            }
        