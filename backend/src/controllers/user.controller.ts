import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { SecureUser } from '../utils/types';
import { JwtGuard } from '../utils/jwt.guard';
import { RequestContextService } from 'src/services/requestContext.service';
import { Organization } from 'src/entities/organization.entity';
import { UpdateEmployeeBodyDto } from 'src/dtos/user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PaginationDto } from 'src/dtos';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly contextService: RequestContextService,
  ) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get(':id')
  async readOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SecureUser> {
    try {
      return await this.userService.readOneById({ id });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException('employee not found', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
      }
    }
  }

  @Get()
  async readAllByOrganization(@Query() query:PaginationDto) {
    const organization = this.contextService.get(
      'organization',
    ) as Organization;
    const {size, sort, page} = query

    return this.userService.readAllByOrganization({ organization, size, sort, page });
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() employee: UpdateEmployeeBodyDto,
  ): Promise<UpdateResult> {
    return this.userService.updateOneById({
      id,
      employee,
    });
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.userService.delete({ id });
  }
}
