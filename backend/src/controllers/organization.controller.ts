import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrganizationService } from '../services/organization.service';
import { Organization } from '../entities/organization.entity';
import { JwtGuard } from 'src/utils/jwt.guard';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly orgService: OrganizationService) {}

  @UseGuards(JwtGuard)
  @Get()
  index(): Promise<Organization[]> {
    return this.orgService.findAll();
  }
}
