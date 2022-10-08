
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from 'src/entities/contact/status.entity';
import { StatusSeederService } from './status.service';


@Module({
    imports:[TypeOrmModule.forFeature([Status])],
    providers: [StatusSeederService],
  exports: [StatusSeederService],

})
export class RoleSeederModule {}