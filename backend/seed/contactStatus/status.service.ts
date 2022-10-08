import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Status } from "src/entities/contact/status.entity";
import { Repository } from "typeorm";
import { IContactStatus } from "./status.interface";
import { statuses } from "./status.seed";

@Injectable()
export class StatusSeederService {
    constructor(
        @InjectRepository(Status)
        private readonly statusRepository:Repository<Status>
    ){}

    create(){
        return statuses.map(async (item:IContactStatus) => {
            const status = await this.statusRepository.findOneBy({ status:item.status });
            if (status) {
              return;
            }
            const newStatus = this.statusRepository.create(item);
            return this.statusRepository.save(newStatus);
          });
        }
            }
        