import { Injectable, Logger } from '@nestjs/common';
import { roles } from './role/role.seed';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { statuses } from './contactStatus/status.seed';
import { Status } from '../entities/contact/status.entity';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}
  async seedRoles() {
    const seeded: Role[] = [];

    for await (const { name } of roles) {
      const role = await this.roleRepository.findOneBy({ name });

      if (role) {
        return;
      }

      const newRole = this.roleRepository.create({
        name,
      });

      await this.roleRepository.save(newRole);
      seeded.push(newRole);
    }

    return seeded;
  }

  async seedStatuses() {
    const seeded: Status[] = [];

    for await (const { status } of statuses) {
      const s = await this.statusRepository.findOneBy({
        status,
      });

      if (s) {
        return;
      }

      const newStatus = this.statusRepository.create({
        status,
      });
      await this.statusRepository.save(newStatus);

      seeded.push(newStatus);
    }

    return seeded;
  }
}
