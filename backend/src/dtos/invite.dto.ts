import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';

export class BasicInviteDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class InviteTokenDto {
  @IsNotEmpty()
  token: string;
}

export class CreateInviteDto extends BasicInviteDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  orgSlug: string;

  @IsNotEmpty()
  @IsEmail()
  invitedByUserEmail: string;
}

export class CreateInvitesDto {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateInviteDto)
  invites: CreateInviteDto[];
}

export class RegisterUserByInviteDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}