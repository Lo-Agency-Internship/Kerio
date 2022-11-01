import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsEmail,
  IsNotEmpty,
  IsOptional,
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

  @IsOptional()
  orgSlug: string;

  @IsOptional()
  @IsEmail()
  invitedByUserEmail: string;
}

export class CreateInvitesDto {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateInviteDto)
  invites: CreateInviteDto[];
}

export class RegisterUserByTokenDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
