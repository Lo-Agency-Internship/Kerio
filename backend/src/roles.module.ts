
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RoleSeederService } from './role.service';
@Module({
    imports:[TypeOrmModule.forFeature([Role])],
    providers: [RoleSeederService],
  exports: [RoleSeederService],

})
export class RoleSeederModule {}