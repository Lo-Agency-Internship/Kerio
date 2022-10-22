import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Organization } from 'src/entities/organization.entity';
import { EmployeeService } from 'src/services/employee.service';
import { RequestContextService } from 'src/services/requestContext.service';
import { JwtGuard } from 'src/utils/jwt.guard';
import { SecureUser } from 'src/utils/types';

@UseGuards(JwtGuard)
@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly contextService: RequestContextService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async readOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SecureUser> {
    try {
      return await this.employeeService.readOneById({ id });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException('employee not found', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
      }
    }
  }

  @Get()
  async readAllByOrganization() {
    const organization = this.contextService.get(
      'organization',
    ) as Organization;
  
    return this.employeeService.readAllByOrganization({ organization });
  }
}
