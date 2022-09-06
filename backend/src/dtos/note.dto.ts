import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';



export class AddNotetDto {
  @IsNotEmpty()
  @IsString()
  title:string;

  @IsNotEmpty()
  @IsString()
  description:string;

  @IsNotEmpty()
  @IsString()
  date:string;

  @IsOptional()
  contactId:number



}
