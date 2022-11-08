import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Note } from 'src/entities/note.entity';
import { EContactStatus } from 'src/utils/types';
import { PaginationDto } from '.';

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

  @IsNotEmpty()
  @IsEnum(EContactStatus)
  status: EContactStatus;

  @IsOptional()
  score: number;
}

export class UpdateNoteBodyDto {
  @IsString()
  title: string;

  @IsString()
  date: string;

  @IsString()
  description: string;
}

export class IPaginatedNoteResponse {
  notes: Note[];
  metadata: {
    total: number;
    page: number;
    size: number;
  };
}
