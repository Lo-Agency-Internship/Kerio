
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
@Module({
    imports:[TypeOrmModule.forFeature([Role])],
    providers:[],
    exports:[]
})
export class RoleSeederModule {}