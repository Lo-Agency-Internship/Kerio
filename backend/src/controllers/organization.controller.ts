import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../utils/jwt.guard';
import { OrganizationService } from '../services/organization.service';
import { Organization } from '../entities/organization.entity';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly orgService: OrganizationService) {}

  //@UseGuards(JwtGuard)
  @Get()
  index(): Promise<Organization[]> {
    return this.orgService.findAll();
  }
}
