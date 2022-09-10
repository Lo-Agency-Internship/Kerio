import { IsEmail, IsNotEmpty } from 'class-validator';
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

  roleId?: ERole | null;
}
