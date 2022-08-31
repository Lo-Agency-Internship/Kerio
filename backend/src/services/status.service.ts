import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/entities/status.entity';
import { statuses } from 'src/utils/status.seed';
import { Repository } from 'typeorm';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  seedStatus() {
    return statuses.map(async (item) => {
      const role = await this.statusRepository.findOneBy({ title: item.title });
      if (role) {
        return;
      }
      const newStatus = this.statusRepository.create(item);
      return this.statusRepository.save(newStatus);
    });
  }
}
