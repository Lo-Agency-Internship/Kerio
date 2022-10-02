import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddNotetDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsOptional()
  contactId: number;
}

export class UpdateNoteBodyDto {
  @IsString()
  title: string;

  @IsString()
  date: string;

  @IsString()
  description: string;
}
