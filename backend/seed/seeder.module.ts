import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { StatusSeederModule } from "./contactStatus/status.module";
import { PostgresDatabaseProviderModule } from "./provider.module";
import { RoleSeederModule } from "./role/roles.module";
import { Seeder } from "./seeder";

@Module({

    imports: [ConfigModule.forRoot({ isGlobal: true }),PostgresDatabaseProviderModule, RoleSeederModule,StatusSeederModule],
    providers: [ Logger, Seeder],
  })
  export class SeederModule {}
  