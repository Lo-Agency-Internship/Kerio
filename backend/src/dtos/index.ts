import { IsIn, IsOptional, IsString, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Min(1)
  page: number;

  @IsOptional()
  @Min(1)
  size: number;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sort: 'asc' | 'desc';
}
