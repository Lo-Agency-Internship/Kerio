import { Logger, Module } from "@nestjs/common";
import { PostgresDatabaseProviderModule } from "./provider.module";
import { RoleSeederModule } from "./roles.module";
import { Seeder } from "./seeder";

@Module({
    imports: [PostgresDatabaseProviderModule, RoleSeederModule],
    providers: [ Logger, Seeder],
  })
  export class SeederModule {}
  