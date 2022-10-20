import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Contact } from 'src/entities/contact/contact.entity';
import { Organization } from 'src/entities/organization.entity';
import { User } from 'src/entities/user.entity';
import { EmployeeService } from 'src/services/employee.service';
import { RequestContextService } from 'src/services/requestContext.service';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly contextService: RequestContextService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async readOneById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    try {
      return await this.employeeService.findOneById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException('employee not found', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
