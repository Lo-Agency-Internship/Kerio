import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/entities/contact/status.entity';
import { Repository } from 'typeorm';
import { IFindOneByTitlePayload } from '../../interfaces/status.service.interface';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async findOneByTitle(
    payload: IFindOneByTitlePayload,
  ): Promise<Status | null> {
    return this.statusRepository.findOneBy({
      status: payload.title,
    });
  }
}
