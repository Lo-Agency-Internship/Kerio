import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from './index';
import { EContactStatus } from '../utils/types';
import { Contact } from '../entities/contact/contact.entity';
import { Column } from 'typeorm';

export class CreateBodyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEnum(EContactStatus)
  status: EContactStatus;

  @IsOptional()
  organizationId: number;
}

export class ReadAllQueryDto extends PaginationDto {
  @IsEnum(EContactStatus)
  status: EContactStatus;
}

export class UpdateContactBodyDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}
