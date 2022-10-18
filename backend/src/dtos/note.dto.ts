import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Note } from 'src/entities/note.entity';

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

export class IPaginatedNoteResponse {
  note: Note[];
  metadata: {
    total: number;
    page: number;
    size: number;
  };
}
