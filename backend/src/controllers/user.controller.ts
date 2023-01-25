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
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { SecureUser } from '../utils/types';
import { JwtGuard } from '../utils/jwt.guard';
import { RequestContextService } from '../services/requestContext.service';
import { Organization } from '../entities/organization.entity';
import { UpdateUserBodyDto } from '../dtos/user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PaginationDto } from '../dtos';

@UseGuards(JwtGuard)
@Controller('users')
@UsePipes(new ValidationPipe({ transform: true }))
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
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  async readAllByOrganization(@Query() { page, size, sort }: PaginationDto) {
    const organization = this.contextService.get(
      'organization',
    ) as Organization;

    return this.userService.readAllByOrganization({
      organization,
      size,
      sort,
      page,
    });
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserBodyDto,
  ): Promise<UpdateResult> {
    try {
      return this.userService.updateOneById({
        id,
        user,
      });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new HttpException(`user is unathorized`, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('something went wrong', HttpStatus.BAD_REQUEST);
      }
    }
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.userService.delete({ id });
  }
}
