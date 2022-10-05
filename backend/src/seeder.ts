import { Injectable, Logger } from "@nestjs/common";
import { RoleSeederService } from "./role.service";

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly roleSeederService: RoleSeederService,
  ) {}
  async seed() {
    await this.roles()
      .then(completed => {
        this.logger.debug('Successfuly completed seeding users...');
        Promise.resolve(completed);
      })
      .catch(error => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });
  }
  async roles() {
    return await Promise.all(this.roleSeederService.create())
      .then(createdRoles => {
        this.logger.debug(
          'No. of languages created : ' +
            createdRoles.filter(
              nullValueOrCreatedRole => nullValueOrCreatedRole,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }
}
