import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogDto } from 'src/dtos/log.dto';
import { Log } from 'src/entities/log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogService {

    constructor(
        @InjectRepository(Log)
        private readonly logRepositoty: Repository<Log>
    ){}

    async addLog({ title,description,entityType,entityId,event}:LogDto): Promise<Log>
    {
      return await  this.logRepositoty.save({title,description,entityId,entityType,event});
    }
}
