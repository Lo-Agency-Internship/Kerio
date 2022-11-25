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
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { SecureUser } from '../utils/types';
import { JwtGuard } from '../utils/jwt.guard';
import { RequestContextService } from 'src/services/requestContext.service';
import { Organization } from 'src/entities/organization.entity';
import { UpdateUserBodyDto } from 'src/dtos/user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

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
  async readAllByOrganization() {
    const organization = this.contextService.get(
      'organization',
    ) as Organization;
    return this.userService.readAllByOrganization({ organization });
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserBodyDto,
  ): Promise<UpdateResult> {
    try {
      const { id: userId } = this.contextService.get('userData');
      if (userId === id) {
        return this.userService.updateOneById({
          id,
          user,
        });
      }
      throw new Error('not allowed');
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new HttpException(`user is unathorized`, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(' user not authorized', HttpStatus.BAD_REQUEST);
      }
    }
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.userService.delete({ id });
  }
}
