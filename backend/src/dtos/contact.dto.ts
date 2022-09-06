import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindOneContactByIdDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class AddContactDto {
  @IsNotEmpty()
  @IsString()
  name:string;

  @IsNotEmpty()
  @IsEmail()
  email:string;

  @IsNotEmpty()
  phone:number;

  @IsNotEmpty()
  @IsString()
  status:string;

  @IsOptional()
  organizationId:number



}
