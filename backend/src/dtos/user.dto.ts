import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ERole } from 'src/utils/types';

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserRegisterDto extends UserLoginDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  organizationSlug: string;

  role?: ERole | null;
}

export class UpdateUserBodyDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  enabled: boolean;

  @IsOptional()
  @IsString()
  oldPassword:string;

  @IsOptional()
  @IsString()
  newPassword:string;
}
