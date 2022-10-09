import { Injectable, Logger } from "@nestjs/common";
import { StatusSeederService } from "./contactStatus/status.service";
import { RoleSeederService } from "./role/role.service";

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly roleSeederService: RoleSeederService,
    private readonly statusSeederService: StatusSeederService,
  ) {}
  async seedRole() {
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
          'No. of roles created : ' +
            createdRoles.filter(
              nullValueOrCreatedRole => nullValueOrCreatedRole,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }

  async seedStatus(){
    await this.statuses()
      .then(completed => {
        this.logger.debug('Successfuly completed seeding users...');
        Promise.resolve(completed);
      })
      .catch(error => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });
    }

      async statuses(){
        return await Promise.all(this.statusSeederService.create())
      .then(createdstatuses => {
        this.logger.debug(
          'No. of statuses created : ' +
            createdstatuses.filter(
              nullValueOrCreatedStatus => nullValueOrCreatedStatus,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));

      }

  }

